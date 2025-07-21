// 时钟工具

class Clock {
    constructor() {
        this.currentTime = new Date();
        this.isRunning = true;
        this.showDigital = true;
        this.showAnalog = true;
        this.timeMode = 'current'; // 'current', 'set', 'practice'
        this.practiceTime = null;
        this.practiceQuestions = [];
        this.currentQuestion = 0;
        this.score = 0;
    }

    // 创建时钟界面
    createClockInterface() {
        return `
            <div class="clock-container">
                <div class="clock-tool">
                    <div class="clock-header">
                        <h4>🕐 时钟工具</h4>
                        <button class="close-tool" onclick="clock.closeTool()">×</button>
                    </div>
                    
                    <div class="clock-main">
                        <div class="clock-display-section">
                            <div class="clock-controls">
                                <button onclick="clock.toggleClock()" class="control-btn" id="toggleBtn">暂停</button>
                                <button onclick="clock.resetTime()" class="control-btn">重置</button>
                                <button onclick="clock.setTime()" class="control-btn">设置时间</button>
                            </div>
                            
                            <div class="clock-displays">
                                <div class="analog-clock-container" id="analogContainer">
                                    <canvas id="analogClock" width="300" height="300"></canvas>
                                </div>
                                
                                <div class="digital-clock-container" id="digitalContainer">
                                    <div id="digitalClock" class="digital-clock">
                                        <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
                                    </div>
                                    <div id="dateDisplay" class="date-display">
                                        <span id="date">2024年1月1日</span>
                                        <span id="dayOfWeek">星期一</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="clock-panel">
                            <div class="panel-section">
                                <h5>显示选项</h5>
                                <div class="display-options">
                                    <label>
                                        <input type="checkbox" id="showAnalog" checked onchange="clock.toggleAnalog()">
                                        模拟时钟
                                    </label>
                                    <label>
                                        <input type="checkbox" id="showDigital" checked onchange="clock.toggleDigital()">
                                        数字时钟
                                    </label>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>时间练习</h5>
                                <div class="practice-controls">
                                    <button onclick="clock.startPractice()" class="practice-btn">开始练习</button>
                                    <button onclick="clock.nextQuestion()" class="practice-btn">下一题</button>
                                    <button onclick="clock.checkAnswer()" class="practice-btn">检查答案</button>
                                </div>
                                <div id="practiceArea" class="practice-area" style="display: none;">
                                    <div id="questionDisplay" class="question-display">
                                        <p>请设置时间：<span id="questionText">3:45</span></p>
                                    </div>
                                    <div class="time-setter">
                                        <div class="time-input">
                                            <label>时：</label>
                                            <input type="number" id="setHour" min="0" max="23" value="0">
                                        </div>
                                        <div class="time-input">
                                            <label>分：</label>
                                            <input type="number" id="setMinute" min="0" max="59" value="0">
                                        </div>
                                        <button onclick="clock.setPracticeTime()" class="set-btn">设置</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>练习统计</h5>
                                <div class="practice-stats">
                                    <div class="stat-item">
                                        <span class="stat-label">正确：</span>
                                        <span class="stat-value" id="correctCount">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">错误：</span>
                                        <span class="stat-value" id="wrongCount">0</span>
                                    </div>
                                    <div class="stat-item">
                                        <span class="stat-label">得分：</span>
                                        <span class="stat-value" id="scoreDisplay">0</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>学习提示</h5>
                                <div class="learning-tips">
                                    <div class="tip-item">
                                        <strong>时针：</strong>短针，每小时转30度
                                    </div>
                                    <div class="tip-item">
                                        <strong>分针：</strong>长针，每分钟转6度
                                    </div>
                                    <div class="tip-item">
                                        <strong>秒针：</strong>细针，每秒转6度
                                    </div>
                                    <div class="tip-item">
                                        <strong>时间格式：</strong>24小时制或12小时制
                                    </div>
                                    <div class="tip-item">
                                        <strong>时间计算：</strong>注意进位和借位
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化时钟
    init() {
        this.startClock();
        this.updateDisplay();
        this.generatePracticeQuestions();
    }

    // 启动时钟
    startClock() {
        this.clockInterval = setInterval(() => {
            if (this.isRunning) {
                this.currentTime = new Date();
                this.updateDisplay();
            }
        }, 1000);
    }

    // 更新显示
    updateDisplay() {
        this.updateDigitalClock();
        this.updateAnalogClock();
        this.updateDateDisplay();
    }

    // 更新数字时钟
    updateDigitalClock() {
        const hours = document.getElementById('hours');
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');
        
        if (hours && minutes && seconds) {
            hours.textContent = this.currentTime.getHours().toString().padStart(2, '0');
            minutes.textContent = this.currentTime.getMinutes().toString().padStart(2, '0');
            seconds.textContent = this.currentTime.getSeconds().toString().padStart(2, '0');
        }
    }

    // 更新模拟时钟
    updateAnalogClock() {
        const canvas = document.getElementById('analogClock');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        // 清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 绘制外圆
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.stroke();
        
        // 绘制刻度
        for (let i = 0; i < 12; i++) {
            const angle = (i * 30 - 90) * Math.PI / 180;
            const startX = centerX + (radius - 20) * Math.cos(angle);
            const startY = centerY + (radius - 20) * Math.sin(angle);
            const endX = centerX + radius * Math.cos(angle);
            const endY = centerY + radius * Math.sin(angle);
            
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            // 绘制数字
            const numX = centerX + (radius - 40) * Math.cos(angle);
            const numY = centerY + (radius - 40) * Math.sin(angle);
            ctx.fillStyle = '#333';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(i === 0 ? '12' : i.toString(), numX, numY);
        }
        
        // 绘制时针
        const hourAngle = (this.currentTime.getHours() % 12 * 30 + this.currentTime.getMinutes() * 0.5 - 90) * Math.PI / 180;
        const hourLength = radius * 0.5;
        const hourX = centerX + hourLength * Math.cos(hourAngle);
        const hourY = centerY + hourLength * Math.sin(hourAngle);
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(hourX, hourY);
        ctx.stroke();
        
        // 绘制分针
        const minuteAngle = (this.currentTime.getMinutes() * 6 - 90) * Math.PI / 180;
        const minuteLength = radius * 0.7;
        const minuteX = centerX + minuteLength * Math.cos(minuteAngle);
        const minuteY = centerY + minuteLength * Math.sin(minuteAngle);
        
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(minuteX, minuteY);
        ctx.stroke();
        
        // 绘制秒针
        const secondAngle = (this.currentTime.getSeconds() * 6 - 90) * Math.PI / 180;
        const secondLength = radius * 0.8;
        const secondX = centerX + secondLength * Math.cos(secondAngle);
        const secondY = centerY + secondLength * Math.sin(secondAngle);
        
        ctx.strokeStyle = '#f00';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(secondX, secondY);
        ctx.stroke();
        
        // 绘制中心点
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        ctx.fill();
    }

    // 更新日期显示
    updateDateDisplay() {
        const dateElement = document.getElementById('date');
        const dayOfWeekElement = document.getElementById('dayOfWeek');
        
        if (dateElement && dayOfWeekElement) {
            const year = this.currentTime.getFullYear();
            const month = this.currentTime.getMonth() + 1;
            const date = this.currentTime.getDate();
            const dayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][this.currentTime.getDay()];
            
            dateElement.textContent = `${year}年${month}月${date}日`;
            dayOfWeekElement.textContent = dayOfWeek;
        }
    }

    // 切换时钟运行状态
    toggleClock() {
        this.isRunning = !this.isRunning;
        const toggleBtn = document.getElementById('toggleBtn');
        if (toggleBtn) {
            toggleBtn.textContent = this.isRunning ? '暂停' : '运行';
        }
    }

    // 重置时间
    resetTime() {
        this.currentTime = new Date();
        this.isRunning = true;
        this.timeMode = 'current';
        this.practiceTime = null;
        
        const toggleBtn = document.getElementById('toggleBtn');
        if (toggleBtn) {
            toggleBtn.textContent = '暂停';
        }
        
        this.updateDisplay();
        this.showMessage('时间已重置');
    }

    // 设置时间
    setTime() {
        const hour = prompt('请输入小时（0-23）：', '12');
        const minute = prompt('请输入分钟（0-59）：', '0');
        
        if (hour !== null && minute !== null) {
            const h = parseInt(hour);
            const m = parseInt(minute);
            
            if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
                this.currentTime.setHours(h, m, 0, 0);
                this.timeMode = 'set';
                this.updateDisplay();
                this.showMessage(`时间已设置为 ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`);
            } else {
                this.showMessage('时间格式错误！');
            }
        }
    }

    // 切换模拟时钟显示
    toggleAnalog() {
        this.showAnalog = !this.showAnalog;
        const analogContainer = document.getElementById('analogContainer');
        if (analogContainer) {
            analogContainer.style.display = this.showAnalog ? 'block' : 'none';
        }
    }

    // 切换数字时钟显示
    toggleDigital() {
        this.showDigital = !this.showDigital;
        const digitalContainer = document.getElementById('digitalContainer');
        if (digitalContainer) {
            digitalContainer.style.display = this.showDigital ? 'block' : 'none';
        }
    }

    // 生成练习题目
    generatePracticeQuestions() {
        this.practiceQuestions = [
            { time: '3:45', description: '下午3点45分' },
            { time: '9:30', description: '上午9点30分' },
            { time: '12:15', description: '中午12点15分' },
            { time: '6:20', description: '下午6点20分' },
            { time: '11:55', description: '上午11点55分' },
            { time: '2:10', description: '下午2点10分' },
            { time: '8:40', description: '上午8点40分' },
            { time: '5:25', description: '下午5点25分' },
            { time: '1:50', description: '下午1点50分' },
            { time: '10:35', description: '上午10点35分' }
        ];
    }

    // 开始练习
    startPractice() {
        this.currentQuestion = 0;
        this.score = 0;
        this.timeMode = 'practice';
        this.showPracticeArea();
        this.nextQuestion();
        this.showMessage('练习开始！');
    }

    // 显示练习区域
    showPracticeArea() {
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea) {
            practiceArea.style.display = 'block';
        }
    }

    // 下一题
    nextQuestion() {
        if (this.currentQuestion < this.practiceQuestions.length) {
            const question = this.practiceQuestions[this.currentQuestion];
            const questionText = document.getElementById('questionText');
            if (questionText) {
                questionText.textContent = question.time;
            }
            
            // 清空输入
            document.getElementById('setHour').value = '0';
            document.getElementById('setMinute').value = '0';
            
            this.showMessage(`第${this.currentQuestion + 1}题：${question.description}`);
        } else {
            this.showMessage(`练习完成！得分：${this.score}/${this.practiceQuestions.length}`);
            this.hidePracticeArea();
        }
    }

    // 隐藏练习区域
    hidePracticeArea() {
        const practiceArea = document.getElementById('practiceArea');
        if (practiceArea) {
            practiceArea.style.display = 'none';
        }
    }

    // 设置练习时间
    setPracticeTime() {
        const hour = parseInt(document.getElementById('setHour').value) || 0;
        const minute = parseInt(document.getElementById('setMinute').value) || 0;
        
        this.practiceTime = { hour, minute };
        
        // 更新时钟显示
        this.currentTime.setHours(hour, minute, 0, 0);
        this.updateDisplay();
        
        this.showMessage(`已设置时间：${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }

    // 检查答案
    checkAnswer() {
        if (!this.practiceTime || this.currentQuestion >= this.practiceQuestions.length) {
            this.showMessage('请先设置时间！');
            return;
        }
        
        const question = this.practiceQuestions[this.currentQuestion];
        const [correctHour, correctMinute] = question.time.split(':').map(Number);
        
        const isCorrect = this.practiceTime.hour === correctHour && this.practiceTime.minute === correctMinute;
        
        if (isCorrect) {
            this.score++;
            this.showMessage('✓ 正确！');
        } else {
            this.showMessage(`✗ 错误！正确答案是：${correctHour.toString().padStart(2, '0')}:${correctMinute.toString().padStart(2, '0')}`);
        }
        
        this.updateStats();
        this.currentQuestion++;
        
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    // 更新统计
    updateStats() {
        const correctCount = document.getElementById('correctCount');
        const wrongCount = document.getElementById('wrongCount');
        const scoreDisplay = document.getElementById('scoreDisplay');
        
        if (correctCount) correctCount.textContent = this.score;
        if (wrongCount) wrongCount.textContent = this.currentQuestion - this.score;
        if (scoreDisplay) scoreDisplay.textContent = this.score;
    }

    // 显示消息
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'clock-message';
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
        if (this.clockInterval) {
            clearInterval(this.clockInterval);
        }
        
        const toolModal = document.getElementById('toolModal');
        if (toolModal) {
            toolModal.remove();
        }
    }

    // 时间计算练习
    startTimeCalculation() {
        this.generateTimeCalculationQuestions();
        this.showTimeCalculationArea();
    }

    // 生成时间计算题目
    generateTimeCalculationQuestions() {
        this.timeCalculationQuestions = [
            { question: '3小时25分钟 + 2小时40分钟 = ?', answer: '6小时5分钟' },
            { question: '5小时30分钟 - 2小时45分钟 = ?', answer: '2小时45分钟' },
            { question: '从8:30到11:15经过多长时间？', answer: '2小时45分钟' },
            { question: '现在是14:20，2小时30分钟后是几点？', answer: '16:50' },
            { question: '现在是9:45，1小时15分钟前是几点？', answer: '8:30' }
        ];
    }

    // 显示时间计算区域
    showTimeCalculationArea() {
        // 这里可以实现时间计算练习的界面
        this.showMessage('时间计算练习功能开发中...');
    }
}

// 创建全局实例
const clock = new Clock(); 