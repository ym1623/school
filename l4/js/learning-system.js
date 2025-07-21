// 四年级数学学习系统 - 高级功能模块

class Grade4LearningSystem {
    constructor() {
        this.currentUser = '小数学家';
        this.learningData = {
            sessions: [],
            achievements: [],
            mistakes: [],
            preferences: {}
        };
        this.userProgress = {
            totalPoints: 0,
            streakDays: 0,
            todayTime: 0,
            masteryLevel: 0,
            units: {
                'large-numbers': { progress: 0, completed: false },
                'area-units': { progress: 0, completed: false },
                'angle-measurement': { progress: 0, completed: false },
                'multiplication-advanced': { progress: 0, completed: false },
                'quadrilaterals': { progress: 0, completed: false },
                'division-advanced': { progress: 0, completed: false },
                'bar-chart': { progress: 0, completed: false },
                'math-thinking': { progress: 0, completed: false }
            }
        };
        this.currentSession = null;
        this.init();
    }

    init() {
        this.loadLearningData();
        this.setupVoiceSupport();
        this.setupGameification();
        this.startLearningSession();
    }

    // 语音支持系统
    setupVoiceSupport() {
        if ('speechSynthesis' in window) {
            this.voiceEnabled = true;
            console.log('语音支持已启用');
        } else {
            this.voiceEnabled = false;
            console.log('浏览器不支持语音功能');
        }
    }

    speak(text, options = {}) {
        if (!this.voiceEnabled) return;
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.rate = options.rate || 0.8;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 0.8;
        
        speechSynthesis.speak(utterance);
    }

    // 游戏化系统
    setupGameification() {
        this.achievements = [
            { id: 'first_lesson', name: '初学者', desc: '完成第一个学习单元', icon: '🎯' },
            { id: 'math_explorer', name: '数学探索者', desc: '连续学习7天', icon: '🔍' },
            { id: 'calculation_master', name: '计算大师', desc: '正确完成100道题', icon: '🧮' },
            { id: 'geometry_genius', name: '几何天才', desc: '掌握所有几何知识', icon: '📐' },
            { id: 'persistent_learner', name: '坚持学习者', desc: '连续学习30天', icon: '💪' },
            { id: 'division_expert', name: '除法专家', desc: '完成除法单元学习', icon: '➗' },
            { id: 'thinking_master', name: '思维大师', desc: '完成数学思维单元', icon: '🧠' },
            { id: 'tool_master', name: '工具达人', desc: '使用所有学习工具', icon: '🛠️' },
            { id: 'perfect_score', name: '满分学霸', desc: '获得100%正确率', icon: '🏆' },
            { id: 'speed_demon', name: '速度之王', desc: '快速完成练习', icon: '⚡' }
        ];
        
        this.checkAchievements();
    }

    awardPoints(amount, reason) {
        this.userProgress.totalPoints += amount;
        this.showPointsAnimation(amount, reason);
        this.speak(`获得${amount}积分！${reason}`);
        
        // 检查是否解锁新成就
        this.checkAchievements();
        this.saveUserProgress();
    }

    showPointsAnimation(points, reason) {
        const animation = document.createElement('div');
        animation.className = 'points-animation';
        animation.innerHTML = `
            <div class="points-popup">
                +${points} 积分
                <div class="reason">${reason}</div>
            </div>
        `;
        
        document.body.appendChild(animation);
        
        setTimeout(() => {
            animation.remove();
        }, 3000);
    }

    checkAchievements() {
        this.achievements.forEach(achievement => {
            if (!this.hasAchievement(achievement.id) && this.meetsAchievementCriteria(achievement)) {
                this.unlockAchievement(achievement);
            }
        });
    }

    hasAchievement(achievementId) {
        return this.learningData.achievements.some(a => a.id === achievementId);
    }

