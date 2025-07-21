// 计算器工具

class Calculator {
    constructor() {
        this.display = '';
        this.previousValue = '';
        this.operation = '';
        this.waitingForOperand = false;
        this.history = [];
        this.init();
    }

    init() {
        console.log('计算器工具初始化');
    }

    // 创建计算器界面
    createCalculatorInterface() {
        return `
            <div class="calculator-container">
                <div class="calculator">
                    <div class="calculator-header">
                        <h4>🔢 数学计算器</h4>
                        <button class="close-tool" onclick="closeTool()">×</button>
                    </div>
                    
                    <div class="calculator-display">
                        <div class="display-history" id="calcHistory"></div>
                        <div class="display-main" id="calcDisplay">0</div>
                    </div>
                    
                    <div class="calculator-buttons">
                        <div class="button-row">
                            <button class="calc-btn function" onclick="calculator.clear()">C</button>
                            <button class="calc-btn function" onclick="calculator.clearEntry()">CE</button>
                            <button class="calc-btn function" onclick="calculator.backspace()">⌫</button>
                            <button class="calc-btn operator" onclick="calculator.inputOperator('÷')">÷</button>
                        </div>
                        
                        <div class="button-row">
                            <button class="calc-btn number" onclick="calculator.inputNumber('7')">7</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('8')">8</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('9')">9</button>
                            <button class="calc-btn operator" onclick="calculator.inputOperator('×')">×</button>
                        </div>
                        
                        <div class="button-row">
                            <button class="calc-btn number" onclick="calculator.inputNumber('4')">4</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('5')">5</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('6')">6</button>
                            <button class="calc-btn operator" onclick="calculator.inputOperator('-')">-</button>
                        </div>
                        
                        <div class="button-row">
                            <button class="calc-btn number" onclick="calculator.inputNumber('1')">1</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('2')">2</button>
                            <button class="calc-btn number" onclick="calculator.inputNumber('3')">3</button>
                            <button class="calc-btn operator" onclick="calculator.inputOperator('+')">+</button>
                        </div>
                        
                        <div class="button-row">
                            <button class="calc-btn number zero" onclick="calculator.inputNumber('0')">0</button>
                            <button class="calc-btn number" onclick="calculator.inputDecimal()">.</button>
                            <button class="calc-btn equals" onclick="calculator.calculate()">=</button>
                        </div>
                    </div>
                    
                    <div class="calculator-features">
                        <div class="feature-buttons">
                            <button class="feature-btn" onclick="calculator.showHistory()">历史记录</button>
                            <button class="feature-btn" onclick="calculator.showHelp()">使用帮助</button>
                        </div>
                    </div>
                </div>
                
                <div id="calcHistoryPanel" class="history-panel" style="display:none;">
                    <div class="history-header">
                        <h5>计算历史</h5>
                        <button onclick="calculator.hideHistory()">×</button>
                    </div>
                    <div class="history-content" id="historyContent">
                        <p class="no-history">暂无计算记录</p>
                    </div>
                    <div class="history-actions">
                        <button onclick="calculator.clearHistory()">清空历史</button>
                    </div>
                </div>
            </div>
        `;
    }

    // 输入数字
    inputNumber(num) {
        if (this.waitingForOperand) {
            this.display = num;
            this.waitingForOperand = false;
        } else {
            this.display = this.display === '0' ? num : this.display + num;
        }
        this.updateDisplay();
    }

    // 输入小数点
    inputDecimal() {
        if (this.waitingForOperand) {
            this.display = '0.';
            this.waitingForOperand = false;
        } else if (this.display.indexOf('.') === -1) {
            this.display += '.';
        }
        this.updateDisplay();
    }

