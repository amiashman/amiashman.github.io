let p1;
let p2;
let p3;

const TIME = 0.01;
const G = 6.67 * Math.pow(10, -11);

function setup() {
  createCanvas(windowWidth, windowHeight);

  p1 = new Planet(1, Math.pow(10, 14), 0, 10, 0, 0, 2, "#00ffff");
  p2 = new Planet(2, Math.pow(10, 14), 10, 0, 0, 0, 2, "#00ffff");
  p3 = new Planet(3, Math.pow(10, 14), -10, -10, 0, 0, 2, "#00ffff");

  p1.addPlanets([p2, p3]);
  p2.addPlanets([p3, p1]);
  p3.addPlanets([p1, p2]);

  p4 = new Planet(4, Math.pow(10, 14), 0, 10, 0, 0.1, 2, "#ff0000");
  p5 = new Planet(5, Math.pow(10, 14), 10, 0, 0, 0, 2, "#ff0000");
  p6 = new Planet(6, Math.pow(10, 14), -10, -10, 0, 0, 2, "#ff0000");

  p4.addPlanets([p5, p6]);
  p5.addPlanets([p6, p4]);
  p6.addPlanets([p4, p5]);
}

function draw() {
  background(0);

  p1.show();
  p2.show();
  p3.show();

  p1.update();
  p2.update();
  p3.update();

  p4.show();
  p5.show();
  p6.show();

  p4.update();
  p5.update();
  p6.update();
}

function centerOfMass(planets) {
  let x = 0;
  let y = 0;
  let totalMass = 0;

  planets.forEach((p) => {
    x += p.mass * p.pos.x;
    y += p.mass * p.pos.y;
    totalMass += p.mass;
  });

  x /= totalMass;
  y /= totalMass;

  noStroke();
  fill("#ffffff");
  text("Center of Mass: " + nf(x, 3, 2) + ", " + nf(y, 3, 2), 10, 10);
}
