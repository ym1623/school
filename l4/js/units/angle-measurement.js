// 角的度量 - 学习单元

class AngleMeasurementUnit {
    constructor() {
        this.unitId = 'angle-measurement';
        this.unitName = '角的度量';
        this.topics = [
            { id: 'angle_concept', name: '角的认识', difficulty: 2 },
            { id: 'angle_measurement', name: '角的度量', difficulty: 3 },
            { id: 'angle_classification', name: '角的分类', difficulty: 2 },
            { id: 'angle_drawing', name: '画角', difficulty: 3 }
        ];
        this.init();
    }

    init() {
        console.log(`初始化单元: ${this.unitName}`);
    }

    // 生成基础解释内容
    getExplanationContent() {
        return `
            <div class="unit-explanation">
                <h4>📐 角的度量</h4>
                
                <div class="concept-section">
                    <h5>什么是角？</h5>
                    <div class="angle-definition">
                        <div class="definition-text">
                            <p>角是由一个顶点和两条射线组成的图形。</p>
                            <ul>
                                <li><strong>顶点：</strong>两条射线的交点</li>
                                <li><strong>边：</strong>组成角的两条射线</li>
                                <li><strong>角度：</strong>两条边之间的张开程度</li>
                            </ul>
                        </div>
                        <div class="angle-diagram">
                            <svg width="200" height="150" viewBox="0 0 200 150">
                                <line x1="100" y1="100" x2="180" y2="100" stroke="#333" stroke-width="2"/>
                                <line x1="100" y1="100" x2="150" y2="40" stroke="#333" stroke-width="2"/>
                                <path d="M 120 100 A 20 20 0 0 0 115 85" fill="none" stroke="#ff6b6b" stroke-width="2"/>
                                <circle cx="100" cy="100" r="3" fill="#333"/>
                                <text x="105" y="115" font-size="12" fill="#333">顶点</text>
                                <text x="160" y="115" font-size="12" fill="#333">边</text>
                                <text x="130" y="75" font-size="12" fill="#333">边</text>
                                <text x="125" y="90" font-size="12" fill="#ff6b6b">角</text>
                            </svg>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>角的分类</h5>
                    <div class="angle-types">
                        <div class="angle-type">
                            <div class="angle-visual">
                                <svg width="100" height="80" viewBox="0 0 100 80">
                                    <line x1="20" y1="60" x2="80" y2="60" stroke="#333" stroke-width="2"/>
                                    <line x1="20" y1="60" x2="60" y2="20" stroke="#333" stroke-width="2"/>
                                    <path d="M 35 60 A 15 15 0 0 0 30 50" fill="none" stroke="#4CAF50" stroke-width="2"/>
                                </svg>
                            </div>
                            <h6>锐角</h6>
                            <p>小于90°的角</p>
                        </div>
                        
                        <div class="angle-type">
                            <div class="angle-visual">
                                <svg width="100" height="80" viewBox="0 0 100 80">
                                    <line x1="20" y1="60" x2="80" y2="60" stroke="#333" stroke-width="2"/>
                                    <line x1="20" y1="60" x2="20" y2="20" stroke="#333" stroke-width="2"/>
                                    <path d="M 35 60 A 15 15 0 0 0 20 45" fill="none" stroke="#2196F3" stroke-width="2"/>
                                    <rect x="20" y="45" width="15" height="15" fill="none" stroke="#2196F3" stroke-width="1"/>
                                </svg>
                            </div>
                            <h6>直角</h6>
                            <p>等于90°的角</p>
                        </div>
                        
                        <div class="angle-type">
                            <div class="angle-visual">
                                <svg width="100" height="80" viewBox="0 0 100 80">
                                    <line x1="20" y1="60" x2="80" y2="60" stroke="#333" stroke-width="2"/>
                                    <line x1="20" y1="60" x2="10" y2="20" stroke="#333" stroke-width="2"/>
                                    <path d="M 35 60 A 15 15 0 0 0 15 45" fill="none" stroke="#FF9800" stroke-width="2"/>
                                </svg>
                            </div>
                            <h6>钝角</h6>
                            <p>大于90°小于180°的角</p>
                        </div>
                        
                        <div class="angle-type">
                            <div class="angle-visual">
                                <svg width="100" height="80" viewBox="0 0 100 80">
                                    <line x1="10" y1="40" x2="90" y2="40" stroke="#333" stroke-width="2"/>
                                    <path d="M 25 40 A 15 15 0 0 0 75 40" fill="none" stroke="#F44336" stroke-width="2"/>
                                </svg>
                            </div>
                            <h6>平角</h6>
                            <p>等于180°的角</p>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>量角器的使用</h5>
                    <div class="protractor-guide">
                        <div class="guide-steps">
                            <div class="step">
                                <span class="step-number">1</span>
                                <p>将量角器的中心点对准角的顶点</p>
                            </div>
                            <div class="step">
                                <span class="step-number">2</span>
                                <p>将量角器的0°刻度线对准角的一边</p>
                            </div>
                            <div class="step">
                                <span class="step-number">3</span>
                                <p>读出角的另一边所对应的度数</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成可视化内容
    getVisualizationContent() {
        return `
            <div class="visualization-content">
                <h4>🎨 角度可视化工具</h4>
                
                <div class="interactive-protractor">
                    <h5>虚拟量角器</h5>
                    <div class="protractor-container">
                        <div class="protractor-tool">
                            <svg id="protractorSvg" width="400" height="250" viewBox="0 0 400 250">
                                <!-- 量角器半圆 -->
                                <path d="M 50 200 A 150 150 0 0 1 350 200" fill="rgba(255,235,59,0.3)" stroke="#333" stroke-width="2"/>
                                
                                <!-- 刻度线 -->
                                <g id="protractorMarks"></g>
                                
                                <!-- 角的两边 -->
                                <line id="angleLine1" x1="200" y1="200" x2="350" y2="200" stroke="#ff6b6b" stroke-width="3"/>
                                <line id="angleLine2" x1="200" y1="200" x2="300" y2="100" stroke="#ff6b6b" stroke-width="3"/>
                                
                                <!-- 角的弧线 -->
                                <path id="angleArc" d="" fill="none" stroke="#ff6b6b" stroke-width="2"/>
                                
                                <!-- 中心点 -->
                                <circle cx="200" cy="200" r="4" fill="#333"/>
                                
                                <!-- 角度显示 -->
                                <text id="angleDisplay" x="220" y="180" font-size="16" font-weight="bold" fill="#ff6b6b">45°</text>
                            </svg>
                        </div>
                        
                        <div class="protractor-controls">
                            <div class="control-group">
                                <label>调整角度：</label>
                                <input type="range" id="angleSlider" min="0" max="180" value="45" 
                                       oninput="angleMeasurementUnit.updateAngle(this.value)">
                                <span id="angleValue">45°</span>
                            </div>
                            
                            <div class="control-group">
                                <button onclick="angleMeasurementUnit.randomAngle()">随机角度</button>
                                <button onclick="angleMeasurementUnit.resetAngle()">重置</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="angle-classifier">
                    <h5>角度分类器</h5>
                    <div class="classifier-tool">
                        <div class="input-section">
                            <label>输入角度：</label>
                            <input type="number" id="classifyInput" min="0" max="180" placeholder="输入0-180的角度">
                            <button onclick="angleMeasurementUnit.classifyAngle()">分类</button>
                        </div>
                        <div id="classificationResult" class="result-display"></div>
                    </div>
                </div>

                <div class="angle-drawer">
                    <h5>画角练习</h5>
                    <div class="drawing-tool">
                        <div class="drawing-controls">
                            <label>目标角度：</label>
                            <input type="number" id="targetAngle" min="0" max="180" placeholder="输入要画的角度">
                            <button onclick="angleMeasurementUnit.startDrawing()">开始画角</button>
                        </div>
                        <div id="drawingCanvas" class="drawing-area">
                            <p>点击"开始画角"来练习画指定角度的角</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成练习内容
    getPracticeContent() {
        return `
            <div class="practice-content">
                <h4>✏️ 角度练习</h4>
                
                <div class="practice-section">
                    <div class="question-counter">
                        <span>题目 <span id="currentQuestion">1</span> / <span id="totalQuestions">6</span></span>
                        <span class="score">得分: <span id="currentScore">0</span></span>
                    </div>
                    
                    <div id="practiceQuestion" class="question-container">
                        <!-- 练习题将动态加载 -->
                    </div>
                    
                    <div class="practice-controls">
                        <button id="checkAnswerBtn" onclick="angleMeasurementUnit.checkCurrentAnswer()">检查答案</button>
                        <button id="nextQuestionBtn" onclick="angleMeasurementUnit.nextQuestion()" style="display:none;">下一题</button>
                        <button id="showHintBtn" onclick="angleMeasurementUnit.showHint()">提示</button>
                    </div>
                    
                    <div id="answerFeedback" class="feedback-container"></div>
                </div>

                <div class="quick-practice">
                    <h5>快速练习</h5>
                    <div class="quick-questions">
                        <div class="quick-question">
                            <p>这是什么角？</p>
                            <svg width="100" height="80" viewBox="0 0 100 80">
                                <line x1="20" y1="60" x2="80" y2="60" stroke="#333" stroke-width="2"/>
                                <line x1="20" y1="60" x2="50" y2="30" stroke="#333" stroke-width="2"/>
                                <path d="M 35 60 A 15 15 0 0 0 32 48" fill="none" stroke="#4CAF50" stroke-width="2"/>
                                <text x="40" y="55" font-size="10" fill="#4CAF50">60°</text>
                            </svg>
                            <div class="quick-options">
                                <button onclick="angleMeasurementUnit.quickAnswer('acute', this)">锐角</button>
                                <button onclick="angleMeasurementUnit.quickAnswer('right', this)">直角</button>
                                <button onclick="angleMeasurementUnit.quickAnswer('obtuse', this)">钝角</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成扩展内容
    getExtensionContent() {
        return `
            <div class="extension-content">
                <h4>🚀 角度的奥秘</h4>
                
                <div class="extension-section">
                    <h5>🌍 生活中的角度</h5>
                    <div class="real-world-angles">
                        <div class="angle-example">
                            <div class="example-icon">🕐</div>
                            <h6>时钟的角度</h6>
                            <p>时钟的时针和分针形成不同的角度</p>
                            <ul>
                                <li>3点整：90°（直角）</li>
                                <li>6点整：180°（平角）</li>
                                <li>1点整：30°（锐角）</li>
                            </ul>
                        </div>
                        
                        <div class="angle-example">
                            <div class="example-icon">🏠</div>
                            <h6>建筑中的角度</h6>
                            <p>房屋的屋顶、楼梯都有特定的角度</p>
                            <ul>
                                <li>屋顶角度：通常30°-45°</li>
                                <li>楼梯角度：一般30°-40°</li>
                                <li>墙角：90°（直角）</li>
                            </ul>
                        </div>
                        
                        <div class="angle-example">
                            <div class="example-icon">⚽</div>
                            <h6>运动中的角度</h6>
                            <p>体育运动中角度很重要</p>
                            <ul>
                                <li>篮球投篮：45°最佳角度</li>
                                <li>足球射门：角度决定方向</li>
                                <li>跳远起跳：约45°角度</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🎯 角度挑战游戏</h5>
                    <div class="angle-challenge">
                        <div class="challenge-description">
                            <p>角度估算挑战：看图估算角度，看你的眼力有多准！</p>
                        </div>
                        <div class="challenge-controls">
                            <button onclick="angleMeasurementUnit.startAngleChallenge()">开始挑战</button>
                        </div>
                        <div id="angleChallenge" class="challenge-area" style="display:none;">
                            <!-- 挑战内容将动态加载 -->
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🔬 角度的历史</h5>
                    <div class="angle-history">
                        <div class="history-item">
                            <h6>古代的角度测量</h6>
                            <p>古代巴比伦人最早使用360度制，因为360接近一年的天数，便于天文观测。</p>
                        </div>
                        <div class="history-item">
                            <h6>量角器的发明</h6>
                            <p>现代量角器是在17世纪发明的，大大提高了角度测量的精确度。</p>
                        </div>
                        <div class="history-item">
                            <h6>角度在导航中的应用</h6>
                            <p>古代航海家使用星象和角度来确定方向，这是现代GPS的前身。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化量角器刻度
    initProtractor() {
        const marksGroup = document.getElementById('protractorMarks');
        if (!marksGroup) return;
        
        marksGroup.innerHTML = '';
        
        // 绘制刻度线和数字
        for (let i = 0; i <= 180; i += 10) {
            const angle = (i * Math.PI) / 180;
            const x1 = 200 + 140 * Math.cos(Math.PI - angle);
            const y1 = 200 - 140 * Math.sin(Math.PI - angle);
            const x2 = 200 + 150 * Math.cos(Math.PI - angle);
            const y2 = 200 - 150 * Math.sin(Math.PI - angle);
            
            // 刻度线
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', i % 30 === 0 ? '2' : '1');
            marksGroup.appendChild(line);
            
            // 数字标记
            if (i % 30 === 0) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const textX = 200 + 160 * Math.cos(Math.PI - angle);
                const textY = 200 - 160 * Math.sin(Math.PI - angle) + 5;
                text.setAttribute('x', textX);
                text.setAttribute('y', textY);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '12');
                text.setAttribute('fill', '#333');
                text.textContent = i + '°';
                marksGroup.appendChild(text);
            }
        }
    }

