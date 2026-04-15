 const previousDisplayElem = document.getElementById('previousDisplay');
  const currentDisplayElem = document.getElementById('currentDisplay');
  const clearBtn = document.getElementById('clearBtn');
  const deleteBtn = document.getElementById('deleteBtn');
  const equalBtn = document.getElementById('equalBtn');
  const numberButtons = document.querySelectorAll('[data-number]');
  const operatorButtons = document.querySelectorAll('[data-operator]');

  let currentOperand = '0';
  let previousOperand = '';     
  let operation = null;          
  let waitingForNewOperand = false; 
  let shouldResetDisplay = false;    
  function formatNumber(number) {
    if (number === null || number === undefined) return '0';
    let num = typeof number === 'string' ? parseFloat(number) : number;
    if (isNaN(num)) return '0';
    
    if (Number.isInteger(num)) {
      return num.toString();
    }
    let decimalPart = (num.toString().split('.')[1] || '').length;
    if (decimalPart > 8) {
      return num.toFixed(8).replace(/\.?0+$/, '');
    }
    return num.toString();
  }

  function updateDisplay() {
    if (currentOperand === '') {
      currentDisplayElem.innerText = '0';
    } else {
      let displayValue = currentOperand;
      if (displayValue.length > 18 && !displayValue.includes('e')) {
        displayValue = parseFloat(displayValue).toExponential(10);
      }
      currentDisplayElem.innerText = displayValue;
    }

    if (operation && previousOperand !== '') {
      let opSymbol = '';
      if (operation === '+') opSymbol = '+';
      else if (operation === '-') opSymbol = '−';
      else if (operation === '*') opSymbol = '×';
      else if (operation === '/') opSymbol = '÷';
      previousDisplayElem.innerText = `${previousOperand} ${opSymbol}`;
    } else if (previousOperand !== '' && !operation) {
      previousDisplayElem.innerText = previousOperand;
    } else {
      previousDisplayElem.innerText = '';
    }
  }

  function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    waitingForNewOperand = false;
    shouldResetDisplay = false;
    updateDisplay();
  }

  function deleteLast() {
    if (shouldResetDisplay) {
      clearAll();
      return;
    }
    if (waitingForNewOperand && currentOperand === '0') return;
    
    if (currentOperand.length === 1 || (currentOperand === '0' && !waitingForNewOperand)) {
      currentOperand = '0';
    } else {
      let newOperand = currentOperand.slice(0, -1);
      if (newOperand === '' || newOperand === '-') {
        currentOperand = '0';
      } else {
        currentOperand = newOperand;
      }
    }
    waitingForNewOperand = false;
    shouldResetDisplay = false;
    updateDisplay();
  }

  function appendNumber(number) {
    if (shouldResetDisplay) {
      currentOperand = '0';
      shouldResetDisplay = false;
      waitingForNewOperand = false;
    }
    
    if (waitingForNewOperand) {
      currentOperand = '0';
      waitingForNewOperand = false;
    }
    
    if (number === '.') {
      if (currentOperand.includes('.')) return;
      if (currentOperand === '' || currentOperand === '0') {
        currentOperand = '0.';
        updateDisplay();
        return;
      }
    }
    
    if (currentOperand.replace(/\./g, '').length >= 16 && number !== '.') {
      return;
    }
    
    if (currentOperand === '0' && number !== '.') {
      currentOperand = number;
    } else {
      currentOperand += number;
    }
    updateDisplay();
  }

  function chooseOperation(op) {
    if (!waitingForNewOperand && previousOperand !== '' && operation !== null) {
      compute();
    }
    
    if (currentOperand === '' || currentOperand === '0' && !waitingForNewOperand && operation === null) {
      return;
    }
    
    if (currentOperand !== '') {
      previousOperand = currentOperand;
      operation = op;
      waitingForNewOperand = true;
      shouldResetDisplay = false;
      updateDisplay();
    }
  }

  function compute() {
    if (operation === null || previousOperand === '' || currentOperand === '') return;
    
    let prev = parseFloat(previousOperand);
    let current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    
    let result;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          currentDisplayElem.innerText = 'Erro';
          previousDisplayElem.innerText = '';
          currentOperand = '0';
          previousOperand = '';
          operation = null;
          waitingForNewOperand = false;
          shouldResetDisplay = true;
          updateDisplay();
          return;
        }
        result = prev / current;
        break;
      default:
        return;
    }
    
    if (typeof result === 'number' && !Number.isInteger(result)) {
      result = parseFloat(result.toFixed(10));
    }
    
    let resultString = result.toString();
    if (resultString.length > 18 && !resultString.includes('e')) {
      resultString = result.toExponential(12);
    }
    
    currentOperand = resultString;
    operation = null;
    previousOperand = '';
    waitingForNewOperand = true;
    shouldResetDisplay = true;   // após '=' o próximo número reinicia o display
    updateDisplay();
  }

  function evaluateEqual() {
    if (operation === null || previousOperand === '' || waitingForNewOperand) {
      if (previousOperand === '' && currentOperand !== '') {
        shouldResetDisplay = true;
        updateDisplay();
      }
      return;
    }
    compute();
  }

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      const number = button.getAttribute('data-number');
      if (currentDisplayElem.innerText === 'Erro') {
        clearAll();
      }
      appendNumber(number);
    });
  });
  
  operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (currentDisplayElem.innerText === 'Erro') {
        clearAll();
      }
      const op = button.getAttribute('data-operator');
      chooseOperation(op);
    });
  });
  
  equalBtn.addEventListener('click', () => {
    if (currentDisplayElem.innerText === 'Erro') {
      clearAll();
      return;
    }
    evaluateEqual();
  });
  
  clearBtn.addEventListener('click', () => {
    clearAll();
  });
  
  deleteBtn.addEventListener('click', () => {
    if (currentDisplayElem.innerText === 'Erro') {
      clearAll();
      return;
    }
    deleteLast();
  });
  
  window.addEventListener('keydown', (e) => {
    const key = e.key;
    const controlKeys = ['Enter', 'Escape', 'Backspace', 'Delete', '+', '-', '*', '/', '.', '0','1','2','3','4','5','6','7','8','9'];
    if (controlKeys.includes(key) || (key >= '0' && key <= '9') || key === '.') {
      e.preventDefault();
    }
    
    if (key >= '0' && key <= '9') {
      appendNumber(key);
    } else if (key === '.') {
      appendNumber('.');
    } else if (key === '+' || key === '-') {
      chooseOperation(key);
    } else if (key === '*') {
      chooseOperation('*');
    } else if (key === '/') {
      chooseOperation('/');
    } else if (key === 'Enter' || key === '=') {
      evaluateEqual();
    } else if (key === 'Backspace') {
      deleteLast();
    } else if (key === 'Escape' || key === 'Delete') {
      clearAll();
    }
  });
  
  clearAll();