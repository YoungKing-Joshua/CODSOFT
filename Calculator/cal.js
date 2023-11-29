let currentInput = '0';
let currentOperation = null;
let firstOperand = null;

function updateDisplay() {
    document.getElementById('display').innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function setOperation(operation) {
    if (currentOperation !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    currentOperation = operation;
    currentInput = '0';
}

function calculate() {
    if (currentOperation === null || firstOperand === null) {
        return;
    }
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (currentOperation) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperation = null;
    firstOperand = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    currentOperation = null;
    firstOperand = null;
    updateDisplay();
}

// Initial display update
updateDisplay();
