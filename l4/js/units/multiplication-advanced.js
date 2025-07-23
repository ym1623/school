// 第四单元：三位数乘两位数 - 学习模块

class MultiplicationAdvancedUnit {
    constructor() {
        this.unitId = 'multiplication-advanced';
        this.unitName = '三位数乘两位数';
        this.topics = [
            { id: 'mental_calculation', name: '口算乘法', difficulty: 2 },
            { id: 'written_calculation', name: '笔算乘法', difficulty: 3 },
            { id: 'application', name: '乘法的应用', difficulty: 3 },
            { id: 'patterns', name: '积的变化规律', difficulty: 3 }
        ];
        this.currentTopic = 'mental_calculation';
        this.currentStage = 'explanation';
        this.stages = ['explanation', 'visualization', 'practice', 'extension'];
        this.currentExercise = 0;
        this.score = 0;
        this.exercises = [];
        this.init();
    }

    init() {
        console.log(`初始化单元: ${this.unitName}`);
        this.generateExercises();
    }

    // 生成练习题
    generateExercises() {
        this.exercises = [
            // 口算乘法练习题
            { 
                type: 'mental_calculation',
                question: '计算：120 × 30 = ?',
                answer: 3600,
                explanation: '120 × 30 = (100 + 20) × 30 = 100 × 30 + 20 × 30 = 3000 + 600 = 3600',
                hint: '可以拆分成100×30和20×30分别计算'
            },
            { 
                type: 'mental_calculation',
                question: '计算：250 × 40 = ?',
                answer: 10000,
                explanation: '250 × 40 = (200 + 50) × 40 = 200 × 40 + 50 × 40 = 8000 + 2000 = 10000',
                hint: '先算200×40，再算50×40，最后相加'
            },
            // 笔算乘法练习题
            { 
                type: 'written_calculation',
                question: '笔算：234 × 56 = ?',
                answer: 13104,
                explanation: '234 × 56 = 234 × 50 + 234 × 6 = 11700 + 1404 = 13104',
                hint: '按位相乘，注意进位'
            },
            { 
                type: 'written_calculation',
                question: '笔算：456 × 78 = ?',
                answer: 35568,
                explanation: '456 × 78 = 456 × 70 + 456 × 8 = 31920 + 3648 = 35568',
                hint: '先算456×70，再算456×8，最后相加'
            },
            // 应用练习题
            { 
                type: 'application',
                question: '一个工厂每天生产234个零件，连续生产45天，一共生产多少个零件？',
                answer: 10530,
                explanation: '234 × 45 = 10530，所以一共生产10530个零件',
                hint: '用每天生产的数量乘以天数'
            },
            { 
                type: 'application',
                question: '一箱苹果有156个，买了23箱，一共有多少个苹果？',
                answer: 3588,
                explanation: '156 × 23 = 3588，所以一共有3588个苹果',
                hint: '用每箱的数量乘以箱数'
            }
        ];
    }

