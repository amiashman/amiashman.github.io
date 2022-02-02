const settingsIcon = document.getElementById("settingsIcon");
let menu = document.getElementById("menu");

settingsIcon.addEventListener("click", flyMenu);

function flyMenu() {
  menuOpen = true;
  menu.style.display = "block";
  console.log("animate");
}

let wrongInput = document.getElementById("wrong-input");
let rightInput = document.getElementById("right-input");
let errorMessage = document.getElementById("error-message");

wrongInput.placeholder = wrongColor;
rightInput.placeholder = rightColor;

function loadNewGame() {
  if (colorsAreValid([wrongInput.value, rightInput.value])) {
    window.location.href =
      "./index.html?wrong=" +
      wrongInput.value.substring(1) +
      "&right=" +
      rightInput.value.substring(1);
  } else {
    invalidColors();
  }
}

function colorsAreValid(colors) {
  let valid = true;
  let colorRegex = /#[abcdefABCDEF0123456789]{6}/;
  colors.forEach((color) => {
    if (!colorRegex.test(color)) {
      valid = false;
    }
  });

  return valid;
}

function invalidColors() {
  errorMessage.style.color = "#ff0000";
  errorMessage.innerText = "1 or more of the colors you inputed are invalid.";
}

function cancelMenu() {
  menuOpen = false;
  menu.style.display = "none";
}
