// 四年级数学学习平台主脚本 - 现代化升级版

// 全局变量
let currentUnit = null;
let currentStage = 0;
let learningData = {
    totalTime: 0,
    completedUnits: 0,
    totalScore: 0,
    achievements: []
};

// 学习单元数据
const units = [
    {
        id: 'big-numbers',
        title: '大数的认识',
        description: '学习万以内数的读写、比较和运算',
        topics: ['数的读写', '数位认识', '大小比较', '数的运算'],
        difficulty: 3,
        progress: 0
    },
    {
        id: 'area-units',
        title: '公顷和平方千米',
        description: '学习面积单位及其换算',
        topics: ['面积单位', '单位换算', '实际应用', '计算练习'],
        difficulty: 4,
        progress: 0
    },
    {
        id: 'multiplication',
        title: '三位数乘两位数',
        description: '掌握三位数乘两位数的计算方法',
        topics: ['竖式计算', '估算方法', '应用题', '验算技巧'],
        difficulty: 4,
        progress: 0
    },
    {
        id: 'parallelogram-trapezoid',
        title: '平行四边形和梯形',
        description: '认识平行四边形和梯形的特征',
        topics: ['图形特征', '面积计算', '实际应用', '图形变换'],
        difficulty: 3,
        progress: 0
    },
    {
        id: 'division-advanced',
        title: '除法的深入',
        description: '学习除法的多种方法和应用',
        topics: ['除法类型', '估算方法', '解题技巧', '实际应用'],
        difficulty: 5,
        progress: 0
    },
    {
        id: 'math-thinking',
        title: '数学思维',
        description: '培养数学思维和逻辑推理能力',
        topics: ['逻辑推理', '问题解决', '思维训练', '创新应用'],
        difficulty: 5,
        progress: 0
    }
];

// 工具数据
const tools = [
    { id: 'calculator', name: '计算器', icon: '🧮', description: '基础计算工具' },
    { id: 'protractor', name: '量角器', icon: '📐', description: '角度测量工具' },
    { id: 'ruler', name: '直尺', icon: '📏', description: '长度测量工具' },
    { id: 'notebook', name: '笔记本', icon: '📝', description: '错题和笔记' },
    { id: 'chart-maker', name: '图表制作', icon: '📊', description: '数据可视化' },
    { id: 'speech-recognition', name: '语音答题', icon: '🎤', description: '语音输入答题' },
    { id: 'learning-system', name: '学习系统', icon: '🎯', description: '智能学习助手' },
    { id: 'achievement', name: '成就系统', icon: '🏆', description: '学习成就展示' },
    { id: 'data-analysis', name: '数据分析', icon: '📈', description: '学习数据分析' }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('四年级数学学习平台启动中...');
    
    // 初始化平台
    initializePlatform();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 加载学习数据
    loadLearningData();
    
    // 更新界面
    updateUI();
    
    // 添加页面加载动画
    addPageLoadAnimation();
    
    console.log('平台初始化完成！');
});

// 初始化平台
function initializePlatform() {
    console.log('正在初始化平台...');
    
    // 设置用户信息
    const username = localStorage.getItem('username') || '小明';
    const level = localStorage.getItem('level') || '1';
    
    // 更新头部信息
    updateHeaderInfo(username, level);
    
    // 渲染学习单元
    renderUnits();
    
    // 渲染学习工具
    renderTools();
    
    // 更新状态栏
    updateStatusBar();
    
    console.log('平台初始化完成');
}

// 更新头部信息
function updateHeaderInfo(username, level) {
    const usernameElement = document.querySelector('.username');
    const levelElement = document.querySelector('.level');
    
    if (usernameElement) {
        usernameElement.textContent = username;
        // 添加打字机效果
        typewriterEffect(usernameElement, username);
    }
    
    if (levelElement) {
        levelElement.textContent = level;
        // 添加数字滚动动画
        animateNumber(levelElement, 0, parseInt(level), 1000);
    }
}

// 打字机效果
function typewriterEffect(element, text) {
    element.textContent = '';
    let i = 0;
    const speed = 100;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 数字滚动动画
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (difference * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// 渲染学习单元
function renderUnits() {
    const unitsGrid = document.querySelector('.units-grid');
    if (!unitsGrid) return;
    
    unitsGrid.innerHTML = '';
    
    units.forEach((unit, index) => {
        const unitCard = createUnitCard(unit, index);
        unitsGrid.appendChild(unitCard);
        
        // 添加延迟动画
        setTimeout(() => {
            unitCard.style.opacity = '1';
            unitCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 创建单元卡片
function createUnitCard(unit, index) {
    const card = document.createElement('div');
    card.className = 'unit-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    
    const stars = '★'.repeat(unit.difficulty) + '☆'.repeat(5 - unit.difficulty);
    const progressPercent = Math.round(unit.progress);
    
    card.innerHTML = `
        <div class="unit-header">
            <div class="unit-number">${index + 1}</div>
            <h3>${unit.title}</h3>
            <div class="difficulty-stars">
                ${stars.split('').map(star => `<span class="star ${star === '★' ? 'active' : ''}">${star}</span>`).join('')}
            </div>
        </div>
        <div class="unit-content">
            <p class="unit-desc">${unit.description}</p>
            <div class="topics-list">
                ${unit.topics.map(topic => `<span class="topic">${topic}</span>`).join('')}
            </div>
            <div class="unit-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <span class="progress-text">${progressPercent}%</span>
            </div>
        </div>
        <button class="start-learning-btn" data-unit="${unit.id}">
            开始学习
            <span class="btn-icon">→</span>
        </button>
    `;
    
    // 添加卡片交互效果
    addCardInteractions(card);
    
    return card;
}

// 添加卡片交互效果
function addCardInteractions(card) {
    const btn = card.querySelector('.start-learning-btn');
    const icon = card.querySelector('.btn-icon');
    
    // 按钮悬停效果
    btn.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateX(5px)';
    });
    
    btn.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateX(0)';
    });
    
    // 卡片点击效果
    card.addEventListener('click', (e) => {
        if (e.target !== btn) {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

// 渲染学习工具
function renderTools() {
    const toolsGrid = document.querySelector('.tools-grid');
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = '';
    
    tools.forEach((tool, index) => {
        const toolBtn = createToolButton(tool, index);
        toolsGrid.appendChild(toolBtn);
        
        // 添加延迟动画
        setTimeout(() => {
            toolBtn.style.opacity = '1';
            toolBtn.style.transform = 'scale(1)';
        }, index * 50);
    });
}

// 创建工具按钮
function createToolButton(tool, index) {
    const btn = document.createElement('div');
    btn.className = 'tool-btn';
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.8)';
    btn.style.transition = 'all 0.3s ease';
    
    btn.innerHTML = `
        <span class="tool-icon">${tool.icon}</span>
        <span class="tool-name">${tool.name}</span>
    `;
    
    btn.setAttribute('data-tool', tool.id);
    btn.setAttribute('title', tool.description);
    
    // 添加工具提示
    addTooltip(btn, tool.description);
    
    return btn;
}

// 添加工具提示
function addTooltip(element, text) {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--gray-800);
            color: white;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius-md);
            font-size: var(--font-size-xs);
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        }, 10);
        
        element.tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', () => {
        if (element.tooltip) {
            element.tooltip.style.opacity = '0';
            element.tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => {
                if (element.tooltip && element.tooltip.parentNode) {
                    element.tooltip.parentNode.removeChild(element.tooltip);
                }
                element.tooltip = null;
            }, 200);
        }
    });
}

