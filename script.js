const operationField = document.querySelector("#operation");
const inputField = document.querySelector("#user-input");
const buttons = document.querySelectorAll("button");

let operator = "";
let firstNumber = "";
let secondNumber = "";
let userInput = "";

const operators = {
  "/": {
    operation: (a, b) => a / b,
  },
  x: {
    operation: (a, b) => a * b,
  },
  "-": {
    operation: (a, b) => a - b,
  },
  "+": {
    operation: (a, b) => a + b,
  },
};

function reset() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  userInput = "";
}

const functions = {
  "=": () => {
    if (!firstNumber) return;
    if (!operator) return;
    if (!userInput) return;

    if (secondNumber) {
      firstNumber = userInput;
    } else {
      secondNumber = userInput;
    }
    userInput = operators[operator]
      .operation(Number(firstNumber), Number(secondNumber))
      .toString();
  },
  clear: reset,
};

function display() {
  const operatorText = operator ? operators[operator].text : "";
  operationField.textContent = `${firstNumber ?? ""}`;
  operationField.textContent += ` ${operatorText} `;
  operationField.textContent += `${secondNumber ?? ""}`;
  operationField.textContent += `${secondNumber ? "=" : ""}`;
  inputField.textContent = userInput;
}

function buttonClick(type, value, text) {
  switch (type) {
    case "digit":
      if (secondNumber) reset();
      userInput += text;
      break;
    case "operator":
      if (!firstNumber) {
        if (!userInput) break;
        firstNumber = userInput;
      }
      operator = value;
      userInput = "";
      break;
    case "function":
      functions[value]();
      break;
  }
  display();
}

buttons.forEach((button) => {
  if (button.dataset.type === "operator") {
    operators[button.value].text = button.textContent;
  }
  button.addEventListener("click", (e) => {
    const thisButton = e.target;
    buttonClick(
      thisButton.dataset.type,
      thisButton.value,
      thisButton.textContent
    );
  });
});
