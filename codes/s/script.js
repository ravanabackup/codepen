(function() {
	'use strict';

  function GameOfLife (boardSize) {
    this.board = document.getElementById('board');
    this.boardSize = boardSize;
    this.boardGrid = this.newBoardGrid(boardSize);
    this.neighborLocations = [ [-1,-1],[-1, 0],[-1, 1],[ 0,-1],[ 0, 1],[ 1,-1],[ 1, 0],[ 1, 1] ];
	}

  function Tile () {
    this.alive = Math.random() > 0.5;
    this.neighbors = 0;
  }

	////

  GameOfLife.prototype.newBoardGrid = function(boardSize) {
    var boardGrid = [];
    for (var i = 0; i < boardSize; i++) {
      var row = [];
      for (var j = 0; j < boardSize; j++) {
        row.push(new Tile());
      }
      boardGrid.push(row);
    }
    return boardGrid;
  };

	
  GameOfLife.prototype.drawBoard = function() {
	  while (board.firstChild) board.removeChild(board.firstChild);
    for (var i = 0; i < this.boardSize; i++) {
      var row = this.boardGrid[i];
      for (var j = 0; j < this.boardSize; j++) {
        var tile = row[j];
        if (tile.alive) {
          var aliveTile = document.createElement('div');
					aliveTile.className="filled";
          board.appendChild(aliveTile);
        } else {
          var deadTile = document.createElement('div');
          board.appendChild(deadTile);
        }
      }
    }
  };

  
	GameOfLife.prototype.isUnderpopulated = function(r,c) {
    var tile = this.boardGrid[r][c];
    return tile.neighbors < 2;
  };

  
	GameOfLife.prototype.isOverpopulated = function(r,c) {
    var tile = this.boardGrid[r][c];
    return tile.neighbors > 3;
  };

  
	GameOfLife.prototype.canReproduce = function(r,c) {
    var tile = this.boardGrid[r][c];
    return !tile.alive && tile.neighbors === 3;
  };

  
	GameOfLife.prototype.isInBounds = function(r,c) {
    return r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize;
  };

  
	GameOfLife.prototype.updateNeighborsForTile = function(r,c) {
    var tile = this.boardGrid[r][c];
    tile.neighbors = 0;
    for (var i = 0; i < this.neighborLocations.length; i++) {
      var neighborLocation = this.neighborLocations[i];
      var nlr = neighborLocation[0];
      var nlc = neighborLocation[1];
      if (this.isInBounds(r + nlr, c + nlc)) {
        var neighbor = this.boardGrid[r + nlr][c + nlc];
        if (neighbor.alive) {
          tile.neighbors++;
        }
      }
    }
  };

  
	GameOfLife.prototype.updateStateForTile = function(r,c) {
    var tile = this.boardGrid[r][c];
    if (this.isUnderpopulated(r,c) || this.isOverpopulated(r,c)) {
      tile.alive = false;
    } else if (this.canReproduce(r,c)) {
      tile.alive = true;
    }
  };

  
	GameOfLife.prototype.gameTurn = function() {
		// first analyze
    for (var k = 0; k < this.boardSize; k++) {
      for (var l = 0; l < this.boardSize; l++) {
				this.updateNeighborsForTile(k, l);
      }
    }
		// then apply results
		for (var k = 0; k < this.boardSize; k++) {
      for (var l = 0; l < this.boardSize; l++) {
        this.updateStateForTile(k, l);
      }
    }
  };


	////
	
  var gameOfLife = new GameOfLife(40);
	var interval = setInterval(function() {
		gameOfLife.drawBoard();
		gameOfLife.gameTurn();
	}, 100);

	
})();