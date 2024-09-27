var centerx, centery;
var resx, resy;
var incx, incy;
var noisered, noiseredinc;
var noisegreen, noisegreeninc;
var noiseblue, noiserblueinc;
var gamma, theta, beta, phi;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerx = windowWidth/2;
  centery = windowHeight/2;
  resx = 5;
  resy = 25;
  incx = windowWidth / resx;
  incy = windowHeight / resy;
  noiseredinc = random(1) * 0.001;
  noisegreeninc = random(1) * 0.0001;
  noiseblueinc = random(1) * 0.0025;
  gamma = 0;
  beta = 0;
  theta = 0;
  phi = (sqrt(5)+1)/2 ;
}

function draw() {
  background(0);
  
  noStroke();
  noFill();
  rectMode(CENTER);
  for(var i = 0; i<resx + 1; i ++)
    {
      for(var j = 0; j<resy; j++)
        {
          var x = -incx / 2 + i * incx;
          var y = incy / 2 +j * incy;
          var sizey = incy + 1 - (incy*0.5);
          if(j%2 == 0)
          {
           x += incx/2; 
          }
          noisered = noise(i * .1, j * .1, gamma) * 255;
          noisegreen = noise(i * .1, j * .1, theta * .5) * 255;
          noiseblue = noise(i * .1, j * .1, beta * .05) * 255;
          var newsizey = noise(gamma * .001, i + theta * .05, j + beta * .05) * sizey;
          gamma += phi * 0.000005;
          theta += noisegreeninc;
          beta += noiseblueinc;
          fill(noisered, noisegreen, noiseblue);
          if(newsizey > 3)
          {
            rect(x, y, incx, newsizey);
          }
        }
    }
}