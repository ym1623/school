// 第五单元：平行四边形和梯形 - 学习模块

class QuadrilateralsUnit {
    constructor() {
        this.unitId = 'quadrilaterals';
        this.unitName = '平行四边形和梯形';
        this.topics = [
            { id: 'parallelogram', name: '平行四边形的认识', difficulty: 2 },
            { id: 'trapezoid', name: '梯形的认识', difficulty: 2 },
            { id: 'properties', name: '图形的性质', difficulty: 3 },
            { id: 'application', name: '图形的应用', difficulty: 3 }
        ];
        this.currentTopic = 'parallelogram';
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
            // 平行四边形练习题
            { 
                type: 'parallelogram',
                question: '平行四边形的对边有什么特点？',
                answer: '对边平行且相等',
                explanation: '平行四边形的对边不仅平行，而且长度相等',
                hint: '想想平行四边形的定义'
            },
            { 
                type: 'parallelogram',
                question: '平行四边形的对角有什么特点？',
                answer: '对角相等',
                explanation: '平行四边形的对角相等，这是平行四边形的重要性质',
                hint: '观察平行四边形的角'
            },
            // 梯形练习题
            { 
                type: 'trapezoid',
                question: '梯形有几组平行边？',
                answer: '一组',
                explanation: '梯形只有一组对边平行，这是梯形的定义',
                hint: '梯形的定义是什么？'
            },
            { 
                type: 'trapezoid',
                question: '等腰梯形的两个底角有什么关系？',
                answer: '相等',
                explanation: '等腰梯形的两个底角相等，这是等腰梯形的重要性质',
                hint: '等腰梯形的特点'
            },
            // 性质练习题
            { 
                type: 'properties',
                question: '平行四边形的面积公式是什么？',
                answer: '底×高',
                explanation: '平行四边形的面积等于底乘以高',
                hint: '想想平行四边形的面积计算方法'
            },
            { 
                type: 'properties',
                question: '梯形的面积公式是什么？',
                answer: '(上底+下底)×高÷2',
                explanation: '梯形的面积等于上底加下底的和乘以高再除以2',
                hint: '梯形的面积计算需要用到上下底'
            }
        ];
    }

    // 生成基础解释内容
    getExplanationContent() {
        return `
            <div class="unit-explanation">
                <h4>📐 平行四边形和梯形</h4>
                <div class="concept-section">
                    <h5>平行四边形的认识</h5>
                    <div class="shape-definition">
                        <div class="definition-item">
                            <h6>定义</h6>
                            <p>平行四边形是两组对边分别平行的四边形。</p>
                        </div>
                        <div class="definition-item">
                            <h6>特征</h6>
                            <ul>
                                <li>对边平行且相等</li>
                                <li>对角相等</li>
                                <li>对角线互相平分</li>
                                <li>相邻角互补</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>梯形的认识</h5>
                    <div class="shape-definition">
                        <div class="definition-item">
                            <h6>定义</h6>
                            <p>梯形是只有一组对边平行的四边形。</p>
                        </div>
                        <div class="definition-item">
                            <h6>分类</h6>
                            <ul>
                                <li><strong>一般梯形：</strong>只有一组对边平行</li>
                                <li><strong>等腰梯形：</strong>两腰相等的梯形</li>
                                <li><strong>直角梯形：</strong>有一个角是直角的梯形</li>
                            </ul>
                        </div>
                        <div class="definition-item">
                            <h6>特征</h6>
                            <ul>
                                <li>一组对边平行（上下底）</li>
                                <li>另一组对边不平行（两腰）</li>
                                <li>等腰梯形的两腰相等</li>
                                <li>等腰梯形的两个底角相等</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="concept-section">
                    <h5>图形性质对比</h5>
                    <div class="comparison-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>性质</th>
                                    <th>平行四边形</th>
                                    <th>梯形</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>平行边</td>
                                    <td>两组对边平行</td>
                                    <td>一组对边平行</td>
                                </tr>
                                <tr>
                                    <td>对边</td>
                                    <td>对边相等</td>
                                    <td>对边不一定相等</td>
                                </tr>
                                <tr>
                                    <td>对角</td>
                                    <td>对角相等</td>
                                    <td>对角不一定相等</td>
                                </tr>
                                <tr>
                                    <td>面积公式</td>
                                    <td>底 × 高</td>
                                    <td>(上底+下底) × 高 ÷ 2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // 生成可视化内容
    getVisualizationContent() {
        return `
            <div class="visualization-content">
                <h4>🎨 图形可视化</h4>
                
                <div class="shape-demo">
                    <h5>图形识别演示</h5>
                    <div class="demo-controls">
                        <button onclick="quadrilateralsUnit.showParallelogram()" class="shape-btn">平行四边形</button>
                        <button onclick="quadrilateralsUnit.showTrapezoid()" class="shape-btn">梯形</button>
                        <button onclick="quadrilateralsUnit.showIsoscelesTrapezoid()" class="shape-btn">等腰梯形</button>
                        <button onclick="quadrilateralsUnit.showRightTrapezoid()" class="shape-btn">直角梯形</button>
                    </div>
                    
                    <div id="shapeDisplay" class="shape-display">
                        <div class="placeholder">点击按钮查看不同图形</div>
                    </div>
                </div>

                <div class="interactive-builder">
                    <h5>图形构建器</h5>
                    <div class="builder-controls">
                        <div class="control-group">
                            <label>图形类型：</label>
                            <select id="shapeType" onchange="quadrilateralsUnit.updateBuilder()">
                                <option value="parallelogram">平行四边形</option>
                                <option value="trapezoid">梯形</option>
                                <option value="isosceles">等腰梯形</option>
                            </select>
                        </div>
                        <div class="control-group">
                            <label>底边长度：</label>
                            <input type="range" id="baseLength" min="50" max="200" value="100" onchange="quadrilateralsUnit.updateBuilder()">
                            <span id="baseValue">100</span>
                        </div>
                        <div class="control-group">
                            <label>高度：</label>
                            <input type="range" id="height" min="30" max="150" value="60" onchange="quadrilateralsUnit.updateBuilder()">
                            <span id="heightValue">60</span>
                        </div>
                    </div>
                    
                    <div id="builderCanvas" class="builder-canvas">
                        <canvas id="shapeCanvas" width="400" height="300"></canvas>
                    </div>
                    
                    <div class="shape-info">
                        <div id="shapeProperties" class="properties-display">
                            <p>选择图形类型查看属性</p>
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
                <h4>✏️ 图形练习</h4>
                
                <div class="practice-info">
                    <span class="exercise-counter">题目 ${this.currentExercise + 1} / ${exercises.length}</span>
                    <span class="score">得分：${this.score}</span>
                </div>

                <div class="exercise-card">
                    <div class="question">
                        <h5>${currentEx.question}</h5>
                        <div class="answer-input">
                            <input type="text" id="answer" placeholder="请输入答案">
                            <button onclick="quadrilateralsUnit.checkAnswer()" class="check-btn">检查答案</button>
                        </div>
                    </div>
                    
                    <div class="hint">
                        <p><strong>提示：</strong>${currentEx.hint}</p>
                    </div>
                </div>

                <div class="practice-controls">
                    <button onclick="quadrilateralsUnit.nextExercise()" class="next-btn" style="display: none;">下一题</button>
                </div>

                <div id="feedback" class="feedback"></div>
            </div>
        `;
    }

    // 生成扩展内容
    getExtensionContent() {
        return `
            <div class="extension-content">
                <h4>🚀 图形扩展知识</h4>
                
                <div class="extension-section">
                    <h5>🔍 图形的历史</h5>
                    <div class="history-info">
                        <p>平行四边形和梯形的概念最早可以追溯到古希腊数学家欧几里得的《几何原本》。这些基本图形为现代几何学奠定了基础。</p>
                        <p>在中国古代，人们很早就认识到了这些图形的性质，并在建筑、工程等领域广泛应用。</p>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🏗️ 生活中的应用</h5>
                    <div class="real-world-examples">
                        <div class="example-card">
                            <h6>建筑中的平行四边形</h6>
                            <p>很多建筑物的墙面、地板都采用平行四边形设计，既美观又实用。</p>
                        </div>
                        <div class="example-card">
                            <h6>梯形的应用</h6>
                            <p>梯子、坡道、屋顶等都采用梯形设计，符合力学原理。</p>
                        </div>
                        <div class="example-card">
                            <h6>艺术设计</h6>
                            <p>在艺术设计中，平行四边形和梯形常用于创造动感和空间感。</p>
                        </div>
                    </div>
                </div>

                <div class="extension-section">
                    <h5>🎯 有趣的数学事实</h5>
                    <div class="math-facts">
                        <div class="fact-card">
                            <h6>平行四边形的变形</h6>
                            <p>平行四边形可以变形为矩形、菱形等特殊四边形，但始终保持对边平行的性质。</p>
                        </div>
                        <div class="fact-card">
                            <h6>梯形的稳定性</h6>
                            <p>梯形结构在工程中具有很好的稳定性，常用于桥梁、建筑等结构设计。</p>
                        </div>
                        <div class="fact-card">
                            <h6>面积关系</h6>
                            <p>当梯形的上底等于下底时，梯形就变成了平行四边形。</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 显示平行四边形
    showParallelogram() {
        const display = document.getElementById('shapeDisplay');
        display.innerHTML = `
            <div class="shape-demo-content">
                <svg width="300" height="200" viewBox="0 0 300 200">
                    <polygon points="50,50 250,50 200,150 0,150" 
                             fill="lightblue" stroke="blue" stroke-width="2"/>
                    <text x="150" y="180" text-anchor="middle" fill="blue">平行四边形</text>
                    <text x="60" y="70" fill="red">A</text>
                    <text x="260" y="70" fill="red">B</text>
                    <text x="210" y="170" fill="red">C</text>
                    <text x="10" y="170" fill="red">D</text>
                </svg>
                <div class="shape-description">
                    <h6>平行四边形ABCD</h6>
                    <p>• AB ∥ CD，AD ∥ BC</p>
                    <p>• AB = CD，AD = BC</p>
                    <p>• ∠A = ∠C，∠B = ∠D</p>
                </div>
            </div>
        `;
    }

    // 显示梯形
    showTrapezoid() {
        const display = document.getElementById('shapeDisplay');
        display.innerHTML = `
            <div class="shape-demo-content">
                <svg width="300" height="200" viewBox="0 0 300 200">
                    <polygon points="30,50 270,50 200,150 100,150" 
                             fill="lightgreen" stroke="green" stroke-width="2"/>
                    <text x="150" y="180" text-anchor="middle" fill="green">梯形</text>
                    <text x="40" y="70" fill="red">A</text>
                    <text x="280" y="70" fill="red">B</text>
                    <text x="210" y="170" fill="red">C</text>
                    <text x="110" y="170" fill="red">D</text>
                </svg>
                <div class="shape-description">
                    <h6>梯形ABCD</h6>
                    <p>• AB ∥ CD（上下底平行）</p>
                    <p>• AD ∦ BC（两腰不平行）</p>
                    <p>• 只有一组对边平行</p>
                </div>
            </div>
        `;
    }

    // 显示等腰梯形
    showIsoscelesTrapezoid() {
        const display = document.getElementById('shapeDisplay');
        display.innerHTML = `
            <div class="shape-demo-content">
                <svg width="300" height="200" viewBox="0 0 300 200">
                    <polygon points="50,50 250,50 200,150 100,150" 
                             fill="lightyellow" stroke="orange" stroke-width="2"/>
                    <text x="150" y="180" text-anchor="middle" fill="orange">等腰梯形</text>
                    <text x="60" y="70" fill="red">A</text>
                    <text x="260" y="70" fill="red">B</text>
                    <text x="210" y="170" fill="red">C</text>
                    <text x="90" y="170" fill="red">D</text>
                </svg>
                <div class="shape-description">
                    <h6>等腰梯形ABCD</h6>
                    <p>• AB ∥ CD（上下底平行）</p>
                    <p>• AD = BC（两腰相等）</p>
                    <p>• ∠A = ∠B，∠C = ∠D</p>
                </div>
            </div>
        `;
    }

    // 显示直角梯形
    showRightTrapezoid() {
        const display = document.getElementById('shapeDisplay');
        display.innerHTML = `
            <div class="shape-demo-content">
                <svg width="300" height="200" viewBox="0 0 300 200">
                    <polygon points="50,50 250,50 250,150 100,150" 
                             fill="lightpink" stroke="purple" stroke-width="2"/>
                    <text x="150" y="180" text-anchor="middle" fill="purple">直角梯形</text>
                    <text x="60" y="70" fill="red">A</text>
                    <text x="260" y="70" fill="red">B</text>
                    <text x="260" y="170" fill="red">C</text>
                    <text x="110" y="170" fill="red">D</text>
                </svg>
                <div class="shape-description">
                    <h6>直角梯形ABCD</h6>
                    <p>• AB ∥ CD（上下底平行）</p>
                    <p>• ∠A = 90°（有一个直角）</p>
                    <p>• ∠D = 90°（另一个直角）</p>
                </div>
            </div>
        `;
    }

    // 更新构建器
    updateBuilder() {
        const shapeType = document.getElementById('shapeType').value;
        const baseLength = parseInt(document.getElementById('baseLength').value);
        const height = parseInt(document.getElementById('height').value);
        
        document.getElementById('baseValue').textContent = baseLength;
        document.getElementById('heightValue').textContent = height;
        
        this.drawShape(shapeType, baseLength, height);
        this.updateProperties(shapeType, baseLength, height);
    }

    // 绘制图形
    drawShape(type, base, height) {
        const canvas = document.getElementById('shapeCanvas');
        const ctx = canvas.getContext('2d');
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.fillStyle = '#e3f2fd';
        
        if (type === 'parallelogram') {
            // 绘制平行四边形
            ctx.beginPath();
            ctx.moveTo(centerX - base/2, centerY - height/2);
            ctx.lineTo(centerX + base/2, centerY - height/2);
            ctx.lineTo(centerX + base/2 - 20, centerY + height/2);
            ctx.lineTo(centerX - base/2 - 20, centerY + height/2);
            ctx.closePath();
        } else if (type === 'trapezoid') {
            // 绘制梯形
            ctx.beginPath();
            ctx.moveTo(centerX - base/2, centerY - height/2);
            ctx.lineTo(centerX + base/2, centerY - height/2);
            ctx.lineTo(centerX + base/3, centerY + height/2);
            ctx.lineTo(centerX - base/3, centerY + height/2);
            ctx.closePath();
        } else if (type === 'isosceles') {
            // 绘制等腰梯形
            ctx.beginPath();
            ctx.moveTo(centerX - base/2, centerY - height/2);
            ctx.lineTo(centerX + base/2, centerY - height/2);
            ctx.lineTo(centerX + base/4, centerY + height/2);
            ctx.lineTo(centerX - base/4, centerY + height/2);
            ctx.closePath();
        }
        
        ctx.fill();
        ctx.stroke();
    }

    // 更新属性显示
    updateProperties(type, base, height) {
        const propertiesDiv = document.getElementById('shapeProperties');
        let properties = '';
        
        if (type === 'parallelogram') {
            const area = base * height;
            properties = `
                <h6>平行四边形属性</h6>
                <p>• 底边长度：${base}</p>
                <p>• 高度：${height}</p>
                <p>• 面积：${area}</p>
                <p>• 对边平行且相等</p>
                <p>• 对角相等</p>
            `;
        } else if (type === 'trapezoid') {
            const topBase = base * 0.7;
            const area = (base + topBase) * height / 2;
            properties = `
                <h6>梯形属性</h6>
                <p>• 下底长度：${base}</p>
                <p>• 上底长度：${Math.round(topBase)}</p>
                <p>• 高度：${height}</p>
                <p>• 面积：${Math.round(area)}</p>
                <p>• 一组对边平行</p>
            `;
        } else if (type === 'isosceles') {
            const topBase = base * 0.6;
            const area = (base + topBase) * height / 2;
            properties = `
                <h6>等腰梯形属性</h6>
                <p>• 下底长度：${base}</p>
                <p>• 上底长度：${Math.round(topBase)}</p>
                <p>• 高度：${height}</p>
                <p>• 面积：${Math.round(area)}</p>
                <p>• 两腰相等</p>
                <p>• 两个底角相等</p>
            `;
        }
        
        propertiesDiv.innerHTML = properties;
    }

    // 检查答案
    checkAnswer() {
        const userAnswer = document.getElementById('answer').value.trim();
        const exercises = this.exercises.filter(ex => ex.type === this.currentTopic);
        const currentEx = exercises[this.currentExercise];
        
        const feedback = document.getElementById('feedback');
        if (userAnswer.toLowerCase() === currentEx.answer.toLowerCase()) {
            feedback.innerHTML = '<div class="correct">✅ 答案正确！</div><div class="explanation">' + currentEx.explanation + '</div>';
            feedback.className = 'feedback correct';
            this.score += 10;
            document.querySelector('.next-btn').style.display = 'inline-block';
        } else {
            feedback.innerHTML = '<div class="incorrect">❌ 答案不正确</div><div class="explanation">正确答案：' + currentEx.answer + '<br>' + currentEx.explanation + '</div>';
            feedback.className = 'feedback incorrect';
        }
        
        document.querySelector('.score').textContent = `得分：${this.score}`;
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
let quadrilateralsUnit;
document.addEventListener('DOMContentLoaded', function() {
    quadrilateralsUnit = new QuadrilateralsUnit();
}); 