function make2DArray(cols, rows) {
  // func makes a 2d array
  let arr = new Array(cols); // make an array of length cols
  for (let i = 0; i < arr.length; i++) {
    // for each element of cols
    arr[i] = new Array(rows); // make an array of length rows
  }
  return arr; // return the arr
}

urlQuery = window.location.search;
urlParams = new URLSearchParams(urlQuery);

let cols = parseInt(urlParams.get("cols"), 10) || 6;
let rows = parseInt(urlParams.get("rows"), 10) || 6;
const w = 50;
const h = 70;
let grid;
let cards;

let storage = [];
let turnCount = 0;
let matchCount = 0;

let footerHeight = 150;

let firstGuess = true;

let madeEven;
let madeEvenCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight - footerHeight);

  if ((cols * rows) % 2 == 1) {
    cols = cols - (cols % 2);
    rows = rows - (rows % 2);
    madeEven = true;
  }

  grid = make2DArray(cols, rows);
  cards = new Array(cols * rows);

  for (let i = 0; i < cards.length; i++) {
    cards[i] = Math.floor(i / 2);
  }

  scrambleCards();

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = new Card(i, j);
      grid[i][j].assign();
    }
  }

  time.innerHTML = "0:00";
}

function draw() {
  background(225);
  translate(width / 2, height / 2);

  if (firstGuess) {
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    let ts = 24;
    textSize(ts);
    text("Click any tile to begin.", 0, (h * rows) / 2 + ts);
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j].show();
    }
  }

  showMovesAndAccuracy();

  if (matchCount == (cols * rows) / 2) {
    clearTimeout(timeOut);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(
      "Congratulations! You won in " +
        (s - 1) +
        " seconds.\nPlease refresh the browser to play again.",
      0,
      0
    );
  }

  if (madeEven) {
    noStroke();
    fill(0);
    textAlign(LEFT, LEFT);
    let ts = 16;
    textSize(ts);
    text(
      "Please note that the number of cards was changed to ensure an even amount of cards",
      -width / 2 + ts / 2,
      height / 2 - ts
    );
    madeEvenCount++;
  }

  if (madeEvenCount > 250) {
    madeEven = false;
  }
}

function mousePressed() {
  if (firstGuess) {
    showTime();
    firstGuess = false;
  }

  i = (cols - 1) / 2 + (mouseX - width / 2) / w;
  j = (rows - 1) / 2 + (mouseY - height / 2) / h;
  i = Math.round(i);
  j = Math.round(j);
  console.log(i, j);
  if (!grid[i][j].guessed) {
    grid[i][j].reveal();

    if (storage.length < 2) {
      storage.push(grid[i][j]);
    }
  }
  if (storage.length == 2) {
    lockGrid();
    let timeOut = setTimeout(() => {
      lockGrid();
      turnCount++;
      if (
        storage[0].data == storage[1].data &&
        storage[0].index != storage[1].index &&
        !storage[0].guessed &&
        !storage[1].guessed
      ) {
        for (card of storage) {
          card.guessed = !card.guessed;
        }
        console.log("match");
        matchCount++;
      } else {
        for (card of storage) {
          card.revealed = !card.revealed;
        }
      }
      storage = [];
    }, 500);
  }
}
