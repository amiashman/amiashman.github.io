let blue = "#3498db";
let yellow = "#f1c40f";
let green = "#2ecc71";
let red = "#e74c3c";

let brightBlue = "#85c1e9";
let brightYellow = "#f7dc6f";
let brightGreen = "#80e2aa";
let brightRed = "#f1948a";

let blueIsBright = false;
let yellowIsBright = false;
let greenIsBright = false;
let redIsBright = false;

let options = ["b", "y", "g", "r"];
let turnLength = 3;

let targetSquence = "";
let userSequence = "";

let haventStartedYet = true;
let usersTurn = false;
let isGameOver = false;

let width = 500;
let height = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < turnLength; i++) {
    targetSquence += options[floor(random() * options.length)];
  }
}

function draw() {
  background(0);
  translate(windowWidth / 2, windowHeight / 2);

  noStroke();

  fill(blue);
  if (blueIsBright) {
    fill(brightBlue);
  }
  arc(0, 0, width, height, 0, PI / 2);

  fill(yellow);
  if (yellowIsBright) {
    fill(brightYellow);
  }
  arc(0, 0, width, height, PI / 2, PI);

  fill(green);
  if (greenIsBright) {
    fill(brightGreen);
  }
  arc(0, 0, width, height, PI, (3 * PI) / 2);

  fill(red);
  if (redIsBright) {
    fill(brightRed);
  }
  arc(0, 0, width, height, (3 * PI) / 2, 0);

  fill("#000000");
  ellipse(0, 0, width / 2, height / 2);
  if (haventStartedYet) {
    stroke(255);
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Click to Start", 0, 0);
  }

  if (!targetSquence.startsWith(userSequence)) {
    gameOver();
  }

  if (userSequence == targetSquence) {
    userSequence = "";
    targetSquence += options[floor(random() * options.length)];
    playSequence(targetSquence);
  }
}

function mousePressed() {
  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let d = abs(dist(x, y, 0, 0));
  if (d >= 100 && d <= 200 && usersTurn && !isGameOver) {
    switch (true) {
      case x >= 0 && y >= 0: // blue
        blueIsBright = true;
        userSequence += "b";
        break;
      case x < 0 && y >= 0: // yellow
        yellowIsBright = true;
        userSequence += "y";
        break;
      case x < 0 && y < 0: // green
        greenIsBright = true;
        userSequence += "g";
        break;
      case x >= 0 && y < 0: // red
        redIsBright = true;
        userSequence += "r";
        break;
      default:
        break;
    }
  }

  if (haventStartedYet) {
    haventStartedYet = false;
    playSequence(targetSquence);
  }
}

function mouseReleased() {
  blueIsBright = false;
  yellowIsBright = false;
  greenIsBright = false;
  redIsBright = false;
}

function playSequence(targetSquence) {
  usersTurn = false;
  for (let i = 0; i < targetSquence.length; i++) {
    const c = targetSquence.charAt(i);
    switch (c) {
      case "b":
        setTimeout(() => {
          blueIsBright = true;
        }, 400 * i * 2 + 400);
        setTimeout(() => {
          blueIsBright = false;
        }, 400 * (i + 1) * 2);
        break;
      case "y":
        setTimeout(() => {
          yellowIsBright = true;
        }, 400 * i * 2 + 400);
        setTimeout(() => {
          yellowIsBright = false;
        }, 400 * (i + 1) * 2);
        break;
      case "g":
        setTimeout(() => {
          greenIsBright = true;
        }, 400 * i * 2 + 400);
        setTimeout(() => {
          greenIsBright = false;
        }, 400 * (i + 1) * 2);
        break;
      case "r":
        setTimeout(() => {
          redIsBright = true;
        }, 400 * i * 2 + 400);
        setTimeout(() => {
          redIsBright = false;
        }, 400 * (i + 1) * 2);
        break;
      default:
        break;
    }
  }

  setTimeout(() => {
    usersTurn = true;
  }, 400 * targetSquence.length * 2);
}

function gameOver() {
  stroke(255);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(
    "Game Over!\nScore: " +
      (targetSquence.length == 3 ? 0 : targetSquence.length - 1),
    0,
    0
  );
}
