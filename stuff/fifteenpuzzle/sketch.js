function make2DArray(r, c) {
  // func makes a 2d array
  let arr = new Array(r); // make an array of length r
  for (let i = 0; i < arr.length; i++) {
    // for each element of cols
    arr[i] = new Array(c); // make an array of length c
  }
  return arr; // return the arr
}

const rows = 4;
const cols = 4;
const w = 128;

let cells = make2DArray(rows, cols);

let gridLocked = false;

let playAnimation = false;
let a = 0;

let moveBox;
let moveCounter = 0;

let timeBox;
let minutes;
let seconds;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells[r][c] = new Cell(r, c, w);
    }
  }

  moveBox = new TextBox(w * -1, w * 2.5, w);
  timeBox = new TextBox(w, w * 2.5, w);
}

function draw() {
  background(149, 165, 166);
  translate(width / 2, height / 2);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells[r][c].show();
    }
  }

  if (frameCount <= 42) {
    scramblePuzzle();
  }

  if (playAnimation == true) {
    stroke(0, 0, 255);
    fill(0, 0, 255);
    textSize(90);
    textAlign(CENTER, CENTER);
    push();
    angleMode(DEGREES);
    rotate(a);
    text("YOU DID IT!!!", 0, 0);
    a++;
    pop();
    console.log("solved");
  }

  moveBox.show("Moves: " + moveCounter);

  if (gridLocked == false) {
    let time = Math.floor((millis() - 700) / 1000);
    if (time < 0) time = 0;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds;
  }
  timeBox.show("Time: " + minutes + ":" + seconds);
}

function keyPressed(e) {
  if (!gridLocked) {
    if (e.which == 83) {
      scramblePuzzle();
    } else {
      let blankCell = findBlankCell();
      switch (e.which) {
        case 37:
          if (blankCell.c != 3) {
            swapPieces(blankCell.r, blankCell.c, blankCell.r, blankCell.c + 1);
            moveCounter++;
          }
          break;
        case 38:
          if (blankCell.r != 3) {
            swapPieces(blankCell.r, blankCell.c, blankCell.r + 1, blankCell.c);
            moveCounter++;
          }
          break;
        case 39:
          if (blankCell.c != 0) {
            swapPieces(blankCell.r, blankCell.c, blankCell.r, blankCell.c - 1);
            moveCounter++;
          }
          break;
        case 40:
          if (blankCell.r != 0) {
            swapPieces(blankCell.r, blankCell.c, blankCell.r - 1, blankCell.c);
            moveCounter++;
          }
          break;
      }
    }

    checkPuzzle();
  }
}

function scramblePuzzle() {
  for (let i = 0; i < 100; i++) {
    blankCell = findBlankCell();
    let br = blankCell.r;
    let bc = blankCell.c;

    let neighbors = [];
    // top
    if (br != 0) {
      neighbors.push(cells[br - 1][bc]);
    }
    // bottom
    if (br != 3) {
      neighbors.push(cells[br + 1][bc]);
    }
    // left
    if (bc != 0) {
      neighbors.push(cells[br][bc - 1]);
    }
    // right
    if (bc != 3) {
      neighbors.push(cells[br][bc + 1]);
    }

    let choice = random(neighbors);

    swapPieces(br, bc, choice.r, choice.c);
  }
}

function swapPieces(r1, c1, r2, c2) {
  let temp = cells[r1][c1];
  cells[r1][c1] = cells[r2][c2];
  cells[r2][c2] = temp;

  cells[r1][c1].update(r1, c1);
  cells[r2][c2].update(r2, c2);
}

function findBlankCell() {
  for (let i = 0; i < 16; i++) {
    let c = i % 4;
    let r = (i - c) / 4;
    if (cells[r][c].intended.r == 3 && cells[r][c].intended.c == 3) {
      return cells[r][c];
    }
  }
}

function checkPuzzle() {
  console.log("checking");
  let blankCell = findBlankCell();
  let checker = true;
  if (
    blankCell.r == blankCell.intended.r &&
    blankCell.c == blankCell.intended.c
  ) {
    console.log("blank in br corner");
    for (let r = 0; r < cells.length; r++) {
      for (let c = 0; c < cells[r].length; c++) {
        if (cells[r][c].number != r * 4 + c + 1) {
          console.log(cells[r][c].number, "wrong");
          checker = false;
          break;
        } else {
          console.log(cells[r][c].number, "right");
        }
      }
    }
    if (checker == true) {
      playAnimation = true;
      gridLocked = true;
    }
  }
}
