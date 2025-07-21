// 第二单元：公顷和平方千米学习模块

class AreaUnits {
    constructor() {
        this.unitId = 'area-units';
        this.currentTopic = 'hectare';
        this.currentStage = 'explanation';
        this.topics = {
            'hectare': {
                title: '公顷的认识',
                description: '理解公顷的概念和实际大小'
            },
            'square-kilometer': {
                title: '平方千米的认识',
                description: '掌握平方千米这一更大的面积单位'
            },
            'unit-conversion': {
                title: '面积单位换算',
                description: '熟练进行各面积单位间的换算'
            },
            'practical-application': {
                title: '实际应用',
                description: '解决生活中的面积计算问题'
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
        const stage = this.currentStage;
        
        return `
            <div class="modal-content area-units-modal">
                <div class="modal-header">
                    <h2>第二单元：公顷和平方千米</h2>
                    <button class="close-btn" onclick="closeLearningModal()">&times;</button>
                </div>
                
                <div class="unit-nav">
                    <div class="topic-selector">
                        ${Object.entries(this.topics).map(([key, topic]) => `
                            <button class="topic-btn ${this.currentTopic === key ? 'active' : ''}" 
                                    onclick="areaUnits.switchTopic('${key}')">
                                ${topic.title}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="stage-selector">
                        ${this.stages.map(stage => `
                            <button class="stage-btn ${this.currentStage === stage ? 'active' : ''}" 
                                    onclick="areaUnits.switchStage('${stage}')">
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

    // === 公顷认识内容 ===

    // 公顷 - 基础解释
    generateHectareExplanation() {
        return `
            <div class="explanation-content">
                <h4>公顷的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是公顷？</h5>
                    <p>公顷是测量较大面积的单位，通常用来测量土地、农田、公园等大面积的地方。</p>
                    <div class="unit-info">
                        <p><strong>符号：</strong>公顷可以用"hm²"表示</p>
                        <p><strong>大小：</strong>1公顷 = 10000平方米</p>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>公顷与平方米的关系</h5>
                    <div class="conversion-info">
                        <div class="conversion-item">
                            <span class="from">1公顷</span>
                            <span class="equals">=</span>
                            <span class="to">10000平方米</span>
                        </div>
                        <div class="conversion-item">
                            <span class="from">1平方米</span>
                            <span class="equals">=</span>
                            <span class="to">0.0001公顷</span>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>公顷的实际大小</h5>
                    <div class="size-examples">
                        <div class="example">
                            <h6>想象一下：</h6>
                            <p>1公顷大约相当于：</p>
                            <ul>
                                <li>一个标准足球场的面积</li>
                                <li>100米 × 100米的正方形</li>
                                <li>14个篮球场的面积</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>什么时候使用公顷？</h5>
                    <div class="usage-examples">
                        <div class="usage">
                            <h6>农田面积</h6>
                            <p>农民说："我家的农田有3公顷"</p>
                        </div>
                        <div class="usage">
                            <h6>公园面积</h6>
                            <p>公园介绍："这个公园占地面积5公顷"</p>
                        </div>
                        <div class="usage">
                            <h6>学校面积</h6>
                            <p>学校简介："我们学校占地2公顷"</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 公顷 - 可视化理解
    generateHectareVisualization() {
        return `
            <div class="visualization-content">
                <h4>公顷的可视化理解</h4>
                <button class="demo-btn" onclick="areaUnits.startHectareDemo()">开始演示</button>
                <div id="hectare-demo-area">
                    <div class="size-comparison">
                        <h5>公顷大小的视觉比较</h5>
                        <div class="visual-grid">
                            <div class="grid-item" id="sq-meter-item">
                                <div class="square-meter" style="width: 20px; height: 20px;"></div>
                                <p>1平方米</p>
                            </div>
                            <div class="grid-item" id="hundred-sq-meter-item">
                                <div class="hundred-square-meters" style="width: 60px; height: 60px;"></div>
                                <p>100平方米</p>
                            </div>
                            <div class="grid-item" id="hectare-item">
                                <div class="hectare" style="width: 200px; height: 200px;"></div>
                                <p>1公顷<br/>(10000平方米)</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="real-world-examples">
                    <h5>生活中的公顷实例</h5>
                    
                    <div class="examples-grid">
                        <div class="example-card">
                            <div class="example-visual football-field"></div>
                            <h6>足球场</h6>
                            <p>标准足球场约1.05公顷</p>
                        </div>
                        
                        <div class="example-card">
                            <div class="example-visual park"></div>
                            <h6>小公园</h6>
                            <p>社区公园通常2-5公顷</p>
                        </div>
                        
                        <div class="example-card">
                            <div class="example-visual farm"></div>
                            <h6>农田</h6>
                            <p>一家农户可能有几十公顷农田</p>
                        </div>
                        
                        <div class="example-card">
                            <div class="example-visual school"></div>
                            <h6>学校</h6>
                            <p>小学校园通常1-3公顷</p>
                        </div>
                    </div>
                </div>

                <div class="interactive-converter">
                    <h5>公顷换算器</h5>
                    <div class="converter-tool">
                        <div class="input-group">
                            <label>公顷数：</label>
                            <input type="number" id="hectare-input" min="0" step="0.1" placeholder="输入公顷数">
                            <button onclick="areaUnits.convertHectare()" class="convert-btn">转换</button>
                        </div>
                        <div class="result-display">
                            <div id="conversion-result"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 公顷 - 步骤练习
    generateHectarePractice() {
        const exercises = this.exercises.filter(ex => ex.type === 'hectare');
        const currentEx = exercises[this.currentExercise] || exercises[0];
        
        return `
            <div class="practice-content">
                <h4>公顷单位练习</h4>
                
                <div class="practice-info">
                    <span class="exercise-counter">题目 ${this.currentExercise + 1} / ${exercises.length}</span>
                    <span class="score">得分：${this.score}</span>
                </div>

                <div class="exercise-card">
                    <div class="question">
                        <h5>${currentEx.question}</h5>
                        <div class="answer-input">
                            <input type="number" id="answer" placeholder="请输入答案" step="0.1">
                            <span class="unit">${currentEx.unit}</span>
                        </div>
                    </div>
                    
                    <div class="hint">
                        <p><strong>提示：</strong>${currentEx.hint}</p>
                    </div>
                </div>

                <div class="practice-controls">
                    <button onclick="areaUnits.checkAnswer()" class="check-btn">检查答案</button>
                    <button onclick="areaUnits.nextExercise()" class="next-btn" style="display: none;">下一题</button>
                </div>

                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    // 公顷 - 扩展知识
    generateHectareExtension() {
        return `
            <div class="extension-content">
                <h4>公顷的拓展知识</h4>
                
                <div class="extension-card">
                    <h5>公顷的历史</h5>
                    <p>公顷这个单位起源于法国，是国际通用的面积单位。在中国，我们通常还使用"亩"这个传统单位。</p>
                    <div class="conversion-info">
                        <p><strong>换算关系：</strong>1公顷 = 15亩</p>
                    </div>
                </div>

                <div class="extension-card">
                    <h5>世界各地的大型区域</h5>
                    <div class="world-examples">
                        <div class="example">
                            <h6>故宫</h6>
                            <p>北京故宫占地面积约72公顷</p>
                        </div>
                        <div class="example">
                            <h6>天安门广场</h6>
                            <p>天安门广场面积约44公顷</p>
                        </div>
                        <div class="example">
                            <h6>中央公园</h6>
                            <p>纽约中央公园面积约341公顷</p>
                        </div>
                    </div>
                </div>

                <div class="extension-card">
                    <h5>环保意识</h5>
                    <p>了解面积单位可以帮助我们更好地理解环境保护的重要性。比如，保护一公顷的森林可以净化大量的空气。</p>
                </div>
            </div>
        `;
    }

    // === 平方千米认识内容 ===

    // 平方千米 - 基础解释
    generateSquareKilometerExplanation() {
        return `
            <div class="explanation-content">
                <h4>平方千米的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是平方千米？</h5>
                    <p>平方千米是测量非常大面积的单位，通常用来测量城市、省份、国家等超大面积的地方。</p>
                    <div class="unit-info">
                        <p><strong>符号：</strong>平方千米可以用"km²"表示</p>
                        <p><strong>大小：</strong>1平方千米 = 100公顷 = 1000000平方米</p>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>平方千米与其他单位的关系</h5>
                    <div class="conversion-ladder">
                        <div class="ladder-item">
                            <span class="unit">1平方千米</span>
                            <span class="equals">=</span>
                            <span class="value">100公顷</span>
                        </div>
                        <div class="ladder-item">
                            <span class="unit">1平方千米</span>
                            <span class="equals">=</span>
                            <span class="value">1000000平方米</span>
                        </div>
                        <div class="ladder-item">
                            <span class="unit">1公顷</span>
                            <span class="equals">=</span>
                            <span class="value">0.01平方千米</span>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>平方千米的实际大小</h5>
                    <div class="size-examples">
                        <div class="example">
                            <h6>想象一下：</h6>
                            <p>1平方千米大约相当于：</p>
                            <ul>
                                <li>1000米 × 1000米的正方形</li>
                                <li>100个标准足球场的面积</li>
                                <li>一个小镇的面积</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>什么时候使用平方千米？</h5>
                    <div class="usage-examples">
                        <div class="usage">
                            <h6>城市面积</h6>
                            <p>地理老师说："北京市面积约16410平方千米"</p>
                        </div>
                        <div class="usage">
                            <h6>省份面积</h6>
                            <p>新闻报道："山东省面积约15.8万平方千米"</p>
                        </div>
                        <div class="usage">
                            <h6>湖泊面积</h6>
                            <p>课本介绍："青海湖面积约4583平方千米"</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 平方千米 - 可视化理解
    generateSquareKilometerVisualization() {
        return `
            <div class="visualization-content">
                <h4>平方千米的可视化理解</h4>
                <button class="demo-btn" onclick="areaUnits.startSqKmDemo()">开始演示</button>
                <div id="sqkm-demo-area">
                    <div class="size-progression">
                        <h5>从小到大的面积单位</h5>
                        <div class="progression-chain">
                            <div class="progression-item" id="sqm-item">
                                <div class="visual-box small"></div>
                                <p>1平方米</p>
                            </div>
                            <div class="arrow">→</div>
                            <div class="progression-item" id="hectare-prog-item">
                                <div class="visual-box medium"></div>
                                <p>1公顷<br/>(10000平方米)</p>
                            </div>
                            <div class="arrow">→</div>
                            <div class="progression-item" id="sqkm-item">
                                <div class="visual-box large"></div>
                                <p>1平方千米<br/>(100公顷)</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="china-map-examples">
                    <h5>中国地理中的平方千米</h5>
                    
                    <div class="map-examples">
                        <div class="map-item">
                            <h6>中国总面积</h6>
                            <p>约960万平方千米</p>
                            <div class="size-indicator very-large"></div>
                        </div>
                        
                        <div class="map-item">
                            <h6>北京市</h6>
                            <p>约1.64万平方千米</p>
                            <div class="size-indicator large"></div>
                        </div>
                        
                        <div class="map-item">
                            <h6>香港</h6>
                            <p>约1104平方千米</p>
                            <div class="size-indicator medium"></div>
                        </div>
                        
                        <div class="map-item">
                            <h6>澳门</h6>
                            <p>约33平方千米</p>
                            <div class="size-indicator small"></div>
                        </div>
                    </div>
                </div>

                <div class="interactive-scale">
                    <h5>面积比较器</h5>
                    <div class="scale-tool">
                        <div class="input-group">
                            <label>输入面积：</label>
                            <input type="number" id="area-input" min="0" placeholder="输入数值">
                            <select id="unit-selector">
                                <option value="sqm">平方米</option>
                                <option value="hectare">公顷</option>
                                <option value="sqkm">平方千米</option>
                            </select>
                            <button onclick="areaUnits.compareArea()" class="compare-btn">比较</button>
                        </div>
                        <div class="comparison-result">
                            <div id="area-comparison"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 单位换算内容 ===

    // 单位换算 - 基础解释
    generateUnitConversionExplanation() {
        return `
            <div class="explanation-content">
                <h4>面积单位换算</h4>
                
                <div class="concept-card">
                    <h5>面积单位换算表</h5>
                    <div class="conversion-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>单位</th>
                                    <th>符号</th>
                                    <th>换算关系</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>平方米</td>
                                    <td>m²</td>
                                    <td>基本单位</td>
                                </tr>
                                <tr>
                                    <td>公顷</td>
                                    <td>hm²</td>
                                    <td>1公顷 = 10000平方米</td>
                                </tr>
                                <tr>
                                    <td>平方千米</td>
                                    <td>km²</td>
                                    <td>1平方千米 = 100公顷 = 1000000平方米</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>换算方法</h5>
                    <div class="conversion-methods">
                        <div class="method">
                            <h6>大单位→小单位（乘法）</h6>
                            <p>从大单位换算到小单位时，要乘以进率</p>
                            <div class="example">
                                <p>3公顷 = 3 × 10000 = 30000平方米</p>
                            </div>
                        </div>
                        <div class="method">
                            <h6>小单位→大单位（除法）</h6>
                            <p>从小单位换算到大单位时，要除以进率</p>
                            <div class="example">
                                <p>50000平方米 = 50000 ÷ 10000 = 5公顷</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>记忆技巧</h5>
                    <div class="memory-tips">
                        <div class="tip">
                            <h6>口诀记忆</h6>
                            <p>"大化小，乘进率；小化大，除进率"</p>
                        </div>
                        <div class="tip">
                            <h6>进率记忆</h6>
                            <p>平方米→公顷：进率10000（1万）</p>
                            <p>公顷→平方千米：进率100（1百）</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 单位换算 - 可视化理解
    generateUnitConversionVisualization() {
        return `
            <div class="visualization-content">
                <h4>单位换算可视化</h4>
                
                <div class="conversion-flow">
                    <h5>换算流程图</h5>
                    
                    <div class="flow-diagram">
                        <div class="conversion-path">
                            <div class="unit-box">
                                <span class="unit-name">平方米</span>
                                <span class="unit-symbol">m²</span>
                            </div>
                            <div class="conversion-arrow">
                                <span class="direction up">÷ 10000</span>
                                <span class="direction down">× 10000</span>
                            </div>
                            <div class="unit-box">
                                <span class="unit-name">公顷</span>
                                <span class="unit-symbol">hm²</span>
                            </div>
                            <div class="conversion-arrow">
                                <span class="direction up">÷ 100</span>
                                <span class="direction down">× 100</span>
                            </div>
                            <div class="unit-box">
                                <span class="unit-name">平方千米</span>
                                <span class="unit-symbol">km²</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="interactive-conversion">
                    <h5>互动换算练习</h5>
                    
                    <div class="conversion-calculator">
                        <div class="input-section">
                            <div class="input-group">
                                <label>输入数值：</label>
                                <input type="number" id="convert-value" placeholder="输入数值" step="0.1">
                            </div>
                            <div class="input-group">
                                <label>原单位：</label>
                                <select id="from-unit">
                                    <option value="sqm">平方米</option>
                                    <option value="hectare">公顷</option>
                                    <option value="sqkm">平方千米</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <label>目标单位：</label>
                                <select id="to-unit">
                                    <option value="sqm">平方米</option>
                                    <option value="hectare">公顷</option>
                                    <option value="sqkm">平方千米</option>
                                </select>
                            </div>
                            <button onclick="areaUnits.performConversion()" class="convert-btn">换算</button>
                        </div>
                        
                        <div class="conversion-result">
                            <div id="conversion-display"></div>
                        </div>
                    </div>
                </div>

                <div class="step-by-step">
                    <h5>步骤演示</h5>
                    <div class="demo-conversion">
                        <div class="demo-problem">
                            <h6>例题：把2.5公顷换算成平方米</h6>
                        </div>
                        <div class="demo-steps">
                            <div class="step">
                                <span class="step-number">1</span>
                                <span class="step-text">确定换算关系：1公顷 = 10000平方米</span>
                            </div>
                            <div class="step">
                                <span class="step-number">2</span>
                                <span class="step-text">大单位→小单位，用乘法</span>
                            </div>
                            <div class="step">
                                <span class="step-number">3</span>
                                <span class="step-text">2.5 × 10000 = 25000</span>
                            </div>
                            <div class="step">
                                <span class="step-number">4</span>
                                <span class="step-text">答案：2.5公顷 = 25000平方米</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成练习题
    generateExercises() {
        this.exercises = [
            // 公顷练习题
            { question: "一个足球场的面积约为1公顷，换算成平方米是多少？", answer: 10000, unit: "平方米", hint: "1公顷 = 10000平方米", type: "hectare" },
            { question: "某学校占地3公顷，换算成平方米是多少？", answer: 30000, unit: "平方米", hint: "3 × 10000 = 30000", type: "hectare" },
            { question: "50000平方米等于多少公顷？", answer: 5, unit: "公顷", hint: "50000 ÷ 10000 = 5", type: "hectare" },
            
            // 平方千米练习题
            { question: "1平方千米等于多少公顷？", answer: 100, unit: "公顷", hint: "1平方千米 = 100公顷", type: "square-kilometer" },
            { question: "5平方千米等于多少平方米？", answer: 5000000, unit: "平方米", hint: "5 × 1000000 = 5000000", type: "square-kilometer" },
            
            // 单位换算练习题
            { question: "0.5平方千米等于多少公顷？", answer: 50, unit: "公顷", hint: "0.5 × 100 = 50", type: "conversion" },
            { question: "200公顷等于多少平方千米？", answer: 2, unit: "平方千米", hint: "200 ÷ 100 = 2", type: "conversion" }
        ];
    }

    // 转换公顷
    convertHectare() {
        const hectares = parseFloat(document.getElementById('hectare-input').value);
        if (hectares) {
            const sqm = hectares * 10000;
            const result = `${hectares}公顷 = ${sqm}平方米`;
            document.getElementById('conversion-result').innerHTML = result;
        }
    }

    // 比较面积
    compareArea() {
        const value = parseFloat(document.getElementById('area-input').value);
        const unit = document.getElementById('unit-selector').value;
        
        if (value) {
            let sqm;
            switch(unit) {
                case 'sqm': sqm = value; break;
                case 'hectare': sqm = value * 10000; break;
                case 'sqkm': sqm = value * 1000000; break;
            }
            
            const hectares = sqm / 10000;
            const sqkm = sqm / 1000000;
            
            const result = `
                <div class="comparison-results">
                    <p><strong>换算结果：</strong></p>
                    <p>平方米：${sqm.toLocaleString()}</p>
                    <p>公顷：${hectares.toLocaleString()}</p>
                    <p>平方千米：${sqkm.toLocaleString()}</p>
                </div>
            `;
            document.getElementById('area-comparison').innerHTML = result;
        }
    }

    // 执行换算
    performConversion() {
        const value = parseFloat(document.getElementById('convert-value').value);
        const fromUnit = document.getElementById('from-unit').value;
        const toUnit = document.getElementById('to-unit').value;
        
        if (value && fromUnit && toUnit) {
            const result = this.convertUnits(value, fromUnit, toUnit);
            const display = `${value} ${this.getUnitName(fromUnit)} = ${result} ${this.getUnitName(toUnit)}`;
            document.getElementById('conversion-display').innerHTML = display;
        }
    }

    // 单位换算计算
    convertUnits(value, fromUnit, toUnit) {
        const toSqm = {
            'sqm': 1,
            'hectare': 10000,
            'sqkm': 1000000
        };
        
        const sqmValue = value * toSqm[fromUnit];
        return sqmValue / toSqm[toUnit];
    }

    // 获取单位名称
    getUnitName(unit) {
        const names = {
            'sqm': '平方米',
            'hectare': '公顷',
            'sqkm': '平方千米'
        };
        return names[unit] || unit;
    }

    // 检查答案
    checkAnswer() {
        const userAnswer = parseFloat(document.getElementById('answer').value);
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        const currentEx = exercises[this.currentExercise];
        
        const feedback = document.getElementById('feedback');
        if (Math.abs(userAnswer - currentEx.answer) < 0.1) {
            feedback.innerHTML = '<div class="correct">✓ 正确！换算得很准确！</div>';
            feedback.className = 'feedback correct';
            this.score += 10;
            document.querySelector('.next-btn').style.display = 'inline-block';
        } else {
            feedback.innerHTML = `<div class="incorrect">✗ 答案不正确。正确答案是：${currentEx.answer}${currentEx.unit}</div>`;
            feedback.className = 'feedback incorrect';
        }
        
        // 更新分数显示
        document.querySelector('.score').textContent = `得分：${this.score}`;
    }

    // 下一题
    nextExercise() {
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        this.currentExercise = (this.currentExercise + 1) % exercises.length;
        
        // 重置界面
        document.getElementById('answer').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.querySelector('.next-btn').style.display = 'none';
        
        this.render();
    }

    // ====== 动画演示功能实现 ======
    // 公顷演示
    startHectareDemo() {
        // 依次高亮1平方米、100平方米、1公顷
        const items = [
            document.getElementById('sq-meter-item'),
            document.getElementById('hundred-sq-meter-item'),
            document.getElementById('hectare-item')
        ];
        let step = 0;
        items.forEach(item => item && item.classList.remove('highlight'));
        function highlightNext() {
            if (step > 0) items[step - 1] && items[step - 1].classList.remove('highlight');
            if (step < items.length) {
                items[step] && items[step].classList.add('highlight');
                // 显示说明
                let msg = '';
                if (step === 0) msg = '1平方米：一张课桌的面积';
                if (step === 1) msg = '100平方米：一个教室的面积';
                if (step === 2) msg = '1公顷：一个标准足球场的面积';
                showDemoMsg('hectare-demo-area', msg);
                step++;
                setTimeout(highlightNext, 1200);
            } else {
                showDemoMsg('hectare-demo-area', '公顷的面积远大于教室和课桌，常用于土地等大面积测量。');
            }
        }
        highlightNext();
    }
    // 平方千米演示
    startSqKmDemo() {
        const items = [
            document.getElementById('sqm-item'),
            document.getElementById('hectare-prog-item'),
            document.getElementById('sqkm-item')
        ];
        let step = 0;
        items.forEach(item => item && item.classList.remove('highlight'));
        function highlightNext() {
            if (step > 0) items[step - 1] && items[step - 1].classList.remove('highlight');
            if (step < items.length) {
                items[step] && items[step].classList.add('highlight');
                let msg = '';
                if (step === 0) msg = '1平方米：一张课桌的面积';
                if (step === 1) msg = '1公顷：一个足球场的面积';
                if (step === 2) msg = '1平方千米：一个小镇的面积';
                showDemoMsg('sqkm-demo-area', msg);
                step++;
                setTimeout(highlightNext, 1200);
            } else {
                showDemoMsg('sqkm-demo-area', '平方千米常用于城市、国家等超大面积的测量。');
            }
        }
        highlightNext();
    }

    // 公共：在演示区显示说明文字
    // areaId: 容器id, msg: 说明内容
    showDemoMsg(areaId, msg) {
        const area = document.getElementById(areaId);
        if (area) {
            let msgBox = area.querySelector('.demo-message');
            if (!msgBox) {
                msgBox = document.createElement('div');
                msgBox.className = 'demo-message';
                area.appendChild(msgBox);
            }
            msgBox.innerHTML = `<p>${msg}</p>`;
        }
    }
}

// 创建全局实例
const areaUnits = new AreaUnits(); 