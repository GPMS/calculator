const inputField = document.querySelector("#user-input");
const buttons = document.querySelectorAll("button");

let userInput = "";

function display() {
  inputField.textContent = userInput;
}

function buttonClick(type, value, text) {
  switch (type) {
    case "digit":
      userInput += text;
      break;
    case "operator":
      break;
    case "function":
      break;
  }
  display();
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const thisButton = e.target;
    buttonClick(
      thisButton.dataset.type,
      thisButton.value,
      thisButton.textContent
    );
  });
});
