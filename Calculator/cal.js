const liveInputDisplay = document.querySelector(".live-input-display");
const answerDisplay = document.querySelector(".answer-display");
const clearInputBtn = document.getElementById("clear-input-btn");
const calcResetBtn = document.getElementById("reset-calc-btn");
const deleteBtn = document.getElementById("delete-btn");
const divideBtn = document.getElementById("divide-btn");
const multiplyBtn = document.getElementById("multiply-btn");
const subtractBtn = document.getElementById("subtract-btn");
const addBtn = document.getElementById("add-btn");
const negationBtn = document.getElementById("negation-btn");
const decimalBtn = document.getElementById("decimal-btn");
const equalsBtn = document.getElementById("equals-btn");
const btn0 = document.getElementById("btn-0");
const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");

const greetingElement = document.querySelector(".greeting");

let currentValue = "";
let enteredValue = "";
let prevCalcValue;
let prevOperator;
let liveInput = "";
let prevOperatorDisplayed; // To calculate final answer when equalsBtn ShowFinalAnswerHandler function is triggered


const numButtons = [
  btn0,
  btn1,
  btn2,
  btn3,
  btn4,
  btn5,
  btn6,
  btn7,
  btn8,
  btn9,
  decimalBtn,
  negationBtn,
];

const operatorbuttons = [
  addBtn,
  multiplyBtn,
  divideBtn,
  subtractBtn,
];

const date = new Date();
const hour = date.getHours();

if (hour < 12) {
  greetingElement.textContent = "Hey, Good Morning"
} else if (hour < 18) {
  greetingElement.textContent = "Hey, Good Afternoon"
} else {
  greetingElement.textContent = "Hey, Good Evening"
}


const clearInputHandler = function () {
  answerDisplay.value = "";
  currentValue = "";
};

const performCalc = function () {
  if (prevOperator === "+") {
    currentValue = prevCalcValue + currentValue;
  } else if (prevOperator === "-") {
    currentValue = prevCalcValue - currentValue;
  } else if (prevOperator === "/") {
    currentValue = prevCalcValue / currentValue;
  } else {
    currentValue = prevCalcValue * currentValue;
  }
};

const performCalcHandler = function () {
  console.log("triggered");
  let liveInputCurrentValue = currentValue;
  // operatorBtn = this;
  console.log(this);
  if (!prevOperator) {
    prevOperator = this.value;
  }

  if (!prevCalcValue && prevCalcValue !== 0) {
    console.log("here1");
    prevOperator = this.value;
    prevCalcValue = parseFloat(currentValue);
    showLiveInput(prevOperator, liveInputCurrentValue);
    currentValue = "";
    return;
  } else {
    console.log("here2");
    if (currentValue === "" && this.value !== prevOperator) {
      prevOperator = this.value;
      showLiveInput(prevOperator, liveInputCurrentValue);
      return;
    } else if (currentValue === "") {
      return;
    }
    currentValue = parseFloat(currentValue);
    liveInputCurrentValue = currentValue;
    performCalc();
  }

  prevOperator = this.value;
  prevCalcValue = currentValue;
  answerDisplay.value = prevCalcValue;
  console.log("here3");
  showLiveInput(prevOperator, liveInputCurrentValue);
  currentValue = "";
};

const displayInput = (inputValue) => {
  const enteredValue = inputValue;
  currentValue = currentValue.toString();
  console.log(enteredValue);

  if (currentValue.includes(".") && enteredValue === ".") {
    return;
  } else if (enteredValue === ".") {
    currentValue =
      currentValue.length > 0
        ? `${currentValue}${enteredValue}`
        : `0${currentValue}${enteredValue}`;
  } else if (enteredValue === "+-") {
    console.log("in-here")
    if (!currentValue) {
      currentValue = prevCalcValue.toString();
    }
    currentValue = 
    currentValue.includes("-")
      ? currentValue.replace("-", "")
      : `-${currentValue}`;

  } else {
    currentValue = `${currentValue}${enteredValue}`;
  }

  console.log(currentValue);
  answerDisplay.value = currentValue;
};

const numButtonHandler = function (btn) {
  console.log(btn);
  enteredValue = this.value;
  displayInput(enteredValue);
};

const showLiveInput = function (operator, liveInputCurrentValue) {
  console.log(liveInputDisplay.value);

  let currentDisplay = liveInputDisplay.value;
  if (!prevCalcValue && prevCalcValue !== 0) {
    return;
  }
  if (
    currentValue === "" &&
    operator !==
      currentDisplay.slice(currentDisplay.length - 1, currentDisplay.length)
  ) {
    console.log("inhere");
    liveInput = liveInput.slice(0, liveInput.length - 1) + operator;
    liveInputDisplay.value = liveInput;
  } else {
    liveInput = `${liveInput} ${liveInputCurrentValue} ${operator}`;
    liveInputDisplay.value = liveInput;
    prevOperatorDisplayed = operator;
  }
};

const showFinalAnswerHandler = function () {
  // only shows final answer when equals sign is triggered
  currentValue = answerDisplay.value;
  performCalcHandler.call(prevOperatorDisplayed);
  liveInputDisplay.value = ""; // Stopped here
  liveInput = "";
  prevCalcValue = "";
  prevOperator = "";
  currentValue = "";
};

const calcResetHandler = function() {
  liveInputDisplay.value = ""; // Stopped here
  liveInput = "";
  prevCalcValue = "";
  prevOperator = "";
  currentValue = "";
  answerDisplay.value = "";
}

const deleteHandler = function() {
  currentValue = currentValue.slice(0, currentValue.length - 1)
  answerDisplay.value = currentValue;
}

numButtons.forEach((btn, index, numButtons) => {
  btn.addEventListener("click", numButtonHandler.bind(btn, btn));
});

operatorbuttons.forEach((btn, index, operatorbuttons) => {
  btn.addEventListener("click", performCalcHandler); // Removed .bind(btn)
});

clearInputBtn.addEventListener("click", clearInputHandler);

equalsBtn.addEventListener("click", showFinalAnswerHandler);
calcResetBtn.addEventListener("click", calcResetHandler)
deleteBtn.addEventListener("click", deleteHandler)