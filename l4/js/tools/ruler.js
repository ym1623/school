// 虚拟直尺工具

class Ruler {
    constructor() {
        this.isMeasuring = false;
        this.measureStart = null;
        this.measureEnd = null;
        this.currentUnit = 'cm'; // 'cm' 或 'mm'
        this.scale = 1; // 像素与单位的比例
        this.measurements = [];
    }

    // 创建直尺界面
    createRulerInterface() {
        return `
            <div class="ruler-container">
                <div class="ruler-tool">
                    <div class="ruler-header">
                        <h4>📏 虚拟直尺</h4>
                        <button class="close-tool" onclick="ruler.closeTool()">×</button>
                    </div>
                    
                    <div class="ruler-main">
                        <div class="ruler-display">
                            <canvas id="rulerCanvas" width="800" height="200"></canvas>
                        </div>
                        
                        <div class="ruler-controls">
                            <div class="control-section">
                                <h5>测量工具</h5>
                                <div class="measure-controls">
                                    <button onclick="ruler.startMeasuring()" class="control-btn">开始测量</button>
                                    <button onclick="ruler.clearMeasurement()" class="control-btn">清除测量</button>
                                    <button onclick="ruler.toggleUnit()" class="control-btn">切换单位</button>
                                </div>
                                <div class="current-unit">
                                    当前单位: <span id="currentUnit">厘米</span>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>快速测量</h5>
                                <div class="quick-measures">
                                    <button onclick="ruler.showQuickMeasure(2.5)" class="quick-btn">2.5cm</button>
                                    <button onclick="ruler.showQuickMeasure(5.0)" class="quick-btn">5.0cm</button>
                                    <button onclick="ruler.showQuickMeasure(7.5)" class="quick-btn">7.5cm</button>
                                    <button onclick="ruler.showQuickMeasure(10.0)" class="quick-btn">10.0cm</button>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>测量历史</h5>
                                <div id="measurementHistory" class="measurement-history">
                                    <p>暂无测量记录</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="ruler-info">
                        <div class="measurement-tips">
                            <h5>💡 使用技巧</h5>
                            <ul>
                                <li>点击"开始测量"然后在直尺上点击两点进行测量</li>
                                <li>可以切换厘米和毫米单位</li>
                                <li>观察刻度线的长短区别</li>
                                <li>练习估算长度</li>
                                <li>使用快速测量按钮练习常见长度</li>
                            </ul>
                        </div>
                        
                        <div class="ruler-education">
                            <h5>📚 知识要点</h5>
                            <div class="education-content">
                                <div class="knowledge-point">
                                    <h6>厘米和毫米的关系</h6>
                                    <p>1厘米 = 10毫米</p>
                                </div>
                                <div class="knowledge-point">
                                    <h6>刻度线规律</h6>
                                    <p>长线表示厘米，短线表示毫米</p>
                                </div>
                                <div class="knowledge-point">
                                    <h6>测量技巧</h6>
                                    <p>测量时要从0刻度开始，或减去起始刻度</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化直尺
    init() {
        this.drawRuler();
        this.setupEventListeners();
        this.updateUnitDisplay();
    }

    // 绘制直尺
    drawRuler() {
        const canvas = document.getElementById('rulerCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        // 清空画布
        ctx.clearRect(0, 0, width, height);
        
        // 绘制直尺背景
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(50, 80, width - 100, 40);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 80, width - 100, 40);
        
        // 绘制刻度
        this.drawMarks(ctx, width, height);
        
        // 绘制测量线（如果有）
        if (this.measureStart && this.measureEnd) {
            this.drawMeasurement(ctx);
        }
    }

    // 绘制刻度
    drawMarks(ctx, width, height) {
        const startX = 50;
        const endX = width - 50;
        const y = 80;
        
        // 厘米刻度
        for (let i = 0; i <= 30; i++) {
            const x = startX + i * 25;
            const isMajorMark = i % 5 === 0;
            
            // 刻度线
            ctx.strokeStyle = '#333';
            ctx.lineWidth = isMajorMark ? 2 : 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - (isMajorMark ? 15 : 8));
            ctx.stroke();
            
            // 数字标签
            if (isMajorMark) {
                ctx.fillStyle = '#333';
                ctx.font = '12px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(i.toString(), x, y - 20);
            }
        }
        
        // 毫米刻度（如果当前单位是毫米）
        if (this.currentUnit === 'mm') {
            ctx.strokeStyle = '#666';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= 300; i++) {
                if (i % 5 !== 0) { // 跳过厘米刻度
                    const x = startX + i * 2.5;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, y - 4);
                    ctx.stroke();
                }
            }
        }
    }

    // 绘制测量线
    drawMeasurement(ctx) {
        if (!this.measureStart || !this.measureEnd) return;
        
        const startX = 50 + this.measureStart * 25;
        const endX = 50 + this.measureEnd * 25;
        const y = 60;
        
        // 测量线
        ctx.strokeStyle = '#ff4444';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
        
        // 端点标记
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.arc(startX, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(endX, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // 测量结果文本
        const length = Math.abs(this.measureEnd - this.measureStart);
        const displayLength = this.currentUnit === 'mm' ? length * 10 : length;
        const unitText = this.currentUnit === 'mm' ? 'mm' : 'cm';
        
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${displayLength} ${unitText}`, (startX + endX) / 2, y - 10);
    }

    // 设置事件监听器
    setupEventListeners() {
        const canvas = document.getElementById('rulerCanvas');
        if (!canvas) return;
        
        canvas.addEventListener('click', (e) => {
            if (!this.isMeasuring) return;
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // 检查是否在直尺范围内
            if (y >= 60 && y <= 120 && x >= 50 && x <= canvas.width - 50) {
                const cmPosition = (x - 50) / 25;
                
                if (!this.measureStart) {
                    this.measureStart = cmPosition;
                    this.showMessage(`测量起点：${cmPosition.toFixed(1)} cm`);
                } else {
                    this.measureEnd = cmPosition;
                    this.completeMeasurement();
                }
            }
        });
    }

    // 开始测量
    startMeasuring() {
        this.isMeasuring = true;
        this.measureStart = null;
        this.measureEnd = null;
        this.showMessage('请点击直尺上的第一个点');
        this.updateButtonState();
    }

    // 完成测量
    completeMeasurement() {
        this.isMeasuring = false;
        this.updateButtonState();
        
        const length = Math.abs(this.measureEnd - this.measureStart);
        const displayLength = this.currentUnit === 'mm' ? length * 10 : length;
        const unitText = this.currentUnit === 'mm' ? 'mm' : 'cm';
        
        // 添加到测量历史
        this.addToHistory(displayLength, unitText);
        
        this.showMessage(`测量完成：${displayLength} ${unitText}`);
        this.drawRuler();
    }

    // 清除测量
    clearMeasurement() {
        this.measureStart = null;
        this.measureEnd = null;
        this.isMeasuring = false;
        this.updateButtonState();
        this.drawRuler();
        this.showMessage('测量已清除');
    }

    // 切换单位
    toggleUnit() {
        this.currentUnit = this.currentUnit === 'cm' ? 'mm' : 'cm';
        this.updateUnitDisplay();
        this.drawRuler();
        this.showMessage(`已切换到${this.currentUnit === 'cm' ? '厘米' : '毫米'}`);
    }

    // 显示快速测量
    showQuickMeasure(length) {
        this.clearMeasurement();
        
        // 显示指定长度的测量线
        const startX = 50;
        const endX = 50 + length * 25;
        const y = 60;
        
        const canvas = document.getElementById('rulerCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // 绘制测量线
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
        
        // 端点标记
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(startX, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(endX, y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        // 测量结果文本
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${length} cm`, (startX + endX) / 2, y - 10);
        
        this.showMessage(`快速测量：${length} cm`);
    }

    // 添加到测量历史
    addToHistory(length, unit) {
        this.measurements.push({
            length: length,
            unit: unit,
            time: new Date().toLocaleTimeString()
        });
        
        // 只保留最近10次测量
        if (this.measurements.length > 10) {
            this.measurements.shift();
        }
        
        this.updateHistoryDisplay();
    }

    // 更新历史显示
    updateHistoryDisplay() {
        const historyDiv = document.getElementById('measurementHistory');
        if (!historyDiv) return;
        
        if (this.measurements.length === 0) {
            historyDiv.innerHTML = '<p>暂无测量记录</p>';
            return;
        }
        
        const historyHTML = this.measurements.map((measurement, index) => `
            <div class="history-item">
                <span class="history-number">${index + 1}</span>
                <span class="history-length">${measurement.length} ${measurement.unit}</span>
                <span class="history-time">${measurement.time}</span>
            </div>
        `).join('');
        
        historyDiv.innerHTML = historyHTML;
    }

    // 更新单位显示
    updateUnitDisplay() {
        const unitSpan = document.getElementById('currentUnit');
        if (unitSpan) {
            unitSpan.textContent = this.currentUnit === 'cm' ? '厘米' : '毫米';
        }
    }

    // 更新按钮状态
    updateButtonState() {
        const startBtn = document.querySelector('button[onclick="ruler.startMeasuring()"]');
        const clearBtn = document.querySelector('button[onclick="ruler.clearMeasurement()"]');
        
        if (startBtn) {
            startBtn.textContent = this.isMeasuring ? '测量中...' : '开始测量';
            startBtn.disabled = this.isMeasuring;
        }
        
        if (clearBtn) {
            clearBtn.disabled = !this.measureStart && !this.measureEnd;
        }
    }

    // 显示消息
    showMessage(message) {
        // 创建临时消息显示
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ruler-message';
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
        this.practiceMode = true;
        this.generatePracticeQuestion();
    }

    // 生成练习题目
    generatePracticeQuestion() {
        const questions = [
            { question: '请测量5厘米的长度', answer: 5, unit: 'cm' },
            { question: '请测量2.5厘米的长度', answer: 2.5, unit: 'cm' },
            { question: '请测量8厘米的长度', answer: 8, unit: 'cm' },
            { question: '请测量50毫米的长度', answer: 50, unit: 'mm' },
            { question: '请测量75毫米的长度', answer: 75, unit: 'mm' }
        ];
        
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        this.currentPracticeQuestion = randomQuestion;
        
        this.showMessage(`练习题目：${randomQuestion.question}`);
    }

    // 检查练习答案
    checkPracticeAnswer(userAnswer) {
        if (!this.currentPracticeQuestion) return;
        
        const tolerance = 0.2; // 允许0.2的误差
        const isCorrect = Math.abs(userAnswer - this.currentPracticeQuestion.answer) <= tolerance;
        
        if (isCorrect) {
            this.showMessage('✓ 正确！测量很准确！');
            this.score += 10;
        } else {
            this.showMessage(`✗ 答案不正确。正确答案是：${this.currentPracticeQuestion.answer} ${this.currentPracticeQuestion.unit}`);
        }
        
        // 生成新题目
        setTimeout(() => {
            this.generatePracticeQuestion();
        }, 2000);
    }
}

// 创建全局实例
const ruler = new Ruler(); 