    // 生成基础解释内容
    getExplanationContent() {
        return `
            <div class="unit-explanation">
                <h4>🔢 三位数乘两位数</h4>
                <div class="concept-section">
                    <h5>口算乘法技巧</h5>
                    <div class="calculation-tips">
                        <div class="tip-item">
                            <h6>整十数乘法</h6>
                            <p>计算 120 × 30 时：</p>
                            <ul>
                                <li>120 × 30 = (100 + 20) × 30</li>
                                <li>= 100 × 30 + 20 × 30</li>
                                <li>= 3000 + 600 = 3600</li>
                            </ul>
                        </div>
                        <div class="tip-item">
                            <h6>整百数乘法</h6>
                            <p>计算 300 × 50 时：</p>
                            <ul>
                                <li>300 × 50 = 3 × 100 × 50</li>
                                <li>= 3 × 5000 = 15000</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>笔算乘法步骤</h5>
                    <div class="calculation-steps">
                        <div class="step-item">
                            <h6>步骤1：按位相乘</h6>
                            <p>从右到左，用乘数的每一位去乘被乘数</p>
                        </div>
                        <div class="step-item">
                            <h6>步骤2：注意进位</h6>
                            <p>每一位相乘的结果要加上前一位的进位</p>
                        </div>
                        <div class="step-item">
                            <h6>步骤3：对齐相加</h6>
                            <p>将各部分积按位对齐后相加</p>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>积的变化规律</h5>
                    <div class="pattern-examples">
                        <div class="pattern-item">
                            <h6>一个因数不变，另一个因数扩大几倍</h6>
                            <p>积也扩大相同的倍数</p>
                            <p>例如：12 × 3 = 36，12 × 6 = 72（积扩大2倍）</p>
                        </div>
                        <div class="pattern-item">
                            <h6>两个因数都扩大</h6>
                            <p>积扩大的倍数等于两个因数扩大倍数的乘积</p>
                            <p>例如：10 × 5 = 50，20 × 10 = 200（积扩大4倍）</p>
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
                <h4>🎨 乘法可视化</h4>
                
                <div class="multiplication-demo">
                    <h5>乘法计算演示</h5>
                    <div class="demo-controls">
                        <div class="input-group">
                            <label>第一个数：</label>
                            <input type="number" id="multiplicand" placeholder="三位数" min="100" max="999">
                        </div>
                        <div class="input-group">
                            <label>第二个数：</label>
                            <input type="number" id="multiplier" placeholder="两位数" min="10" max="99">
                        </div>
                        <button onclick="multiplicationAdvancedUnit.calculate()" class="calculate-btn">计算</button>
                    </div>
                    
                    <div id="calculationResult" class="result-display">
                        <div class="placeholder">请输入两个数进行计算</div>
                    </div>
                </div>

                <div class="pattern-visualization">
                    <h5>积的变化规律演示</h5>
                    <div class="pattern-demo">
                        <div class="pattern-controls">
                            <label>基础算式：</label>
                            <input type="number" id="baseNum1" value="12" min="1" max="999">
                            <span>×</span>
                            <input type="number" id="baseNum2" value="5" min="1" max="99">
                            <span>=</span>
                            <span id="baseResult">60</span>
                        </div>
                        <div class="pattern-controls">
                            <label>变化倍数：</label>
                            <input type="number" id="multiplier1" value="2" min="1" max="10" onchange="multiplicationAdvancedUnit.showPattern()">
                            <span>×</span>
                            <input type="number" id="multiplier2" value="3" min="1" max="10" onchange="multiplicationAdvancedUnit.showPattern()">
                        </div>
                        <div class="pattern-result">
                            <div id="patternCalculation"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成练习内容
    getPracticeContent() {
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        const currentEx = exercises[this.currentExercise] || exercises[0];
        
        return `
            <div class="practice-content">
                <h4>✏️ 乘法练习</h4>
                
                <div class="practice-info">
                    <span class="exercise-counter">题目 ${this.currentExercise + 1} / ${exercises.length}</span>
                    <span class="score">得分：${this.score}</span>
                </div>

                <div class="exercise-card">
                    <div class="question">
                        <h5>${currentEx.question}</h5>
                        <div class="answer-input">
                            <input type="number" id="answer" placeholder="请输入答案">
                            <button onclick="multiplicationAdvancedUnit.checkAnswer()" class="check-btn">检查答案</button>
                        </div>
                    </div>
                    
                    <div class="hint">
                        <p><strong>提示：</strong>${currentEx.hint}</p>
                    </div>
                </div>

                <div class="practice-controls">
                    <button onclick="multiplicationAdvancedUnit.nextExercise()" class="next-btn" style="display: none;">下一题</button>
                </div>

                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    // 生成扩展内容
    getExtensionContent() {
        return `
            <div class="extension-content">
                <h4>🚀 乘法扩展知识</h4>
                
                <div class="extension-section">
                    <h5>🔍 乘法的历史</h5>
                    <div class="history-info">
                        <p>乘法运算最早可以追溯到古埃及和古巴比伦时期。古代人用重复加法来表示乘法，比如 5 × 3 就是 5 + 5 + 5。</p>
                        <p>现代的乘法符号 "×" 是由英国数学家威廉·奥特雷德在1631年引入的。</p>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🎯 快速计算技巧</h5>
                    <div class="quick-tips">
                        <div class="tip-card">
                            <h6>平方数计算</h6>
                            <p>25² = 25 × 25 = 625</p>
                            <p>35² = 35 × 35 = 1225</p>
                        </div>
                        <div class="tip-card">
                            <h6>接近整百数的乘法</h6>
                            <p>98 × 97 = (100 - 2) × (100 - 3)</p>
                            <p>= 10000 - 300 - 200 + 6 = 9506</p>
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🌍 生活中的乘法</h5>
                    <div class="real-world-examples">
                        <div class="example-card">
                            <h6>购物计算</h6>
                            <p>一件衣服128元，买3件需要多少钱？</p>
                            <p>128 × 3 = 384元</p>
                        </div>
                        <div class="example-card">
                            <h6>时间计算</h6>
                            <p>每天学习2小时，一周学习多少小时？</p>
                            <p>2 × 7 = 14小时</p>
                        </div>
                        <div class="example-card">
                            <h6>面积计算</h6>
                            <p>一个长方形长15米，宽8米，面积是多少？</p>
                            <p>15 × 8 = 120平方米</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 计算方法
    calculate() {
        const multiplicand = parseInt(document.getElementById('multiplicand').value);
        const multiplier = parseInt(document.getElementById('multiplier').value);
        const resultDiv = document.getElementById('calculationResult');
        
        if (!multiplicand || !multiplier) {
            resultDiv.innerHTML = '<div class="error">请输入有效的数字</div>';
            return;
        }
        
        const result = multiplicand * multiplier;
        const calculation = `
            <div class="calculation-steps">
                <h6>计算过程：</h6>
                <div class="step">${multiplicand} × ${multiplier}</div>
                <div class="step">= ${multiplicand} × (${Math.floor(multiplier/10)}0 + ${multiplier%10})</div>
                <div class="step">= ${multiplicand} × ${Math.floor(multiplier/10)}0 + ${multiplicand} × ${multiplier%10}</div>
                <div class="step">= ${multiplicand * Math.floor(multiplier/10)}0 + ${multiplicand * (multiplier%10)}</div>
                <div class="step result">= ${result}</div>
            </div>
        `;
        
        resultDiv.innerHTML = calculation;
    }

    // 显示积的变化规律
    showPattern() {
        const baseNum1 = parseInt(document.getElementById('baseNum1').value);
        const baseNum2 = parseInt(document.getElementById('baseNum2').value);
        const multiplier1 = parseInt(document.getElementById('multiplier1').value);
        const multiplier2 = parseInt(document.getElementById('multiplier2').value);
        
        const baseResult = baseNum1 * baseNum2;
        const newNum1 = baseNum1 * multiplier1;
        const newNum2 = baseNum2 * multiplier2;
        const newResult = newNum1 * newNum2;
        const patternMultiplier = multiplier1 * multiplier2;
        
        document.getElementById('baseResult').textContent = baseResult;
        
        const patternDiv = document.getElementById('patternCalculation');
        patternDiv.innerHTML = `
            <div class="pattern-explanation">
                <p><strong>基础算式：</strong>${baseNum1} × ${baseNum2} = ${baseResult}</p>
                <p><strong>变化后：</strong>${newNum1} × ${newNum2} = ${newResult}</p>
                <p><strong>规律：</strong>积扩大了 ${patternMultiplier} 倍 (${multiplier1} × ${multiplier2})</p>
                <p><strong>验证：</strong>${baseResult} × ${patternMultiplier} = ${baseResult * patternMultiplier}</p>
            </div>
        `;
    }

    // 生成动态练习题
    generateExercise() {
        // 随机选择题型
        const types = ['mental_calculation', 'written_calculation', 'application'];
        const type = types[Math.floor(Math.random() * types.length)];
        let question = '', answer = 0, explanation = '', hint = '';
        if (type === 'mental_calculation') {
            // 口算：三位数×两位数
            const a = Math.floor(Math.random() * 900) + 100; // 100~999
            const b = Math.floor(Math.random() * 90) + 10;   // 10~99
            question = `计算：${a} × ${b} = ?`;
            answer = a * b;
            explanation = `${a} × ${b} = ${answer}`;
            hint = '可拆分因数或用估算法';
        } else if (type === 'written_calculation') {
            // 笔算：三位数×两位数
            const a = Math.floor(Math.random() * 900) + 100;
            const b = Math.floor(Math.random() * 90) + 10;
            question = `笔算：${a} × ${b} = ?`;
            answer = a * b;
            explanation = `${a} × ${b} = ${answer}`;
            hint = '按位相乘，注意进位';
        } else if (type === 'application') {
            // 应用题：生产、买卖等场景
            const days = Math.floor(Math.random() * 40) + 10; // 10~49天
            const perDay = Math.floor(Math.random() * 400) + 100; // 100~499
            question = `一个工厂每天生产${perDay}个零件，连续生产${days}天，一共生产多少个零件？`;
            answer = perDay * days;
            explanation = `${perDay} × ${days} = ${answer}`;
            hint = '用每天生产的数量乘以天数';
        }
        this.currentExercise = { type, question, answer, explanation, hint };
    }

    // 渲染练习题
    renderExercise() {
        this.generateExercise();
        const ex = this.currentExercise;
        const container = document.getElementById('multiplicationPractice');
        if (!container) return;
        container.innerHTML = `
            <div class="practice-content">
                <h4>✏️ 乘法练习</h4>
                <div class="practice-info">
                    <span class="exercise-type">题型：${ex.type === 'mental_calculation' ? '口算' : ex.type === 'written_calculation' ? '笔算' : '应用题'}</span>
                </div>
                <div class="exercise-card">
                    <div class="question">
                        <h5>${ex.question}</h5>
                        <div class="answer-input">
                            <input type="number" id="mulAnswer" placeholder="请输入答案">
                            <button onclick="multiplicationAdvancedUnit.checkAnswer()" class="check-btn">检查答案</button>
                        </div>
                    </div>
                    <div class="hint"><p><strong>提示：</strong>${ex.hint}</p></div>
                </div>
                <div class="practice-controls">
                    <button onclick="multiplicationAdvancedUnit.renderExercise()" class="next-btn">下一题</button>
                </div>
                <div id="mulFeedback" class="feedback"></div>
            </div>
        `;
    }

    // 检查答案
    checkAnswer() {
        const input = document.getElementById('mulAnswer');
        if (!input) return;
        const val = Number(input.value);
        const ex = this.currentExercise;
        const feedback = document.getElementById('mulFeedback');
        if (val === ex.answer) {
            feedback.innerHTML = '<span style="color:var(--primary-color);font-weight:bold;">回答正确！</span>';
        } else {
            feedback.innerHTML = `<span style="color:#c0392b;">回答错误，正确答案：${ex.answer}。<br>解析：${ex.explanation}</span>`;
        }
    }

    // 下一题
    nextExercise() {
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        this.currentExercise = (this.currentExercise + 1) % exercises.length;
        
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.querySelector('.next-btn').style.display = 'none';
        
        // 重新渲染练习内容
        const stageContent = document.querySelector('.stage-content');
        if (stageContent) {
            stageContent.innerHTML = this.getPracticeContent();
        }
    }

    // 切换主题
    switchTopic(topicId) {
        this.currentTopic = topicId;
        this.currentExercise = 0;
        this.score = 0;
    }

    // 切换阶段
    switchStage(stage) {
        this.currentStage = stage;
        this.currentExercise = 0;
    }
}

// 创建全局实例
let multiplicationAdvancedUnit;
document.addEventListener('DOMContentLoaded', function() {
    multiplicationAdvancedUnit = new MultiplicationAdvancedUnit();
});

