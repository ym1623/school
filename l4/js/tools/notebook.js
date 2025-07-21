// 错题本工具

class Notebook {
    constructor() {
        this.mistakes = [];
        this.notes = [];
        this.reviewPlans = [];
        this.currentTab = 'mistakes';
        this.loadData();
    }

    // 创建错题本界面
    createNotebookInterface() {
        return `
            <div class="notebook-container">
                <div class="notebook-tool">
                    <div class="notebook-header">
                        <h4>📝 错题本</h4>
                        <button class="close-tool" onclick="notebook.closeTool()">×</button>
                    </div>
                    
                    <div class="notebook-main">
                        <div class="notebook-tabs">
                            <button class="tab-btn active" onclick="notebook.switchTab('mistakes')">错题记录</button>
                            <button class="tab-btn" onclick="notebook.switchTab('notes')">学习笔记</button>
                            <button class="tab-btn" onclick="notebook.switchTab('review')">复习计划</button>
                        </div>
                        
                        <div id="mistakesTab" class="tab-content active">
                            ${this.createMistakesTab()}
                        </div>
                        
                        <div id="notesTab" class="tab-content">
                            ${this.createNotesTab()}
                        </div>
                        
                        <div id="reviewTab" class="tab-content">
                            ${this.createReviewTab()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 创建错题记录标签页
    createMistakesTab() {
        return `
            <div class="mistakes-section">
                <div class="section-header">
                    <h5>错题统计</h5>
                    <button onclick="notebook.addMistake()" class="add-btn">添加错题</button>
                </div>
                
                <div id="mistakesList" class="mistakes-list">
                    ${this.renderMistakesList()}
                </div>
            </div>
        `;
    }

    // 创建学习笔记标签页
    createNotesTab() {
        return `
            <div class="notes-section">
                <div class="section-header">
                    <h5>学习笔记</h5>
                    <button onclick="notebook.addNote()" class="add-btn">添加笔记</button>
                </div>
                
                <div id="notesList" class="notes-list">
                    ${this.renderNotesList()}
                </div>
            </div>
        `;
    }

    // 创建复习计划标签页
    createReviewTab() {
        return `
            <div class="review-section">
                <div class="section-header">
                    <h5>复习计划</h5>
                    <button onclick="notebook.createReviewPlan()" class="add-btn">制定计划</button>
                </div>
                
                <div id="reviewPlansList" class="review-plans-list">
                    ${this.renderReviewPlansList()}
                </div>
            </div>
        `;
    }

    // 渲染错题列表
    renderMistakesList() {
        if (this.mistakes.length === 0) {
            return `
                <div class="no-mistakes">
                    <p>🎉 太棒了！目前还没有错题记录</p>
                    <p>继续保持，认真学习！</p>
                </div>
            `;
        }
        
        return this.mistakes.map((mistake, index) => `
            <div class="mistake-item ${mistake.mastered ? 'mastered' : ''}" data-id="${index}">
                <div class="mistake-header">
                    <div class="mistake-info">
                        <span class="mistake-subject">${mistake.subject}</span>
                        <span class="mistake-date">${mistake.date}</span>
                    </div>
                    <div class="mistake-actions">
                        <button onclick="notebook.toggleMastered(${index})" class="action-btn">
                            ${mistake.mastered ? '✓' : '○'}
                        </button>
                        <button onclick="notebook.deleteMistake(${index})" class="action-btn">🗑️</button>
                    </div>
                </div>
                <div class="mistake-content">
                    <div class="mistake-question">
                        <strong>题目：</strong>${mistake.question}
                    </div>
                    <div class="mistake-analysis">
                        <strong>错误分析：</strong>${mistake.analysis}
                    </div>
                    <div class="mistake-solution">
                        <strong>正确解法：</strong>${mistake.solution}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 渲染笔记列表
    renderNotesList() {
        if (this.notes.length === 0) {
            return `
                <div class="no-notes">
                    <p>📝 还没有学习笔记</p>
                    <p>点击"添加笔记"开始记录学习心得</p>
                </div>
            `;
        }
        
        return this.notes.map((note, index) => `
            <div class="note-item" data-id="${index}">
                <div class="note-header">
                    <div class="note-info">
                        <span class="note-title">${note.title}</span>
                        <span class="note-date">${note.date}</span>
                    </div>
                    <div class="note-actions">
                        <button onclick="notebook.deleteNote(${index})" class="action-btn">🗑️</button>
                    </div>
                </div>
                <div class="note-content">
                    <div class="note-subject">
                        <strong>科目：</strong>${note.subject}
                    </div>
                    <div class="note-text">
                        ${note.content}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 渲染复习计划列表
    renderReviewPlansList() {
        if (this.reviewPlans.length === 0) {
            return `
                <div class="no-plans">
                    <p>📅 还没有复习计划</p>
                    <p>点击"制定计划"创建复习安排</p>
                </div>
            `;
        }
        
        return this.reviewPlans.map((plan, index) => `
            <div class="plan-item ${plan.completed ? 'completed' : ''}" data-id="${index}">
                <div class="plan-header">
                    <div class="plan-info">
                        <span class="plan-title">${plan.title}</span>
                        <span class="plan-date">${plan.date}</span>
                    </div>
                    <div class="plan-actions">
                        <button onclick="notebook.togglePlanComplete(${index})" class="action-btn">
                            ${plan.completed ? '✓' : '○'}
                        </button>
                        <button onclick="notebook.deletePlan(${index})" class="action-btn">🗑️</button>
                    </div>
                </div>
                <div class="plan-content">
                    <div class="plan-subject">
                        <strong>科目：</strong>${plan.subject}
                    </div>
                    <div class="plan-description">
                        ${plan.description}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 切换标签页
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // 更新标签按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`button[onclick="notebook.switchTab('${tabName}')"]`).classList.add('active');
        
        // 更新内容显示
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    // 添加错题
    addMistake() {
        const mistake = {
            subject: prompt('请输入科目（如：数学、语文）：') || '数学',
            question: prompt('请输入错题内容：') || '',
            analysis: prompt('请输入错误分析：') || '',
            solution: prompt('请输入正确解法：') || '',
            date: new Date().toLocaleDateString(),
            mastered: false
        };
        
        if (mistake.question && mistake.analysis && mistake.solution) {
            this.mistakes.push(mistake);
            this.saveData();
            this.updateMistakesDisplay();
            this.showMessage('错题添加成功！');
        }
    }

    // 添加笔记
    addNote() {
        const note = {
            title: prompt('请输入笔记标题：') || '',
            subject: prompt('请输入科目：') || '数学',
            content: prompt('请输入笔记内容：') || '',
            date: new Date().toLocaleDateString()
        };
        
        if (note.title && note.content) {
            this.notes.push(note);
            this.saveData();
            this.updateNotesDisplay();
            this.showMessage('笔记添加成功！');
        }
    }

    // 创建复习计划
    createReviewPlan() {
        const plan = {
            title: prompt('请输入计划标题：') || '',
            subject: prompt('请输入科目：') || '数学',
            description: prompt('请输入计划描述：') || '',
            date: new Date().toLocaleDateString(),
            completed: false
        };
        
        if (plan.title && plan.description) {
            this.reviewPlans.push(plan);
            this.saveData();
            this.updateReviewPlansDisplay();
            this.showMessage('复习计划创建成功！');
        }
    }

    // 切换错题掌握状态
    toggleMastered(index) {
        this.mistakes[index].mastered = !this.mistakes[index].mastered;
        this.saveData();
        this.updateMistakesDisplay();
        this.showMessage(this.mistakes[index].mastered ? '已标记为掌握！' : '已取消掌握标记');
    }

    // 切换计划完成状态
    togglePlanComplete(index) {
        this.reviewPlans[index].completed = !this.reviewPlans[index].completed;
        this.saveData();
        this.updateReviewPlansDisplay();
        this.showMessage(this.reviewPlans[index].completed ? '计划已完成！' : '计划已重置');
    }

    // 删除错题
    deleteMistake(index) {
        if (confirm('确定要删除这条错题记录吗？')) {
            this.mistakes.splice(index, 1);
            this.saveData();
            this.updateMistakesDisplay();
            this.showMessage('错题删除成功！');
        }
    }

    // 删除笔记
    deleteNote(index) {
        if (confirm('确定要删除这条笔记吗？')) {
            this.notes.splice(index, 1);
            this.saveData();
            this.updateNotesDisplay();
            this.showMessage('笔记删除成功！');
        }
    }

    // 删除计划
    deletePlan(index) {
        if (confirm('确定要删除这个复习计划吗？')) {
            this.reviewPlans.splice(index, 1);
            this.saveData();
            this.updateReviewPlansDisplay();
            this.showMessage('计划删除成功！');
        }
    }

    // 更新错题显示
    updateMistakesDisplay() {
        const mistakesList = document.getElementById('mistakesList');
        if (mistakesList) {
            mistakesList.innerHTML = this.renderMistakesList();
        }
    }

    // 更新笔记显示
    updateNotesDisplay() {
        const notesList = document.getElementById('notesList');
        if (notesList) {
            notesList.innerHTML = this.renderNotesList();
        }
    }

    // 更新复习计划显示
    updateReviewPlansDisplay() {
        const reviewPlansList = document.getElementById('reviewPlansList');
        if (reviewPlansList) {
            reviewPlansList.innerHTML = this.renderReviewPlansList();
        }
    }

    // 保存数据
    saveData() {
        const data = {
            mistakes: this.mistakes,
            notes: this.notes,
            reviewPlans: this.reviewPlans
        };
        localStorage.setItem('notebookData', JSON.stringify(data));
    }

    // 加载数据
    loadData() {
        const data = localStorage.getItem('notebookData');
        if (data) {
            const parsed = JSON.parse(data);
            this.mistakes = parsed.mistakes || [];
            this.notes = parsed.notes || [];
            this.reviewPlans = parsed.reviewPlans || [];
        }
    }

    // 显示消息
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'notebook-message';
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
        const toolModal = document.getElementById('toolModal');
        if (toolModal) {
            toolModal.remove();
        }
    }
}

// 创建全局实例
const notebook = new Notebook(); 