// 更新状态栏
function updateStatusBar() {
    const statsItems = document.querySelectorAll('.stats-item');
    
    statsItems.forEach((item, index) => {
        const valueElement = item.querySelector('.stat-value');
        if (valueElement) {
            const currentValue = parseInt(valueElement.textContent) || 0;
            const targetValue = getTargetValue(index);
            
            // 添加数字滚动动画
            animateNumber(valueElement, currentValue, targetValue, 1500);
        }
    });
}

// 获取目标值
function getTargetValue(index) {
    const values = [
        learningData.totalTime || 0,
        learningData.completedUnits || 0,
        learningData.totalScore || 0,
        learningData.achievements.length || 0
    ];
    return values[index] || 0;
}

// 绑定事件监听器
function bindEventListeners() {
    // 学习单元点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('start-learning-btn')) {
            const unitId = e.target.getAttribute('data-unit');
            startLearning(unitId);
        }
        
        if (e.target.classList.contains('tool-btn') || e.target.closest('.tool-btn')) {
            const toolBtn = e.target.classList.contains('tool-btn') ? e.target : e.target.closest('.tool-btn');
            const toolId = toolBtn.getAttribute('data-tool');
            openTool(toolId);
        }
    });
    
    // 模态框关闭事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal') || e.target.classList.contains('close-btn')) {
            closeModal();
        }
        
        if (e.target.classList.contains('tool-modal') || e.target.classList.contains('close-tool')) {
            closeToolModal();
        }
    });
    
    // 键盘事件
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
            closeToolModal();
        }
    });
    
    // 窗口大小变化事件
    window.addEventListener('resize', debounce(function() {
        updateResponsiveLayout();
    }, 250));
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 开始学习
function startLearning(unitId) {
    console.log(`开始学习单元: ${unitId}`);
    
    currentUnit = unitId;
    currentStage = 0;
    
    // 添加按钮点击效果
    const btn = document.querySelector(`[data-unit="${unitId}"]`);
    if (btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }
    
    // 显示学习模态框
    showLearningModal();
    
    // 加载单元内容
    loadUnitContent(unitId);
    
    // 更新学习数据
    updateLearningProgress(unitId);
}

// 显示学习模态框
function showLearningModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>学习单元</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div class="learning-stages">
                    <div class="stage active" data-stage="0">
                        <div class="stage-number">1</div>
                        <div class="stage-name">基础解释</div>
                    </div>
                    <div class="stage" data-stage="1">
                        <div class="stage-number">2</div>
                        <div class="stage-name">可视化理解</div>
                    </div>
                    <div class="stage" data-stage="2">
                        <div class="stage-number">3</div>
                        <div class="stage-name">步骤练习</div>
                    </div>
                    <div class="stage" data-stage="3">
                        <div class="stage-number">4</div>
                        <div class="stage-name">扩展知识</div>
                    </div>
                </div>
                <div class="stage-content" id="stage-content">
                    <!-- 阶段内容将在这里动态加载 -->
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 绑定阶段切换事件
    bindStageEvents();
    
    // 添加模态框动画
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 绑定阶段切换事件
function bindStageEvents() {
    const stages = document.querySelectorAll('.stage');
    
    stages.forEach(stage => {
        stage.addEventListener('click', function() {
            const stageIndex = parseInt(this.getAttribute('data-stage'));
            switchStage(stageIndex);
        });
    });
}

// 切换学习阶段
function switchStage(stageIndex) {
    // 更新阶段状态
    document.querySelectorAll('.stage').forEach((stage, index) => {
        stage.classList.toggle('active', index === stageIndex);
    });
    
    currentStage = stageIndex;
    
    // 加载阶段内容
    loadStageContent(currentUnit, stageIndex);
    
    // 添加切换动画
    const content = document.getElementById('stage-content');
    content.style.opacity = '0';
    content.style.transform = 'translateX(20px)';
    
    setTimeout(() => {
        content.style.opacity = '1';
        content.style.transform = 'translateX(0)';
    }, 200);
}

// 加载单元内容
function loadUnitContent(unitId) {
    const unit = units.find(u => u.id === unitId);
    if (!unit) return;
    
    // 更新模态框标题
    const title = document.querySelector('.modal-header h3');
    if (title) {
        title.textContent = unit.title;
    }
    
    // 加载第一个阶段的内容
    loadStageContent(unitId, 0);
}

// 加载阶段内容
function loadStageContent(unitId, stageIndex) {
    const content = document.getElementById('stage-content');
    if (!content) return;
    
    // 根据单元和阶段加载相应内容
    switch(unitId) {
        case 'big-numbers':
            loadBigNumbersContent(stageIndex, content);
            break;
        case 'area-units':
            loadAreaUnitsContent(stageIndex, content);
            break;
        case 'multiplication':
            loadMultiplicationContent(stageIndex, content);
            break;
        case 'parallelogram-trapezoid':
            loadParallelogramTrapezoidContent(stageIndex, content);
            break;
        case 'division-advanced':
            loadDivisionAdvancedContent(stageIndex, content);
            break;
        case 'math-thinking':
            loadMathThinkingContent(stageIndex, content);
            break;
        default:
            content.innerHTML = '<p>内容加载中...</p>';
    }
}

