"use strict";
window.onload = () => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const settings = {
        cellSize: 20,
        text: 'A',
    };
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let center = {
        x: width / 2,
        y: height / 2,
    };
    const typeCanvas = document.createElement("canvas");
    const typeContext = typeCanvas.getContext("2d");
    let cols = Math.floor(width / settings.cellSize);
    let rows = Math.floor(height / settings.cellSize);
    let numberOfCells = cols * rows;
    typeCanvas.width = cols;
    typeCanvas.height = rows;
    /**
     * Update function that is called as many times as possible with requestAnimationFrame
     * Draws the points and lined on the canvas
     * @return {void}
     */
    const render = () => {
        typeContext.fillStyle = 'red';
        typeContext.fillRect(0, 0, cols, rows);
        typeContext.fillStyle = '#000';
        typeContext.font = `${rows}px serif`;
        typeContext.textBaseline = 'top';
        const metrics = typeContext.measureText(settings.text);
        const mx = metrics.actualBoundingBoxLeft * -1;
        const my = metrics.actualBoundingBoxAscent * -1;
        const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
        const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const x = (cols - mw) * 0.5 - mx;
        const y = (rows - mh) * 0.5 - my;
        typeContext.save();
        typeContext.translate(x, y);
        typeContext.fillText(settings.text, 0, 0);
        typeContext.restore();
        const typeData = typeContext.getImageData(0, 0, cols, rows).data;
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
        for (let i = 0; i < numberOfCells; i++) {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const cx = col * settings.cellSize;
            const cy = row * settings.cellSize;
            const r = typeData[i * 4 + 0];
            const g = typeData[i * 4 + 1];
            const b = typeData[i * 4 + 2];
            const a = typeData[i * 4 + 3];
            context.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
            context.save();
            context.translate(cx, cy);
            context.translate(settings.cellSize * 0.5, settings.cellSize * 0.5);
            context.beginPath();
            // context.fillRect(0, 0, settings.cellSize, settings.cellSize);
            context.arc(0, 0, settings.cellSize * 0.5, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }
        window.requestAnimationFrame(render);
    };
    const resizeCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        center = {
            x: width / 2,
            y: height / 2,
        };
        cols = Math.floor(width / settings.cellSize);
        rows = Math.floor(height / settings.cellSize);
        numberOfCells = cols * rows;
        typeCanvas.width = cols;
        typeCanvas.height = rows;
    };
    //Run the update function for the first time
    render();
    //Resize listener for the canvas to fill browser window dynamically
    window.addEventListener('resize', () => resizeCanvas(), false);
    //Initialize the dat.GUI object and assign the variables that the user can customize
    const gui = new dat.GUI();
    gui.add(settings, "cellSize", 10, 50).onChange(resizeCanvas);
    gui.add(settings, "text");
};