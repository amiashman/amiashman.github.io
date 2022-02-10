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
let gellerBox = document.getElementById("geller-mode-checkbox");
let themeSelect = document.getElementById("theme-selector-select");

wrongInput.placeholder = wrongColor;
rightInput.placeholder = rightColor;
gellerBox.checked = gellerMode;

function loadNewGame() {
  console.log("theme:", themeSelect.value);
  console.log("wrong:", wrongInput.value);
  console.log("right:", rightInput.value);
  let menuSelections = [];
  let error = false;

  if (themeSelect.value != "none") {
    let theme = themes[parseInt(themeSelect.value, 10)];
    menuSelections.push("theme=" + themeSelect.value);
    if (wrongInput.value == "" && rightInput.value == "") {
      menuSelections.push("wrong=" + theme[0]);
      menuSelections.push("right=" + theme[1]);
    }
    if (
      wrongInput.value != "" &&
      colorIsValid(wrongInput.value) &&
      rightInput.value == ""
    ) {
      menuSelections.push("wrong=" + wrongInput.value.substring(1));
      menuSelections.push("right=" + theme[1]);
    }
    if (
      rightInput.value != "" &&
      colorIsValid(rightInput.value) &&
      wrongInput.value == ""
    ) {
      menuSelections.push("wrong=" + theme[0]);
      menuSelections.push("right=" + rightInput.value.substring(1));
    }
  } else if (themeSelect.value == "none") {
    if (
      wrongInput.value != "" &&
      colorIsValid(wrongInput.value) &&
      rightInput.value == ""
    ) {
      menuSelections.push("wrong=" + wrongInput.value.substring(1));
      menuSelections.push("right=" + rightColor.substring(1));
    }
    if (
      rightInput.value != "" &&
      colorIsValid(rightInput.value) &&
      wrongInput.value == ""
    ) {
      menuSelections.push("wrong=" + wrongColor.substring(1));
      menuSelections.push("right=" + rightInput.value.substring(1));
    }
  }

  if (gellerBox.checked) {
    menuSelections.push("geller=true");
  }

  if (!colorIsValid(wrongInput.value) || !colorIsValid(rightInput.value)) {
    error = true;
    invalidColors();
  }

  if (wrongInput.value == rightInput.value) {
    if (themeSelect.value == "none") {
      error = true;
      sameColor();
    }
  }

  if (!error) {
    let search = "?";
    menuSelections.forEach((s) => {
      search += s + "&";
    });
    window.location.search = search.slice(0, -1);
  }
  console.log(menuSelections);
}

function colorIsValid(color) {
  if (color == "") return true;
  let colorRegex = /#[abcdefABCDEF0123456789]{6}/;
  if (!colorRegex.test(color)) {
    return false;
  }

  return true;
}

function invalidColors() {
  errorMessage.innerText = "1 or more of the colors you inputed are invalid.";
}

function sameColor() {
  errorMessage.innerText = "The right and wrong colors must be different.";
}

function cancelMenu() {
  menuOpen = false;
  menu.style.display = "none";
}
