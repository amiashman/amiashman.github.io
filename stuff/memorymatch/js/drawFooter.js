const moves = document.getElementById("moves");
const time = document.getElementById("time");
const accuracy = document.getElementById("accuracy");

function showMovesAndAccuracy() {
  moves.innerText = turnCount;
  if (isNaN((100 * matchCount) / turnCount)) {
    accuracy.innerText = "0%";
  } else {
    accuracy.innerText = ((100 * matchCount) / turnCount).toFixed(0) + "%";
  }
}

let s = -1;
let timeOut;
function showTime() {
  if (!menuOpen) {
    s++;
  }
  m = (s - (s % 60)) / 60;
  time.innerText = m + ":" + nf(s % 60, 2);

  timeOut = setTimeout(showTime, 1000);
}