// 打开工具
function openTool(toolId) {
    console.log(`打开工具: ${toolId}`);
    
    // 添加按钮点击效果
    const btn = document.querySelector(`[data-tool="${toolId}"]`);
    if (btn) {
        btn.style.transform = 'scale(0.9)';
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
        }, 150);
    }
    
    // 根据工具ID打开相应工具
    switch(toolId) {
        case 'calculator':
            openCalculator();
            break;
        case 'protractor':
            openProtractor();
            break;
        case 'ruler':
            openRuler();
            break;
        case 'notebook':
            openNotebook();
            break;
        case 'chart-maker':
            openChartMaker();
            break;
        case 'speech-recognition':
            openSpeechRecognition();
            break;
        case 'learning-system':
            openLearningSystem();
            break;
        case 'achievement':
            openAchievement();
            break;
        case 'data-analysis':
            openDataAnalysis();
            break;
        default:
            console.log('工具未实现:', toolId);
    }
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// 关闭工具模态框
function closeToolModal() {
    const modal = document.querySelector('.tool-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
}

// 更新学习进度
function updateLearningProgress(unitId) {
    const unit = units.find(u => u.id === unitId);
    if (unit) {
        unit.progress = Math.min(unit.progress + 10, 100);
        
        // 更新界面
        const progressFill = document.querySelector(`[data-unit="${unitId}"] .progress-fill`);
        const progressText = document.querySelector(`[data-unit="${unitId}"] .progress-text`);
        
        if (progressFill) {
            progressFill.style.width = unit.progress + '%';
        }
        
        if (progressText) {
            animateNumber(progressText, parseInt(progressText.textContent), unit.progress, 1000);
        }
        
        // 保存到本地存储
        saveLearningData();
    }
}

// 加载学习数据
function loadLearningData() {
    const saved = localStorage.getItem('learningData');
    if (saved) {
        learningData = JSON.parse(saved);
    }
}

// 保存学习数据
function saveLearningData() {
    localStorage.setItem('learningData', JSON.stringify(learningData));
}

// 更新界面
function updateUI() {
    // 更新进度环
    updateProgressRing();
    
    // 更新成就显示
    updateAchievements();
}

// 更新进度环
function updateProgressRing() {
    const progressRing = document.querySelector('.progress-ring');
    if (progressRing) {
        const progress = (learningData.completedUnits / units.length) * 100;
        progressRing.style.background = `conic-gradient(var(--primary-color) 0deg, var(--primary-color) ${progress * 3.6}deg, var(--primary-light) ${progress * 3.6}deg, var(--primary-light) 360deg)`;
    }
}

// 更新成就显示
function updateAchievements() {
    // 这里可以添加成就显示逻辑
}

// 添加页面加载动画
function addPageLoadAnimation() {
    const elements = document.querySelectorAll('.unit-card, .tool-btn, .stats-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// 更新响应式布局
function updateResponsiveLayout() {
    // 根据屏幕大小调整布局
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // 调整网格列数
    const unitsGrid = document.querySelector('.units-grid');
    if (unitsGrid) {
        if (isSmallMobile) {
            unitsGrid.style.gridTemplateColumns = '1fr';
        } else if (isMobile) {
            unitsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
        } else {
            unitsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(380px, 1fr))';
        }
    }
    
    // 调整工具网格
    const toolsGrid = document.querySelector('.tools-grid');
    if (toolsGrid) {
        if (isSmallMobile) {
            toolsGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        } else if (isMobile) {
            toolsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(80px, 1fr))';
        } else {
            toolsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(120px, 1fr))';
        }
    }
}

// 工具函数：显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// 工具函数：确认对话框
function showConfirmDialog(message, onConfirm, onCancel) {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 4000;
    `;
    
    dialog.innerHTML = `
        <div class="confirm-content" style="
            background: white;
            padding: var(--spacing-xl);
            border-radius: var(--radius-xl);
            box-shadow: var(--shadow-xl);
            max-width: 400px;
            text-align: center;
        ">
            <p style="margin-bottom: var(--spacing-lg);">${message}</p>
            <div style="display: flex; gap: var(--spacing-md); justify-content: center;">
                <button class="btn btn-secondary" id="confirm-cancel">取消</button>
                <button class="btn btn-primary" id="confirm-ok">确定</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(dialog);
    
    dialog.querySelector('#confirm-ok').addEventListener('click', () => {
        if (onConfirm) onConfirm();
        document.body.removeChild(dialog);
    });
    
    dialog.querySelector('#confirm-cancel').addEventListener('click', () => {
        if (onCancel) onCancel();
        document.body.removeChild(dialog);
    });
    
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            if (onCancel) onCancel();
            document.body.removeChild(dialog);
        }
    });
}

// 加载大数的认识单元内容
function loadBigNumbersContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>大数的认识</h4>
                    <p>在四年级，我们将学习万以内数的读写、比较和运算。这是数学学习的重要基础。</p>
                    
                    <div class="concept-section">
                        <h5>数位认识</h5>
                        <div class="place-value-chart">
                            <table class="place-value-table">
                                <tr>
                                    <th>万位</th>
                                    <th>千位</th>
                                    <th>百位</th>
                                    <th>十位</th>
                                    <th>个位</th>
                                </tr>
                                <tr class="example-number">
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                </tr>
                            </table>
                            <p>这个数是：一万二千三百四十五</p>
                        </div>
                    </div>
                    
                    <div class="reading-example">
                        <h5>读数方法</h5>
                        <div class="counting-units">
                            <div class="unit-item">
                                <span class="unit-value">1</span>
                                <span class="unit-name">万</span>
                            </div>
                            <div class="unit-item">
                                <span class="unit-value">2</span>
                                <span class="unit-name">千</span>
                            </div>
                            <div class="unit-item">
                                <span class="unit-value">3</span>
                                <span class="unit-name">百</span>
                            </div>
                            <div class="unit-item">
                                <span class="unit-value">4</span>
                                <span class="unit-name">十</span>
                            </div>
                            <div class="unit-item">
                                <span class="unit-value">5</span>
                                <span class="unit-name">个</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="key-points">
                        <h5>重点要点</h5>
                        <ul>
                            <li>从右到左，每四位用逗号分隔</li>
                            <li>读数时从高位到低位</li>
                            <li>注意零的读法</li>
                            <li>掌握数位之间的关系</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解大数</h4>
                    
                    <div class="number-builder">
                        <h5>数字构建器</h5>
                        <div class="builder-controls">
                            <div class="digit-selector">
                                <label>选择数字：</label>
                                <input type="number" min="0" max="9" value="1">
                                <button onclick="buildNumber()">构建</button>
                            </div>
                        </div>
                        <div class="number-display">
                            <div class="big-number">12345</div>
                            <div class="number-breakdown">
                                <div class="digit-analysis">
                                    <div class="digit-item">
                                        <span class="digit">1</span>
                                        <span class="position">万位</span>
                                    </div>
                                    <div class="digit-item">
                                        <span class="digit">2</span>
                                        <span class="position">千位</span>
                                    </div>
                                    <div class="digit-item">
                                        <span class="digit">3</span>
                                        <span class="position">百位</span>
                                    </div>
                                    <div class="digit-item">
                                        <span class="digit">4</span>
                                        <span class="position">十位</span>
                                    </div>
                                    <div class="digit-item">
                                        <span class="digit">5</span>
                                        <span class="position">个位</span>
                                    </div>
                                </div>
                            </div>
                            <div class="reading-text">读作：一万二千三百四十五</div>
                        </div>
                    </div>
                    
                    <div class="comparison-tool">
                        <h5>大小比较</h5>
                        <div class="comparison-inputs">
                            <input type="number" placeholder="第一个数" value="12345">
                            <select>
                                <option value=">">&gt;</option>
                                <option value="<">&lt;</option>
                                <option value="=">=</option>
                            </select>
                            <input type="number" placeholder="第二个数" value="12340">
                            <button onclick="compareNumbers()">比较</button>
                        </div>
                        <div class="result-display">
                            <div class="comparison-result">12345 > 12340</div>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>练习大数的读写</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="question-number">1</span> 题</span>
                            <span class="score">得分：<span id="current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="question-display">
                                <p>请读出下面的数字：</p>
                                <div class="big-number" id="question-number-display">12345</div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="text" id="answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkAnswer()">检查答案</button>
                                <button onclick="nextQuestion()">下一题</button>
                                <button onclick="showHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="feedback" style="display: none;">
                            <p id="feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="real-world-examples">
                        <h5>生活中的大数</h5>
                        <div class="example-card">
                            <div class="example-icon">🏫</div>
                            <h6>学校人数</h6>
                            <p>我们学校有 2,345 名学生</p>
                        </div>
                        <div class="example-card">
                            <div class="example-icon">📚</div>
                            <h6>图书数量</h6>
                            <p>图书馆有 8,967 本图书</p>
                        </div>
                        <div class="example-card">
                            <div class="example-icon">💰</div>
                            <h6>存款金额</h6>
                            <p>小明存了 5,432 元压岁钱</p>
                        </div>
                    </div>
                    
                    <div class="challenge-game">
                        <h5>挑战游戏</h5>
                        <div class="game-description">
                            <p>快速读出屏幕上出现的数字，挑战你的反应速度！</p>
                        </div>
                        <div class="game-controls">
                            <button onclick="startNumberGame()">开始游戏</button>
                        </div>
                        <div class="game-area" id="game-area" style="display: none;">
                            <div class="big-number" id="game-number">准备开始...</div>
                        </div>
                    </div>
                    
                    <div class="math-facts">
                        <h5>数学小知识</h5>
                        <div class="fact-item">
                            <h6>数位的由来</h6>
                            <p>数位系统起源于古代印度，后来通过阿拉伯传入欧洲，成为现代数学的基础。</p>
                        </div>
                        <div class="fact-item">
                            <h6>大数的应用</h6>
                            <p>大数在科学计算、金融统计、人口普查等领域有广泛应用。</p>
                        </div>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 加载公顷和平方千米单元内容
function loadAreaUnitsContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>公顷和平方千米</h4>
                    <p>公顷和平方千米是常用的面积单位，用于测量较大的面积。</p>
                    
                    <div class="concept-card">
                        <h5>面积单位换算</h5>
                        <div class="conversion-info">
                            <p><strong>1 平方千米 = 100 公顷</strong></p>
                            <p><strong>1 公顷 = 10,000 平方米</strong></p>
                            <p><strong>1 平方千米 = 1,000,000 平方米</strong></p>
                        </div>
                    </div>
                    
                    <div class="size-examples">
                        <h6>常见面积参考</h6>
                        <ul>
                            <li>一个标准足球场约 1 公顷</li>
                            <li>一个标准篮球场约 420 平方米</li>
                            <li>天安门广场约 44 公顷</li>
                            <li>北京故宫约 72 公顷</li>
                        </ul>
                    </div>
                    
                    <div class="usage-examples">
                        <h6>使用场景</h6>
                        <div class="usage">
                            <p><strong>公顷：</strong>农田、公园、学校等中等面积</p>
                            <p><strong>平方千米：</strong>城市、国家、湖泊等大面积</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解面积单位</h4>
                    
                    <div class="conversion-table">
                        <h5>单位换算表</h5>
                        <table>
                            <tr>
                                <th>平方千米</th>
                                <th>公顷</th>
                                <th>平方米</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>100</td>
                                <td>1,000,000</td>
                            </tr>
                            <tr>
                                <td>0.5</td>
                                <td>50</td>
                                <td>500,000</td>
                            </tr>
                            <tr>
                                <td>0.1</td>
                                <td>10</td>
                                <td>100,000</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div class="examples-grid">
                        <div class="example-card">
                            <div class="example-visual football-field"></div>
                            <h6>足球场</h6>
                            <p>约 1 公顷</p>
                        </div>
                        <div class="example-card">
                            <div class="example-visual park"></div>
                            <h6>公园</h6>
                            <p>约 5 公顷</p>
                        </div>
                        <div class="example-card">
                            <div class="example-visual farm"></div>
                            <h6>农场</h6>
                            <p>约 10 公顷</p>
                        </div>
                        <div class="example-card">
                            <div class="example-visual school"></div>
                            <h6>学校</h6>
                            <p>约 2 公顷</p>
                        </div>
                    </div>
                    
                    <div class="interactive-converter">
                        <h5>单位换算器</h5>
                        <div class="input-group">
                            <label>输入数值：</label>
                            <input type="number" id="converter-input" value="1">
                        </div>
                        <div class="input-group">
                            <label>选择单位：</label>
                            <select id="converter-unit">
                                <option value="km2">平方千米</option>
                                <option value="ha">公顷</option>
                                <option value="m2">平方米</option>
                            </select>
                        </div>
                        <button class="convert-btn" onclick="convertArea()">换算</button>
                        <div class="result-display" id="conversion-result">
                            1 平方千米 = 100 公顷 = 1,000,000 平方米
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>面积单位练习</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="area-question-number">1</span> 题</span>
                            <span class="score">得分：<span id="area-current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="area-question-display">
                                <p>请完成单位换算：</p>
                                <div class="conversion-question" id="area-question-text">
                                    2 公顷 = ? 平方米
                                </div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="number" id="area-answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkAreaAnswer()">检查答案</button>
                                <button onclick="nextAreaQuestion()">下一题</button>
                                <button onclick="showAreaHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="area-feedback" style="display: none;">
                            <p id="area-feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="real-world-examples">
                        <h5>实际应用</h5>
                        <div class="example-card">
                            <h6>城市规划</h6>
                            <p>城市规划师使用公顷和平方千米来规划城市布局，计算绿地面积、道路面积等。</p>
                        </div>
                        <div class="example-card">
                            <h6>农业管理</h6>
                            <p>农民使用公顷来计算农田面积，规划作物种植和产量估算。</p>
                        </div>
                        <div class="example-card">
                            <h6>环境保护</h6>
                            <p>环保部门使用这些单位来测量森林面积、湿地面积等自然资源。</p>
                        </div>
                    </div>
                    
                    <div class="memory-tips">
                        <h5>记忆技巧</h5>
                        <ul>
                            <li>公顷的"公"字提醒我们这是公制单位</li>
                            <li>1公顷 = 100个标准足球场</li>
                            <li>平方千米常用于测量城市和国家面积</li>
                            <li>记住换算关系：1平方千米 = 100公顷</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 加载三位数乘两位数单元内容
function loadMultiplicationContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>三位数乘两位数</h4>
                    <p>学习三位数乘两位数的竖式计算方法和技巧。</p>
                    
                    <div class="concept-section">
                        <h5>竖式计算步骤</h5>
                        <div class="multiplication-steps">
                            <div class="step-item">
                                <div class="step-number">1</div>
                                <div class="step-text">将三位数写在上面，两位数写在下面</div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">2</div>
                                <div class="step-text">用两位数的个位数字乘以三位数</div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">3</div>
                                <div class="step-text">用两位数的十位数字乘以三位数，结果向左移一位</div>
                            </div>
                            <div class="step-item">
                                <div class="step-number">4</div>
                                <div class="step-text">将两个部分积相加得到最终结果</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="example-calculation">
                        <h5>计算示例</h5>
                        <div class="calculation-display">
                            <pre>
  123
× 45
-----
  615  (123 × 5)
 492   (123 × 40)
-----
 5535
                            </pre>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解乘法</h4>
                    
                    <div class="interactive-multiplication">
                        <h5>交互式乘法计算器</h5>
                        <div class="multiplication-inputs">
                            <input type="number" id="multiplicand" placeholder="三位数" value="123">
                            <span>×</span>
                            <input type="number" id="multiplier" placeholder="两位数" value="45">
                            <button onclick="calculateMultiplication()">计算</button>
                        </div>
                        <div class="multiplication-result" id="multiplication-result">
                            123 × 45 = 5535
                        </div>
                        <div class="step-by-step" id="step-by-step">
                            <!-- 步骤显示区域 -->
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>乘法练习</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="multi-question-number">1</span> 题</span>
                            <span class="score">得分：<span id="multi-current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="multi-question-display">
                                <p>请计算：</p>
                                <div class="multiplication-question" id="multi-question-text">
                                    234 × 56 = ?
                                </div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="number" id="multi-answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkMultiAnswer()">检查答案</button>
                                <button onclick="nextMultiQuestion()">下一题</button>
                                <button onclick="showMultiHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="multi-feedback" style="display: none;">
                            <p id="multi-feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="estimation-methods">
                        <h5>估算方法</h5>
                        <div class="method">
                            <h6>四舍五入法</h6>
                            <p>将数字四舍五入到整十或整百，然后计算。</p>
                        </div>
                        <div class="method">
                            <h6>分解法</h6>
                            <p>将两位数分解为整十数和个位数分别计算。</p>
                        </div>
                    </div>
                    
                    <div class="real-world-applications">
                        <h5>实际应用</h5>
                        <div class="application">
                            <h6>购物计算</h6>
                            <p>计算商品总价：单价 × 数量</p>
                        </div>
                        <div class="application">
                            <h6>面积计算</h6>
                            <p>计算矩形面积：长 × 宽</p>
                        </div>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 加载平行四边形和梯形单元内容
function loadParallelogramTrapezoidContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>平行四边形和梯形</h4>
                    <p>认识平行四边形和梯形的特征，学习它们的面积计算方法。</p>
                    
                    <div class="concept-section">
                        <h5>平行四边形特征</h5>
                        <ul>
                            <li>对边平行且相等</li>
                            <li>对角相等</li>
                            <li>对角线互相平分</li>
                            <li>面积 = 底 × 高</li>
                        </ul>
                    </div>
                    
                    <div class="concept-section">
                        <h5>梯形特征</h5>
                        <ul>
                            <li>一组对边平行</li>
                            <li>另一组对边不平行</li>
                            <li>面积 = (上底 + 下底) × 高 ÷ 2</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解图形</h4>
                    
                    <div class="shape-demonstration">
                        <h5>图形演示</h5>
                        <div class="shape-container">
                            <div class="shape parallelogram" id="parallelogram-demo">
                                <span>平行四边形</span>
                            </div>
                            <div class="shape trapezoid" id="trapezoid-demo">
                                <span>梯形</span>
                            </div>
                        </div>
                        <button onclick="startShapeDemo()">开始演示</button>
                    </div>
                    
                    <div class="area-calculator">
                        <h5>面积计算器</h5>
                        <div class="calculator-inputs">
                            <div class="input-group">
                                <label>底/上底：</label>
                                <input type="number" id="base1" value="10">
                            </div>
                            <div class="input-group">
                                <label>下底：</label>
                                <input type="number" id="base2" value="6">
                            </div>
                            <div class="input-group">
                                <label>高：</label>
                                <input type="number" id="height" value="8">
                            </div>
                            <button onclick="calculateArea()">计算面积</button>
                        </div>
                        <div class="area-result" id="area-result">
                            面积：64 平方单位
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>图形练习</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="shape-question-number">1</span> 题</span>
                            <span class="score">得分：<span id="shape-current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="shape-question-display">
                                <p>请计算面积：</p>
                                <div class="shape-question" id="shape-question-text">
                                    一个梯形的上底是8cm，下底是12cm，高是6cm，求面积。
                                </div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="number" id="shape-answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkShapeAnswer()">检查答案</button>
                                <button onclick="nextShapeQuestion()">下一题</button>
                                <button onclick="showShapeHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="shape-feedback" style="display: none;">
                            <p id="shape-feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="real-world-applications">
                        <h5>实际应用</h5>
                        <div class="application">
                            <h6>建筑设计</h6>
                            <p>建筑师使用这些图形设计房屋的屋顶和墙面。</p>
                        </div>
                        <div class="application">
                            <h6>道路设计</h6>
                            <p>道路工程师使用梯形设计道路的横截面。</p>
                        </div>
                    </div>
                    
                    <div class="shape-transformations">
                        <h5>图形变换</h5>
                        <p>平行四边形可以通过旋转、平移等变换得到不同的位置。</p>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 加载除法的深入单元内容
function loadDivisionAdvancedContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>除法的深入</h4>
                    <p>学习除法的多种方法和应用，提高计算能力。</p>
                    
                    <div class="division-types">
                        <h5>除法类型</h5>
                        <div class="type">
                            <h6>整除</h6>
                            <p>被除数能被除数整除，没有余数。</p>
                        </div>
                        <div class="type">
                            <h6>带余除法</h6>
                            <p>被除数不能被除数整除，有余数。</p>
                        </div>
                    </div>
                    
                    <div class="estimation-methods">
                        <h5>估算方法</h5>
                        <div class="method">
                            <h6>四舍五入法</h6>
                            <p>将数字四舍五入到整十或整百进行估算。</p>
                        </div>
                        <div class="method">
                            <h6>分解法</h6>
                            <p>将被除数分解为更容易计算的数。</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解除法</h4>
                    
                    <div class="division-demonstration">
                        <h5>除法演示</h5>
                        <div class="division-problem">
                            <div class="problem-display" id="division-problem">
                                156 ÷ 12 = ?
                            </div>
                            <div class="step-by-step" id="division-steps">
                                <!-- 步骤显示区域 -->
                            </div>
                        </div>
                        <button onclick="startDivisionDemo()">开始演示</button>
                    </div>
                    
                    <div class="division-calculator">
                        <h5>除法计算器</h5>
                        <div class="calculator-inputs">
                            <input type="number" id="dividend" placeholder="被除数" value="156">
                            <span>÷</span>
                            <input type="number" id="divisor" placeholder="除数" value="12">
                            <button onclick="calculateDivision()">计算</button>
                        </div>
                        <div class="division-result" id="division-result">
                            156 ÷ 12 = 13
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>除法练习</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="div-question-number">1</span> 题</span>
                            <span class="score">得分：<span id="div-current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="div-question-display">
                                <p>请计算：</p>
                                <div class="division-question" id="div-question-text">
                                    234 ÷ 18 = ?
                                </div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="number" id="div-answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkDivAnswer()">检查答案</button>
                                <button onclick="nextDivQuestion()">下一题</button>
                                <button onclick="showDivHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="div-feedback" style="display: none;">
                            <p id="div-feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="techniques">
                        <h5>计算技巧</h5>
                        <div class="technique">
                            <h6>试商法</h6>
                            <p>通过试商快速找到正确的商。</p>
                        </div>
                        <div class="technique">
                            <h6>估算法</h6>
                            <p>先估算结果，再精确计算。</p>
                        </div>
                    </div>
                    
                    <div class="real-world-applications">
                        <h5>实际应用</h5>
                        <div class="application">
                            <h6>分配问题</h6>
                            <p>将物品平均分配给多个人。</p>
                        </div>
                        <div class="application">
                            <h6>速度计算</h6>
                            <p>计算平均速度：路程 ÷ 时间。</p>
                        </div>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 加载数学思维单元内容
function loadMathThinkingContent(stageIndex, content) {
    const stages = [
        {
            title: '基础解释',
            content: `
                <div class="unit-explanation">
                    <h4>数学思维</h4>
                    <p>培养数学思维和逻辑推理能力，提高问题解决能力。</p>
                    
                    <div class="reasoning-types">
                        <h5>推理类型</h5>
                        <div class="type">
                            <h6>归纳推理</h6>
                            <p>从具体例子中总结出一般规律。</p>
                        </div>
                        <div class="type">
                            <h6>演绎推理</h6>
                            <p>从一般规律推导出具体结论。</p>
                        </div>
                    </div>
                    
                    <div class="reasoning-methods">
                        <h5>思维方法</h5>
                        <div class="method">
                            <h6>分析问题</h6>
                            <p>将复杂问题分解为简单部分。</p>
                        </div>
                        <div class="method">
                            <h6>寻找模式</h6>
                            <p>在数据中寻找规律和模式。</p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '可视化理解',
            content: `
                <div class="visualization-content">
                    <h4>可视化理解数学思维</h4>
                    
                    <div class="logic-puzzle">
                        <h5>逻辑推理题</h5>
                        <div class="puzzle-grid" id="puzzle-grid">
                            <!-- 逻辑推理题目 -->
                        </div>
                        <button onclick="generatePuzzle()">生成新题目</button>
                    </div>
                    
                    <div class="optimization-problem">
                        <h5>优化问题</h5>
                        <div class="strategy-game">
                            <div class="game-board" id="game-board">
                                <!-- 游戏棋盘 -->
                            </div>
                            <button onclick="startStrategyGame()">开始游戏</button>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '步骤练习',
            content: `
                <div class="practice-content">
                    <h4>思维练习</h4>
                    
                    <div class="practice-section">
                        <div class="question-counter">
                            <span>第 <span id="thinking-question-number">1</span> 题</span>
                            <span class="score">得分：<span id="thinking-current-score">0</span></span>
                        </div>
                        
                        <div class="question-container">
                            <div id="thinking-question-display">
                                <p>请解决以下问题：</p>
                                <div class="thinking-question" id="thinking-question-text">
                                    找出数列的规律：2, 4, 8, 16, ?
                                </div>
                            </div>
                            
                            <div class="answer-input">
                                <input type="number" id="thinking-answer-input" placeholder="请输入答案">
                                <button class="speech-btn" onclick="startSpeechRecognition()">
                                    <i class="fas fa-microphone"></i>
                                </button>
                            </div>
                            
                            <div class="practice-controls">
                                <button onclick="checkThinkingAnswer()">检查答案</button>
                                <button onclick="nextThinkingQuestion()">下一题</button>
                                <button onclick="showThinkingHint()">提示</button>
                            </div>
                        </div>
                        
                        <div class="feedback-container" id="thinking-feedback" style="display: none;">
                            <p id="thinking-feedback-text"></p>
                        </div>
                    </div>
                </div>
            `
        },
        {
            title: '扩展知识',
            content: `
                <div class="extension-content">
                    <h4>扩展知识</h4>
                    
                    <div class="thinking-challenge">
                        <h5>思维挑战</h5>
                        <div class="challenge-pattern">
                            <div class="pattern-shape" id="pattern-shape-1">●</div>
                            <div class="pattern-shape" id="pattern-shape-2">▲</div>
                            <div class="pattern-shape" id="pattern-shape-3">■</div>
                            <div class="pattern-shape" id="pattern-shape-4">?</div>
                        </div>
                        <button onclick="checkPattern()">检查规律</button>
                    </div>
                    
                    <div class="real-world-applications">
                        <h5>实际应用</h5>
                        <div class="application">
                            <h6>编程思维</h6>
                            <p>数学思维是编程的基础，帮助设计算法。</p>
                        </div>
                        <div class="application">
                            <h6>科学研究</h6>
                            <p>科学家使用数学思维分析数据和建立模型。</p>
                        </div>
                    </div>
                </div>
            `
        }
    ];
    
    if (stages[stageIndex]) {
        content.innerHTML = stages[stageIndex].content;
    }
}

// 工具函数：开始语音识别
function startSpeechRecognition() {
    if (window.speechRecognition) {
        const inputElement = document.querySelector('#answer-input, #area-answer-input, #multi-answer-input, #shape-answer-input, #div-answer-input, #thinking-answer-input');
        if (inputElement) {
            window.speechRecognition.startRecognition(inputElement);
        }
    }
}

