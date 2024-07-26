// Getting the input field element where the calculator's display value will be shown
let inputField = document.getElementById("input-field");
// Getting all button elements with the class 'button'
let buttons = document.querySelectorAll(".button");

let calculator = {
  displayValue: "0",// value currently displayed on the calculator
  firstOperand: null,// The first operand for a calculation
  waitingForSecondOperand: false,
  operator: null,// The operator for the current calculation
};

function updateDisplay() {
  inputField.value = calculator.displayValue;
}
// Handle input when a number button is pressed
function handleNumberInput(button) {
  const number = button.id;// Get the number from the button's ID
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = number;// Set display value to the number if waiting for second operand
    calculator.waitingForSecondOperand = false;// Reset the flag
  } else {
    calculator.displayValue = calculator.displayValue === "0" ? number : calculator.displayValue + number;
  }
  updateDisplay();//update the display with the new value
}

function handleOperatorInput(button) {
  const operator = button.id;

  if (calculator.firstOperand === null && !calculator.waitingForSecondOperand) {
    calculator.firstOperand = parseFloat(calculator.displayValue);
  } else if (calculator.operator) {
    const result = performCalculation(calculator.firstOperand, parseFloat(calculator.displayValue), calculator.operator);
    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = operator;
  updateDisplay();
}
// Performing the calculation based on the operator
function performCalculation(firstOperand, secondOperand, operator) {
  switch (operator) {
    case "add":
      return firstOperand + secondOperand;
    case "subtract":
      return firstOperand - secondOperand;
    case "multiply":
      return firstOperand * secondOperand;
    case "divide":
      return firstOperand / secondOperand;
    default:
      return secondOperand;// Return the second operand if no valid operator is found
  }
}
// Handle input when the equals button is pressed
function handleEqualsInput() {
  if (calculator.firstOperand === null || calculator.operator === null) return;
  
// Performs the calculation
  const result = performCalculation(calculator.firstOperand, parseFloat(calculator.displayValue), calculator.operator);
  calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  updateDisplay();
}

function handleClearInput() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.operator = null;
  calculator.waitingForSecondOperand = false;
  updateDisplay();
}
// Handle input when the delete button is pressed
function handleDeleteInput() {
  calculator.displayValue = calculator.displayValue.length > 1 ? calculator.displayValue.slice(0, -1) : "0";
  updateDisplay();
}
// Handle input when the percent button is pressed
function handlePercentInput() {
  const currentValue = parseFloat(calculator.displayValue);
  calculator.displayValue = (currentValue / 100).toString();
  updateDisplay();
}
// Handle input when the decimal button is pressed
function handleDecimalInput() {
  if (!calculator.displayValue.includes('.')) {
    calculator.displayValue += '.';
  }
  updateDisplay();
}

// event listeners for buttons
buttons.forEach((button) => {
  if (button.id === "clear") {
    button.addEventListener("click", handleClearInput);
  } else if (button.id === "delete") {
    button.addEventListener("click", handleDeleteInput);
  } else if (button.id === "percent") {
    button.addEventListener("click", handlePercentInput);
  } else if (button.id === "equals") {
    button.addEventListener("click", handleEqualsInput);
  } else if (button.id === "decimal") {
    button.addEventListener("click", handleDecimalInput);
  } else if (["add", "subtract", "multiply", "divide"].includes(button.id)) {
    button.addEventListener("click", () => handleOperatorInput(button));
  } else {
    button.addEventListener("click", () => handleNumberInput(button));
  }
});

updateDisplay(); 
