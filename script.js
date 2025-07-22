document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const currentOperandElement = document.getElementById('currentOperand');
    const previousOperandElement = document.getElementById('previousOperand');
    const memoryDisplayElement = document.getElementById('memoryDisplay');
    const themeToggleButton = document.getElementById('themeToggle');

    // Variables de estado
    let currentOperand = '0';
    let previousOperand = '';
    let operation = undefined;
    let memoryValue = 0;
    let resetScreen = false;

    // Funciones de la calculadora
    function updateDisplay() {
        currentOperandElement.textContent = currentOperand;
        previousOperandElement.textContent = previousOperand;
        memoryDisplayElement.textContent = memoryValue !== 0 ? `Memoria: ${memoryValue}` : '';
    }

    function appendNumber(number) {
        if (currentOperand === '0' || resetScreen) {
            currentOperand = number;
            resetScreen = false;
        } else {
            currentOperand += number;
        }
    }

    function appendDecimal() {
        if (resetScreen) {
            currentOperand = '0.';
            resetScreen = false;
            return;
        }

        if (currentOperand.includes('.')) return;
        currentOperand += '.';
    }

    function chooseOperation(selectedOperation) {
        if (currentOperand === '') return;
        if (previousOperand !== '') {
            compute();
        }
        operation = selectedOperation;
        previousOperand = `${currentOperand} ${operation}`;
        currentOperand = '';
    }

    function compute() {
        let computation;
        const prev = parseFloat(previousOperand);
        const current = parseFloat(currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        currentOperand = computation.toString();
        operation = undefined;
        previousOperand = '';
        resetScreen = true;
    }

    function calculatePercentage() {
        if (currentOperand === '') return;
        const current = parseFloat(currentOperand);
        currentOperand = (current / 100).toString();
    }

    function clear() {
        currentOperand = '0';
        previousOperand = '';
        operation = undefined;
    }

    function deleteDigit() {
        if (currentOperand.length === 1 || (currentOperand.length === 2 && currentOperand.startsWith('-'))) {
            currentOperand = '0';
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
    }

    // Funciones de memoria
    function memoryAdd() {
        if (currentOperand === '') return;
        memoryValue += parseFloat(currentOperand);
    }

    function memorySubtract() {
        if (currentOperand === '') return;
        memoryValue -= parseFloat(currentOperand);
    }

    function memoryRecall() {
        currentOperand = memoryValue.toString();
        resetScreen = true;
    }

    function memoryClear() {
        memoryValue = 0;
    }

    // Funcionalidad del tema
    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        themeToggleButton.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
    }

    // Event Listeners para los botones numéricos
    document.getElementById('zero').addEventListener('click', () => {
        appendNumber('0');
        updateDisplay();
    });
    document.getElementById('one').addEventListener('click', () => {
        appendNumber('1');
        updateDisplay();
    });
    document.getElementById('two').addEventListener('click', () => {
        appendNumber('2');
        updateDisplay();
    });
    document.getElementById('three').addEventListener('click', () => {
        appendNumber('3');
        updateDisplay();
    });
    document.getElementById('four').addEventListener('click', () => {
        appendNumber('4');
        updateDisplay();
    });
    document.getElementById('five').addEventListener('click', () => {
        appendNumber('5');
        updateDisplay();
    });
    document.getElementById('six').addEventListener('click', () => {
        appendNumber('6');
        updateDisplay();
    });
    document.getElementById('seven').addEventListener('click', () => {
        appendNumber('7');
        updateDisplay();
    });
    document.getElementById('eight').addEventListener('click', () => {
        appendNumber('8');
        updateDisplay();
    });
    document.getElementById('nine').addEventListener('click', () => {
        appendNumber('9');
        updateDisplay();
    });
    document.getElementById('decimal').addEventListener('click', () => {
        appendDecimal();
        updateDisplay();
    });

    // Event Listeners para las operaciones
    document.getElementById('add').addEventListener('click', () => {
        chooseOperation('+');
        updateDisplay();
    });
    document.getElementById('subtract').addEventListener('click', () => {
        chooseOperation('-');
        updateDisplay();
    });
    document.getElementById('multiply').addEventListener('click', () => {
        chooseOperation('×');
        updateDisplay();
    });
    document.getElementById('divide').addEventListener('click', () => {
        chooseOperation('÷');
        updateDisplay();
    });
    document.getElementById('percentage').addEventListener('click', () => {
        calculatePercentage();
        updateDisplay();
    });
    document.getElementById('equals').addEventListener('click', () => {
        compute();
        updateDisplay();
    });

    // Event Listeners para funciones adicionales
    document.getElementById('clear').addEventListener('click', () => {
        clear();
        updateDisplay();
    });
    document.getElementById('delete').addEventListener('click', () => {
        deleteDigit();
        updateDisplay();
    });

    // Event Listeners para funciones de memoria
    document.getElementById('memoryAdd').addEventListener('click', () => {
        memoryAdd();
        updateDisplay();
    });
    document.getElementById('memoryRecall').addEventListener('click', () => {
        memoryRecall();
        updateDisplay();
    });
    document.getElementById('memoryClear').addEventListener('click', () => {
        memoryClear();
        updateDisplay();
    });

    // Event Listener para el cambio de tema
    themeToggleButton.addEventListener('click', toggleTheme);

    // Manejo de eventos de teclado
    document.addEventListener('keydown', (e) => {
        const key = e.key;

        if ((key >= 0 && key <= 9) || key === '.') {
            if (key === '.' && currentOperand.includes('.')) return;
            appendNumber(key);
            updateDisplay();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            chooseOperation(key === '*' ? '×' : key === '/' ? '÷' : key);
            updateDisplay();
        } else if (key === '%') {
            calculatePercentage();
            updateDisplay();
        } else if (key === 'Enter' || key === '=') {
            compute();
            updateDisplay();
        } else if (key === 'Backspace') {
            deleteDigit();
            updateDisplay();
        } else if (key === 'Escape') {
            clear();
            updateDisplay();
        }
    });

    // Inicialización
    updateDisplay();
})