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
let lettersInWord = [];

let score = 0;
// 2: 0
// 3: 1
// 4: 3
// 5: 5
// 6: 7
// 7: 9   +4
// 8: 11  +4
// 9: 13  +4


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
	if ((!begunWord || validSelections.includes(i + "," + j)) && !grid[i][j].selected && !grid[i][j].submitted) {
		grid[i][j].clicked();
		lettersInWord.push([i,j]);
		begunWord = true;
		validSelections = grid[i][j].neighbors();
	}
}

function keyPressed() {
	if (key === "Enter") {
		if (word.length > 2 && allWords.includes(word.toLowerCase())) {
			console.log(word);
			lettersInWord.forEach(cell => {
				grid[cell[0]][cell[1]].submitted = true;
			});
			score += (1 + (word.length - 3) * 2) + (word.length >= 7 ? 4 : 0);
		} 
		begunWord = false;
		lettersInWord.forEach(cell => {
			grid[cell[0]][cell[1]].selected = false;
		});
		word = "";
		lettersInWord = [];
	}
}