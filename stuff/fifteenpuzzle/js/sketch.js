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

let victory = false;

let urlQuery = window.location.search;
let urlParams = new URLSearchParams(urlQuery);

const wrongColor =
  urlParams.get("wrong") != null ? "#" + urlParams.get("wrong") : "#2ecc71";

const rightColor =
  urlParams.get("right") != null ? "#" + urlParams.get("right") : "#e67e22";

const gellerMode = urlParams.get("geller") === "true";

const bgColor = "#95a5a6";

let menuOpen = false;

let moveBox;
let moveCounter = 0;

let timeBox;
let minutes;
let seconds;

let footerHeight = 150;

function setup() {
  createCanvas(windowWidth, windowHeight - footerHeight);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells[r][c] = new Cell(r, c, w);
    }
  }

  showTime();

  document.documentElement.style.setProperty("--bg-color", bgColor);
}

function draw() {
  background(bgColor);
  translate(width / 2, height / 2 + footerHeight / 3);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells[r][c].show();
    }
  }

  if (frameCount <= 42) {
    scramblePuzzle();
  }

  if (victory == true) {
    stroke("#292d33");
    strokeWeight(1);
    fill("#292d33");
    textSize(24);
    textAlign(CENTER, CENTER);
    text("Congratulations! You've won in " + s + " seconds", 0, w * 2.25);
    console.log("solved");
  }
}

function keyPressed(e) {
  if (!gridLocked && !menuOpen) {
    let blankCell = findBlankCell();
    switch (e.which) {
      case 37:
        if (blankCell.c != 3) {
          swapPieces(blankCell.r, blankCell.c, blankCell.r, blankCell.c + 1);
        }
        moveCounter++;
        break;
      case 38:
        if (blankCell.r != 3) {
          swapPieces(blankCell.r, blankCell.c, blankCell.r + 1, blankCell.c);
        }
        moveCounter++;
        break;
      case 39:
        if (blankCell.c != 0) {
          swapPieces(blankCell.r, blankCell.c, blankCell.r, blankCell.c - 1);
        }
        moveCounter++;
        break;
      case 40:
        if (blankCell.r != 0) {
          swapPieces(blankCell.r, blankCell.c, blankCell.r - 1, blankCell.c);
        }
        moveCounter++;
        break;
    }

    updateMoves();
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

  if (gellerMode) {
    for (let i = 0; i < 16; i++) {
      let c = i % 4;
      let r = (i - c) / 4;
      cells[r][c].update(r, c);
    }
  }
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
      victory = true;
      gridLocked = true;
    }
  }
}

function processTheme(index) {
  let selectedTheme = parseInt(urlParams.get("theme"), 10);
  return themes[selectedTheme][index];
}
