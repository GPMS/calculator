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

function operate() {
  if (!firstNumber && !operator && !userInput) return;

  if (secondNumber) {
    firstNumber = userInput;
  } else {
    secondNumber = userInput;
  }
  userInput = operators[operator]
    .operation(parseFloat(firstNumber), parseFloat(secondNumber))
    .toString();
}

function removeLastSymbol() {
  if (userInput) {
    if (secondNumber) {
      firstNumber = null;
      secondNumber = null;
      operator = null;
    }
    userInput = userInput.substring(0, userInput.length - 1);
  } else if (operator) {
    operator = null;
    userInput = firstNumber;
    firstNumber = "";
  }
}

const functions = {
  "=": operate,
  clear: reset,
  delete: removeLastSymbol,
  ".": () => {
    if (!userInput) {
      userInput += "0.";
    } else if (userInput.search(/\./) != -1) {
      return;
    } else {
      if (secondNumber) {
        reset();
        userInput += 0;
      }
      userInput += ".";
    }
  },
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
        if (!userInput) {
          break;
        } else {
          firstNumber = userInput;
        }
      } else if (userInput) {
        if (secondNumber) {
          firstNumber = userInput;
          secondNumber = "";
        } else {
          operate();
          firstNumber = userInput;
          secondNumber = "";
        }
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