// 打开计算器工具
function openCalculator() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="calculator-container">
                <div class="calculator">
                    <div class="calculator-header">
                        <h4>计算器</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="calculator-display">
                        <div class="display-history" id="calc-history"></div>
                        <div class="display-main" id="calc-display">0</div>
                    </div>
                    <div class="calculator-buttons">
                        <div class="button-row">
                            <button class="calc-btn function" onclick="clearCalculator()">C</button>
                            <button class="calc-btn function" onclick="backspaceCalculator()">⌫</button>
                            <button class="calc-btn function" onclick="addToCalculator('%')">%</button>
                            <button class="calc-btn operator" onclick="addToCalculator('/')">÷</button>
                        </div>
                        <div class="button-row">
                            <button class="calc-btn number" onclick="addToCalculator('7')">7</button>
                            <button class="calc-btn number" onclick="addToCalculator('8')">8</button>
                            <button class="calc-btn number" onclick="addToCalculator('9')">9</button>
                            <button class="calc-btn operator" onclick="addToCalculator('*')">×</button>
                        </div>
                        <div class="button-row">
                            <button class="calc-btn number" onclick="addToCalculator('4')">4</button>
                            <button class="calc-btn number" onclick="addToCalculator('5')">5</button>
                            <button class="calc-btn number" onclick="addToCalculator('6')">6</button>
                            <button class="calc-btn operator" onclick="addToCalculator('-')">-</button>
                        </div>
                        <div class="button-row">
                            <button class="calc-btn number" onclick="addToCalculator('1')">1</button>
                            <button class="calc-btn number" onclick="addToCalculator('2')">2</button>
                            <button class="calc-btn number" onclick="addToCalculator('3')">3</button>
                            <button class="calc-btn operator" onclick="addToCalculator('+')">+</button>
                        </div>
                        <div class="button-row">
                            <button class="calc-btn number zero" onclick="addToCalculator('0')">0</button>
                            <button class="calc-btn number" onclick="addToCalculator('.')">.</button>
                            <button class="calc-btn equals" onclick="calculateResult()">=</button>
                        </div>
                    </div>
                    <div class="calculator-features">
                        <div class="feature-buttons">
                            <button class="feature-btn" onclick="showCalculatorHistory()">历史记录</button>
                            <button class="feature-btn" onclick="clearCalculatorHistory()">清除历史</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化计算器
    initCalculator();
}

// 打开量角器工具
function openProtractor() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="protractor-container">
                <div class="protractor-tool">
                    <div class="protractor-header">
                        <h4>量角器</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="protractor-main">
                        <div class="protractor-display">
                            <div id="angle-display">当前角度：0°</div>
                            <div id="angle-type">角度类型：锐角</div>
                        </div>
                        <div class="protractor-controls">
                            <div class="control-section">
                                <h5>角度调节</h5>
                                <div class="angle-slider-container">
                                    <input type="range" id="angle-slider" min="0" max="360" value="0">
                                    <div class="slider-labels">
                                        <span>0°</span>
                                        <span>180°</span>
                                        <span>360°</span>
                                    </div>
                                </div>
                                <div class="angle-input">
                                    <input type="number" id="angle-input" min="0" max="360" value="0">
                                    <span>度</span>
                                </div>
                                <div class="quick-angles">
                                    <button onclick="setAngle(0)">0°</button>
                                    <button onclick="setAngle(45)">45°</button>
                                    <button onclick="setAngle(90)">90°</button>
                                    <button onclick="setAngle(135)">135°</button>
                                    <button onclick="setAngle(180)">180°</button>
                                </div>
                            </div>
                            <div class="control-section">
                                <h5>测量功能</h5>
                                <div class="measurement-controls">
                                    <button onclick="measureAngle()">测量角度</button>
                                    <button onclick="resetProtractor()">重置</button>
                                </div>
                            </div>
                            <div class="protractor-info">
                                <div class="angle-classification" id="angle-classification">锐角 (0° - 90°)</div>
                                <div class="measurement-tips">
                                    提示：角度小于90°为锐角，等于90°为直角，大于90°为钝角
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化量角器
    initProtractor();
}

// 打开直尺工具
function openRuler() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="ruler-container">
                <div class="ruler-tool">
                    <div class="ruler-header">
                        <h4>直尺</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="ruler-main">
                        <div class="ruler-display">
                            <div id="ruler-display">当前长度：0 cm</div>
                        </div>
                        <div class="ruler-controls">
                            <div class="control-section">
                                <h5>长度调节</h5>
                                <input type="range" id="length-slider" min="0" max="20" value="0" step="0.1">
                                <div class="length-input">
                                    <input type="number" id="length-input" min="0" max="20" value="0" step="0.1">
                                    <span>cm</span>
                                </div>
                            </div>
                            <div class="ruler-info">
                                <p>直尺工具可以帮助你测量和比较长度</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化直尺
    initRuler();
}

// 打开笔记本工具
function openNotebook() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="notebook-container">
                <div class="notebook-tool">
                    <div class="notebook-header">
                        <h4>笔记本</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="notebook-main">
                        <div class="notebook-tabs">
                            <button class="tab-btn active" onclick="switchTab('mistakes')">错题本</button>
                            <button class="tab-btn" onclick="switchTab('notes')">学习笔记</button>
                            <button class="tab-btn" onclick="switchTab('plans')">学习计划</button>
                        </div>
                        <div class="tab-content active" id="mistakes-tab">
                            <div class="section-header">
                                <h5>错题记录</h5>
                                <button onclick="addMistake()">添加错题</button>
                            </div>
                            <div id="mistakes-list">
                                <div class="no-mistakes">暂无错题记录</div>
                            </div>
                        </div>
                        <div class="tab-content" id="notes-tab">
                            <div class="section-header">
                                <h5>学习笔记</h5>
                                <button onclick="addNote()">添加笔记</button>
                            </div>
                            <div id="notes-list">
                                <div class="no-notes">暂无学习笔记</div>
                            </div>
                        </div>
                        <div class="tab-content" id="plans-tab">
                            <div class="section-header">
                                <h5>学习计划</h5>
                                <button onclick="addPlan()">添加计划</button>
                            </div>
                            <div id="plans-list">
                                <div class="no-plan">暂无学习计划</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化笔记本
    initNotebook();
}

