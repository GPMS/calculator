const operationField = document.querySelector("#operation");
const inputField = document.querySelector("#user-input");
const buttons = document.querySelectorAll("button");
const deleteBtn = document.querySelector('button[value="delete"]');

let operator = "";
let firstNumber = "";
let secondNumber = "";
let userInput = "";
const errorString = "try again";

const operators = {
  "/": {
    operation: (a, b) => {
      return b === 0 ? errorString : a / b;
    },
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
  firstNumber = "";
  secondNumber = "";
  operator = "";
  userInput = "";
  deleteBtn.disabled = true;
}

function operate() {
  if (!firstNumber || !operator || !userInput) return;

  inputField.classList.add("moveUp");
  inputField.addEventListener(
    "animationend",
    (e) => {
      inputField.classList.remove("moveUp");
      if (secondNumber) {
        firstNumber = userInput;
      } else {
        secondNumber = userInput;
      }
      userInput = operators[operator]
        .operation(parseFloat(firstNumber), parseFloat(secondNumber))
        .toString();
      display();
    },
    { once: true }
  );
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
  if (!firstNumber && !userInput) deleteBtn.disabled = true;
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
  operationField.textContent = "";
  inputField.textContent = "";

  const operatorText = operator ? operators[operator].text : "";
  if (!secondNumber) {
    inputField.textContent =
      `${firstNumber ?? ""}` + ` ${operatorText} ` + userInput;
  } else {
    operationField.textContent += `${firstNumber} ${operatorText} ${secondNumber} =`;
    inputField.textContent = userInput;
  }
}

function addDigit(digit) {
  if (secondNumber) reset();
  userInput += digit;
  deleteBtn.disabled = false;
}

function addOperator(op) {
  if (userInput === errorString) return;
  if (!firstNumber) {
    if (!userInput) {
      return;
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
  operator = op;
  userInput = "";
}

function buttonClick(type, value, text) {
  switch (type) {
    case "digit":
      addDigit(value);
      break;
    case "operator":
      addOperator(value);
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
    if (thisButton.parentNode.classList.contains("btn-grid")) {
      thisButton.classList.add("changeSize");
      thisButton.addEventListener(
        "animationend",
        (e) => {
          e.target.classList.remove("changeSize");
        },
        { once: true }
      );
    }
    buttonClick(
      thisButton.dataset.type,
      thisButton.value,
      thisButton.textContent
    );
  });
});
