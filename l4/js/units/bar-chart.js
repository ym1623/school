// 第七单元：条形统计图学习模块

class BarChart {
    constructor() {
        this.unitId = 'bar-chart';
        this.currentTopic = 'data-collection';
        this.currentStage = 'explanation';
        this.topics = {
            'data-collection': {
                title: '数据的收集和整理',
                description: '学会收集、分类和整理数据'
            },
            'chart-understanding': {
                title: '条形统计图的认识',
                description: '理解条形统计图的结构和作用'
            },
            'chart-making': {
                title: '统计图的制作',
                description: '学会根据数据制作条形统计图'
            },
            'data-analysis': {
                title: '数据分析',
                description: '从统计图中获取信息并进行简单分析'
            }
        };
        this.stages = ['explanation', 'visualization', 'practice', 'extension'];
        this.currentExercise = 0;
        this.score = 0;
        this.chartData = [];
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
            <div class="modal-content bar-chart-modal">
                <div class="modal-header">
                    <h2>第七单元：条形统计图</h2>
                    <button class="close-btn" onclick="closeLearningModal()">&times;</button>
                </div>
                
                <div class="unit-nav">
                    <div class="topic-selector">
                        ${Object.entries(this.topics).map(([key, topic]) => `
                            <button class="topic-btn ${this.currentTopic === key ? 'active' : ''}" 
                                    onclick="barChart.switchTopic('${key}')">
                                ${topic.title}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div class="stage-selector">
                        ${this.stages.map(stage => `
                            <button class="stage-btn ${this.currentStage === stage ? 'active' : ''}" 
                                    onclick="barChart.switchStage('${stage}')">
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

    // === 数据收集和整理内容 ===

    // 数据收集 - 基础解释
    generateDataCollectionExplanation() {
        return `
            <div class="explanation-content">
                <h4>数据收集和整理的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是数据？</h5>
                    <p>数据是通过观察、测量、调查等方式获得的数字、文字、符号等信息。</p>
                    <div class="example">
                        <p><strong>例子：</strong></p>
                        <ul>
                            <li>班级学生的身高</li>
                            <li>每天的气温</li>
                            <li>喜欢的运动项目</li>
                            <li>考试成绩</li>
                        </ul>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>数据收集的方法</h5>
                    <div class="methods">
                        <div class="method">
                            <h6>观察法</h6>
                            <p>通过直接观察来收集数据，如观察天气变化</p>
                        </div>
                        <div class="method">
                            <h6>测量法</h6>
                            <p>使用工具进行测量，如测量身高、体重</p>
                        </div>
                        <div class="method">
                            <h6>调查法</h6>
                            <p>通过问卷或访谈收集数据，如调查喜好</p>
                        </div>
                        <div class="method">
                            <h6>实验法</h6>
                            <p>通过实验获得数据，如实验结果记录</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>数据整理的步骤</h5>
                    <div class="steps">
                        <div class="step">
                            <span class="step-number">1</span>
                            <span class="step-text">收集原始数据</span>
                        </div>
                        <div class="step">
                            <span class="step-number">2</span>
                            <span class="step-text">分类归纳数据</span>
                        </div>
                        <div class="step">
                            <span class="step-number">3</span>
                            <span class="step-text">统计各类数据的数量</span>
                        </div>
                        <div class="step">
                            <span class="step-number">4</span>
                            <span class="step-text">制作统计表</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 数据收集 - 可视化理解
    generateDataCollectionVisualization() {
        return `
            <div class="visualization-content">
                <h4>数据收集过程演示</h4>
                
                <div class="demo-scenario">
                    <h5>场景：调查班级同学最喜欢的运动</h5>
                    
                    <div class="data-collection-demo">
                        <div class="step-visual">
                            <h6>步骤1：收集原始数据</h6>
                            <div class="raw-data">
                                <div class="student-responses">
                                    <span class="response">小明: 足球</span>
                                    <span class="response">小红: 篮球</span>
                                    <span class="response">小刚: 足球</span>
                                    <span class="response">小丽: 乒乓球</span>
                                    <span class="response">小华: 篮球</span>
                                    <span class="response">小强: 足球</span>
                                    <span class="response">小美: 乒乓球</span>
                                    <span class="response">小亮: 篮球</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-visual">
                            <h6>步骤2：分类整理</h6>
                            <div class="categorized-data">
                                <div class="category">
                                    <h6>足球</h6>
                                    <div class="tally">正 正 |||</div>
                                    <span class="count">3人</span>
                                </div>
                                <div class="category">
                                    <h6>篮球</h6>
                                    <div class="tally">正 正 |||</div>
                                    <span class="count">3人</span>
                                </div>
                                <div class="category">
                                    <h6>乒乓球</h6>
                                    <div class="tally">正 ||</div>
                                    <span class="count">2人</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="step-visual">
                            <h6>步骤3：制作统计表</h6>
                            <div class="data-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>运动项目</th>
                                            <th>人数</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>足球</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>篮球</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>乒乓球</td>
                                            <td>2</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="interactive-demo">
                    <h5>互动数据收集</h5>
                    <div class="data-input">
                        <div class="input-group">
                            <label>请输入你喜欢的水果：</label>
                            <select id="fruit-selector">
                                <option value="">请选择</option>
                                <option value="苹果">苹果</option>
                                <option value="香蕉">香蕉</option>
                                <option value="橙子">橙子</option>
                                <option value="葡萄">葡萄</option>
                            </select>
                            <button onclick="barChart.addDataPoint()" class="add-btn">添加</button>
                        </div>
                        
                        <div class="collected-data">
                            <h6>收集到的数据：</h6>
                            <div id="data-display"></div>
                        </div>
                        
                        <div class="organized-data">
                            <h6>整理后的统计：</h6>
                            <div id="organized-display"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 数据收集 - 步骤练习
    generateDataCollectionPractice() {
        // 随机生成宠物数据
        const pets = ['小猫', '小狗', '小兔'];
        const counts = pets.map(() => Math.floor(Math.random()*6)+2); // 2~7只
        let dataArr = [];
        pets.forEach((pet, idx) => {
            for(let i=0;i<counts[idx];i++) dataArr.push(pet);
        });
        // 打乱顺序
        dataArr = dataArr.sort(()=>Math.random()-0.5);
        // 记录答案
        this.currentDataAnswer = {
            '小猫': counts[0],
            '小狗': counts[1],
            '小兔': counts[2]
        };
        return `
            <div class="practice-content">
                <h4>数据收集和整理练习</h4>
                <div class="exercise-card">
                    <h5>练习：整理下面的数据</h5>
                    <div class="raw-data-exercise">
                        <p><strong>题目：</strong>下面是四年级一班同学养宠物的调查结果：</p>
                        <div class="data-list">
                            <span>${dataArr.join(' ')}</span>
                        </div>
                    </div>
                    <div class="exercise-form">
                        <h6>请完成统计表：</h6>
                        <table class="exercise-table">
                            <thead>
                                <tr><th>宠物类型</th><th>数量</th></tr>
                            </thead>
                            <tbody>
                                <tr><td>小猫</td><td><input type="number" id="cat-count" min="0" class="count-input"></td></tr>
                                <tr><td>小狗</td><td><input type="number" id="dog-count" min="0" class="count-input"></td></tr>
                                <tr><td>小兔</td><td><input type="number" id="rabbit-count" min="0" class="count-input"></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="practice-controls">
                    <button onclick="barChart.checkDataPractice()" class="check-btn">检查答案</button>
                    <button onclick="barChart.renderDataCollectionPractice()" class="next-btn">下一题</button>
                </div>
                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    // 数据收集 - 扩展知识
    generateDataCollectionExtension() {
        return `
            <div class="extension-content">
                <h4>数据收集的拓展知识</h4>
                
                <div class="extension-card">
                    <h5>生活中的数据收集</h5>
                    <div class="real-examples">
                        <div class="example">
                            <h6>气象数据</h6>
                            <p>气象站每天收集温度、湿度、风速等数据，帮助我们了解天气变化。</p>
                        </div>
                        <div class="example">
                            <h6>交通数据</h6>
                            <p>交通部门收集车流量数据，用于优化交通信号灯时间。</p>
                        </div>
                        <div class="example">
                            <h6>销售数据</h6>
                            <p>商店收集销售数据，了解哪些商品受欢迎。</p>
                        </div>
                    </div>
                </div>

                <div class="extension-card">
                    <h5>数据收集的注意事项</h5>
                    <div class="tips">
                        <div class="tip">
                            <h6>准确性</h6>
                            <p>收集数据时要保证准确，避免错误记录</p>
                        </div>
                        <div class="tip">
                            <h6>完整性</h6>
                            <p>尽量收集完整的数据，避免遗漏</p>
                        </div>
                        <div class="tip">
                            <h6>及时性</h6>
                            <p>及时整理收集到的数据，避免遗忘</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === 统计图认识内容 ===

    // 统计图认识 - 基础解释
    generateChartUnderstandingExplanation() {
        return `
            <div class="explanation-content">
                <h4>条形统计图的基础知识</h4>
                
                <div class="concept-card">
                    <h5>什么是条形统计图？</h5>
                    <p>条形统计图是用长短不同的直条来表示数据大小的统计图。</p>
                    <div class="chart-features">
                        <div class="feature">
                            <h6>直观性</h6>
                            <p>可以直观地看出数据的大小关系</p>
                        </div>
                        <div class="feature">
                            <h6>比较性</h6>
                            <p>容易比较不同数据之间的差异</p>
                        </div>
                        <div class="feature">
                            <h6>简洁性</h6>
                            <p>用图形表示数据，简单易懂</p>
                        </div>
                    </div>
                </div>

                <div class="concept-card">
                    <h5>条形统计图的组成</h5>
                    <div class="chart-components">
                        <div class="component">
                            <h6>标题</h6>
                            <p>说明统计图的内容</p>
                        </div>
                        <div class="component">
                            <h6>横轴（X轴）</h6>
                            <p>表示不同的类别</p>
                        </div>
                        <div class="component">
                            <h6>纵轴（Y轴）</h6>
                            <p>表示数据的大小</p>
                        </div>
                        <div class="component">
                            <h6>条形</h6>
                            <p>用长短表示数据大小</p>
                        </div>
                        <div class="component">
                            <h6>单位</h6>
                            <p>说明数据的计量单位</p>
                        </div>
                    </div>
                </div>

                <div class="sample-chart">
                    <h5>条形统计图示例</h5>
                    <div class="chart-display">
                        <div class="chart-title">四年级一班同学喜欢的运动（单位：人）</div>
                        <div class="chart-area">
                            <div class="y-axis">
                                <span>8</span>
                                <span>6</span>
                                <span>4</span>
                                <span>2</span>
                                <span>0</span>
                            </div>
                            <div class="bars">
                                <div class="bar-item">
                                    <div class="bar" style="height: 60px;"></div>
                                    <span class="label">足球</span>
                                </div>
                                <div class="bar-item">
                                    <div class="bar" style="height: 80px;"></div>
                                    <span class="label">篮球</span>
                                </div>
                                <div class="bar-item">
                                    <div class="bar" style="height: 40px;"></div>
                                    <span class="label">乒乓球</span>
                                </div>
                                <div class="bar-item">
                                    <div class="bar" style="height: 100px;"></div>
                                    <span class="label">跑步</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 统计图认识 - 可视化理解
    generateChartUnderstandingVisualization() {
        return `
            <div class="visualization-content">
                <h4>条形统计图的可视化理解</h4>
                
                <div class="interactive-chart">
                    <h5>互动条形图</h5>
                    <div class="chart-builder">
                        <div class="data-input">
                            <h6>设置数据：</h6>
                            <div class="input-row">
                                <label>苹果：</label>
                                <input type="number" id="apple-value" min="0" max="10" value="5">
                            </div>
                            <div class="input-row">
                                <label>香蕉：</label>
                                <input type="number" id="banana-value" min="0" max="10" value="3">
                            </div>
                            <div class="input-row">
                                <label>橙子：</label>
                                <input type="number" id="orange-value" min="0" max="10" value="7">
                            </div>
                            <div class="input-row">
                                <label>葡萄：</label>
                                <input type="number" id="grape-value" min="0" max="10" value="4">
                            </div>
                            <button onclick="barChart.updateInteractiveChart()" class="update-btn">更新图表</button>
                        </div>
                        
                        <div class="chart-display">
                            <div class="chart-title">水果销售统计图（单位：个）</div>
                            <div id="interactive-chart-area" class="chart-area"></div>
                        </div>
                    </div>
                </div>

                <div class="chart-reading">
                    <h5>读图技巧</h5>
                    <div class="reading-tips">
                        <div class="tip">
                            <h6>1. 看标题</h6>
                            <p>首先看统计图的标题，了解图表的主题</p>
                        </div>
                        <div class="tip">
                            <h6>2. 看坐标轴</h6>
                            <p>观察横轴和纵轴分别表示什么</p>
                        </div>
                        <div class="tip">
                            <h6>3. 看数据</h6>
                            <p>根据条形的高度读出各项数据</p>
                        </div>
                        <div class="tip">
                            <h6>4. 做比较</h6>
                            <p>比较各项数据的大小关系</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 统计图认识 - 步骤练习
    generateChartUnderstandingPractice() {
        // 随机生成图书类别和数量
        const books = ['科学', '故事', '漫画', '历史'];
        const nums = books.map(()=>Math.floor(Math.random()*8)+4); // 4~11本
        // 最高的类别
        const maxIdx = nums.indexOf(Math.max(...nums));
        // 故事类数量
        const storyIdx = books.indexOf('故事');
        // 科学-历史差
        const sciIdx = books.indexOf('科学');
        const hisIdx = books.indexOf('历史');
        // 记录答案
        this.currentChartAnswer = {
            q1: books[maxIdx],
            q2: nums[storyIdx],
            q3: Math.abs(nums[sciIdx]-nums[hisIdx])
        };
        return `
            <div class="practice-content">
                <h4>条形统计图读图练习</h4>
                <div class="exercise-card">
                    <div class="practice-chart">
                        <div class="chart-title">四年级二班图书阅读统计图（单位：本）</div>
                        <div class="chart-area">
                            <div class="y-axis">
                                <span>12</span><span>10</span><span>8</span><span>6</span><span>4</span><span>2</span><span>0</span>
                            </div>
                            <div class="bars">
                                ${books.map((b, i)=>`<div class='bar-item'><div class='bar' style='height:${nums[i]*8}px;'></div><span class='label'>${b}</span></div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="questions">
                        <h6>根据统计图回答问题：</h6>
                        <div class="question-item">
                            <p>1. 哪类图书阅读量最多？</p>
                            <select id="q1-answer"><option value="">请选择</option>${books.map(b=>`<option value='${b}'>${b}</option>`).join('')}</select>
                        </div>
                        <div class="question-item">
                            <p>2. 故事类图书阅读了多少本？</p>
                            <input type="number" id="q2-answer" min="0" placeholder="请输入数字">
                        </div>
                        <div class="question-item">
                            <p>3. 科学类比历史类多读了多少本？</p>
                            <input type="number" id="q3-answer" min="0" placeholder="请输入数字">
                        </div>
                    </div>
                </div>
                <div class="practice-controls">
                    <button onclick="barChart.checkChartReading()" class="check-btn">检查答案</button>
                    <button onclick="barChart.renderChartUnderstandingPractice()" class="next-btn">下一题</button>
                </div>
                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    // 统计图认识 - 扩展知识
    generateChartUnderstandingExtension() {
        return `
            <div class="extension-content">
                <h4>条形统计图的拓展知识</h4>
                
                <div class="extension-card">
                    <h5>条形统计图的类型</h5>
                    <div class="chart-types">
                        <div class="type">
                            <h6>垂直条形图</h6>
                            <p>条形垂直向上，最常见的形式</p>
                        </div>
                        <div class="type">
                            <h6>水平条形图</h6>
                            <p>条形水平向右，适合类别名称较长时使用</p>
                        </div>
                        <div class="type">
                            <h6>分组条形图</h6>
                            <p>可以同时比较多个数据组</p>
                        </div>
                        <div class="type">
                            <h6>堆积条形图</h6>
                            <p>显示各部分在总体中的比例</p>
                        </div>
                    </div>
                </div>

                <div class="extension-card">
                    <h5>其他常见的统计图</h5>
                    <div class="other-charts">
                        <div class="chart-type">
                            <h6>折线图</h6>
                            <p>适合表示数据随时间的变化趋势</p>
                        </div>
                        <div class="chart-type">
                            <h6>饼图</h6>
                            <p>适合表示各部分占总体的比例</p>
                        </div>
                        <div class="chart-type">
                            <h6>散点图</h6>
                            <p>适合表示两个变量之间的关系</p>
                        </div>
                    </div>
                </div>

                <div class="extension-card">
                    <h5>统计图的应用场景</h5>
                    <div class="applications">
                        <div class="app">
                            <h6>教育统计</h6>
                            <p>学生成绩分析、出勤率统计等</p>
                        </div>
                        <div class="app">
                            <h6>商业分析</h6>
                            <p>销售数据分析、市场调研等</p>
                        </div>
                        <div class="app">
                            <h6>科学研究</h6>
                            <p>实验数据展示、研究结果分析等</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成练习题
    generateExercises() {
        this.exercises = [
            {
                type: 'data-collection',
                data: ['小猫', '小狗', '小兔', '小猫', '小狗', '小狗', '小兔', '小猫', '小狗', '小兔', '小兔', '小猫'],
                answer: { '小猫': 4, '小狗': 4, '小兔': 4 }
            },
            {
                type: 'chart-reading',
                chartData: { '科学': 8, '故事': 6, '漫画': 10, '历史': 4 },
                questions: [
                    { q: '哪类图书阅读量最多？', answer: '漫画' },
                    { q: '故事类图书阅读了多少本？', answer: 6 },
                    { q: '科学类比历史类多读了多少本？', answer: 4 }
                ]
            }
        ];
    }

    // 添加数据点
    addDataPoint() {
        const selector = document.getElementById('fruit-selector');
        const fruit = selector.value;
        
        if (fruit) {
            this.chartData.push(fruit);
            this.updateDataDisplay();
            selector.value = '';
        }
    }

    // 更新数据显示
    updateDataDisplay() {
        const dataDisplay = document.getElementById('data-display');
        const organizedDisplay = document.getElementById('organized-display');
        
        // 显示原始数据
        dataDisplay.innerHTML = this.chartData.join('、');
        
        // 显示整理后的数据
        const organized = this.organizeData(this.chartData);
        let organizedHTML = '<table><tr><th>水果</th><th>数量</th></tr>';
        Object.entries(organized).forEach(([fruit, count]) => {
            organizedHTML += `<tr><td>${fruit}</td><td>${count}</td></tr>`;
        });
        organizedHTML += '</table>';
        organizedDisplay.innerHTML = organizedHTML;
    }

    // 整理数据
    organizeData(data) {
        const organized = {};
        data.forEach(item => {
            organized[item] = (organized[item] || 0) + 1;
        });
        return organized;
    }

    // 更新互动图表
    updateInteractiveChart() {
        const apple = parseInt(document.getElementById('apple-value').value) || 0;
        const banana = parseInt(document.getElementById('banana-value').value) || 0;
        const orange = parseInt(document.getElementById('orange-value').value) || 0;
        const grape = parseInt(document.getElementById('grape-value').value) || 0;
        
        const chartArea = document.getElementById('interactive-chart-area');
        const maxValue = Math.max(apple, banana, orange, grape, 1);
        
        chartArea.innerHTML = `
            <div class="y-axis">
                ${Array.from({length: maxValue + 1}, (_, i) => `<span>${maxValue - i}</span>`).join('')}
            </div>
            <div class="bars">
                <div class="bar-item">
                    <div class="bar" style="height: ${apple * 10}px;"></div>
                    <span class="label">苹果</span>
                </div>
                <div class="bar-item">
                    <div class="bar" style="height: ${banana * 10}px;"></div>
                    <span class="label">香蕉</span>
                </div>
                <div class="bar-item">
                    <div class="bar" style="height: ${orange * 10}px;"></div>
                    <span class="label">橙子</span>
                </div>
                <div class="bar-item">
                    <div class="bar" style="height: ${grape * 10}px;"></div>
                    <span class="label">葡萄</span>
                </div>
            </div>
        `;
    }

    // 检查数据整理练习
    checkDataPractice() {
        const catCount = parseInt(document.getElementById('cat-count').value) || 0;
        const dogCount = parseInt(document.getElementById('dog-count').value) || 0;
        const rabbitCount = parseInt(document.getElementById('rabbit-count').value) || 0;
        
        const correctAnswers = { cat: 4, dog: 4, rabbit: 4 };
        const feedback = document.getElementById('feedback');
        
        if (catCount === correctAnswers.cat && dogCount === correctAnswers.dog && rabbitCount === correctAnswers.rabbit) {
            feedback.innerHTML = '<div class="correct">✓ 答案正确！数据整理得很好！</div>';
            feedback.className = 'feedback correct';
            this.score += 10;
        } else {
            feedback.innerHTML = `<div class="incorrect">✗ 答案不正确。正确答案是：小猫4个，小狗4个，小兔4个</div>`;
            feedback.className = 'feedback incorrect';
        }
    }

    // 检查图表阅读练习
    checkChartReading() {
        const q1 = document.getElementById('q1-answer').value;
        const q2 = parseInt(document.getElementById('q2-answer').value) || 0;
        const q3 = parseInt(document.getElementById('q3-answer').value) || 0;
        
        const feedback = document.getElementById('feedback');
        let correct = 0;
        let total = 3;
        
        if (q1 === this.currentChartAnswer.q1) correct++;
        if (q2 === this.currentChartAnswer.q2) correct++;
        if (q3 === this.currentChartAnswer.q3) correct++;
        
        if (correct === total) {
            feedback.innerHTML = '<div class="correct">✓ 全部答案正确！图表阅读能力很强！</div>';
            feedback.className = 'feedback correct';
            this.score += 15;
        } else {
            feedback.innerHTML = `<div class="incorrect">✗ 答对了${correct}/${total}题。正确答案：1.${this.currentChartAnswer.q1} 2.${this.currentChartAnswer.q2} 3.${this.currentChartAnswer.q3}</div>`;
            feedback.className = 'feedback incorrect';
        }
    }
}

// 创建全局实例
const barChart = new BarChart();
