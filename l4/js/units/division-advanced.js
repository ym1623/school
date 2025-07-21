// 第六单元：除数是两位数的除法学习模块

class DivisionAdvanced {
    constructor() {
        this.unitId = 'division-advanced';
        this.currentTopic = 'oral-division';
        this.currentStage = 'explanation';
        this.topics = {
            'oral-division': {
                title: '口算除法',
                description: '掌握整十数除法的口算技巧'
            },
            'written-division': {
                title: '笔算除法',
                description: '学会除数是两位数的笔算除法'
            },
            'division-application': {
                title: '除法的应用',
                description: '运用除法解决实际生活问题'
            },
            'quotient-patterns': {
                title: '商的变化规律',
                description: '理解和应用除法中商的变化规律'
            }
        };
        this.stages = ['explanation', 'visualization', 'practice', 'extension'];
        this.currentExercise = 0;
        this.score = 0;
        this.exercises = [];
    }

    // 初始化单元
    init() {
        this.generateExercises();
        this.render();
    }

    // 渲染单元内容
    render() {
        const content = this.generateContent();
        const modal = document.getElementById('learningModal');
        if (modal) {
            modal.innerHTML = content;
            modal.style.display = 'flex';
        }
    }

    // 生成内容
    generateContent() {
        const topic = this.topics[this.currentTopic];
        
        return `
            <div class="modal-content division-advanced-modal">
                <div class="modal-header">
                    <h2>第六单元：除数是两位数的除法</h2>
                    <button class="close-btn" onclick="closeLearningModal()">&times;</button>
                </div>
                
                <div class="unit-nav">
                    <div class="topic-selector">
                        ${Object.entries(this.topics).map(([key, topic]) => `
                            <button class="topic-btn ${this.currentTopic === key ? 'active' : ''}" 
                                    onclick="divisionAdvanced.switchTopic('${key}')">
                                ${topic.title}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="stage-selector">
                        ${this.stages.map(stage => `
                            <button class="stage-btn ${this.currentStage === stage ? 'active' : ''}" 
                                    onclick="divisionAdvanced.switchStage('${stage}')">
                                ${this.getStageTitle(stage)}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="unit-content">
                    <div class="topic-info">
                        <h3>${topic.title}</h3>
                        <p class="topic-description">${topic.description}</p>
                    </div>
                    
                    <div class="stage-content">
                        ${this.generateStageContent()}
                    </div>
                </div>
            </div>
        `;
    }

    // 生成阶段内容
    generateStageContent() {
        const method = `generate${this.currentTopic.charAt(0).toUpperCase() + this.currentTopic.slice(1).replace(/-([a-z])/g, (g) => g[1].toUpperCase())}${this.currentStage.charAt(0).toUpperCase() + this.currentStage.slice(1)}`;
        
        if (typeof this[method] === 'function') {
            return this[method]();
        }
        return '<p>内容加载中...</p>';
    }

    // 获取阶段标题
    getStageTitle(stage) {
        const titles = {
            'explanation': '基础解释',
            'visualization': '可视化理解', 
            'practice': '步骤练习',
            'extension': '扩展知识'
        };
        return titles[stage] || stage;
    }

    // 切换主题
    switchTopic(topicId) {
        this.currentTopic = topicId;
        this.currentStage = 'explanation';
        this.currentExercise = 0;
        this.render();
    }

    // 切换阶段
    switchStage(stage) {
        this.currentStage = stage;
        this.currentExercise = 0;
        this.render();
    }

    // === 口算除法内容 ===

    // 口算除法 - 基础解释
    generateOralDivisionExplanation() {
        return `
            <div class="explanation-content">
                <h4>口算除法的基础知识</h4>
                
                <div class="concept-card">
                    <h5>整十数除法</h5>
                    <p>整十数除法是指被除数或除数是整十数的除法运算。</p>
                    <div class="division-types">
                        <div class="type">
                            <h6>被除数是整十数</h6>
                            <p>例如：80 ÷ 20 = 4</p>
                            <p>方法：先算 8 ÷ 2 = 4</p>
                        </div>
                        <div class="type">
                            <h6>除数是整十数</h6>
                            <p>例如：84 ÷ 20 = 4.2</p>
                            <p>方法：先算 84 ÷ 2 = 42，再除以10</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>整百数除法</h5>
                    <p>整百数除法是指被除数或除数是整百数的除法运算。</p>
                    <div class="examples">
                        <div class="example">
                            <p><strong>例子：</strong>800 ÷ 200 = 4</p>
                            <p><strong>方法：</strong>先算 8 ÷ 2 = 4</p>
                        </div>
                        <div class="example">
                            <p><strong>例子：</strong>600 ÷ 30 = 20</p>
                            <p><strong>方法：</strong>先算 6 ÷ 3 = 2，再补一个0</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>口算技巧</h5>
                    <div class="techniques">
                        <div class="technique">
                            <h6>化简法</h6>
                            <p>将被除数和除数同时缩小相同的倍数</p>
                            <div class="example">
                                <p>240 ÷ 60 = 24 ÷ 6 = 4</p>
                            </div>
                        </div>
                        <div class="technique">
                            <h6>分解法</h6>
                            <p>将被除数分解成便于计算的形式</p>
                            <div class="example">
                                <p>480 ÷ 40 = (400 + 80) ÷ 40 = 10 + 2 = 12</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>估算方法</h5>
                    <div class="estimation-methods">
                        <div class="method">
                            <h6>四舍五入估算</h6>
                            <p>将数字四舍五入到易于计算的数</p>
                            <div class="example">
                                <p>396 ÷ 18 ≈ 400 ÷ 20 = 20</p>
                            </div>
                        </div>
                        <div class="method">
                            <h6>接近数估算</h6>
                            <p>选择接近的整十数或整百数</p>
                            <div class="example">
                                <p>248 ÷ 52 ≈ 250 ÷ 50 = 5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 口算除法 - 可视化理解
    generateOralDivisionVisualization() {
        return `
            <div class="visualization-content">
                <h4>口算除法可视化</h4>
                
                <div class="visual-demo">
                    <h5>整十数除法演示</h5>
                    <div class="demo-cards">
                        <div class="demo-card">
                            <h6>化简演示</h6>
                            <div class="division-visual">
                                <div class="original-problem">
                                    <span class="dividend">240</span>
                                    <span class="operator">÷</span>
                                    <span class="divisor">60</span>
                                    <span class="equals">=</span>
                                    <span class="result">?</span>
                                </div>
                                <div class="simplification">
                                    <div class="step">
                                        <span class="arrow">↓</span>
                                        <span class="explanation">同时除以10</span>
                                    </div>
                                    <div class="simplified-problem">
                                        <span class="dividend">24</span>
                                        <span class="operator">÷</span>
                                        <span class="divisor">6</span>
                                        <span class="equals">=</span>
                                        <span class="result">4</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="demo-card">
                            <h6>分解演示</h6>
                            <div class="division-visual">
                                <div class="original-problem">
                                    <span class="dividend">480</span>
                                    <span class="operator">÷</span>
                                    <span class="divisor">40</span>
                                    <span class="equals">=</span>
                                    <span class="result">?</span>
                                </div>
                                <div class="decomposition">
                                    <div class="step">
                                        <span class="arrow">↓</span>
                                        <span class="explanation">分解被除数</span>
                                    </div>
                                    <div class="decomposed-problem">
                                        <span class="dividend">(400 + 80)</span>
                                        <span class="operator">÷</span>
                                        <span class="divisor">40</span>
                                        <span class="equals">=</span>
                                        <span class="result">10 + 2 = 12</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="interactive-calculator">
                    <h5>口算练习器</h5>
                    <div class="calculator-interface">
                        <div class="problem-display">
                            <span id="dividend-display">240</span>
                            <span class="operator">÷</span>
                            <span id="divisor-display">60</span>
                            <span class="equals">=</span>
                            <input type="number" id="answer-input" placeholder="?">
                            <button type="button" class="speech-btn" onclick="startSpeechRecognition(function(text){document.getElementById('answer-input').value=text;})">🎤</button>
                        </div>
                        <div class="calculator-controls">
                            <button onclick="divisionAdvanced.generateProblem()" class="new-problem-btn">新题目</button>
                            <button onclick="divisionAdvanced.checkOralAnswer()" class="check-answer-btn">检查答案</button>
                        </div>
                        <div class="calculator-feedback" id="oral-feedback"></div>
                    </div>
                </div>

                <div class="estimation-demo">
                    <h5>估算演示</h5>
                    <div class="estimation-examples">
                        <div class="estimation-item">
                            <h6>例题：396 ÷ 18</h6>
                            <div class="estimation-steps">
                                <div class="step">
                                    <span class="step-number">1</span>
                                    <span class="step-text">396 ≈ 400</span>
                                </div>
                                <div class="step">
                                    <span class="step-number">2</span>
                                    <span class="step-text">18 ≈ 20</span>
                                </div>
                                <div class="step">
                                    <span class="step-number">3</span>
                                    <span class="step-text">400 ÷ 20 = 20</span>
                                </div>
                                <div class="step">
                                    <span class="step-number">4</span>
                                    <span class="step-text">估算结果：约20</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 笔算除法内容 ===

    // 笔算除法 - 基础解释
    generateWrittenDivisionExplanation() {
        return `
            <div class="explanation-content">
                <h4>笔算除法的基础知识</h4>
                
                <div class="concept-card">
                    <h5>除数是两位数的笔算除法</h5>
                    <p>当除数是两位数时，我们需要用竖式进行计算。</p>
                    <div class="division-steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <span class="step-text">试商：估算商的第一位数字</span>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <span class="step-text">相乘：用商乘以除数</span>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <span class="step-text">相减：用被除数减去乘积</span>
                        </div>
                        <div class="step">
                            <span class="step-number">4</span>
                            <span class="step-text">下移：将下一位数字移下来</span>
                        </div>
                        <div class="step">
                            <span class="step-number">5</span>
                            <span class="step-text">重复：重复上述步骤直到完成</span>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>试商的方法</h5>
                    <div class="trial-methods">
                        <div class="method">
                            <h6>四舍五入试商</h6>
                            <p>将除数四舍五入到整十数，便于试商</p>
                            <div class="example">
                                <p>除数23 ≈ 20，用20来试商</p>
                            </div>
                        </div>
                        <div class="method">
                            <h6>同头试商</h6>
                            <p>当被除数前两位与除数的首位相同时，商可能是1</p>
                            <div class="example">
                                <p>256 ÷ 24，25和24首位相同，试商1</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>调商的情况</h5>
                    <div class="adjustment-cases">
                        <div class="case">
                            <h6>商大了</h6>
                            <p>如果试商乘以除数大于被除数，需要调小商</p>
                            <div class="example">
                                <p>如果试商5，但5×23=115 > 112，改试商4</p>
                            </div>
                        </div>
                        <div class="case">
                            <h6>商小了</h6>
                            <p>如果余数大于等于除数，需要调大商</p>
                            <div class="example">
                                <p>如果试商4，但余数是25 > 23，改试商5</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="example-division">
                    <h5>例题演示：532 ÷ 38</h5>
                    <div class="division-display">
                        <pre class="division-format">
      14
   -------
38 | 532
     38
     ---
     152
     152
     ---
       0
                        </pre>
                    </div>
                    <div class="step-explanation">
                        <p><strong>步骤1：</strong>53 ÷ 38，试商1，1×38=38 < 53 ✓</p>
                        <p><strong>步骤2：</strong>53 - 38 = 15，移下2得152</p>
                        <p><strong>步骤3：</strong>152 ÷ 38，试商4，4×38=152 ✓</p>
                        <p><strong>步骤4：</strong>152 - 152 = 0，除法完成</p>
                        <p><strong>结果：</strong>532 ÷ 38 = 14</p>
                    </div>
                </div>
            </div>
        `;
    }

    // 笔算除法 - 可视化理解
    generateWrittenDivisionVisualization() {
        return `
            <div class="visualization-content">
                <h4>笔算除法可视化演示</h4>
                
                <div class="step-by-step-demo">
                    <h5>分步演示：456 ÷ 24</h5>
                    
                    <div class="demo-stages">
                        <div class="stage">
                            <h6>第1步：试商十位</h6>
                            <div class="division-stage">
                                <div class="stage-visual">
                                    <pre>
      ?
   -------
24 | 456
                                    </pre>
                                </div>
                                <div class="stage-explanation">
                                    <p>45 ÷ 24，试商1</p>
                                    <p>1 × 24 = 24 < 45 ✓</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="stage">
                            <h6>第2步：相减并移位</h6>
                            <div class="division-stage">
                                <div class="stage-visual">
                                    <pre>
      1
   -------
24 | 456
     24
     ---
     216
                                    </pre>
                                </div>
                                <div class="stage-explanation">
                                    <p>45 - 24 = 21</p>
                                    <p>移下6得216</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="stage">
                            <h6>第3步：试商个位</h6>
                            <div class="division-stage">
                                <div class="stage-visual">
                                    <pre>
      19
   -------
24 | 456
     24
     ---
     216
     216
     ---
       0
                                    </pre>
                                </div>
                                <div class="stage-explanation">
                                    <p>216 ÷ 24，试商9</p>
                                    <p>9 × 24 = 216 ✓</p>
                                    <p>216 - 216 = 0</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="interactive-division">
                    <h5>互动除法练习</h5>
                    <div class="division-workspace">
                        <div class="problem-setup">
                            <h6>题目：</h6>
                            <div class="division-problem">
                                <span id="problem-dividend">672</span>
                                <span class="operator">÷</span>
                                <span id="problem-divisor">28</span>
                                <span class="equals">=</span>
                                <span class="result">?</span>
                            </div>
                        </div>
                        
                        <div class="workspace">
                            <div class="division-template">
                                <div class="quotient-line">
                                    <input type="text" class="quotient-input" id="quotient-1" maxlength="1">
                                    <input type="text" class="quotient-input" id="quotient-2" maxlength="1">
                                </div>
                                <div class="division-line">―――――――</div>
                                <div class="divisor-dividend">
                                    <span class="divisor">28</span>
                                    <span class="separator">|</span>
                                    <span class="dividend">672</span>
                                </div>
                                <div class="calculation-area">
                                    <input type="text" class="calc-input" id="calc-1" placeholder="第一次计算">
                                    <div class="line">―――</div>
                                    <input type="text" class="calc-input" id="calc-2" placeholder="第一次余数">
                                    <input type="text" class="calc-input" id="calc-3" placeholder="第二次计算">
                                    <div class="line">―――</div>
                                    <input type="text" class="calc-input" id="calc-4" placeholder="最终余数">
                                </div>
                            </div>
                        </div>
                        
                        <div class="workspace-controls">
                            <button onclick="divisionAdvanced.checkDivisionWork()" class="check-work-btn">检查计算</button>
                            <button onclick="divisionAdvanced.showDivisionSteps()" class="show-steps-btn">显示步骤</button>
                            <button onclick="divisionAdvanced.newDivisionProblem()" class="new-problem-btn">新题目</button>
                        </div>
                        
                        <div class="workspace-feedback" id="division-feedback"></div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 除法应用内容 ===

    // 除法应用 - 基础解释
    generateDivisionApplicationExplanation() {
        return `
            <div class="explanation-content">
                <h4>除法应用题解题方法</h4>
                
                <div class="concept-card">
                    <h5>除法应用题的类型</h5>
                    <div class="application-types">
                        <div class="type">
                            <h6>平均分配问题</h6>
                            <p>把总数量平均分成若干份，求每份是多少</p>
                            <div class="example">
                                <p><strong>例：</strong>240个苹果平均分给15个班级，每个班级分多少个？</p>
                                <p><strong>解：</strong>240 ÷ 15 = 16（个）</p>
                            </div>
                        </div>
                        
                        <div class="type">
                            <h6>包含除法问题</h6>
                            <p>求一个数里面包含多少个另一个数</p>
                            <div class="example">
                                <p><strong>例：</strong>一根绳子长360厘米，每段长24厘米，能分成多少段？</p>
                                <p><strong>解：</strong>360 ÷ 24 = 15（段）</p>
                            </div>
                        </div>
                        
                        <div class="type">
                            <h6>求倍数问题</h6>
                            <p>求一个数是另一个数的多少倍</p>
                            <div class="example">
                                <p><strong>例：</strong>小明有168张邮票，小华有24张，小明的邮票是小华的多少倍？</p>
                                <p><strong>解：</strong>168 ÷ 24 = 7（倍）</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>解题步骤</h5>
                    <div class="solving-steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <span class="step-text">读题理解：仔细读题，理解题目意思</span>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <span class="step-text">找关键信息：找出已知条件和所求问题</span>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <span class="step-text">分析数量关系：确定用什么方法解决</span>
                        </div>
                        <div class="step">
                            <span class="step-number">4</span>
                            <span class="step-text">列式计算：根据分析列出算式并计算</span>
                        </div>
                        <div class="step">
                            <span class="step-number">5</span>
                            <span class="step-text">检验答案：检查答案是否合理</span>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>关键词识别</h5>
                    <div class="keyword-guide">
                        <div class="keyword-group">
                            <h6>平均分配</h6>
                            <p>关键词：平均分、每份、平均每个</p>
                        </div>
                        <div class="keyword-group">
                            <h6>包含除法</h6>
                            <p>关键词：能分成、够分、可以做</p>
                        </div>
                        <div class="keyword-group">
                            <h6>求倍数</h6>
                            <p>关键词：是...的多少倍、倍数关系</p>
                        </div>
                    </div>
                </div>

                <div class="example-problem">
                    <h5>综合例题</h5>
                    <div class="problem-solution">
                        <div class="problem-text">
                            <p>某工厂要生产1680个零件，每天能生产56个，需要多少天才能完成？</p>
                        </div>
                        <div class="solution-steps">
                            <div class="solution-step">
                                <h6>第1步：理解题意</h6>
                                <p>总共需要生产1680个零件，每天生产56个，求需要多少天</p>
                            </div>
                            <div class="solution-step">
                                <h6>第2步：分析关系</h6>
                                <p>这是包含除法问题，1680里面包含多少个56</p>
                            </div>
                            <div class="solution-step">
                                <h6>第3步：列式计算</h6>
                                <p>1680 ÷ 56 = 30</p>
                            </div>
                            <div class="solution-step">
                                <h6>第4步：检验答案</h6>
                                <p>30 × 56 = 1680 ✓</p>
                            </div>
                            <div class="solution-step">
                                <h6>第5步：答题</h6>
                                <p>答：需要30天才能完成。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 商的变化规律内容 ===

    // 商的变化规律 - 基础解释
    generateQuotientPatternsExplanation() {
        return `
            <div class="explanation-content">
                <h4>商的变化规律</h4>
                
                <div class="concept-card">
                    <h5>被除数变化时商的变化</h5>
                    <div class="pattern-rules">
                        <div class="rule">
                            <h6>规律1：除数不变</h6>
                            <p>当除数不变时，被除数扩大（或缩小）几倍，商也扩大（或缩小）几倍</p>
                            <div class="example">
                                <p>120 ÷ 30 = 4</p>
                                <p>240 ÷ 30 = 8 （被除数扩大2倍，商也扩大2倍）</p>
                                <p>60 ÷ 30 = 2 （被除数缩小2倍，商也缩小2倍）</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>除数变化时商的变化</h5>
                    <div class="pattern-rules">
                        <div class="rule">
                            <h6>规律2：被除数不变</h6>
                            <p>当被除数不变时，除数扩大（或缩小）几倍，商反而缩小（或扩大）几倍</p>
                            <div class="example">
                                <p>120 ÷ 30 = 4</p>
                                <p>120 ÷ 60 = 2 （除数扩大2倍，商缩小2倍）</p>
                                <p>120 ÷ 15 = 8 （除数缩小2倍，商扩大2倍）</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>被除数和除数同时变化</h5>
                    <div class="pattern-rules">
                        <div class="rule">
                            <h6>规律3：同时变化</h6>
                            <p>当被除数和除数同时扩大（或缩小）相同倍数时，商不变</p>
                            <div class="example">
                                <p>120 ÷ 30 = 4</p>
                                <p>240 ÷ 60 = 4 （被除数和除数都扩大2倍，商不变）</p>
                                <p>60 ÷ 15 = 4 （被除数和除数都缩小2倍，商不变）</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>规律的应用</h5>
                    <div class="applications">
                        <div class="app">
                            <h6>简化计算</h6>
                            <p>利用商不变规律简化除法计算</p>
                            <div class="example">
                                <p>1800 ÷ 600 = 18 ÷ 6 = 3</p>
                            </div>
                        </div>
                        <div class="app">
                            <h6>验算</h6>
                            <p>利用规律验证计算结果</p>
                            <div class="example">
                                <p>如果 240 ÷ 60 = 4，那么 120 ÷ 30 也应该等于 4</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="memory-tip">
                    <h5>记忆口诀</h5>
                    <div class="mnemonics">
                        <div class="mnemonic">
                            <h6>被除数变化</h6>
                            <p>"被除数变，商同变"</p>
                        </div>
                        <div class="mnemonic">
                            <h6>除数变化</h6>
                            <p>"除数变，商反变"</p>
                        </div>
                        <div class="mnemonic">
                            <h6>同时变化</h6>
                            <p>"同时变，商不变"</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成练习题
    generateExercises() {
        this.exercises = [
            // 口算除法练习题
            { dividend: 240, divisor: 60, answer: 4, hint: "240 ÷ 60 = 24 ÷ 6 = 4", type: "oral-division" },
            { dividend: 320, divisor: 40, answer: 8, hint: "320 ÷ 40 = 32 ÷ 4 = 8", type: "oral-division" },
            { dividend: 480, divisor: 80, answer: 6, hint: "480 ÷ 80 = 48 ÷ 8 = 6", type: "oral-division" },
            
            // 笔算除法练习题
            { dividend: 532, divisor: 38, answer: 14, hint: "用竖式计算", type: "written-division" },
            { dividend: 672, divisor: 28, answer: 24, hint: "用竖式计算", type: "written-division" },
            { dividend: 456, divisor: 24, answer: 19, hint: "用竖式计算", type: "written-division" },
            
            // 商的变化规律练习题
            { problem: "如果 120 ÷ 30 = 4，那么 240 ÷ 30 = ?", answer: 8, hint: "被除数扩大2倍，商也扩大2倍", type: "quotient-patterns" },
            { problem: "如果 120 ÷ 30 = 4，那么 120 ÷ 60 = ?", answer: 2, hint: "除数扩大2倍，商缩小2倍", type: "quotient-patterns" }
        ];
    }

    // 生成新题目
    generateProblem() {
        const problems = [
            { dividend: 240, divisor: 60 },
            { dividend: 320, divisor: 40 },
            { dividend: 480, divisor: 80 },
            { dividend: 360, divisor: 90 },
            { dividend: 560, divisor: 70 }
        ];
        
        const problem = problems[Math.floor(Math.random() * problems.length)];
        document.getElementById('dividend-display').textContent = problem.dividend;
        document.getElementById('divisor-display').textContent = problem.divisor;
        document.getElementById('answer-input').value = '';
        document.getElementById('oral-feedback').innerHTML = '';
    }

    // 检查口算答案
    checkOralAnswer() {
        const dividend = parseInt(document.getElementById('dividend-display').textContent);
        const divisor = parseInt(document.getElementById('divisor-display').textContent);
        const userAnswer = parseInt(document.getElementById('answer-input').value);
        const correctAnswer = dividend / divisor;
        
        const feedback = document.getElementById('oral-feedback');
        if (userAnswer === correctAnswer) {
            feedback.innerHTML = '<span class="correct">✓ 正确！</span>';
            feedback.className = 'calculator-feedback correct';
            this.score += 5;
        } else {
            feedback.innerHTML = `<span class="incorrect">✗ 错误。正确答案是 ${correctAnswer}</span>`;
            feedback.className = 'calculator-feedback incorrect';
        }
    }

    // 检查除法计算
    checkDivisionWork() {
        // 这里可以添加检查竖式计算的逻辑
        const feedback = document.getElementById('division-feedback');
        feedback.innerHTML = '竖式计算检查功能待完善';
    }

    // 显示除法步骤
    showDivisionSteps() {
        const feedback = document.getElementById('division-feedback');
        feedback.innerHTML = `
            <div class="step-guide">
                <h6>计算步骤：</h6>
                <p>1. 67 ÷ 28，试商2，2×28=56 < 67 ✓</p>
                <p>2. 67 - 56 = 11，移下2得112</p>
                <p>3. 112 ÷ 28，试商4，4×28=112 ✓</p>
                <p>4. 112 - 112 = 0，计算完成</p>
                <p>答案：672 ÷ 28 = 24</p>
            </div>
        `;
    }

    // 新的除法题目
    newDivisionProblem() {
        const problems = [
            { dividend: 672, divisor: 28 },
            { dividend: 532, divisor: 38 },
            { dividend: 456, divisor: 24 },
            { dividend: 684, divisor: 36 }
        ];
        
        const problem = problems[Math.floor(Math.random() * problems.length)];
        document.getElementById('problem-dividend').textContent = problem.dividend;
        document.getElementById('problem-divisor').textContent = problem.divisor;
        
        // 清空输入框
        document.querySelectorAll('.quotient-input, .calc-input').forEach(input => {
            input.value = '';
        });
        
        document.getElementById('division-feedback').innerHTML = '';
    }

    // 检查答案
    checkAnswer() {
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        const currentEx = exercises[this.currentExercise];
        
        let userAnswer;
        if (this.currentTopic === 'quotient-patterns') {
            userAnswer = parseInt(document.getElementById('pattern-answer').value);
        } else {
            userAnswer = parseInt(document.getElementById('division-answer').value);
        }
        
        const feedback = document.getElementById('feedback');
        if (userAnswer === currentEx.answer) {
            feedback.innerHTML = '<div class="correct">✓ 正确！</div>';
            feedback.className = 'feedback correct';
            this.score += 10;
        } else {
            feedback.innerHTML = `<div class="incorrect">✗ 错误。正确答案是：${currentEx.answer}</div>`;
            feedback.className = 'feedback incorrect';
        }
    }

    // 下一题
    nextExercise() {
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        this.currentExercise = (this.currentExercise + 1) % exercises.length;
        this.render();
    }
}

// 创建全局实例
const divisionAdvanced = new DivisionAdvanced(); 