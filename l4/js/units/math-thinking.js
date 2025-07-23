// 第八单元：数学广角学习模块

class MathThinking {
    constructor() {
        this.unitId = 'math-thinking';
        this.currentTopic = 'logical-reasoning';
        this.currentStage = 'explanation';
        this.topics = {
            'logical-reasoning': {
                title: '逻辑推理',
                description: '培养逻辑思维和推理能力'
            },
            'optimization': {
                title: '优化问题',
                description: '学习寻找最优解的思维方法'
            },
            'strategy': {
                title: '策略问题',
                description: '掌握解决问题的多种策略'
            },
            'mathematical-thinking': {
                title: '数学思维',
                description: '提升数学思维的灵活性和创造性'
            }
        };
        this.stages = ['explanation', 'visualization', 'practice', 'extension'];
        this.currentExercise = 0;
        this.score = 0;
        this.exercises = [];
        this.gameState = {};
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
            <div class="modal-content math-thinking-modal">
                <div class="modal-header">
                    <h2>第八单元：数学广角</h2>
                    <button class="close-btn" onclick="closeLearningModal()">&times;</button>
                </div>
                
                <div class="unit-nav">
                    <div class="topic-selector">
                        ${Object.entries(this.topics).map(([key, topic]) => `
                            <button class="topic-btn ${this.currentTopic === key ? 'active' : ''}" 
                                    onclick="mathThinking.switchTopic('${key}')">
                                ${topic.title}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="stage-selector">
                        ${this.stages.map(stage => `
                            <button class="stage-btn ${this.currentStage === stage ? 'active' : ''}" 
                                    onclick="mathThinking.switchStage('${stage}')">
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

    // === 逻辑推理内容 ===

    // 逻辑推理 - 基础解释
    generateLogicalReasoningExplanation() {
        return `
            <div class="explanation-content">
                <h4>逻辑推理的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是逻辑推理？</h5>
                    <p>逻辑推理是根据已知条件，通过合理的思维过程，得出结论的方法。</p>
                    <div class="reasoning-types">
                        <div class="type">
                            <h6>演绎推理</h6>
                            <p>从一般到特殊的推理方法</p>
                            <div class="example">
                                <p>所有的鸟都会飞 → 麻雀是鸟 → 麻雀会飞</p>
                            </div>
                        </div>
                        <div class="type">
                            <h6>归纳推理</h6>
                            <p>从特殊到一般的推理方法</p>
                            <div class="example">
                                <p>太阳每天东升西落 → 太阳明天也会东升西落</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>常见的逻辑推理方法</h5>
                    <div class="reasoning-methods">
                        <div class="method">
                            <h6>排除法</h6>
                            <p>逐一排除不可能的答案，找到正确答案</p>
                            <div class="example">
                                <p>问题：小明、小红、小华三人中谁最高？</p>
                                <p>条件：小明比小红高，小华比小明高</p>
                                <p>推理：小华 > 小明 > 小红，所以小华最高</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>假设法</h6>
                            <p>假设某个条件成立，看是否与其他条件矛盾</p>
                            <div class="example">
                                <p>问题：甲、乙、丙三人中谁说谎？</p>
                                <p>甲说：乙说谎；乙说：丙说谎；丙说：甲和乙都说谎</p>
                                <p>推理：假设甲说真话，则乙说谎，那么丙说真话，但丙说甲也说谎，矛盾</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>逆向推理</h6>
                            <p>从结论出发，倒推到原因</p>
                            <div class="example">
                                <p>问题：从1加到100等于多少？</p>
                                <p>逆向思考：1+100=101, 2+99=101, ..., 50+51=101</p>
                                <p>推理：共有50对数，每对和为101，所以答案是50×101=5050</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>逻辑推理的步骤</h5>
                    <div class="reasoning-steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <span class="step-text">理解题意：仔细阅读题目，理解问题和条件</span>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <span class="step-text">分析条件：找出所有的已知条件和约束</span>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <span class="step-text">选择方法：根据问题类型选择合适的推理方法</span>
                        </div>
                        <div class="step">
                            <span class="step-number">4</span>
                            <span class="step-text">逐步推理：按照逻辑顺序进行推理</span>
                        </div>
                        <div class="step">
                            <span class="step-number">5</span>
                            <span class="step-text">验证结论：检查推理过程和结论是否正确</span>
                        </div>
                    </div>
                </div>

                <div class="puzzle-example">
                    <h5>经典逻辑题</h5>
                    <div class="puzzle">
                        <h6>帽子颜色问题</h6>
                        <p>有红、黄、蓝三顶帽子，三个人各戴一顶。每个人只能看到别人的帽子颜色，看不到自己的。</p>
                        <p>A说："我看到B戴红帽子，C戴黄帽子"</p>
                        <p>B说："我看到A和C戴的帽子颜色不同"</p>
                        <p>C说："我看到A戴蓝帽子"</p>
                        <p>问：谁戴什么颜色的帽子？</p>
                        <div class="solution">
                            <p><strong>推理过程：</strong></p>
                            <p>1. 根据A的话：B戴红帽子，C戴黄帽子，那么A戴蓝帽子</p>
                            <p>2. 根据C的话：A戴蓝帽子，与推理1一致</p>
                            <p>3. 根据B的话：A和C戴的帽子颜色不同，蓝色≠黄色，一致</p>
                            <p><strong>结论：</strong>A戴蓝帽子，B戴红帽子，C戴黄帽子</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 逻辑推理 - 可视化理解
    generateLogicalReasoningVisualization() {
        return `
            <div class="visualization-content">
                <h4>逻辑推理可视化</h4>
                
                <div class="interactive-puzzle">
                    <h5>互动逻辑谜题</h5>
                    <div class="puzzle-game">
                        <div class="puzzle-description">
                            <h6>数字排列问题</h6>
                            <p>有四个数字：1、2、3、4，需要排成一行，满足以下条件：</p>
                            <ul>
                                <li>1不能在第一个位置</li>
                                <li>2必须在3的前面</li>
                                <li>4不能在最后一个位置</li>
                            </ul>
                            <p>请拖拽数字到正确位置：</p>
                        </div>
                        
                        <div class="puzzle-workspace">
                            <div class="number-pool">
                                <div class="number-tile" draggable="true" data-number="1">1</div>
                                <div class="number-tile" draggable="true" data-number="2">2</div>
                                <div class="number-tile" draggable="true" data-number="3">3</div>
                                <div class="number-tile" draggable="true" data-number="4">4</div>
                            </div>
                            
                            <div class="arrangement-slots">
                                <div class="slot" data-position="1">位置1</div>
                                <div class="slot" data-position="2">位置2</div>
                                <div class="slot" data-position="3">位置3</div>
                                <div class="slot" data-position="4">位置4</div>
                            </div>
                        </div>
                        
                        <div class="puzzle-controls">
                            <button onclick="mathThinking.checkArrangement()" class="check-btn">检查答案</button>
                            <button onclick="mathThinking.resetArrangement()" class="reset-btn">重新开始</button>
                        </div>
                        
                        <div class="puzzle-feedback" id="arrangement-feedback"></div>
                    </div>
                </div>

                <div class="reasoning-tree">
                    <h5>推理树演示</h5>
                    <div class="tree-problem">
                        <h6>问题：小明、小红、小华三人的年龄关系</h6>
                        <p>条件：小明比小红大2岁，小华比小明小1岁，三人年龄和为30岁</p>
                    </div>
                    
                    <div class="tree-visualization">
                        <div class="tree-node root">
                            <div class="node-content">设小红年龄为x岁</div>
                            <div class="tree-branches">
                                <div class="branch">
                                    <div class="tree-node">
                                        <div class="node-content">小明 = x + 2</div>
                                    </div>
                                </div>
                                <div class="branch">
                                    <div class="tree-node">
                                        <div class="node-content">小华 = (x + 2) - 1 = x + 1</div>
                                    </div>
                                </div>
                                <div class="branch">
                                    <div class="tree-node">
                                        <div class="node-content">年龄和：x + (x + 2) + (x + 1) = 30</div>
                                        <div class="tree-branches">
                                            <div class="branch">
                                                <div class="tree-node">
                                                    <div class="node-content">3x + 3 = 30</div>
                                                    <div class="tree-branches">
                                                        <div class="branch">
                                                            <div class="tree-node">
                                                                <div class="node-content">x = 9</div>
                                                                <div class="tree-branches">
                                                                    <div class="branch">
                                                                        <div class="tree-node result">
                                                                            <div class="node-content">小红9岁，小明11岁，小华10岁</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="logic-patterns">
                    <h5>逻辑模式识别</h5>
                    <div class="pattern-exercises">
                        <div class="pattern-item">
                            <h6>数字规律</h6>
                            <div class="sequence">
                                <span class="seq-item">2</span>
                                <span class="seq-item">4</span>
                                <span class="seq-item">8</span>
                                <span class="seq-item">16</span>
                                <span class="seq-item">?</span>
                            </div>
                            <div class="pattern-controls">
                                <input type="number" id="pattern-1" placeholder="下一个数字">
                                <button onclick="mathThinking.checkPattern(1, 32)">检查</button>
                            </div>
                            <div class="pattern-feedback" id="pattern-feedback-1"></div>
                        </div>
                        
                        <div class="pattern-item">
                            <h6>图形规律</h6>
                            <div class="shape-sequence">
                                <div class="shape circle"></div>
                                <div class="shape square"></div>
                                <div class="shape triangle"></div>
                                <div class="shape circle"></div>
                                <div class="shape square"></div>
                                <div class="shape unknown">?</div>
                            </div>
                            <div class="pattern-controls">
                                <button onclick="mathThinking.selectShape('triangle')" class="shape-btn triangle-btn">△</button>
                                <button onclick="mathThinking.selectShape('circle')" class="shape-btn circle-btn">○</button>
                                <button onclick="mathThinking.selectShape('square')" class="shape-btn square-btn">□</button>
                            </div>
                            <div class="pattern-feedback" id="shape-feedback"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 优化问题内容 ===

    // 优化问题 - 基础解释
    generateOptimizationExplanation() {
        return `
            <div class="explanation-content">
                <h4>优化问题的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是优化问题？</h5>
                    <p>优化问题是在给定条件下，寻找最佳解决方案的问题。通常要求找到最大值、最小值或最优策略。</p>
                    <div class="optimization-types">
                        <div class="type">
                            <h6>最大化问题</h6>
                            <p>寻找使某个量达到最大值的方案</p>
                            <div class="example">
                                <p>用100米篱笆围一个长方形菜园，怎样围面积最大？</p>
                            </div>
                        </div>
                        <div class="type">
                            <h6>最小化问题</h6>
                            <p>寻找使某个量达到最小值的方案</p>
                            <div class="example">
                                <p>从A地到B地，走哪条路线距离最短？</p>
                            </div>
                        </div>
                        <div class="type">
                            <h6>资源分配问题</h6>
                            <p>在有限资源下，如何分配才能获得最大效益</p>
                            <div class="example">
                                <p>有30个苹果分给3个班级，怎样分配最公平？</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>优化问题的解题策略</h5>
                    <div class="optimization-strategies">
                        <div class="strategy">
                            <h6>枚举法</h6>
                            <p>列举所有可能的方案，逐一比较找出最优解</p>
                            <div class="example">
                                <p>问题：用1、2、3、4四个数字组成两位数，哪个最大？</p>
                                <p>方法：列举所有可能：12,13,14,21,23,24,31,32,34,41,42,43</p>
                                <p>结果：43最大</p>
                            </div>
                        </div>
                        
                        <div class="strategy">
                            <h6>贪心算法</h6>
                            <p>每一步都选择当前看起来最好的选择</p>
                            <div class="example">
                                <p>问题：用最少的硬币组成1元钱（有1角、2角、5角硬币）</p>
                                <p>方法：先用最大面值5角（2个），再用1角（0个），共2个硬币</p>
                            </div>
                        </div>
                        
                        <div class="strategy">
                            <h6>分治法</h6>
                            <p>将大问题分解为小问题，分别解决后合并</p>
                            <div class="example">
                                <p>问题：在1000个数中找最大值</p>
                                <p>方法：分成两组500个数，分别找最大值，再比较两个最大值</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>经典优化问题</h5>
                    <div class="classic-problems">
                        <div class="problem">
                            <h6>围篱笆问题</h6>
                            <p>用固定长度的篱笆围成图形，什么形状面积最大？</p>
                            <div class="solution">
                                <p><strong>结论：</strong>圆形面积最大，正方形在多边形中面积最大</p>
                            </div>
                        </div>
                        
                        <div class="problem">
                            <h6>最短路径问题</h6>
                            <p>从一点到另一点，什么路径最短？</p>
                            <div class="solution">
                                <p><strong>结论：</strong>直线距离最短</p>
                            </div>
                        </div>
                        
                        <div class="problem">
                            <h6>背包问题</h6>
                            <p>背包容量有限，如何选择物品使价值最大？</p>
                            <div class="solution">
                                <p><strong>策略：</strong>优先选择价值密度（价值/重量）高的物品</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="practical-example">
                    <h5>实际应用例子</h5>
                    <div class="example-problem">
                        <h6>学校春游问题</h6>
                        <p>学校要组织春游，有48名学生，租车方案如下：</p>
                        <ul>
                            <li>大巴：每辆坐20人，租金200元</li>
                            <li>中巴：每辆坐12人，租金120元</li>
                            <li>小巴：每辆坐8人，租金80元</li>
                        </ul>
                        <p>问：如何租车费用最少？</p>
                        
                        <div class="solution-process">
                            <h6>解题过程：</h6>
                            <div class="solution-step">
                                <p><strong>方案1：</strong>全用大巴车</p>
                                <p>需要3辆大巴（20×3=60>48），费用：200×3=600元</p>
                            </div>
                            <div class="solution-step">
                                <p><strong>方案2：</strong>2辆大巴+1辆中巴</p>
                                <p>坐人数：20×2+12×1=52>48，费用：200×2+120×1=520元</p>
                            </div>
                            <div class="solution-step">
                                <p><strong>方案3：</strong>2辆大巴+1辆小巴</p>
                                <p>坐人数：20×2+8×1=48=48，费用：200×2+80×1=480元</p>
                            </div>
                            <div class="solution-step">
                                <p><strong>结论：</strong>方案3最优，费用480元</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 策略问题内容 ===

    // 策略问题 - 基础解释
    generateStrategyExplanation() {
        return `
            <div class="explanation-content">
                <h4>策略问题的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是策略问题？</h5>
                    <p>策略问题是需要制定计划和方法来解决的问题，通常涉及多个步骤和决策。</p>
                    <div class="strategy-characteristics">
                        <div class="char">
                            <h6>多步骤性</h6>
                            <p>需要分多个步骤完成</p>
                        </div>
                        <div class="char">
                            <h6>决策性</h6>
                            <p>在每个步骤需要做出选择</p>
                        </div>
                        <div class="char">
                            <h6>目标导向</h6>
                            <p>有明确的目标要达成</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>常见策略问题类型</h5>
                    <div class="strategy-types">
                        <div class="type">
                            <h6>搭配问题</h6>
                            <p>将不同的元素进行合理搭配</p>
                            <div class="example">
                                <p>有3件上衣和2条裤子，有几种搭配方法？</p>
                                <p>策略：用乘法原理，3×2=6种</p>
                            </div>
                        </div>
                        
                        <div class="type">
                            <h6>排队问题</h6>
                            <p>安排顺序使效率最高</p>
                            <div class="example">
                                <p>3个人排队，甲需要5分钟，乙需要3分钟，丙需要1分钟</p>
                                <p>策略：按时间从短到长排序：丙→乙→甲</p>
                            </div>
                        </div>
                        
                        <div class="type">
                            <h6>分组问题</h6>
                            <p>合理分组完成任务</p>
                            <div class="example">
                                <p>12个人分成3组，每组4人，有多少种分法？</p>
                                <p>策略：考虑是否区分组的顺序</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>解决策略问题的方法</h5>
                    <div class="solution-methods">
                        <div class="method">
                            <h6>画图法</h6>
                            <p>通过画图来帮助理解和解决问题</p>
                            <div class="example">
                                <p>问题：从A地到B地，经过C地，有几条路线？</p>
                                <p>方法：画出路线图，数出所有可能的路径</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>列表法</h6>
                            <p>将所有可能的情况列出来</p>
                            <div class="example">
                                <p>问题：用1、2、3三个数字组成两位数，有哪些？</p>
                                <p>方法：列表：12, 13, 21, 23, 31, 32</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>树形图法</h6>
                            <p>用树状结构表示所有可能的选择</p>
                            <div class="example">
                                <p>问题：投掷两次硬币，有哪些结果？</p>
                                <p>方法：画树形图，分支表示每次投掷的结果</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="game-theory-intro">
                    <h5>简单博弈策略</h5>
                    <div class="game-examples">
                        <div class="game">
                            <h6>取石子游戏</h6>
                            <p>规则：有15个石子，两人轮流取，每次可以取1-3个，取到最后一个的人获胜</p>
                            <div class="winning-strategy">
                                <p><strong>必胜策略：</strong>让对方面对4的倍数个石子</p>
                                <p>分析：15→12→8→4→0，每次都给对方留4的倍数</p>
                            </div>
                        </div>
                        
                        <div class="game">
                            <h6>猜数字游戏</h6>
                            <p>规则：在1-100中猜一个数字，每次告诉你大了还是小了</p>
                            <div class="winning-strategy">
                                <p><strong>最优策略：</strong>每次猜中位数</p>
                                <p>分析：二分法，最多7次就能猜中</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 数学思维内容 ===

    // 数学思维 - 基础解释
    generateMathematicalThinkingExplanation() {
        return `
            <div class="explanation-content">
                <h4>数学思维的培养</h4>
                
                <div class="concept-card">
                    <h5>什么是数学思维？</h5>
                    <p>数学思维是运用数学的观点、方法和语言去观察、分析和解决问题的思维方式。</p>
                    <div class="thinking-components">
                        <div class="component">
                            <h6>抽象思维</h6>
                            <p>从具体事物中抽取共同特征</p>
                        </div>
                        <div class="component">
                            <h6>逻辑思维</h6>
                            <p>按照一定的逻辑规则进行推理</p>
                        </div>
                        <div class="component">
                            <h6>直觉思维</h6>
                            <p>快速洞察问题本质的能力</p>
                        </div>
                        <div class="component">
                            <h6>创新思维</h6>
                            <p>用新的方法解决问题</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>数学思维的特点</h5>
                    <div class="thinking-features">
                        <div class="feature">
                            <h6>严谨性</h6>
                            <p>推理过程严密，结论可靠</p>
                            <div class="example">
                                <p>证明：所有偶数都能被2整除</p>
                            </div>
                        </div>
                        
                        <div class="feature">
                            <h6>系统性</h6>
                            <p>能够从整体上把握问题</p>
                            <div class="example">
                                <p>解决复杂问题时，先分析整体结构</p>
                            </div>
                        </div>
                        
                        <div class="feature">
                            <h6>创造性</h6>
                            <p>能够发现新的解决方法</p>
                            <div class="example">
                                <p>高斯快速计算1+2+...+100的方法</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>培养数学思维的方法</h5>
                    <div class="cultivation-methods">
                        <div class="method">
                            <h6>多角度思考</h6>
                            <p>从不同的角度分析同一个问题</p>
                            <div class="example">
                                <p>计算三角形面积：底×高÷2，海伦公式，坐标法等</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>类比思维</h6>
                            <p>将新问题与已知问题进行类比</p>
                            <div class="example">
                                <p>分数乘法类比整数乘法的意义</p>
                            </div>
                        </div>
                        
                        <div class="method">
                            <h6>反思总结</h6>
                            <p>解决问题后反思过程，总结规律</p>
                            <div class="example">
                                <p>做完题目后思考：还有其他方法吗？</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mathematical-beauty">
                    <h5>数学之美</h5>
                    <div class="beauty-examples">
                        <div class="beauty-item">
                            <h6>对称美</h6>
                            <p>数学中的对称现象体现了美的规律</p>
                            <div class="example">
                                <p>等腰三角形的对称性，圆的对称性</p>
                            </div>
                        </div>
                        
                        <div class="beauty-item">
                            <h6>简洁美</h6>
                            <p>用简单的公式表达复杂的关系</p>
                            <div class="example">
                                <p>勾股定理：a² + b² = c²</p>
                            </div>
                        </div>
                        
                        <div class="beauty-item">
                            <h6>统一美</h6>
                            <p>看似不同的现象有着统一的规律</p>
                            <div class="example">
                                <p>加法和乘法都满足交换律</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="thinking-habits">
                    <h5>良好的数学思维习惯</h5>
                    <div class="habits-list">
                        <div class="habit">
                            <h6>质疑精神</h6>
                            <p>对结论保持怀疑，寻求证明</p>
                        </div>
                        <div class="habit">
                            <h6>探索精神</h6>
                            <p>主动探索问题的本质和规律</p>
                        </div>
                        <div class="habit">
                            <h6>严谨态度</h6>
                            <p>计算仔细，推理严密</p>
                        </div>
                        <div class="habit">
                            <h6>创新意识</h6>
                            <p>敢于尝试新的解决方法</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 动态生成练习题
    generateExercise() {
        // 随机选择题型
        const types = ['logical-reasoning', 'optimization', 'strategy'];
        const type = types[Math.floor(Math.random() * types.length)];
        let problem = '', answer = '', hint = '', explanation = '';
        if (type === 'logical-reasoning') {
            // 逻辑推理题
            const names = ['甲','乙','丙','丁'];
            const a = names[Math.floor(Math.random()*names.length)];
            let b = names[Math.floor(Math.random()*names.length)];
            while(b===a) b = names[Math.floor(Math.random()*names.length)];
            let c = names[Math.floor(Math.random()*names.length)];
            while(c===a||c===b) c = names[Math.floor(Math.random()*names.length)];
            problem = `${a}比${b}高，${b}比${c}高，谁最高？`;
            answer = a;
            hint = `${a} > ${b} > ${c}`;
            explanation = `由题意，${a}最高。`;
        } else if (type === 'optimization') {
            // 优化问题：围长最大面积
            const total = (Math.floor(Math.random()*10)+10)*2; // 20~38米
            problem = `用${total}米篱笆围长方形菜园，长和宽各是多少米时面积最大？`;
            answer = `长${total/4}米，宽${total/4}米`;
            hint = '正方形面积最大';
            explanation = `当长=宽=${total/4}米时，面积最大。`;
        } else if (type === 'strategy') {
            // 排列组合题
            const n = Math.floor(Math.random()*3)+3; // 3~5人
            problem = `${n}个人排队，有几种不同的排法？`;
            let res = 1;
            for(let i=1;i<=n;i++) res*=i;
            answer = `${res}`;
            hint = `${n}! = ${Array.from({length:n},(_,i)=>n-i).join('×')}`;
            explanation = `一共有${res}种排法。`;
        }
        this.currentExercise = { type, problem, answer, hint, explanation };
    }

    // 渲染练习题
    renderExercise() {
        this.generateExercise();
        const ex = this.currentExercise;
        const container = document.getElementById('mathThinkingPractice');
        if (!container) return;
        container.innerHTML = `
            <div class="practice-content">
                <h4>✏️ 数学思维练习</h4>
                <div class="practice-info">
                    <span class="exercise-type">题型：${ex.type === 'logical-reasoning' ? '逻辑推理' : ex.type === 'optimization' ? '最优策略' : '排列组合'}</span>
                </div>
                <div class="exercise-card">
                    <div class="question">
                        <h5>${ex.problem}</h5>
                        <div class="answer-input">
                            <input type="text" id="mtAnswer" placeholder="请输入答案">
                            <button onclick="mathThinking.checkAnswer()" class="check-btn">检查答案</button>
                        </div>
                    </div>
                    <div class="hint"><p><strong>提示：</strong>${ex.hint}</p></div>
                </div>
                <div class="practice-controls">
                    <button onclick="mathThinking.renderExercise()" class="next-btn">下一题</button>
                </div>
                <div id="mtFeedback" class="feedback"></div>
            </div>
        `;
    }

    // 检查排列
    checkArrangement() {
        const slots = document.querySelectorAll('.slot');
        const arrangement = [];
        
        slots.forEach(slot => {
            const number = slot.textContent;
            if (number && number !== '位置1' && number !== '位置2' && number !== '位置3' && number !== '位置4') {
                arrangement.push(parseInt(number));
            }
        });
        
        // 检查是否满足条件
        const feedback = document.getElementById('arrangement-feedback');
        if (arrangement.length === 4) {
            let valid = true;
            let message = '';
            
            // 检查条件1：1不能在第一个位置
            if (arrangement[0] === 1) {
                valid = false;
                message += '1不能在第一个位置；';
            }
            
            // 检查条件2：2必须在3的前面
            const pos2 = arrangement.indexOf(2);
            const pos3 = arrangement.indexOf(3);
            if (pos2 > pos3) {
                valid = false;
                message += '2必须在3的前面；';
            }
            
            // 检查条件3：4不能在最后一个位置
            if (arrangement[3] === 4) {
                valid = false;
                message += '4不能在最后一个位置；';
            }
            
            if (valid) {
                feedback.innerHTML = '<span class="correct">✓ 正确！这是一个有效的排列。</span>';
                feedback.className = 'puzzle-feedback correct';
                this.score += 15;
            } else {
                feedback.innerHTML = `<span class="incorrect">✗ 不满足条件：${message}</span>`;
                feedback.className = 'puzzle-feedback incorrect';
            }
        } else {
            feedback.innerHTML = '<span class="incorrect">请将所有数字放到位置上</span>';
            feedback.className = 'puzzle-feedback incorrect';
        }
    }

    // 重置排列
    resetArrangement() {
        const slots = document.querySelectorAll('.slot');
        const tiles = document.querySelectorAll('.number-tile');
        
        slots.forEach((slot, index) => {
            slot.textContent = `位置${index + 1}`;
            slot.className = 'slot';
        });
        
        tiles.forEach(tile => {
            tile.style.display = 'block';
        });
        
        document.getElementById('arrangement-feedback').innerHTML = '';
    }

    // 检查规律
    checkPattern(patternId, correctAnswer) {
        const userAnswer = parseInt(document.getElementById(`pattern-${patternId}`).value);
        const feedback = document.getElementById(`pattern-feedback-${patternId}`);
        
        if (userAnswer === correctAnswer) {
            feedback.innerHTML = '<span class="correct">✓ 正确！规律是每个数都是前一个数的2倍。</span>';
            feedback.className = 'pattern-feedback correct';
            this.score += 10;
        } else {
            feedback.innerHTML = `<span class="incorrect">✗ 错误。正确答案是${correctAnswer}，规律是×2。</span>`;
            feedback.className = 'pattern-feedback incorrect';
        }
    }

    // 选择形状
    selectShape(shape) {
        const feedback = document.getElementById('shape-feedback');
        if (shape === 'triangle') {
            feedback.innerHTML = '<span class="correct">✓ 正确！规律是圆-方-三角形循环。</span>';
            feedback.className = 'pattern-feedback correct';
            this.score += 10;
        } else {
            feedback.innerHTML = '<span class="incorrect">✗ 错误。正确答案是三角形，规律是三个图形循环。</span>';
            feedback.className = 'pattern-feedback incorrect';
        }
    }

    // 检查答案
    checkAnswer() {
        const input = document.getElementById('mtAnswer');
        if (!input) return;
        const val = input.value.trim();
        const ex = this.currentExercise;
        const feedback = document.getElementById('mtFeedback');
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
        this.render();
    }
}

// 创建全局实例
const mathThinking = new MathThinking(); 