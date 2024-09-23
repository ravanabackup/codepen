import { html, render, useReducer } from 'https://unpkg.com/htm/preact/standalone.module.js';

const emptyBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const initialState = {
  currentPlayer: "X",
  forceBoard: null,
  board: [
    [emptyBoard, emptyBoard, emptyBoard],
    [emptyBoard, emptyBoard, emptyBoard],
    [emptyBoard, emptyBoard, emptyBoard]
  ]
};

/*
  Returns "X" or "O", 0 if tie, null if not finished
*/
function getWinner(littleBoard) {
  const getRunWinner = (run) => {
    if (run[0] === run[1] && run[0] === run[2]) {
      if (run[0] !== null) {
        return run[0];
      }
    }
    return null;
  }
  
  // Check rows
  for (let row = 0; row < 3; row++) {
    const run = littleBoard[row];

    const runWinner = getRunWinner(run);
    if (runWinner !== null) {
      return runWinner;
    }
  }
  
  // Check columns (trickier)
  for (let col = 0; col < 3; col++) {
    let run = [];
    for (let row = 0; row < 3; row++) {
      run.push(littleBoard[row][col]);
    }

    const runWinner = getRunWinner(run);
    if (runWinner !== null) {
      return runWinner;
    }
  }
  
  // Check diagonals (manual)
  const diagonalRunA = [littleBoard[0][0], littleBoard[1][1], littleBoard[2][2]];
  const diagonalWinnerA = getRunWinner(diagonalRunA);
  if (diagonalWinnerA !== null) {
    return diagonalWinnerA;
  }
  
  const diagonalRunB = [littleBoard[0][2], littleBoard[1][1], littleBoard[2][0]];
  const diagonalWinnerB = getRunWinner(diagonalRunB);
  if (diagonalWinnerB !== null) {
    return diagonalWinnerB;
  }
  
  // Check for tie
  let tie = true;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (littleBoard[row][col] === null) {
        tie = false;
      }
    }
  }
  
  if (tie) {
    return "~";
  }

  // Nobody has won!
  return null;
}

function setIndex(array, index, value) {
  return [
    ...array.slice(0, index),
    value,
    ...array.slice(index + 1)
  ]
}

function setPathValue(array, path, value) {
  const index = path[0];
  
  if (path.length === 1) {
    return setIndex(array, index, value);
  }

  return setIndex(
    array, index,
    setPathValue(
      array[index],
      path.slice(1),
      value
    )
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "placePiece": {
      const newBoard = setPathValue(
        state.board,
        [
          action.rowIndex,
          action.colIndex,
          action.littleRowIndex,
          action.littleColIndex
        ],
        state.currentPlayer
      );
      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === "X" ? "O" : "X",
        forceBoard: (getWinner(newBoard[action.littleRowIndex][action.littleColIndex]) === null)
          ? [action.littleRowIndex, action.littleColIndex]
          : null
      };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const gameWinner = getWinner(state.board.map(row => row.map(getWinner).map(w => w === 0 ? null : w)));

  return html`
    <div class="bigBoard">
      ${state.board.map((row, rowIndex) => row.map((littleBoard, colIndex) => {
        const littleBoardWinner = getWinner(littleBoard);

        let validLocation = false;
        if (state.forceBoard === null) {
          validLocation = littleBoardWinner === null;
        } else if (state.forceBoard[0] === rowIndex && state.forceBoard[1] === colIndex) {
          validLocation = true;
        }
    
        if (gameWinner !== null) {
          validLocation = false;
        }

        return html`
          <div class=${"littleBoard" + (" littleBoard-" + littleBoardWinner) + (" littleBoard-" + (validLocation ? "valid" : "invalid"))}>
            ${littleBoard.map((littleRow, littleRowIndex) => littleRow.map((tile, littleColIndex) => {
              const onClick = () => {
                if (littleBoardWinner === null && tile === null && validLocation) {
                  dispatch({
                    type: "placePiece",
                    rowIndex,
                    colIndex,
                    littleRowIndex,
                    littleColIndex
                  });
                }
              };

              return html`<div class=${"tile tile-" + tile} onClick=${onClick} />`
            }))}
          </div>
        `;
      }))}
    </div>
    ${gameWinner === null
      ? html`<h1>Current player: ${state.currentPlayer}</h1>`
      : html`<h1>Winner: ${gameWinner}</h1>`
    }
  `;
}

render(html`<${App} />`, document.body);