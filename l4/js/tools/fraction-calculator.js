// 分数计算器工具

class FractionCalculator {
    constructor() {
        this.fraction1 = { numerator: 1, denominator: 2 };
        this.fraction2 = { numerator: 1, denominator: 3 };
        this.operation = '+';
        this.result = null;
        this.showVisualization = true;
        this.history = [];
    }

    // 创建分数计算器界面
    createFractionCalculatorInterface() {
        return `
            <div class="fraction-calculator-container">
                <div class="fraction-calculator-tool">
                    <div class="fraction-calculator-header">
                        <h4>🔢 分数计算器</h4>
                        <button class="close-tool" onclick="fractionCalculator.closeTool()">×</button>
                    </div>
                    
                    <div class="fraction-calculator-main">
                        <div class="calculator-section">
                            <h5>分数输入</h5>
                            <div class="fraction-inputs">
                                <div class="fraction-input">
                                    <label>第一个分数：</label>
                                    <div class="fraction-display">
                                        <input type="number" id="num1" value="1" min="0" onchange="fractionCalculator.updateFraction1()">
                                        <div class="fraction-line"></div>
                                        <input type="number" id="den1" value="2" min="1" onchange="fractionCalculator.updateFraction1()">
                                    </div>
                                </div>
                                
                                <div class="operation-selector">
                                    <select id="operation" onchange="fractionCalculator.setOperation()">
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="×">×</option>
                                        <option value="÷">÷</option>
                                    </select>
                                </div>
                                
                                <div class="fraction-input">
                                    <label>第二个分数：</label>
                                    <div class="fraction-display">
                                        <input type="number" id="num2" value="1" min="0" onchange="fractionCalculator.updateFraction2()">
                                        <div class="fraction-line"></div>
                                        <input type="number" id="den2" value="3" min="1" onchange="fractionCalculator.updateFraction2()">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="calculate-section">
                                <button onclick="fractionCalculator.calculate()" class="calculate-btn">计算</button>
                                <button onclick="fractionCalculator.simplify()" class="simplify-btn">约分</button>
                                <button onclick="fractionCalculator.clear()" class="clear-btn">清空</button>
                            </div>
                        </div>
                        
                        <div class="result-section">
                            <h5>计算结果</h5>
                            <div id="resultDisplay" class="result-display">
                                <div class="fraction-result">
                                    <span class="fraction-text">1/2 + 1/3 = 5/6</span>
                                </div>
                                <div class="decimal-result">
                                    <span class="decimal-text">≈ 0.833</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="visualization-section">
                            <h5>可视化表示</h5>
                            <div class="visualization-controls">
                                <label>
                                    <input type="checkbox" id="showVisualization" checked onchange="fractionCalculator.toggleVisualization()">
                                    显示图形表示
                                </label>
                            </div>
                            <div id="visualizationArea" class="visualization-area">
                                <canvas id="fractionCanvas" width="600" height="300"></canvas>
                            </div>
                        </div>
                        
                        <div class="history-section">
                            <h5>计算历史</h5>
                            <div id="historyList" class="history-list">
                                <p>暂无计算记录</p>
                            </div>
                        </div>
                        
                        <div class="learning-section">
                            <h5>学习提示</h5>
                            <div class="learning-tips">
                                <div class="tip-item">
                                    <strong>分数加法：</strong>先通分，再相加分子
                                </div>
                                <div class="tip-item">
                                    <strong>分数减法：</strong>先通分，再相减分子
                                </div>
                                <div class="tip-item">
                                    <strong>分数乘法：</strong>分子乘分子，分母乘分母
                                </div>
                                <div class="tip-item">
                                    <strong>分数除法：</strong>除以一个分数等于乘以它的倒数
                                </div>
                                <div class="tip-item">
                                    <strong>约分：</strong>分子分母同时除以最大公因数
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化分数计算器
    init() {
        this.updateDisplay();
        this.drawVisualization();
        this.updateHistory();
    }

    // 更新第一个分数
    updateFraction1() {
        const num = parseInt(document.getElementById('num1').value) || 0;
        const den = parseInt(document.getElementById('den1').value) || 1;
        this.fraction1 = { numerator: num, denominator: den };
        this.updateDisplay();
        this.drawVisualization();
    }

    // 更新第二个分数
    updateFraction2() {
        const num = parseInt(document.getElementById('num2').value) || 0;
        const den = parseInt(document.getElementById('den2').value) || 1;
        this.fraction2 = { numerator: num, denominator: den };
        this.updateDisplay();
        this.drawVisualization();
    }

    // 设置运算符号
    setOperation() {
        this.operation = document.getElementById('operation').value;
        this.updateDisplay();
    }

    // 计算
    calculate() {
        let result;
        
        switch (this.operation) {
            case '+':
                result = this.addFractions(this.fraction1, this.fraction2);
                break;
            case '-':
                result = this.subtractFractions(this.fraction1, this.fraction2);
                break;
            case '×':
                result = this.multiplyFractions(this.fraction1, this.fraction2);
                break;
            case '÷':
                result = this.divideFractions(this.fraction1, this.fraction2);
                break;
        }
        
        this.result = result;
        this.addToHistory();
        this.updateDisplay();
        this.drawVisualization();
        this.updateHistory();
        
        this.showMessage(`计算完成：${this.fraction1.numerator}/${this.fraction1.denominator} ${this.operation} ${this.fraction2.numerator}/${this.fraction2.denominator} = ${result.numerator}/${result.denominator}`);
    }

    // 分数加法
    addFractions(f1, f2) {
        const lcm = this.leastCommonMultiple(f1.denominator, f2.denominator);
        const newNum1 = f1.numerator * (lcm / f1.denominator);
        const newNum2 = f2.numerator * (lcm / f2.denominator);
        
        return this.simplifyFraction({
            numerator: newNum1 + newNum2,
            denominator: lcm
        });
    }

    // 分数减法
    subtractFractions(f1, f2) {
        const lcm = this.leastCommonMultiple(f1.denominator, f2.denominator);
        const newNum1 = f1.numerator * (lcm / f1.denominator);
        const newNum2 = f2.numerator * (lcm / f2.denominator);
        
        return this.simplifyFraction({
            numerator: newNum1 - newNum2,
            denominator: lcm
        });
    }

    // 分数乘法
    multiplyFractions(f1, f2) {
        return this.simplifyFraction({
            numerator: f1.numerator * f2.numerator,
            denominator: f1.denominator * f2.denominator
        });
    }

    // 分数除法
    divideFractions(f1, f2) {
        if (f2.numerator === 0) {
            this.showMessage('错误：除数不能为零！');
            return f1;
        }
        
        return this.simplifyFraction({
            numerator: f1.numerator * f2.denominator,
            denominator: f1.denominator * f2.numerator
        });
    }

    // 约分
    simplify() {
        if (this.result) {
            this.result = this.simplifyFraction(this.result);
            this.updateDisplay();
            this.showMessage('约分完成！');
        }
    }

    // 简化分数
    simplifyFraction(fraction) {
        const gcd = this.greatestCommonDivisor(fraction.numerator, fraction.denominator);
        return {
            numerator: fraction.numerator / gcd,
            denominator: fraction.denominator / gcd
        };
    }

    // 最大公因数
    greatestCommonDivisor(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // 最小公倍数
    leastCommonMultiple(a, b) {
        return (a * b) / this.greatestCommonDivisor(a, b);
    }

    // 清空
    clear() {
        this.fraction1 = { numerator: 0, denominator: 1 };
        this.fraction2 = { numerator: 0, denominator: 1 };
        this.result = null;
        this.operation = '+';
        
        document.getElementById('num1').value = '0';
        document.getElementById('den1').value = '1';
        document.getElementById('num2').value = '0';
        document.getElementById('den2').value = '1';
        document.getElementById('operation').value = '+';
        
        this.updateDisplay();
        this.drawVisualization();
        this.showMessage('已清空');
    }

    // 更新显示
    updateDisplay() {
        const resultDisplay = document.getElementById('resultDisplay');
        if (!resultDisplay) return;
        
        if (this.result) {
            const decimal = (this.result.numerator / this.result.denominator).toFixed(3);
            resultDisplay.innerHTML = `
                <div class="fraction-result">
                    <span class="fraction-text">${this.fraction1.numerator}/${this.fraction1.denominator} ${this.operation} ${this.fraction2.numerator}/${this.fraction2.denominator} = ${this.result.numerator}/${this.result.denominator}</span>
                </div>
                <div class="decimal-result">
                    <span class="decimal-text">≈ ${decimal}</span>
                </div>
            `;
        } else {
            resultDisplay.innerHTML = `
                <div class="fraction-result">
                    <span class="fraction-text">${this.fraction1.numerator}/${this.fraction1.denominator} ${this.operation} ${this.fraction2.numerator}/${this.fraction2.denominator}</span>
                </div>
                <div class="decimal-result">
                    <span class="decimal-text">点击计算按钮</span>
                </div>
            `;
        }
    }

    // 绘制可视化
    drawVisualization() {
        if (!this.showVisualization) return;
        
        const canvas = document.getElementById('fractionCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制第一个分数
        this.drawFraction(ctx, 50, 50, 200, 100, this.fraction1, '第一个分数');
        
        // 绘制运算符号
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.operation, 300, 100);
        
        // 绘制第二个分数
        this.drawFraction(ctx, 350, 50, 200, 100, this.fraction2, '第二个分数');
        
        // 绘制等号和结果
        if (this.result) {
            ctx.fillText('=', 300, 200);
            this.drawFraction(ctx, 200, 220, 200, 100, this.result, '结果');
        }
    }

    // 绘制分数
    drawFraction(ctx, x, y, width, height, fraction, label) {
        const barWidth = width / fraction.denominator;
        const filledBars = fraction.numerator;
        
        // 绘制标签
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x + width/2, y - 10);
        
        // 绘制分数条
        for (let i = 0; i < fraction.denominator; i++) {
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + i * barWidth, y, barWidth, height);
            
            if (i < filledBars) {
                ctx.fillStyle = '#4CAF50';
                ctx.fillRect(x + i * barWidth + 1, y + 1, barWidth - 2, height - 2);
            }
        }
        
        // 绘制分数文本
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${fraction.numerator}/${fraction.denominator}`, x + width/2, y + height + 20);
    }

    // 切换可视化显示
    toggleVisualization() {
        this.showVisualization = document.getElementById('showVisualization').checked;
        if (this.showVisualization) {
            this.drawVisualization();
        } else {
            const canvas = document.getElementById('fractionCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }

    // 添加到历史记录
    addToHistory() {
        if (!this.result) return;
        
        const historyItem = {
            fraction1: { ...this.fraction1 },
            fraction2: { ...this.fraction2 },
            operation: this.operation,
            result: { ...this.result },
            timestamp: new Date().toLocaleTimeString()
        };
        
        this.history.unshift(historyItem);
        
        // 只保留最近10条记录
        if (this.history.length > 10) {
            this.history.pop();
        }
    }

    // 更新历史显示
    updateHistory() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<p>暂无计算记录</p>';
            return;
        }
        
        const historyHTML = this.history.map((item, index) => `
            <div class="history-item">
                <div class="history-calculation">
                    ${item.fraction1.numerator}/${item.fraction1.denominator} ${item.operation} ${item.fraction2.numerator}/${item.fraction2.denominator} = ${item.result.numerator}/${item.result.denominator}
                </div>
                <div class="history-time">${item.timestamp}</div>
                <button onclick="fractionCalculator.loadFromHistory(${index})" class="load-btn">加载</button>
            </div>
        `).join('');
        
        historyList.innerHTML = historyHTML;
    }

    // 从历史记录加载
    loadFromHistory(index) {
        if (index >= 0 && index < this.history.length) {
            const item = this.history[index];
            this.fraction1 = { ...item.fraction1 };
            this.fraction2 = { ...item.fraction2 };
            this.operation = item.operation;
            this.result = { ...item.result };
            
            document.getElementById('num1').value = this.fraction1.numerator;
            document.getElementById('den1').value = this.fraction1.denominator;
            document.getElementById('num2').value = this.fraction2.numerator;
            document.getElementById('den2').value = this.fraction2.denominator;
            document.getElementById('operation').value = this.operation;
            
            this.updateDisplay();
            this.drawVisualization();
            this.showMessage('已从历史记录加载');
        }
    }

    // 显示消息
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'fraction-calculator-message';
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // 关闭工具
    closeTool() {
        const toolModal = document.getElementById('toolModal');
        if (toolModal) {
            toolModal.remove();
        }
    }

    // 练习模式
    startPracticeMode() {
        this.generatePracticeQuestion();
    }

    // 生成练习题目
    generatePracticeQuestion() {
        const operations = ['+', '-', '×', '÷'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let f1, f2;
        switch (operation) {
            case '+':
            case '-':
                // 生成分母不同的分数
                f1 = { numerator: Math.floor(Math.random() * 5) + 1, denominator: Math.floor(Math.random() * 5) + 2 };
                f2 = { numerator: Math.floor(Math.random() * 5) + 1, denominator: Math.floor(Math.random() * 5) + 2 };
                break;
            case '×':
            case '÷':
                // 生成简单的分数
                f1 = { numerator: Math.floor(Math.random() * 4) + 1, denominator: Math.floor(Math.random() * 4) + 1 };
                f2 = { numerator: Math.floor(Math.random() * 4) + 1, denominator: Math.floor(Math.random() * 4) + 1 };
                break;
        }
        
        this.fraction1 = f1;
        this.fraction2 = f2;
        this.operation = operation;
        this.result = null;
        
        document.getElementById('num1').value = f1.numerator;
        document.getElementById('den1').value = f1.denominator;
        document.getElementById('num2').value = f2.numerator;
        document.getElementById('den2').value = f2.denominator;
        document.getElementById('operation').value = operation;
        
        this.updateDisplay();
        this.drawVisualization();
        
        this.showMessage(`练习题目：${f1.numerator}/${f1.denominator} ${operation} ${f2.numerator}/${f2.denominator} = ?`);
    }
}

// 创建全局实例
const fractionCalculator = new FractionCalculator(); 