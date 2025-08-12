const display = document.getElementById("display");
const calculator = document.getElementById("calculator");

//const heading = (onclick = function () {
//alert("Calculator by Aimon");
//});

function appendValue(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}
function backspace() {
  display.value = display.value.slice(0, -1);
}
function calculate() {
  const expr = display.value;
  try {
    const result = evaluateExpression(expr);
    display.value = result;
  } catch (e) {
    display.value = "Error";
  }
}

function evaluateExpression(expr) {
  expr = expr.replace(/\s+/g, "");

  const output = [];
  const operators = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  let numberBuffer = "";

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (/\d|\./.test(char)) {
      numberBuffer += char;
    } else if (char in precedence) {
      if (numberBuffer) {
        output.push(parseFloat(numberBuffer));
        numberBuffer = "";
      }
      while (
        operators.length &&
        precedence[char] <= precedence[operators[operators.length - 1]]
      ) {
        output.push(operators.pop());
      }
      operators.push(char);
    }
  }
  if (numberBuffer) output.push(parseFloat(numberBuffer));
  while (operators.length) output.push(operators.pop());

  const stack = [];
  for (const token of output) {
    if (typeof token === "number") {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "+":
          stack.push(a + b); 
        case "-":
          stack.push(a - b);
          break;
        case "*":
          stack.push(a * b);
          break;
        case "/":
          stack.push(a / b);
          break;
      }
    }
  }
  return stack[0];
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  calculator.classList.toggle("dark");
}
