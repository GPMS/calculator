const operationField = document.querySelector("#operation");
const inputField = document.querySelector("#user-input");
const buttons = document.querySelectorAll("button");

let operator = "";
let firstNumber = "";
let userInput = "";

const operators = {
  "/": {},
  x: {},
  "-": {},
  "+": {},
};

function display() {
  const operatorText = operator ? operators[operator].text : "";
  operationField.textContent = `${firstNumber ?? ""}`;
  operationField.textContent += ` ${operatorText} `;
  inputField.textContent = userInput;
}

function buttonClick(type, value, text) {
  switch (type) {
    case "digit":
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
