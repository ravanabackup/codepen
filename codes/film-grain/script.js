(function () {
  // Configuration
  const n = 100; // Time interval in milliseconds
  // Create and setup canvas
  const noise = document.getElementById("noise");
  document.body.appendChild(noise);
  const ctx = noise.getContext("2d");
  const seed = document.getElementById("seed");

  const drawVerticalLine = (xPosition, lineHeight) => {
    const scratch = document.getElementById("scratch");
    const ctx = scratch.getContext("2d");
    scratch.width = window.innerWidth;
    scratch.height = window.innerHeight;
    ctx.strokeStyle = Math.random() > 0.2 ? "rgba(255,255,255,0.6)" : "black";
    ctx.lineWidth = ~~(Math.random() * 3) + 1;
    ctx.beginPath();
    ctx.moveTo(xPosition, 0);
    ctx.lineTo(xPosition, lineHeight);
    ctx.stroke();
    
    if (Math.random > 0.25 ) {
      drawVerticalLine(Math.random() * noise.width * 1, noise.height);
    }
  };

  function resizeCanvas() {
    noise.width = window.innerWidth;
    noise.height = window.innerHeight;
    generateNoise();
  }

  function generateNoise() {
    const width = noise.width;
    const height = noise.height;
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const color = Math.random() * 200;
      data[i] = color; // Red
      data[i + 1] = color; // Green
      data[i + 2] = color; // Blue
      data[i + 3] = 80; // Alpha
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Initial setup
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // Set interval to regenerate noise
  setInterval(() => {
    generateNoise();
    seed.setAttribute("seed", ~~(Math.random() * 1000));
    const scratch = document.getElementById("scratch");
    const ctx = scratch.getContext("2d");
    const numberOfCircles = Math.floor(Math.random() * 15);

    for (var i = 0; i < numberOfCircles; i++) {
      const x = Math.random() * scratch.width;
      const y = Math.random() * scratch.height;
      const radius = Math.floor(Math.random() * 5) + 1;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
    }
  }, n);
  setInterval(() => {
    drawVerticalLine(Math.random() * noise.width * 12, noise.height);
  }, n * 2);
})();

const newImg = () => {
  const img = document.createElement('img');
  const newSrc = `https://picsum.photos/${~~(Math.random() *200) + 500}/${~~(Math.random() * 200)  +500}`;
  img.setAttribute('src', newSrc);
  img.onload = () => {
    const pan = [
    "50% 0%",
    "100% 50%",
    "50% 100%",
    "0% 50%"
][~~(Math.random() * 4)]
    document.getElementById('img').setAttribute('style', `background-image: url(${newSrc}); background-position: ${pan}`);  
    
  }
  document.body.appendChild(img);
  img.style.display = 'none';

};

newImg();
setInterval(newImg, 3000)