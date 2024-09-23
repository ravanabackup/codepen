//gravity - changing this will change the speed of thought
let g = 9.81;
//I have been told that mathematicians use these single-letter poorly explained variables.
let a,c;
//colorMode
let cMode = 0;
//because arrows seemed like something we can can focus on
setup = () => {
  c = min(windowWidth, windowHeight) * 0.9;//clearly a variable
  createCanvas(windowWidth, windowHeight);
  a = -c / 3;
  stroke(255 - cMode);
  strokeWeight(0.5);
  noFill();
};
draw = () => {
  background(cMode);
  stroke(255 - cMode);
  //you can play with time itself - it's relative - maybe you should conceptualize non-linear time
  t = frameCount / 7;
  //the origin of thought is now centered:
  translate(width / 2, height / 2); 
  strokeWeight(2);
  for (let i = 0.7; i < 40; i += 0.5) {
    push();
    //shrinking thoughts
    scale(1 / i, 1 / i);
    circle(0, -c / 4, 5);
    pendulum(2 * i);
    pop();
  }
  strokeWeight(0.15);
  //vanishing points to allow for your thoughts to disapate through observation
  vanish(a + (c / 8) * sin(t / 100), 0);
  vanish(-a - (c / 8) * sin(t / 100), 0);
};

pendulum = (f) => {
  //the length of the pendulum shortens as it vainishes
  L = c / 2 - min(c / 2, f);
  //big T = period. What is a period? A moment for some and an eternity for others.
  T = TWO_PI * sqrt(L / g);
  //play with this theta, but slow down time if you need to absorb your observations
  theta0 = PI / 2.75;
  //Angular Position
  A = theta0 * cos(sqrt(g / L) * t);
  //x and y position of the weight of your thoughts
  x = L * sin(A);
  y = L * cos(A);
  line(0, -c / 4, x, -c / 4 + y);
  circle(x, -c / 4 + y, 5);
};

vanish = (a, b) => {
  circle(a, b, 3);
  //number of lines - you can uncomment the portion you see to rotate the lines
  n = 45 //-20*sin(t/1000)
  for (let i = 0; i < n; i++) {
    push();
    translate(a, b);
    rotate((PI / n) * i);
    line(-c, 0, c, 0);
    pop();
  }
};
//resize your window and you won't miss a beat
windowResized = () => {
  c = min(windowWidth, windowHeight) * 0.9;
  resizeCanvas(windowWidth, windowHeight);
};
//some of us need a different mode of thought
mousePressed = () => {
  if (cMode === 0) {
    cMode = 255;
  } else {
    cMode = 0;
  }
};