    meetsAchievementCriteria(achievement) {
        switch (achievement.id) {
            case 'first_lesson':
                return Object.values(this.userProgress.units).some(unit => unit.progress > 0);
            case 'math_explorer':
                return this.userProgress.streakDays >= 7;
            case 'calculation_master':
                return this.learningData.sessions.reduce((total, session) => 
                    total + (session.correctAnswers || 0), 0) >= 100;
            case 'persistent_learner':
                return this.userProgress.streakDays >= 30;
            case 'division_expert':
                return this.userProgress.units['division-advanced'] && this.userProgress.units['division-advanced'].progress >= 80;
            case 'thinking_master':
                return this.userProgress.units['math-thinking'] && this.userProgress.units['math-thinking'].progress >= 80;
            case 'tool_master':
                return this.learningData.sessions.some(session => session.toolsUsed && session.toolsUsed.length >= 5);
            case 'perfect_score':
                return this.learningData.sessions.some(session => 
                    session.totalQuestions > 0 && session.correctAnswers === session.totalQuestions);
            case 'speed_demon':
                return this.learningData.sessions.some(session => 
                    session.duration && session.duration < 300000 && session.correctAnswers >= 5); // 5分钟内完成5题
            default:
                return false;
        }
    }

    unlockAchievement(achievement) {
        this.learningData.achievements.push({
            ...achievement,
            unlockedAt: new Date().toISOString()
        });
        
        this.showAchievementNotification(achievement);
        this.speak(`恭喜！解锁新成就：${achievement.name}`);
        this.saveLearningData();
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <h4>🎉 新成就解锁！</h4>
                    <h3>${achievement.name}</h3>
                    <p>${achievement.desc}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 4000);
    }

    // 学习会话管理
    startLearningSession() {
        this.currentSession = {
            id: Date.now(),
            startTime: new Date(),
            unit: null,
            stage: null,
            interactions: [],
            correctAnswers: 0,
            totalQuestions: 0
        };
    }

    recordInteraction(type, data) {
        if (this.currentSession) {
            this.currentSession.interactions.push({
                type,
                data,
                timestamp: new Date()
            });
            
            // 记录工具使用情况
            if (type === 'tool_used') {
                if (!this.currentSession.toolsUsed) {
                    this.currentSession.toolsUsed = [];
                }
                if (!this.currentSession.toolsUsed.includes(data.tool)) {
                    this.currentSession.toolsUsed.push(data.tool);
                }
            }
        }
    }

    endLearningSession() {
        if (this.currentSession) {
            this.currentSession.endTime = new Date();
            this.currentSession.duration = this.currentSession.endTime - this.currentSession.startTime;
            
            this.learningData.sessions.push(this.currentSession);
            this.analyzeLearningSession(this.currentSession);
            this.saveLearningData();
            
            this.currentSession = null;
        }
    }

    analyzeLearningSession(session) {
        const accuracy = session.totalQuestions > 0 ? 
            (session.correctAnswers / session.totalQuestions) * 100 : 0;
        
        if (accuracy >= 80) {
            this.awardPoints(100, '学习表现优秀');
        } else if (accuracy >= 60) {
            this.awardPoints(50, '学习进步明显');
        }
        
        // 更新今日学习时间
        const sessionMinutes = Math.round(session.duration / (1000 * 60));
        this.userProgress.todayTime += sessionMinutes;
    }

    // 错误分析系统
    recordMistake(question, userAnswer, correctAnswer, unit) {
        const mistake = {
            id: Date.now(),
            question,
            userAnswer,
            correctAnswer,
            unit,
            timestamp: new Date(),
            errorType: this.classifyError(question, userAnswer, correctAnswer)
        };
        
        this.learningData.mistakes.push(mistake);
        this.provideFeedback(mistake.errorType);
        this.saveLearningData();
    }

    classifyError(question, userAnswer, correctAnswer) {
        // 增强的错误分类逻辑
        if (Math.abs(userAnswer - correctAnswer) < 10) {
            return 'calculation'; // 计算错误
        } else if (userAnswer.toString().length !== correctAnswer.toString().length) {
            return 'magnitude'; // 数量级错误
        } else if (question.includes('÷') || question.includes('/')) {
            return 'division'; // 除法错误
        } else if (question.includes('推理') || question.includes('逻辑')) {
            return 'thinking'; // 思维错误
        } else if (question.includes('图形') || question.includes('角') || question.includes('面积')) {
            return 'geometry'; // 几何错误
        } else {
            return 'concept'; // 概念错误
        }
    }

    provideFeedback(errorType) {
        const feedbacks = {
            calculation: '计算时要仔细检查每一步哦！',
            magnitude: '注意数字的位数和大小关系！',
            concept: '让我们重新理解一下这个概念吧！',
            division: '除法要注意余数的处理！',
            thinking: '逻辑推理要一步步来，不要着急！',
            geometry: '几何图形要仔细观察特征！'
        };
        
        const feedback = feedbacks[errorType] || '继续努力，你一定可以的！';
        this.speak(feedback);
    }

    // 个性化学习推荐
    getPersonalizedRecommendations() {
        const weakUnits = Object.entries(this.userProgress.units)
            .filter(([_, unit]) => unit.progress < 50)
            .map(([unitId, _]) => unitId);
        
        const recentMistakes = this.learningData.mistakes
            .slice(-10)
            .map(mistake => mistake.unit);
        
        const recommendations = [];
        
        if (weakUnits.length > 0) {
            recommendations.push({
                type: 'review',
                message: '建议复习这些单元',
                units: weakUnits
            });
        }
        
        if (recentMistakes.length > 0) {
            const mostCommonMistakeUnit = this.getMostFrequent(recentMistakes);
            recommendations.push({
                type: 'practice',
                message: '多练习这个单元',
                units: [mostCommonMistakeUnit]
            });
        }
        
        // 检查学习时间
        const totalTime = this.learningData.sessions.reduce((total, session) => 
            total + (session.duration || 0), 0);
        const averageTimePerSession = totalTime / Math.max(this.learningData.sessions.length, 1);
        
        if (averageTimePerSession < 300000) { // 少于5分钟
            recommendations.push({
                type: 'time',
                message: '建议增加学习时间，深入理解知识点'
            });
        }
        
        // 检查工具使用
        const toolUsage = this.learningData.sessions.filter(session => 
            session.toolsUsed && session.toolsUsed.length > 0).length;
        if (toolUsage < this.learningData.sessions.length * 0.3) {
            recommendations.push({
                type: 'tools',
                message: '建议多使用学习工具，提高学习效果'
            });
        }
        
        return recommendations;
    }

    getMostFrequent(arr) {
        const frequency = {};
        arr.forEach(item => {
            frequency[item] = (frequency[item] || 0) + 1;
        });
        
        return Object.keys(frequency).reduce((a, b) => 
            frequency[a] > frequency[b] ? a : b
        );
    }

    // 数据持久化
    saveLearningData() {
        localStorage.setItem('grade4LearningData', JSON.stringify(this.learningData));
    }

    loadLearningData() {
        const saved = localStorage.getItem('grade4LearningData');
        if (saved) {
            this.learningData = { ...this.learningData, ...JSON.parse(saved) };
        }
    }

    saveUserProgress() {
        localStorage.setItem('grade4UserProgress', JSON.stringify(this.userProgress));
    }

    loadUserProgress() {
        try {
            return JSON.parse(localStorage.getItem('grade4UserProgress'));
        } catch (e) {
            return null;
        }
    }

    // 学习报告生成
    generateLearningReport() {
        const totalSessions = this.learningData.sessions.length;
        const totalTime = this.learningData.sessions.reduce((total, session) => 
            total + (session.duration || 0), 0);
        const averageAccuracy = this.calculateAverageAccuracy();
        
        // 计算各单元完成情况
        const unitProgress = {};
        Object.keys(this.userProgress.units).forEach(unitId => {
            unitProgress[unitId] = this.userProgress.units[unitId].progress;
        });
        
        // 计算学习趋势
        const recentSessions = this.learningData.sessions.slice(-10);
        const recentAccuracy = recentSessions.length > 0 ? 
            recentSessions.reduce((sum, session) => 
                sum + (session.correctAnswers / session.totalQuestions || 0), 0) / recentSessions.length * 100 : 0;
        
        return {
            totalSessions,
            totalTime: Math.round(totalTime / (1000 * 60)), // 转换为分钟
            averageAccuracy,
            recentAccuracy: Math.round(recentAccuracy),
            achievements: this.learningData.achievements.length,
            unitProgress,
            recommendations: this.getPersonalizedRecommendations(),
            learningStreak: this.userProgress.streakDays,
            totalPoints: this.userProgress.totalPoints
        };
    }

    calculateAverageAccuracy() {
        const sessionsWithQuestions = this.learningData.sessions.filter(s => s.totalQuestions > 0);
        if (sessionsWithQuestions.length === 0) return 0;
        
        const totalAccuracy = sessionsWithQuestions.reduce((sum, session) => 
            sum + (session.correctAnswers / session.totalQuestions), 0);
        
        return Math.round((totalAccuracy / sessionsWithQuestions.length) * 100);
    }

    // 获取学习统计
    getLearningStats() {
        const totalSessions = this.learningData.sessions.length;
        const totalTime = this.learningData.sessions.reduce((total, session) => 
            total + (session.duration || 0), 0);
        const totalMistakes = this.learningData.mistakes.length;
        const totalAchievements = this.learningData.achievements.length;
        
        // 计算各单元统计
        const unitStats = {};
        Object.keys(this.userProgress.units).forEach(unitId => {
            const unitMistakes = this.learningData.mistakes.filter(m => m.unit === unitId);
            unitStats[unitId] = {
                progress: this.userProgress.units[unitId].progress,
                mistakes: unitMistakes.length,
                sessions: this.learningData.sessions.filter(s => s.unit === unitId).length
            };
        });
        
        // 计算学习趋势
        const recentSessions = this.learningData.sessions.slice(-7);
        const weeklyAccuracy = recentSessions.length > 0 ? 
            recentSessions.reduce((sum, session) => 
                sum + (session.correctAnswers / session.totalQuestions || 0), 0) / recentSessions.length * 100 : 0;
        
        return {
            totalSessions,
            totalTime: Math.round(totalTime / (1000 * 60)), // 转换为分钟
            totalMistakes,
            totalAchievements,
            averageAccuracy: this.calculateAverageAccuracy(),
            weeklyAccuracy: Math.round(weeklyAccuracy),
            unitStats,
            learningStreak: this.userProgress.streakDays,
            totalPoints: this.userProgress.totalPoints
        };
    }

    // 重置学习数据
    resetLearningData() {
        if (confirm('确定要重置所有学习数据吗？此操作不可恢复。')) {
            this.learningData = {
                sessions: [],
                achievements: [],
                mistakes: [],
                preferences: {}
            };
            this.saveLearningData();
            
            // 重置用户进度
            this.userProgress = {
                totalPoints: 0,
                streakDays: 0,
                todayTime: 0,
                masteryLevel: 0,
                units: {
                    'large-numbers': { progress: 0, completed: false },
                    'area-units': { progress: 0, completed: false },
                    'angle-measurement': { progress: 0, completed: false },
                    'multiplication-advanced': { progress: 0, completed: false },
                    'quadrilaterals': { progress: 0, completed: false },
                    'division-advanced': { progress: 0, completed: false },
                    'bar-chart': { progress: 0, completed: false },
                    'math-thinking': { progress: 0, completed: false }
                }
            };
            this.saveUserProgress();
            location.reload();
        }
    }

    // 导出学习数据
    exportLearningData() {
        const data = {
            learningData: this.learningData,
            userProgress: this.userProgress,
            learningStats: this.getLearningStats(),
            learningReport: this.generateLearningReport(),
            exportTime: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `grade4-math-learning-data-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.speak('学习数据导出成功！');
    }
}

// 初始化学习系统
let learningSystem;
document.addEventListener('DOMContentLoaded', function() {
    learningSystem = new Grade4LearningSystem();
});

// 添加样式
const learningSystemStyles = document.createElement('style');
learningSystemStyles.textContent = `
    .points-animation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2000;
        pointer-events: none;
    }
    
    .points-popup {
        background: linear-gradient(45deg, #feca57, #ff9ff3);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        animation: pointsFloat 3s ease-out;
    }
    
    .points-popup .reason {
        font-size: 0.7em;
        margin-top: 5px;
        opacity: 0.9;
    }
    
    @keyframes pointsFloat {
        0% { transform: scale(0.5) translateY(0); opacity: 0; }
        20% { transform: scale(1.2) translateY(-20px); opacity: 1; }
        100% { transform: scale(1) translateY(-100px); opacity: 0; }
    }
    
    .achievement-notification {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        animation: achievementSlide 0.5s ease-out;
    }
    
    .achievement-notification.fade-out {
        animation: achievementFade 0.5s ease-out;
    }
    
    .achievement-content {
        display: flex;
        align-items: center;
        padding: 20px;
        gap: 15px;
    }
    
    .achievement-icon {
        font-size: 3em;
    }
    
    .achievement-info h4 {
        color: #667eea;
        margin: 0 0 5px 0;
        font-size: 0.9em;
    }
    
    .achievement-info h3 {
        color: #2d3748;
        margin: 0 0 5px 0;
        font-size: 1.2em;
    }
    
    .achievement-info p {
        color: #718096;
        margin: 0;
        font-size: 0.9em;
    }
    
    @keyframes achievementSlide {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes achievementFade {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(learningSystemStyles);