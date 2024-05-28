let blueSystem;
let redSystem;
let greenSystem;

let blueSystemParameters = [
  {
    index: 1,
    mass: Math.pow(10, 14),
    xPos: 10,
    yPos: 10,
    xVel: 0,
    yVel: 0,
    radius: 2,
    color: "#00ffff"
  },
  {
    index: 2,
    mass: Math.pow(10, 14),
    xPos: -10,
    yPos: 0,
    xVel: 0,
    yVel: 0,
    radius: 2,
    color: "#00ffff"
  },
  {
    index: 3,
    mass: Math.pow(10, 14),
    xPos: 0,
    yPos: -10,
    xVel: 0,
    yVel: 0,
    radius: 2,
    color: "#00ffff"
  }
];

let redSystemParameters = [
  {
    index: 1,
    mass: Math.pow(10, 14),
    xPos: 10,
    yPos: 10,
    xVel: 0,
    yVel: 0,
    radius: 2,
    color: "#ff0000"
  },
  {
    index: 2,
    mass: Math.pow(10, 14),
    xPos: -10,
    yPos: 0,
    xVel: 0,
    yVel: 0,
    radius: 2,
    color: "#ff0000"
  },
  {
    index: 3,
    mass: Math.pow(10, 14),
    xPos: 0,
    yPos: -10,
    xVel: 0,
    yVel: 0.01,
    radius: 2,
    color: "#ff0000"
  }
];

const TIME = 0.015;
const G = 6.67 * Math.pow(10, -11);

function setup() {
  createCanvas(windowWidth, windowHeight);

  blueSystem = new System(blueSystemParameters, "Blue");
  redSystem = new System(redSystemParameters, "Red");  
}

function draw() {
  background(0);

  blueSystem.show();
  blueSystem.update();
  // blueSystem.centerOfMass(10, height - 40);
  redSystem.show();
  redSystem.update();
  // redSystem.centerOfMass(10, height - 20);

  showInformation()
}

function showInformation() {
  noStroke();
  fill("#ffffff");
  text("This is a demonstration of the Three Body Problem, which states that any system of three masses, or bodies, will display chaotic motion. \nImagine the sun, moon, and earth are the only object in space. \nThe only forces that will affect one of those bodies is another's gravitational pull, \nthus the sun, moon, and earth will interact in a three-body system. \nIts displaying of chaotic motion refers to that if one parameter of one body where altered \nby even an incredibly small amount, say the mass of the moon was increased by one kilogram, \nthe movement of the system would be unrecognizable. \nIn other words, a small adjustment to an initial condition will produce large changes in motion. \nIn this example, the initial speed of one of the red masses was altered by 0.01 units per time interval, \nand the two systems produce wildly different motion patterns. \nThe two systems do not interact with each other, they are simply show at the same time.", 10, 20)
  text("Created by Ami Ashman\nMade with care at my bedroom desk.\nMarch 16, 2023", 10, height - 40)
}
