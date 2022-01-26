let output = document.getElementById("fib-output");
let input = document.getElementById("fib-input");
let fibDisplay = document.getElementById("fibonacci");
let exitFibonacci = document.getElementById("icon");

exitFibonacci.addEventListener("click", flyOutFibonacci);

function findFibNumber() {
  let n = input.value;
  output.innerHTML = fibonacci(n);
}

function fibonacci(n) {
  if (n < 1) return "N/A";
  let count = 0;
  let x = 1;
  let y = 0;
  let z;
  do {
    z = x + y;
    x = y;
    y = z;
    count++;
  } while (count < n);

  return z;
}

function flyInFibonacci() {
  fibDisplay.style.display = "block";
  fibDisplay.style.animation = "fade-fibonacci 1s";
}

function flyOutFibonacci() {
  fibDisplay.style.display = "none";
}