    // 更新角度显示
    updateAngle(degrees) {
        const angleRad = (degrees * Math.PI) / 180;
        const line2 = document.getElementById('angleLine2');
        const angleArc = document.getElementById('angleArc');
        const angleDisplay = document.getElementById('angleDisplay');
        const angleValue = document.getElementById('angleValue');
        
        if (line2) {
            const x2 = 200 + 100 * Math.cos(Math.PI - angleRad);
            const y2 = 200 - 100 * Math.sin(Math.PI - angleRad);
            line2.setAttribute('x2', x2);
            line2.setAttribute('y2', y2);
        }
        
        if (angleArc) {
            const arcPath = this.createArcPath(200, 200, 30, 0, degrees);
            angleArc.setAttribute('d', arcPath);
        }
        
        if (angleDisplay) {
            angleDisplay.textContent = degrees + '°';
        }
        
        if (angleValue) {
            angleValue.textContent = degrees + '°';
        }
    }

    // 创建弧线路径
    createArcPath(cx, cy, radius, startAngle, endAngle) {
        const start = (startAngle * Math.PI) / 180;
        const end = (endAngle * Math.PI) / 180;
        
        const x1 = cx + radius * Math.cos(Math.PI - start);
        const y1 = cy - radius * Math.sin(Math.PI - start);
        const x2 = cx + radius * Math.cos(Math.PI - end);
        const y2 = cy - radius * Math.sin(Math.PI - end);
        
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2}`;
    }

    // 随机角度
    randomAngle() {
        const randomDegree = Math.floor(Math.random() * 181);
        document.getElementById('angleSlider').value = randomDegree;
        this.updateAngle(randomDegree);
    }

    // 重置角度
    resetAngle() {
        document.getElementById('angleSlider').value = 45;
        this.updateAngle(45);
    }

    // 分类角度
    classifyAngle() {
        const input = document.getElementById('classifyInput');
        const result = document.getElementById('classificationResult');
        const angle = parseFloat(input.value);
        
        if (isNaN(angle) || angle < 0 || angle > 180) {
            result.innerHTML = '<div class="error">请输入0-180之间的有效角度</div>';
            return;
        }
        
        let classification = '';
        let color = '';
        
        if (angle === 0) {
            classification = '零角';
            color = '#9E9E9E';
        } else if (angle < 90) {
            classification = '锐角';
            color = '#4CAF50';
        } else if (angle === 90) {
            classification = '直角';
            color = '#2196F3';
        } else if (angle < 180) {
            classification = '钝角';
            color = '#FF9800';
        } else if (angle === 180) {
            classification = '平角';
            color = '#F44336';
        }
        
        result.innerHTML = `
            <div class="classification-result" style="border-left: 4px solid ${color};">
                <h6>${angle}° 是 <span style="color: ${color};">${classification}</span></h6>
                <p>${this.getAngleDescription(classification)}</p>
            </div>
        `;
        
        if (learningSystem) {
            learningSystem.awardPoints(10, '角度分类正确');
        }
    }

    // 获取角度描述
    getAngleDescription(type) {
        const descriptions = {
            '零角': '两条边重合，角度为0°',
            '锐角': '小于90°的角，比较尖锐',
            '直角': '等于90°的角，两边垂直',
            '钝角': '大于90°小于180°的角，比较宽阔',
            '平角': '等于180°的角，两边成一条直线'
        };
        return descriptions[type] || '';
    }

    // 快速答题
    quickAnswer(answer, button) {
        const correct = answer === 'acute'; // 60°是锐角
        const buttons = button.parentElement.querySelectorAll('button');
        
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn === button) {
                btn.style.backgroundColor = correct ? '#4CAF50' : '#F44336';
                btn.style.color = 'white';
            }
        });
        
        if (correct && learningSystem) {
            learningSystem.awardPoints(15, '快速答题正确');
        }
        
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });
        }, 2000);
    }

    // 开始角度挑战
    startAngleChallenge() {
        const challengeArea = document.getElementById('angleChallenge');
        this.challengeAngle = Math.floor(Math.random() * 181);
        this.challengeAttempts = 0;
        this.maxAttempts = 3;
        
        challengeArea.style.display = 'block';
        challengeArea.innerHTML = `
            <div class="challenge-interface">
                <div class="challenge-angle">
                    <svg width="200" height="120" viewBox="0 0 200 120">
                        <line x1="50" y1="100" x2="150" y2="100" stroke="#333" stroke-width="3"/>
                        <line x1="50" y1="100" x2="${50 + 100 * Math.cos(Math.PI - (this.challengeAngle * Math.PI) / 180)}" 
                              y1="${100 - 100 * Math.sin(Math.PI - (this.challengeAngle * Math.PI) / 180)}" stroke="#333" stroke-width="3"/>
                        <path d="${this.createArcPath(50, 100, 25, 0, this.challengeAngle)}" fill="none" stroke="#ff6b6b" stroke-width="2"/>
                    </svg>
                </div>
                <div class="challenge-input">
                    <label>你觉得这个角是多少度？</label>
                    <input type="number" id="challengeGuess" min="0" max="180" placeholder="输入你的估算">
                    <button onclick="angleMeasurementUnit.checkChallenge()">提交答案</button>
                </div>
                <div class="challenge-info">
                    <p>剩余机会: <span id="remainingAttempts">${this.maxAttempts}</span></p>
                </div>
                <div id="challengeResult" class="challenge-feedback"></div>
            </div>
        `;
    }

    // 检查挑战答案
    checkChallenge() {
        const guessInput = document.getElementById('challengeGuess');
        const resultDiv = document.getElementById('challengeResult');
        const attemptsSpan = document.getElementById('remainingAttempts');
        
        const guess = parseInt(guessInput.value);
        if (isNaN(guess) || guess < 0 || guess > 180) {
            alert('请输入0-180之间的有效角度');
            return;
        }
        
        this.challengeAttempts++;
        const remaining = this.maxAttempts - this.challengeAttempts;
        attemptsSpan.textContent = remaining;
        
        const difference = Math.abs(guess - this.challengeAngle);
        let feedback = '';
        let points = 0;
        
        if (difference === 0) {
            feedback = '🎯 完全正确！太厉害了！';
            points = 100;
        } else if (difference <= 5) {
            feedback = '🎉 非常接近！误差在5°以内';
            points = 80;
        } else if (difference <= 10) {
            feedback = '👍 很不错！误差在10°以内';
            points = 60;
        } else if (difference <= 20) {
            feedback = '👌 还可以，误差在20°以内';
            points = 40;
        } else {
            feedback = '💪 继续努力！';
            points = 20;
        }
        
        resultDiv.innerHTML = `
            <div class="challenge-result">
                <p><strong>你的答案：</strong>${guess}°</p>
                <p><strong>正确答案：</strong>${this.challengeAngle}°</p>
                <p><strong>误差：</strong>${difference}°</p>
                <p class="feedback">${feedback}</p>
            </div>
        `;
        
        if (learningSystem && points > 0) {
            learningSystem.awardPoints(points, `角度挑战（误差${difference}°）`);
        }
        
        if (difference === 0 || remaining === 0) {
            guessInput.disabled = true;
            if (remaining > 0) {
                resultDiv.innerHTML += '<button onclick="angleMeasurementUnit.startAngleChallenge()">再来一次</button>';
            }
        }
        
        guessInput.value = '';
    }
}

// 创建单元实例
const angleMeasurementUnit = new AngleMeasurementUnit();

// 页面加载完成后初始化量角器
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof angleMeasurementUnit !== 'undefined') {
            angleMeasurementUnit.initProtractor();
        }
    }, 1000);
});