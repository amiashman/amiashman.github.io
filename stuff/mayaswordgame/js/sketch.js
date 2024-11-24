function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

const SCL = 30;
const COLS = 15;
const ROWS = 10;

let grid = make2DArray(COLS, ROWS);

let validSelections = [];
let begunWord = false;
let word = "";

let score = 0;

function setup() {
	createCanvas(COLS * SCL, ROWS * SCL + SCL * 2);
	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < ROWS; j++) {
			grid[i][j] = new Cell(i, j);
		}
	}
}

function draw() {
	background(0);

	for (let i = 0; i < COLS; i++) {
		for (let j = 0; j < ROWS; j++) {
			grid[i][j].show();
		}
	}

	textSize(20);
	textAlign(LEFT, CENTER);
	text("Current Word: " + word, SCL / 2, ROWS * SCL + SCL);
	textAlign(RIGHT, CENTER);
	text("Score: " + score, width - SCL / 2, ROWS * SCL + SCL);

}

function mouseClicked() {
	let i = floor(mouseX / SCL);
	let j = floor(mouseY / SCL);
	console.log(i,j)
	if ((!begunWord || validSelections.includes(i + "," + j)) && !grid[i][j].selected) {
		grid[i][j].clicked();
		begunWord = true;
		validSelections = grid[i][j].neighbors();
	}
}

function keyPressed() {
	if (key === "Enter") {
		if (allWords.includes(word.toLowerCase())) {
			begunWord = false;
			score += word.length;
			word = "";
		} else {}
	}
}