// 数学游戏工具

class MathGame {
    constructor() {
        this.currentGame = 'number-guess';
        this.score = 0;
        this.level = 1;
        this.isPlaying = false;
        this.gameData = {};
        this.highScores = this.loadHighScores();
    }

    // 创建数学游戏界面
    createMathGameInterface() {
        return `
            <div class="math-game-container">
                <div class="math-game-tool">
                    <div class="math-game-header">
                        <h4>🎮 数学游戏</h4>
                        <button class="close-tool" onclick="mathGame.closeTool()">×</button>
                    </div>
                    
                    <div class="math-game-main">
                        <div class="game-selection">
                            <h5>选择游戏</h5>
                            <div class="game-buttons">
                                <button class="game-btn active" onclick="mathGame.selectGame('number-guess')">数字猜谜</button>
                                <button class="game-btn" onclick="mathGame.selectGame('math-race')">数学竞速</button>
                                <button class="game-btn" onclick="mathGame.selectGame('pattern-find')">找规律</button>
                            </div>
                        </div>
                        
                        <div class="game-area">
                            <div class="game-info">
                                <div class="score-display">
                                    <span>得分：<span id="currentScore">0</span></span>
                                    <span>等级：<span id="currentLevel">1</span></span>
                                </div>
                                <div class="game-controls">
                                    <button onclick="mathGame.startGame()" class="start-btn" id="startBtn">开始游戏</button>
                                    <button onclick="mathGame.pauseGame()" class="pause-btn" id="pauseBtn" style="display: none;">暂停</button>
                                    <button onclick="mathGame.resetGame()" class="reset-btn">重置</button>
                                </div>
                            </div>
                            
                            <div id="gameContent" class="game-content">
                                ${this.createNumberGuessGame()}
                            </div>
                        </div>
                        
                        <div class="game-panel">
                            <div class="panel-section">
                                <h5>游戏说明</h5>
                                <div id="gameInstructions" class="game-instructions">
                                    <p>猜数字游戏：系统会生成一个数字，你需要通过提示来猜出这个数字。</p>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>最高分</h5>
                                <div id="highScoresList" class="high-scores-list">
                                    ${this.renderHighScores()}
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>学习提示</h5>
                                <div class="learning-tips">
                                    <div class="tip-item">
                                        <strong>数字猜谜：</strong>使用二分法快速缩小范围
                                    </div>
                                    <div class="tip-item">
                                        <strong>数学竞速：</strong>提高心算速度和准确性
                                    </div>
                                    <div class="tip-item">
                                        <strong>找规律：</strong>观察数字的变化模式
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化数学游戏
    init() {
        this.updateDisplay();
    }

    // 选择游戏
    selectGame(gameType) {
        this.currentGame = gameType;
        
        // 更新按钮状态
        document.querySelectorAll('.game-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // 更新游戏内容
        this.updateGameContent();
        this.updateInstructions();
        
        this.showMessage(`已选择${this.getGameName(gameType)}`);
    }

    // 获取游戏名称
    getGameName(gameType) {
        const names = {
            'number-guess': '数字猜谜',
            'math-race': '数学竞速',
            'pattern-find': '找规律'
        };
        return names[gameType] || gameType;
    }

    // 更新游戏内容
    updateGameContent() {
        const gameContent = document.getElementById('gameContent');
        if (!gameContent) return;
        
        switch (this.currentGame) {
            case 'number-guess':
                gameContent.innerHTML = this.createNumberGuessGame();
                break;
            case 'math-race':
                gameContent.innerHTML = this.createMathRaceGame();
                break;
            case 'pattern-find':
                gameContent.innerHTML = this.createPatternFindGame();
                break;
        }
    }

    // 更新游戏说明
    updateInstructions() {
        const instructions = document.getElementById('gameInstructions');
        if (!instructions) return;
        
        const instructionTexts = {
            'number-guess': '猜数字游戏：系统会生成一个数字，你需要通过提示来猜出这个数字。每次猜测后，系统会告诉你数字是大了还是小了。',
            'math-race': '数学竞速：快速计算数学题目，在规定时间内答对越多题目得分越高。',
            'pattern-find': '找规律：观察数字序列的规律，找出下一个数字。'
        };
        
        instructions.innerHTML = `<p>${instructionTexts[this.currentGame]}</p>`;
    }

    // 创建数字猜谜游戏
    createNumberGuessGame() {
        return `
            <div class="number-guess-game">
                <div class="game-title">数字猜谜</div>
                <div class="game-status">
                    <p id="guessStatus">请点击开始游戏</p>
                    <p id="guessCount">猜测次数：0</p>
                </div>
                <div class="guess-input">
                    <input type="number" id="guessInput" placeholder="输入你的猜测" min="1" max="100">
                    <button onclick="mathGame.makeGuess()" class="guess-btn">猜测</button>
                </div>
                <div id="guessHistory" class="guess-history"></div>
            </div>
        `;
    }

    // 创建数学竞速游戏
    createMathRaceGame() {
        return `
            <div class="math-race-game">
                <div class="game-title">数学竞速</div>
                <div class="game-status">
                    <p id="raceStatus">准备开始</p>
                    <p id="raceTimer">时间：60秒</p>
                    <p id="raceScore">得分：0</p>
                </div>
                <div class="race-question">
                    <div id="raceQuestion" class="question-display">点击开始游戏</div>
                    <input type="number" id="raceAnswer" placeholder="输入答案">
                    <button onclick="mathGame.submitRaceAnswer()" class="submit-btn">提交</button>
                </div>
                <div id="raceHistory" class="race-history"></div>
            </div>
        `;
    }

    // 创建找规律游戏
    createPatternFindGame() {
        return `
            <div class="pattern-find-game">
                <div class="game-title">找规律</div>
                <div class="game-status">
                    <p id="patternStatus">观察数字规律</p>
                    <p id="patternLevel">等级：1</p>
                </div>
                <div class="pattern-sequence">
                    <div id="patternNumbers" class="number-sequence"></div>
                    <input type="number" id="patternAnswer" placeholder="下一个数字是？">
                    <button onclick="mathGame.submitPatternAnswer()" class="submit-btn">提交</button>
                </div>
                <div id="patternHistory" class="pattern-history"></div>
            </div>
        `;
    }

    // 开始游戏
    startGame() {
        this.isPlaying = true;
        this.score = 0;
        this.level = 1;
        
        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'inline-block';
        
        this.initializeGame();
        this.showMessage('游戏开始！');
    }

    // 暂停游戏
    pauseGame() {
        this.isPlaying = false;
        document.getElementById('startBtn').style.display = 'inline-block';
        document.getElementById('pauseBtn').style.display = 'none';
        this.showMessage('游戏已暂停');
    }

    // 重置游戏
    resetGame() {
        this.isPlaying = false;
        this.score = 0;
        this.level = 1;
        this.gameData = {};
        
        document.getElementById('startBtn').style.display = 'inline-block';
        document.getElementById('pauseBtn').style.display = 'none';
        
        this.updateGameContent();
        this.updateDisplay();
        this.showMessage('游戏已重置');
    }

    // 初始化游戏
    initializeGame() {
        switch (this.currentGame) {
            case 'number-guess':
                this.initNumberGuess();
                break;
            case 'math-race':
                this.initMathRace();
                break;
            case 'pattern-find':
                this.initPatternFind();
                break;
        }
    }

    // 初始化数字猜谜
    initNumberGuess() {
        this.gameData.targetNumber = Math.floor(Math.random() * 100) + 1;
        this.gameData.guessCount = 0;
        this.gameData.guessHistory = [];
        
        document.getElementById('guessStatus').textContent = '我已经想好了一个1-100之间的数字，请开始猜测！';
        document.getElementById('guessCount').textContent = '猜测次数：0';
        document.getElementById('guessHistory').innerHTML = '';
        document.getElementById('guessInput').value = '';
    }

    // 进行猜测
    makeGuess() {
        if (!this.isPlaying) return;
        
        const input = document.getElementById('guessInput');
        const guess = parseInt(input.value);
        
        if (isNaN(guess) || guess < 1 || guess > 100) {
            this.showMessage('请输入1-100之间的有效数字！');
            return;
        }
        
        this.gameData.guessCount++;
        this.gameData.guessHistory.push(guess);
        
        const status = document.getElementById('guessStatus');
        const count = document.getElementById('guessCount');
        const history = document.getElementById('guessHistory');
        
        count.textContent = `猜测次数：${this.gameData.guessCount}`;
        
        if (guess === this.gameData.targetNumber) {
            status.textContent = '恭喜你猜对了！';
            this.score += Math.max(100 - this.gameData.guessCount * 10, 10);
            this.updateDisplay();
            this.saveHighScore();
            this.showMessage(`恭喜！用了${this.gameData.guessCount}次就猜对了！`);
            this.isPlaying = false;
        } else if (guess < this.gameData.targetNumber) {
            status.textContent = '太小了，再试试！';
        } else {
            status.textContent = '太大了，再试试！';
        }
        
        // 更新历史记录
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = `第${this.gameData.guessCount}次：${guess} (${guess < this.gameData.targetNumber ? '太小' : '太大'})`;
        history.appendChild(historyItem);
        
        input.value = '';
        input.focus();
    }

    // 初始化数学竞速
    initMathRace() {
        this.gameData.timeLeft = 60;
        this.gameData.correctAnswers = 0;
        this.gameData.totalQuestions = 0;
        this.gameData.currentQuestion = null;
        
        this.generateRaceQuestion();
        this.startRaceTimer();
    }

    // 生成竞速题目
    generateRaceQuestion() {
        const operations = ['+', '-', '×'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let num1, num2, answer;
        
        switch (operation) {
            case '+':
                num1 = Math.floor(Math.random() * 50) + 1;
                num2 = Math.floor(Math.random() * 50) + 1;
                answer = num1 + num2;
                break;
            case '-':
                num1 = Math.floor(Math.random() * 50) + 25;
                num2 = Math.floor(Math.random() * num1) + 1;
                answer = num1 - num2;
                break;
            case '×':
                num1 = Math.floor(Math.random() * 12) + 1;
                num2 = Math.floor(Math.random() * 12) + 1;
                answer = num1 * num2;
                break;
        }
        
        this.gameData.currentQuestion = { num1, num2, operation, answer };
        
        const questionDisplay = document.getElementById('raceQuestion');
        if (questionDisplay) {
            questionDisplay.textContent = `${num1} ${operation} ${num2} = ?`;
        }
    }

    // 开始竞速计时器
    startRaceTimer() {
        this.raceTimer = setInterval(() => {
            if (this.isPlaying) {
                this.gameData.timeLeft--;
                const timerDisplay = document.getElementById('raceTimer');
                if (timerDisplay) {
                    timerDisplay.textContent = `时间：${this.gameData.timeLeft}秒`;
                }
                
                if (this.gameData.timeLeft <= 0) {
                    this.endRaceGame();
                }
            }
        }, 1000);
    }

    // 提交竞速答案
    submitRaceAnswer() {
        if (!this.isPlaying || !this.gameData.currentQuestion) return;
        
        const input = document.getElementById('raceAnswer');
        const userAnswer = parseInt(input.value);
        
        if (isNaN(userAnswer)) {
            this.showMessage('请输入有效数字！');
            return;
        }
        
        this.gameData.totalQuestions++;
        
        if (userAnswer === this.gameData.currentQuestion.answer) {
            this.gameData.correctAnswers++;
            this.score += 10;
            this.showMessage('✓ 正确！');
        } else {
            this.showMessage(`✗ 错误！正确答案是：${this.gameData.currentQuestion.answer}`);
        }
        
        this.updateDisplay();
        this.generateRaceQuestion();
        input.value = '';
        input.focus();
    }

    // 结束竞速游戏
    endRaceGame() {
        clearInterval(this.raceTimer);
        this.isPlaying = false;
        
        const accuracy = this.gameData.totalQuestions > 0 ? 
            Math.round((this.gameData.correctAnswers / this.gameData.totalQuestions) * 100) : 0;
        
        this.showMessage(`游戏结束！正确率：${accuracy}%，得分：${this.score}`);
        this.saveHighScore();
    }

    // 初始化找规律
    initPatternFind() {
        this.gameData.currentPattern = this.generatePattern();
        this.gameData.patternLevel = 1;
        this.gameData.correctAnswers = 0;
        
        this.displayPattern();
    }

    // 生成规律
    generatePattern() {
        const patterns = [
            { sequence: [2, 4, 6, 8, 10], rule: '每次加2', answer: 12 },
            { sequence: [1, 3, 6, 10, 15], rule: '每次加的数递增1', answer: 21 },
            { sequence: [1, 2, 4, 8, 16], rule: '每次乘2', answer: 32 },
            { sequence: [1, 4, 9, 16, 25], rule: '平方数', answer: 36 }
        ];
        
        return patterns[Math.floor(Math.random() * patterns.length)];
    }

    // 显示规律
    displayPattern() {
        const numbersDisplay = document.getElementById('patternNumbers');
        if (numbersDisplay) {
            numbersDisplay.innerHTML = this.gameData.currentPattern.sequence.map(num => 
                `<span class="pattern-number">${num}</span>`
            ).join(' → ') + ' → ?';
        }
    }

    // 提交规律答案
    submitPatternAnswer() {
        if (!this.isPlaying) return;
        
        const input = document.getElementById('patternAnswer');
        const userAnswer = parseInt(input.value);
        
        if (isNaN(userAnswer)) {
            this.showMessage('请输入有效数字！');
            return;
        }
        
        if (userAnswer === this.gameData.currentPattern.answer) {
            this.gameData.correctAnswers++;
            this.score += 20;
            this.gameData.patternLevel++;
            this.showMessage('✓ 正确！规律是：' + this.gameData.currentPattern.rule);
        } else {
            this.showMessage(`✗ 错误！正确答案是：${this.gameData.currentPattern.answer}`);
        }
        
        this.updateDisplay();
        this.gameData.currentPattern = this.generatePattern();
        this.displayPattern();
        input.value = '';
        input.focus();
    }

    // 更新显示
    updateDisplay() {
        const scoreDisplay = document.getElementById('currentScore');
        const levelDisplay = document.getElementById('currentLevel');
        
        if (scoreDisplay) scoreDisplay.textContent = this.score;
        if (levelDisplay) levelDisplay.textContent = this.level;
    }

    // 保存最高分
    saveHighScore() {
        const gameName = this.getGameName(this.currentGame);
        const currentHigh = this.highScores[gameName] || 0;
        
        if (this.score > currentHigh) {
            this.highScores[gameName] = this.score;
            localStorage.setItem('mathGameHighScores', JSON.stringify(this.highScores));
            this.updateHighScoresDisplay();
            this.showMessage(`新的最高分：${this.score}！`);
        }
    }

    // 加载最高分
    loadHighScores() {
        const saved = localStorage.getItem('mathGameHighScores');
        return saved ? JSON.parse(saved) : {};
    }

    // 渲染最高分
    renderHighScores() {
        const gameNames = ['数字猜谜', '数学竞速', '找规律'];
        return gameNames.map(name => {
            const score = this.highScores[name] || 0;
            return `<div class="high-score-item">
                <span class="game-name">${name}</span>
                <span class="high-score">${score}</span>
            </div>`;
        }).join('');
    }

    // 更新最高分显示
    updateHighScoresDisplay() {
        const highScoresList = document.getElementById('highScoresList');
        if (highScoresList) {
            highScoresList.innerHTML = this.renderHighScores();
        }
    }

    // 显示消息
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'math-game-message';
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
        if (this.raceTimer) {
            clearInterval(this.raceTimer);
        }
        
        const toolModal = document.getElementById('toolModal');
        if (toolModal) {
            toolModal.remove();
        }
    }
}

// 创建全局实例
const mathGame = new MathGame(); 