    // 输入运算符
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.display);

        if (this.previousValue === '') {
            this.previousValue = inputValue;
        } else if (this.operation) {
            const currentValue = this.previousValue || 0;
            const newValue = this.performCalculation(currentValue, inputValue, this.operation);

            this.display = String(newValue);
            this.previousValue = newValue;
            this.updateDisplay();
        }

        this.waitingForOperand = true;
        this.operation = nextOperator;
        this.updateHistory(`${this.previousValue} ${nextOperator}`);
    }

    // 执行计算
    calculate() {
        const inputValue = parseFloat(this.display);

        if (this.previousValue !== '' && this.operation) {
            const newValue = this.performCalculation(this.previousValue, inputValue, this.operation);
            
            // 添加到历史记录
            const calculation = `${this.previousValue} ${this.operation} ${inputValue} = ${newValue}`;
            this.addToHistory(calculation);
            
            this.display = String(newValue);
            this.previousValue = '';
            this.operation = '';
            this.waitingForOperand = true;
            this.updateDisplay();
            this.updateHistory('');
            
            // 语音播报结果
            if (learningSystem && learningSystem.voiceEnabled) {
                learningSystem.speak(`计算结果是 ${newValue}`);
            }
        }
    }

    // 执行具体运算
    performCalculation(firstValue, secondValue, operation) {
        switch (operation) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '×':
                return firstValue * secondValue;
            case '÷':
                if (secondValue === 0) {
                    alert('不能除以零！');
                    return firstValue;
                }
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }

    // 清空所有
    clear() {
        this.display = '0';
        this.previousValue = '';
        this.operation = '';
        this.waitingForOperand = false;
        this.updateDisplay();
        this.updateHistory('');
    }

    // 清空当前输入
    clearEntry() {
        this.display = '0';
        this.updateDisplay();
    }

    // 退格
    backspace() {
        if (this.display.length > 1) {
            this.display = this.display.slice(0, -1);
        } else {
            this.display = '0';
        }
        this.updateDisplay();
    }

    // 更新显示
    updateDisplay() {
        const displayElement = document.getElementById('calcDisplay');
        if (displayElement) {
            displayElement.textContent = this.display;
        }
    }

    // 更新历史显示
    updateHistory(text) {
        const historyElement = document.getElementById('calcHistory');
        if (historyElement) {
            historyElement.textContent = text;
        }
    }

    // 添加到历史记录
    addToHistory(calculation) {
        this.history.unshift({
            calculation: calculation,
            timestamp: new Date().toLocaleTimeString()
        });
        
        // 只保留最近20条记录
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }
        
        this.saveHistory();
    }

    // 显示历史记录
    showHistory() {
        const panel = document.getElementById('calcHistoryPanel');
        const content = document.getElementById('historyContent');
        
        if (this.history.length === 0) {
            content.innerHTML = '<p class="no-history">暂无计算记录</p>';
        } else {
            let historyHTML = '';
            this.history.forEach((item, index) => {
                historyHTML += `
                    <div class="history-item">
                        <div class="history-calculation">${item.calculation}</div>
                        <div class="history-time">${item.timestamp}</div>
                        <button class="history-use" onclick="calculator.useHistoryResult(${index})">使用结果</button>
                    </div>
                `;
            });
            content.innerHTML = historyHTML;
        }
        
        panel.style.display = 'block';
    }

    // 隐藏历史记录
    hideHistory() {
        document.getElementById('calcHistoryPanel').style.display = 'none';
    }

    // 使用历史记录结果
    useHistoryResult(index) {
        const item = this.history[index];
        const result = item.calculation.split(' = ')[1];
        this.display = result;
        this.updateDisplay();
        this.hideHistory();
    }

    // 清空历史记录
    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.hideHistory();
    }

    // 保存历史记录
    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    // 加载历史记录
    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        if (saved) {
            this.history = JSON.parse(saved);
        }
    }

    // 显示帮助
    showHelp() {
        const helpContent = `
            <div class="calculator-help">
                <h4>计算器使用帮助</h4>
                <div class="help-section">
                    <h5>基本操作：</h5>
                    <ul>
                        <li><strong>数字键：</strong>输入数字</li>
                        <li><strong>+、-、×、÷：</strong>基本运算</li>
                        <li><strong>=：</strong>计算结果</li>
                        <li><strong>C：</strong>清空所有</li>
                        <li><strong>CE：</strong>清空当前输入</li>
                        <li><strong>⌫：</strong>退格删除</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h5>特色功能：</h5>
                    <ul>
                        <li><strong>历史记录：</strong>查看和重用之前的计算</li>
                        <li><strong>语音播报：</strong>计算结果语音提示</li>
                        <li><strong>键盘支持：</strong>可使用键盘输入</li>
                    </ul>
                </div>
                <div class="help-section">
                    <h5>学习提示：</h5>
                    <ul>
                        <li>验证手算结果，提高计算准确性</li>
                        <li>观察运算规律，加深数学理解</li>
                        <li>练习心算，培养数感</li>
                    </ul>
                </div>
            </div>
        `;
        
        // 创建帮助模态框
        const helpModal = document.createElement('div');
        helpModal.className = 'help-modal';
        helpModal.innerHTML = `
            <div class="help-modal-content">
                ${helpContent}
                <button class="help-close" onclick="this.parentElement.parentElement.remove()">关闭</button>
            </div>
        `;
        document.body.appendChild(helpModal);
    }

    // 键盘支持
    setupKeyboardSupport() {
        document.addEventListener('keydown', (event) => {
            // 只在计算器打开时响应键盘
            if (!document.querySelector('.calculator-container')) return;
            
            const key = event.key;
            
            if (key >= '0' && key <= '9') {
                this.inputNumber(key);
            } else if (key === '.') {
                this.inputDecimal();
            } else if (key === '+') {
                this.inputOperator('+');
            } else if (key === '-') {
                this.inputOperator('-');
            } else if (key === '*') {
                this.inputOperator('×');
            } else if (key === '/') {
                event.preventDefault();
                this.inputOperator('÷');
            } else if (key === 'Enter' || key === '=') {
                this.calculate();
            } else if (key === 'Escape') {
                this.clear();
            } else if (key === 'Backspace') {
                this.backspace();
            }
        });
    }
}

// 创建计算器实例
const calculator = new Calculator();

// 页面加载完成后设置键盘支持
document.addEventListener('DOMContentLoaded', function() {
    calculator.loadHistory();
    calculator.setupKeyboardSupport();
});