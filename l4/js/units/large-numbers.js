// 大数的认识 - 学习单元

class LargeNumbersUnit {
    constructor() {
        this.unitId = 'large-numbers';
        this.unitName = '大数的认识';
        this.topics = [
            { id: 'reading_writing', name: '万以上数的读写', difficulty: 2 },
            { id: 'place_value', name: '数位和计数单位', difficulty: 2 },
            { id: 'comparison', name: '数的大小比较', difficulty: 3 },
            { id: 'approximation', name: '近似数', difficulty: 3 }
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
                <h4>🔢 大数的认识</h4>
                <div class="concept-section">
                    <h5>数位表</h5>
                    <div class="place-value-chart">
                        <table class="place-value-table">
                            <tr>
                                <th colspan="4">万级</th>
                                <th colspan="4">个级</th>
                            </tr>
                            <tr>
                                <td>千万位</td>
                                <td>百万位</td>
                                <td>十万位</td>
                                <td>万位</td>
                                <td>千位</td>
                                <td>百位</td>
                                <td>十位</td>
                                <td>个位</td>
                            </tr>
                            <tr class="example-number">
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                                <td>6</td>
                                <td>7</td>
                                <td>8</td>
                            </tr>
                        </table>
                        <p class="reading-example">读作：一千二百三十四万五千六百七十八</p>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>计数单位</h5>
                    <div class="counting-units">
                        <div class="unit-item">
                            <span class="unit-value">1</span>
                            <span class="unit-name">个</span>
                        </div>
                        <div class="unit-item">
                            <span class="unit-value">10</span>
                            <span class="unit-name">十</span>
                        </div>
                        <div class="unit-item">
                            <span class="unit-value">100</span>
                            <span class="unit-name">百</span>
                        </div>
                        <div class="unit-item">
                            <span class="unit-value">1,000</span>
                            <span class="unit-name">千</span>
                        </div>
                        <div class="unit-item">
                            <span class="unit-value">10,000</span>
                            <span class="unit-name">万</span>
                        </div>
                        <div class="unit-item">
                            <span class="unit-value">100,000</span>
                            <span class="unit-name">十万</span>
                        </div>
                    </div>
                </div>

                <div class="key-points">
                    <h5>🎯 重点提示</h5>
                    <ul>
                        <li>读数时，万级的数按照个级的读法来读，再在后面加上"万"字</li>
                        <li>数中间有0时，要读出"零"，但末尾的0不读</li>
                        <li>写数时，哪一位上一个单位也没有，就在那一位上写0</li>
                    </ul>
                </div>
            </div>
        `;
    }

    // 生成可视化内容
    getVisualizationContent() {
        return `
            <div class="visualization-content">
                <h4>🎨 数字可视化</h4>
                
                <div class="number-builder">
                    <h5>数字构建器</h5>
                    <div class="builder-controls">
                        <div class="digit-selector">
                            <label>选择数字：</label>
                            <input type="number" id="numberInput" placeholder="输入一个大数" max="99999999" min="10000">
                            <button onclick="largeNumbersUnit.visualizeNumber()">可视化</button>
                        </div>
                    </div>
                    
                    <div id="numberVisualization" class="number-display">
                        <div class="placeholder">请输入一个万以上的数字</div>
                    </div>
                </div>

                <div class="comparison-tool">
                    <h5>数字比较工具</h5>
                    <div class="comparison-inputs">
                        <input type="number" id="num1" placeholder="第一个数" min="10000">
                        <select id="comparisonOperator">
                            <option value="">选择</option>
                            <option value=">">&gt;</option>
                            <option value="<">&lt;</option>
                            <option value="=">=</option>
                        </select>
                        <input type="number" id="num2" placeholder="第二个数" min="10000">
                        <button onclick="largeNumbersUnit.compareNumbers()">比较</button>
                    </div>
                    <div id="comparisonResult" class="result-display"></div>
                </div>
            </div>
        `;
    }

    // 练习题状态
    currentPracticeIndex = 0;
    currentScore = 0;

    renderPracticeQuestion() {
        // 只生成一次题目并保存
        const questions = this.getPracticeQuestions();
        const q = questions[this.currentPracticeIndex];
        this.currentPracticeQuestion = q; // 保存当前题目
        const container = document.getElementById('practiceQuestion');
        if (!container) return;
        let optionsHtml = '';
        q.options.forEach((opt, idx) => {
            optionsHtml += `<div class="practice-option"><label><input type="radio" name="practiceOption" value="${idx}"> ${opt}</label></div>`;
        });
        container.innerHTML = `
            <div class="practice-q">${q.question}</div>
            <div class="practice-options">${optionsHtml}</div>
        `;
        document.getElementById('currentQuestion').textContent = this.currentPracticeIndex + 1;
        document.getElementById('totalQuestions').textContent = 1; // 只显示1题
        document.getElementById('currentScore').textContent = this.currentScore;
        document.getElementById('answerFeedback').innerHTML = '';
        document.getElementById('checkAnswerBtn').disabled = false;
        document.getElementById('nextQuestionBtn').style.display = 'none';
    }

    checkCurrentAnswer() {
        const q = this.currentPracticeQuestion; // 直接用已保存的题目
        const checked = document.querySelector('input[name="practiceOption"]:checked');
        const feedback = document.getElementById('answerFeedback');
        if (!checked) {
            feedback.innerHTML = '<span class="incorrect">请选择一个答案</span>';
            return;
        }
        const idx = parseInt(checked.value);
        if (idx === q.correct) {
            feedback.innerHTML = '<span class="correct">✅ 回答正确！</span><br>' + q.explanation;
            this.currentScore += 1;
        } else {
            feedback.innerHTML = '<span class="incorrect">❌ 回答错误。</span><br>正确答案：' + q.options[q.correct] + '<br>' + q.explanation;
        }
        document.getElementById('currentScore').textContent = this.currentScore;
        document.getElementById('checkAnswerBtn').disabled = true;
        document.getElementById('nextQuestionBtn').style.display = '';
    }

    nextQuestion() {
        // 每次都生成新题，currentPracticeIndex始终为0
        this.currentPracticeIndex = 0;
        this.renderPracticeQuestion();
    }

    showHint() {
        const q = this.currentPracticeQuestion; // 直接用已保存的题目
        const feedback = document.getElementById('answerFeedback');
        feedback.innerHTML = '<span class="hint">提示：' + (q.explanation || '请认真思考哦！') + '</span>';
    }

    // 生成练习内容
    getPracticeContent() {
        setTimeout(() => { this.currentPracticeIndex = 0; this.currentScore = 0; this.renderPracticeQuestion(); }, 0);
        return `
            <div class="practice-content">
                <h4>✏️ 练习题</h4>
                <div class="practice-section">
                    <div class="question-counter">
                        <span>题目 <span id="currentQuestion">1</span> / <span id="totalQuestions">5</span></span>
                        <span class="score">得分: <span id="currentScore">0</span></span>
                    </div>
                    <div id="practiceQuestion" class="question-container"></div>
                    <div class="practice-controls">
                        <button id="checkAnswerBtn" onclick="largeNumbersUnit.checkCurrentAnswer()">检查答案</button>
                        <button id="nextQuestionBtn" onclick="largeNumbersUnit.nextQuestion()" style="display:none;">下一题</button>
                        <button id="showHintBtn" onclick="largeNumbersUnit.showHint()">提示</button>
                    </div>
                    <div id="answerFeedback" class="feedback-container"></div>
                </div>
            </div>
        `;
    }

    // 生成扩展内容
    getExtensionContent() {
        return `
            <div class="extension-content">
                <h4>🚀 扩展知识</h4>
                
                <div class="extension-section">
                    <h5>🌍 生活中的大数</h5>
                    <div class="real-world-examples">
                        <div class="example-card">
                            <div class="example-icon">🏙️</div>
                            <h6>中国人口</h6>
                            <p>约 <span class="big-number">1,400,000,000</span> 人</p>
                            <p class="reading">读作：十四亿</p>
                        </div>
                        
                        <div class="example-card">
                            <div class="example-icon">🌍</div>
                            <h6>地球到太阳的距离</h6>
                            <p>约 <span class="big-number">150,000,000</span> 千米</p>
                            <p class="reading">读作：一亿五千万千米</p>
                        </div>
                        
                        <div class="example-card">
                            <div class="example-icon">💰</div>
                            <h6>一栋大楼的价格</h6>
                            <p>约 <span class="big-number">50,000,000</span> 元</p>
                            <p class="reading">读作：五千万元</p>
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🎯 挑战游戏</h5>
                    <div class="challenge-game">
                        <div class="game-description">
                            <p>数字猜猜看：我会想一个万以上的数，你来猜猜看！</p>
                        </div>
                        <div class="game-controls">
                            <button onclick="largeNumbersUnit.startGuessingGame()">开始游戏</button>
                        </div>
                        <div id="guessingGame" class="game-area" style="display:none;">
                            <!-- 游戏内容将动态加载 -->
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>📚 数学小知识</h5>
                    <div class="math-facts">
                        <div class="fact-item">
                            <h6>古代的计数方法</h6>
                            <p>古代中国人用算筹来表示大数，这是世界上最早的十进制计数系统之一。</p>
                        </div>
                        <div class="fact-item">
                            <h6>数字的起源</h6>
                            <p>我们现在使用的阿拉伯数字实际上起源于印度，后来通过阿拉伯传播到世界各地。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 可视化数字
    visualizeNumber() {
        const input = document.getElementById('numberInput');
        const display = document.getElementById('numberVisualization');
        const number = parseInt(input.value);
        
        if (!number || number < 10000) {
            display.innerHTML = '<div class="error">请输入一个万以上的数字</div>';
            return;
        }
        
        const numberStr = number.toLocaleString();
        const digits = number.toString().split('').reverse();
        const positions = ['个位', '十位', '百位', '千位', '万位', '十万位', '百万位', '千万位'];
        
        let visualization = `
            <div class="number-breakdown">
                <div class="original-number">数字: ${numberStr}</div>
                <div class="digit-analysis">
        `;
        
        digits.forEach((digit, index) => {
            if (index < positions.length) {
                visualization += `
                    <div class="digit-item">
                        <span class="digit">${digit}</span>
                        <span class="position">${positions[index]}</span>
                    </div>
                `;
            }
        });
        
        visualization += `
                </div>
                <div class="reading-text">
                    读作: ${this.numberToChineseReading(number)}
                </div>
            </div>
        `;
        
        display.innerHTML = visualization;
    }

    // 数字转中文读法
    numberToChineseReading(number) {
        const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千', '万', '十万', '百万', '千万'];
        
        // 简化版本，实际实现会更复杂
        const str = number.toString();
        let result = '';
        
        // 这里可以实现完整的数字转中文逻辑
        // 为了简化，返回一个基本的转换
        return `${str.charAt(0) !== '0' ? digits[parseInt(str.charAt(0))] : ''}千万...`; // 简化版本
    }

    // 辅助函数：数字转中文读法（简化版）
    numberToChineseReadingFull(number) {
        // 这里只实现简单的万以上数字转中文，实际可根据需要扩展
        const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
        const units = ['', '十', '百', '千', '万', '十万', '百万', '千万'];
        let str = number.toString();
        let result = '';
        for (let i = 0; i < str.length; i++) {
            let n = parseInt(str[i]);
            let unit = units[str.length - i - 1];
            if (n !== 0) {
                result += digits[n] + unit;
            } else {
                // 避免连续多个零
                if (!result.endsWith('零') && i !== str.length - 1) {
                    result += '零';
                }
            }
        }
        // 去除末尾多余的零
        result = result.replace(/零+$/g, '');
        // 处理特殊情况
        result = result.replace(/零+/g, '零');
        return result;
    }

    // 辅助函数：生成随机整数（闭区间）
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // 比较数字
    compareNumbers() {
        const num1 = parseInt(document.getElementById('num1').value);
        const num2 = parseInt(document.getElementById('num2').value);
        const operator = document.getElementById('comparisonOperator').value;
        const resultDiv = document.getElementById('comparisonResult');
        
        if (!num1 || !num2 || !operator) {
            resultDiv.innerHTML = '<div class="error">请填写完整信息</div>';
            return;
        }
        
        let isCorrect = false;
        let correctOperator = '';
        
        if (num1 > num2) correctOperator = '>';
        else if (num1 < num2) correctOperator = '<';
        else correctOperator = '=';
        
        isCorrect = operator === correctOperator;
        
        resultDiv.innerHTML = `
            <div class="comparison-result ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="result-text">
                    ${num1.toLocaleString()} ${operator} ${num2.toLocaleString()}
                </div>
                <div class="result-feedback">
                    ${isCorrect ? '✅ 正确！' : `❌ 错误，正确答案是 ${correctOperator}`}
                </div>
            </div>
        `;
        
        if (isCorrect && learningSystem) {
            learningSystem.awardPoints(20, '比较数字正确');
        }
    }

    // 动态生成练习题
    getPracticeQuestions() {
        // 题型1：读数写数
        const generateReadNumberQuestion = () => {
            const num = this.randomInt(100000, 9999999); // 6~7位数
            const answer = this.numberToChineseReadingFull(num);
            // 干扰项：随机变换部分数字
            let options = [answer];
            for (let i = 0; i < 3; i++) {
                let fakeNum = num + this.randomInt(-1000, 1000);
                if (fakeNum < 100000) fakeNum = 100000;
                let fakeAnswer = this.numberToChineseReadingFull(fakeNum);
                if (!options.includes(fakeAnswer)) options.push(fakeAnswer);
            }
            // 打乱选项
            options = options.sort(() => Math.random() - 0.5);
            const correct = options.indexOf(answer);
            return {
                type: 'reading',
                question: `数字 <b>${num}</b> 的正确读法是？`,
                options,
                correct,
                explanation: `从左到右按位读数：${answer}`
            };
        };

        // 题型2：数位判断
        const generateDigitPositionQuestion = () => {
            const num = this.randomInt(100000, 9999999);
            const numStr = num.toString();
            const pos = this.randomInt(0, numStr.length - 1);
            const digit = numStr[pos];
            const positions = ['个位', '十位', '百位', '千位', '万位', '十万位', '百万位', '千万位'];
            const answer = positions[numStr.length - pos - 1];
            // 干扰项
            let options = [answer];
            while (options.length < 4) {
                let fake = positions[this.randomInt(0, positions.length - 1)];
                if (!options.includes(fake)) options.push(fake);
            }
            options = options.sort(() => Math.random() - 0.5);
            const correct = options.indexOf(answer);
            return {
                type: 'position',
                question: `在数字 <b>${num}</b> 中，<b>${digit}</b> 在什么位上？`,
                options,
                correct,
                explanation: `从右往左数，第${numStr.length - pos}位是${answer}`
            };
        };

        // 题型3：大小比较
        const generateCompareQuestion = () => {
            let a = this.randomInt(100000, 9999999);
            let b = this.randomInt(100000, 9999999);
            while (a === b) b = this.randomInt(100000, 9999999);
            const answer = a > b ? '>' : '<';
            let options = ['>', '<', '=', '无法比较'];
            const correct = options.indexOf(answer);
            return {
                type: 'comparison',
                question: `比较大小：<b>${a}</b> ○ <b>${b}</b>`,
                options,
                correct,
                explanation: `${a} ${answer} ${b}`
            };
        };

        // 随机选择题型
        const types = [generateReadNumberQuestion, generateDigitPositionQuestion, generateCompareQuestion];
        const idx = this.randomInt(0, types.length - 1);
        return [types[idx]()]; // 返回单题数组，兼容原有逻辑
    }

    // 开始猜数游戏
    startGuessingGame() {
        const gameArea = document.getElementById('guessingGame');
        this.targetNumber = Math.floor(Math.random() * 90000) + 10000; // 10000-99999
        this.guessCount = 0;
        this.maxGuesses = 7;
        
        gameArea.style.display = 'block';
        gameArea.innerHTML = `
            <div class="guessing-interface">
                <p>我想了一个 10000 到 99999 之间的数，你有 ${this.maxGuesses} 次机会猜中它！</p>
                <div class="guess-input">
                    <input type="number" id="guessInput" min="10000" max="99999" placeholder="输入你的猜测">
                    <button onclick="largeNumbersUnit.makeGuess()">猜测</button>
                </div>
                <div id="guessHistory" class="guess-history"></div>
                <div class="guess-counter">剩余次数: <span id="remainingGuesses">${this.maxGuesses}</span></div>
            </div>
        `;
    }

    // 进行猜测
    makeGuess() {
        const guessInput = document.getElementById('guessInput');
        const guess = parseInt(guessInput.value);
        const historyDiv = document.getElementById('guessHistory');
        const remainingSpan = document.getElementById('remainingGuesses');
        
        if (!guess || guess < 10000 || guess > 99999) {
            alert('请输入一个 10000 到 99999 之间的数字');
            return;
        }
        
        this.guessCount++;
        const remaining = this.maxGuesses - this.guessCount;
        remainingSpan.textContent = remaining;
        
        let feedback = '';
        if (guess === this.targetNumber) {
            feedback = `🎉 恭喜！你猜对了！答案就是 ${this.targetNumber}`;
            if (learningSystem) {
                learningSystem.awardPoints(100, `猜数游戏胜利（${this.guessCount}次）`);
            }
        } else if (guess < this.targetNumber) {
            feedback = `📈 太小了！答案比 ${guess} 大`;
        } else {
            feedback = `📉 太大了！答案比 ${guess} 小`;
        }
        
        historyDiv.innerHTML += `
            <div class="guess-item">
                <span class="guess-number">${guess}</span>
                <span class="guess-feedback">${feedback}</span>
            </div>
        `;
        
        if (guess === this.targetNumber || remaining === 0) {
            if (remaining === 0 && guess !== this.targetNumber) {
                historyDiv.innerHTML += `<div class="game-over">游戏结束！答案是 ${this.targetNumber}</div>`;
            }
            guessInput.disabled = true;
        }
        
        guessInput.value = '';
    }
}

// 创建单元实例
let largeNumbersUnit;
document.addEventListener('DOMContentLoaded', function() {
    largeNumbersUnit = new LargeNumbersUnit();
});