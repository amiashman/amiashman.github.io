const settingsIcon = document.getElementById("settingsIcon");
let menu = document.getElementById("menu");

settingsIcon.addEventListener("click", flyMenu);

function flyMenu() {
  menuOpen = true;
  menu.style.display = "block";
  console.log("animate");
}

let colsSilder = document.getElementById("cols-input");
let rowsSilder = document.getElementById("rows-input");
let colsValue = document.getElementById("cols-value");
let rowsValue = document.getElementById("rows-value");
let btn = document.getElementById("play-btn");

colsSilder.value = cols;
rowsSilder.value = rows;
colsValue.innerHTML = colsSilder.value;
rowsValue.innerHTML = rowsSilder.value;

colsSilder.oninput = function () {
  colsValue.innerHTML = this.value;
};

rowsSilder.oninput = function () {
  rowsValue.innerHTML = this.value;
};

function loadNewGame() {
  window.location.href =
    "./index.html?cols=" + colsSilder.value + "&rows=" + rowsSilder.value;
}

function cancelMenu() {
  menuOpen = false;
  menu.style.display = "none";
}
