let typedSequence = [];
let currentLetter;
let currentLetterIndex = 0;
let typedLength = 0;
let distances;

let completeTextElem;
let correctElem;
let lineElem;
let incorrectElem;
let notTypedYetElem;

let feetElem;
let percentElem;

let backspaceCache = [];

let validCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  ",",
  ".",
  "/",
  ";",
  "'",
  "[",
  "]",
  " "
];

window.onload = function () {
  distances = calcDistances(letters);
  console.log(distances);

  completeTextElem = document.getElementById("completetext");
  correctElem = document.getElementById("correct");
  lineElem = document.getElementById("line");
  incorrectElem = document.getElementById("incorrect");
  notTypedYetElem = document.getElementById("nottypedyet");

  notTypedYetElem.innerHTML = correctSequence;

  feetElem = document.getElementById("feet");
  percentElem = document.getElementById("percent");

  currentLetter = correctSequence[currentLetterIndex];

  window.addEventListener("keydown", type);
};

function type(e) {
  let character = e.key.toString();
  console.log("char '" + character + "'");
  //document.getElementById("p").innerHTML += character;
  if (validCharacters.includes(character)) {
    if (character == currentLetter && incorrectElem.innerHTML == "") {
      // process the character
      typedSequence.push(character);
      currentLetterIndex++;
      currentLetter = correctSequence[currentLetterIndex];

      // display for the character
      if (incorrectElem.innerHTML == "") {
        correctElem.innerHTML += character;
        notTypedYetElem.innerHTML = notTypedYetElem.innerHTML.substring(1);
      }

      // calc the distance for the character
      console.log(typedSequence, currentLetter, currentLetterIndex);
      if (typedSequence.length > 1) {
        let token =
          typedSequence[typedSequence.length - 2] +
          typedSequence[typedSequence.length - 1];
        let distance = distances[token];
        typedLength += distance;
        console.log(character, token, distance, typedLength);
      }
    } else if (character != currentLetter || incorrectElem.innerHTML != "") {
      incorrectElem.innerHTML += character;

      backspaceCache.push(notTypedYetElem.innerHTML.charAt(0));
      let ntyTemp = notTypedYetElem.innerHTML.substring(1);
      notTypedYetElem.innerHTML = ntyTemp;
    }
  } else if (
    character.toLowerCase() == "backspace" &&
    incorrectElem.innerHTML != ""
  ) {
    console.log("backback");
    incorrectElem.innerHTML = incorrectElem.innerHTML.slice(0, -1);
    notTypedYetElem.innerHTML =
      backspaceCache[backspaceCache.length - 1] + notTypedYetElem.innerHTML;
    backspaceCache.pop();
  }

  //update dom
  let distanceInFeet = typedLength / 12; // inches -> feet
  distanceInFeet = Math.round(distanceInFeet * 100) / 100; // 2 decimals
  feetElem.innerHTML = distanceInFeet;

  let percentage = (distanceInFeet / 30) * 100;
  percentage = Math.round(percentage * 100) / 100; // 2 decimals
  if (percentage > 100) {
    percentage = "100.00";
  }
  percentElem.innerHTML = percentage;

  // completion
  if (notTypedYetElem.innerHTML == "" && incorrectElem.innerHTML == "") {
    console.log("empty");
    grantReward();
  }
}

// make this function less readable lol
function grantReward() {
  document.getElementById("reward-footer").innerHTML =
    "YOU DID IT! Click <a href='./reward.html?rickroll=true'>Here</a> for your reward";
  document
    .getElementById("reward-link")
    .setAttribute("href", "./reward.html?rickroll=true");
}

// preventing page from automatically scrolling down on spacebar press
window.onkeydown = function (ev) {
  return ev.keyCode !== 32 && ev.key !== " "; // copied straight from stackoverflow lol
};

function devMode() {
  notTypedYetElem.innerHTML = correctSequence[0];
}