// 打开图表制作器工具
function openChartMaker() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="chart-maker-container">
                <div class="chart-maker-tool">
                    <div class="chart-maker-header">
                        <h4>图表制作器</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="chart-maker-main">
                        <div class="chart-maker-sidebar">
                            <div class="control-section">
                                <h5>图表类型</h5>
                                <div class="chart-type-selector">
                                    <div class="chart-type-option">
                                        <input type="radio" name="chart-type" value="bar" checked>
                                        <span class="chart-type-icon">📊</span>
                                        <span>柱状图</span>
                                    </div>
                                    <div class="chart-type-option">
                                        <input type="radio" name="chart-type" value="line">
                                        <span class="chart-type-icon">📈</span>
                                        <span>折线图</span>
                                    </div>
                                    <div class="chart-type-option">
                                        <input type="radio" name="chart-type" value="pie">
                                        <span class="chart-type-icon">🥧</span>
                                        <span>饼图</span>
                                    </div>
                                </div>
                            </div>
                            <div class="control-section">
                                <h5>数据输入</h5>
                                <div class="data-input">
                                    <div class="input-row">
                                        <input type="text" id="data-name" placeholder="数据名称">
                                        <input type="number" id="data-value" placeholder="数值">
                                        <button onclick="addDataPoint()">添加</button>
                                    </div>
                                </div>
                                <div class="data-list" id="data-list">
                                    <!-- 数据点列表 -->
                                </div>
                                <div class="data-actions">
                                    <button onclick="clearData()">清除数据</button>
                                    <button onclick="generateChart()">生成图表</button>
                                    <button onclick="exportChart()">导出</button>
                                </div>
                            </div>
                        </div>
                        <div class="chart-maker-canvas">
                            <div class="canvas-header">
                                <h5>图表预览</h5>
                                <div class="canvas-tools">
                                    <button onclick="zoomIn()">放大</button>
                                    <button onclick="zoomOut()">缩小</button>
                                    <button onclick="resetZoom()">重置</button>
                                </div>
                            </div>
                            <div class="chart-canvas" id="chart-canvas">
                                <div class="canvas-placeholder">
                                    <div class="placeholder-icon">📊</div>
                                    <div class="placeholder-tip">请添加数据并生成图表</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 初始化图表制作器
    initChartMaker();
}

// 打开语音识别工具
function openSpeechRecognition() {
    showNotification('语音识别功能已集成到所有输入框中，点击输入框旁的麦克风图标即可使用', 'info');
}

// 打开学习系统工具
function openLearningSystem() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="learning-system-container">
                <div class="learning-system-tool">
                    <div class="learning-system-header">
                        <h4>智能学习系统</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="learning-system-main">
                        <div class="system-status">
                            <h5>系统状态</h5>
                            <div class="status-indicators">
                                <div class="status-item">
                                    <span class="status-label">学习进度</span>
                                    <span class="status-value">75%</span>
                                </div>
                                <div class="status-item">
                                    <span class="status-label">推荐单元</span>
                                    <span class="status-value">除法深入</span>
                                </div>
                                <div class="status-item">
                                    <span class="status-label">学习时长</span>
                                    <span class="status-value">2小时30分</span>
                                </div>
                            </div>
                        </div>
                        <div class="learning-recommendations">
                            <h5>学习建议</h5>
                            <div class="recommendation-list">
                                <div class="recommendation-item">
                                    <h6>继续练习大数运算</h6>
                                    <p>建议完成更多大数读写练习，巩固基础</p>
                                </div>
                                <div class="recommendation-item">
                                    <h6>尝试面积单位换算</h6>
                                    <p>可以开始学习公顷和平方千米的换算</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 打开成就系统工具
function openAchievement() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="achievement-container">
                <div class="achievement-tool">
                    <div class="achievement-header">
                        <h4>成就系统</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="achievement-main">
                        <div class="achievement-stats">
                            <h5>成就统计</h5>
                            <div class="stats-grid">
                                <div class="stat-item">
                                    <div class="stat-icon">🏆</div>
                                    <div class="stat-info">
                                        <div class="stat-value">12</div>
                                        <div class="stat-label">已获得成就</div>
                                    </div>
                                </div>
                                <div class="stat-item">
                                    <div class="stat-icon">⭐</div>
                                    <div class="stat-info">
                                        <div class="stat-value">85%</div>
                                        <div class="stat-label">完成度</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="achievement-list">
                            <h5>成就列表</h5>
                            <div class="achievement-items">
                                <div class="achievement-item unlocked">
                                    <div class="achievement-icon">🎯</div>
                                    <div class="achievement-info">
                                        <h6>初次学习</h6>
                                        <p>完成第一个学习单元</p>
                                    </div>
                                </div>
                                <div class="achievement-item unlocked">
                                    <div class="achievement-icon">📚</div>
                                    <div class="achievement-info">
                                        <h6>知识探索者</h6>
                                        <p>完成5个学习单元</p>
                                    </div>
                                </div>
                                <div class="achievement-item locked">
                                    <div class="achievement-icon">🔒</div>
                                    <div class="achievement-info">
                                        <h6>数学大师</h6>
                                        <p>完成所有学习单元</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 打开数据分析工具
function openDataAnalysis() {
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.style.display = 'flex';
    
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="data-analysis-container">
                <div class="data-analysis-tool">
                    <div class="data-analysis-header">
                        <h4>学习数据分析</h4>
                        <button class="close-tool" onclick="closeToolModal()">关闭</button>
                    </div>
                    <div class="data-analysis-main">
                        <div class="analysis-overview">
                            <h5>学习概览</h5>
                            <div class="overview-grid">
                                <div class="overview-item">
                                    <div class="overview-value">6</div>
                                    <div class="overview-label">学习单元</div>
                                </div>
                                <div class="overview-item">
                                    <div class="overview-value">24</div>
                                    <div class="overview-label">学习阶段</div>
                                </div>
                                <div class="overview-item">
                                    <div class="overview-value">150</div>
                                    <div class="overview-label">练习题</div>
                                </div>
                                <div class="overview-item">
                                    <div class="overview-value">85%</div>
                                    <div class="overview-label">平均正确率</div>
                                </div>
                            </div>
                        </div>
                        <div class="learning-progress">
                            <h5>学习进度</h5>
                            <div class="progress-chart">
                                <div class="progress-item">
                                    <span class="progress-label">大数的认识</span>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 80%"></div>
                                    </div>
                                    <span class="progress-value">80%</span>
                                </div>
                                <div class="progress-item">
                                    <span class="progress-label">公顷和平方千米</span>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 60%"></div>
                                    </div>
                                    <span class="progress-value">60%</span>
                                </div>
                                <div class="progress-item">
                                    <span class="progress-label">三位数乘两位数</span>
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 90%"></div>
                                    </div>
                                    <span class="progress-value">90%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// 初始化函数（占位符）
function initCalculator() {
    console.log('计算器初始化');
}

function initProtractor() {
    console.log('量角器初始化');
}

function initRuler() {
    console.log('直尺初始化');
}

function initNotebook() {
    console.log('笔记本初始化');
}

function initChartMaker() {
    console.log('图表制作器初始化');
}

// 导出全局函数供其他模块使用
window.LearningPlatform = {
    ...window.LearningPlatform,
    loadBigNumbersContent,
    loadAreaUnitsContent,
    loadMultiplicationContent,
    loadParallelogramTrapezoidContent,
    loadDivisionAdvancedContent,
    loadMathThinkingContent,
    startSpeechRecognition,
    openCalculator,
    openProtractor,
    openRuler,
    openNotebook,
    openChartMaker,
    openSpeechRecognition,
    openLearningSystem,
    openAchievement,
    openDataAnalysis
};

console.log('所有工具函数已添加完成');

// 关闭学习模态框
function closeLearningModal() {
    const modal = document.getElementById('learningModal');
    if (modal) {
        modal.style.display = 'none';
    }
}