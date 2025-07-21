// 量角器工具

class Protractor {
    constructor() {
        this.isActive = false;
        this.currentAngle = 0;
        this.measurementHistory = [];
        this.init();
    }

    init() {
        console.log('量角器工具初始化');
    }

    // 创建量角器界面
    createProtractorInterface() {
        return `
            <div class="protractor-container">
                <div class="protractor-tool">
                    <div class="protractor-header">
                        <h4>📐 虚拟量角器</h4>
                        <button class="close-tool" onclick="closeTool()">×</button>
                    </div>
                    
                    <div class="protractor-main">
                        <div class="protractor-display">
                            <svg id="protractorSvg" width="500" height="300" viewBox="0 0 500 300">
                                <!-- 量角器底座 -->
                                <rect x="0" y="250" width="500" height="50" fill="#f0f0f0" stroke="#ccc"/>
                                
                                <!-- 量角器半圆 -->
                                <path d="M 50 250 A 200 200 0 0 1 450 250" fill="rgba(255,235,59,0.8)" stroke="#333" stroke-width="2"/>
                                
                                <!-- 内圈刻度 -->
                                <g id="innerMarks"></g>
                                
                                <!-- 外圈刻度 -->
                                <g id="outerMarks"></g>
                                
                                <!-- 可移动的角度线 -->
                                <g id="angleLines">
                                    <line id="baseLine" x1="250" y1="250" x2="450" y2="250" stroke="#ff4444" stroke-width="3"/>
                                    <line id="movableLine" x1="250" y1="250" x2="400" y2="150" stroke="#ff4444" stroke-width="3"/>
                                </g>
                                
                                <!-- 角度弧线 -->
                                <path id="angleArc" d="" fill="none" stroke="#ff4444" stroke-width="2"/>
                                
                                <!-- 中心点 -->
                                <circle cx="250" cy="250" r="5" fill="#333"/>
                                
                                <!-- 角度显示 -->
                                <text id="angleText" x="280" y="230" font-size="20" font-weight="bold" fill="#ff4444">45°</text>
                            </svg>
                        </div>
                        
                        <div class="protractor-controls">
                            <div class="control-section">
                                <h5>角度调节</h5>
                                <div class="angle-slider-container">
                                    <input type="range" id="angleSlider" min="0" max="180" value="45" 
                                           oninput="protractor.updateAngle(this.value)">
                                    <div class="slider-labels">
                                        <span>0°</span>
                                        <span>90°</span>
                                        <span>180°</span>
                                    </div>
                                </div>
                                <div class="angle-input">
                                    <label>精确输入：</label>
                                    <input type="number" id="preciseAngle" min="0" max="180" value="45" 
                                           onchange="protractor.setPreciseAngle(this.value)">
                                    <span>°</span>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>快速角度</h5>
                                <div class="quick-angles">
                                    <button onclick="protractor.setQuickAngle(30)">30°</button>
                                    <button onclick="protractor.setQuickAngle(45)">45°</button>
                                    <button onclick="protractor.setQuickAngle(60)">60°</button>
                                    <button onclick="protractor.setQuickAngle(90)">90°</button>
                                    <button onclick="protractor.setQuickAngle(120)">120°</button>
                                    <button onclick="protractor.setQuickAngle(135)">135°</button>
                                    <button onclick="protractor.setQuickAngle(150)">150°</button>
                                    <button onclick="protractor.setQuickAngle(180)">180°</button>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>测量功能</h5>
                                <div class="measurement-controls">
                                    <button onclick="protractor.saveMeasurement()">保存测量</button>
                                    <button onclick="protractor.showMeasurements()">查看记录</button>
                                    <button onclick="protractor.clearMeasurements()">清空记录</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="protractor-info">
                        <div class="angle-classification">
                            <h5>角度分类：<span id="angleType">锐角</span></h5>
                            <div class="angle-description" id="angleDescription">
                                小于90°的角称为锐角
                            </div>
                        </div>
                        
                        <div class="measurement-tips">
                            <h5>💡 使用技巧</h5>
                            <ul>
                                <li>拖动滑块或输入精确数值调节角度</li>
                                <li>观察角度分类和特征</li>
                                <li>保存重要的测量结果</li>
                                <li>使用快速角度按钮练习常见角度</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- 测量记录面板 -->
                <div id="measurementPanel" class="measurement-panel" style="display:none;">
                    <div class="panel-header">
                        <h5>测量记录</h5>
                        <button onclick="protractor.hideMeasurements()">×</button>
                    </div>
                    <div class="panel-content" id="measurementContent">
                        <p class="no-measurements">暂无测量记录</p>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化量角器刻度
    initProtractorMarks() {
        this.createInnerMarks();
        this.createOuterMarks();
        this.updateAngle(45); // 初始角度
    }

    // 创建内圈刻度（0-180）
    createInnerMarks() {
        const innerMarks = document.getElementById('innerMarks');
        if (!innerMarks) return;
        
        innerMarks.innerHTML = '';
        
        for (let i = 0; i <= 180; i += 10) {
            const angle = (i * Math.PI) / 180;
            const x1 = 250 + 180 * Math.cos(Math.PI - angle);
            const y1 = 250 - 180 * Math.sin(Math.PI - angle);
            const x2 = 250 + 190 * Math.cos(Math.PI - angle);
            const y2 = 250 - 190 * Math.sin(Math.PI - angle);
            
            // 刻度线
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#333');
            line.setAttribute('stroke-width', i % 30 === 0 ? '2' : '1');
            innerMarks.appendChild(line);
            
            // 数字标记
            if (i % 30 === 0) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const textX = 250 + 170 * Math.cos(Math.PI - angle);
                const textY = 250 - 170 * Math.sin(Math.PI - angle) + 5;
                text.setAttribute('x', textX);
                text.setAttribute('y', textY);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '12');
                text.setAttribute('fill', '#333');
                text.textContent = i;
                innerMarks.appendChild(text);
            }
        }
    }

    // 创建外圈刻度（180-0，从右到左）
    createOuterMarks() {
        const outerMarks = document.getElementById('outerMarks');
        if (!outerMarks) return;
        
        outerMarks.innerHTML = '';
        
        for (let i = 0; i <= 180; i += 10) {
            const angle = (i * Math.PI) / 180;
            const x1 = 250 + 195 * Math.cos(Math.PI - angle);
            const y1 = 250 - 195 * Math.sin(Math.PI - angle);
            const x2 = 250 + 200 * Math.cos(Math.PI - angle);
            const y2 = 250 - 200 * Math.sin(Math.PI - angle);
            
            // 刻度线
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x1);
            line.setAttribute('y1', y1);
            line.setAttribute('x2', x2);
            line.setAttribute('y2', y2);
            line.setAttribute('stroke', '#666');
            line.setAttribute('stroke-width', i % 30 === 0 ? '2' : '1');
            outerMarks.appendChild(line);
            
            // 数字标记（外圈是反向的）
            if (i % 30 === 0) {
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                const textX = 250 + 210 * Math.cos(Math.PI - angle);
                const textY = 250 - 210 * Math.sin(Math.PI - angle) + 5;
                text.setAttribute('x', textX);
                text.setAttribute('y', textY);
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '12');
                text.setAttribute('fill', '#666');
                text.textContent = 180 - i;
                outerMarks.appendChild(text);
            }
        }
    }

    // 更新角度显示
    updateAngle(degrees) {
        this.currentAngle = parseFloat(degrees);
        
        // 更新可移动线的位置
        const angleRad = (this.currentAngle * Math.PI) / 180;
        const movableLine = document.getElementById('movableLine');
        const angleArc = document.getElementById('angleArc');
        const angleText = document.getElementById('angleText');
        const preciseInput = document.getElementById('preciseAngle');
        const angleSlider = document.getElementById('angleSlider');
        
        if (movableLine) {
            const x2 = 250 + 150 * Math.cos(Math.PI - angleRad);
            const y2 = 250 - 150 * Math.sin(Math.PI - angleRad);
            movableLine.setAttribute('x2', x2);
            movableLine.setAttribute('y2', y2);
        }
        
        if (angleArc) {
            const arcPath = this.createArcPath(250, 250, 50, 0, this.currentAngle);
            angleArc.setAttribute('d', arcPath);
        }
        
        if (angleText) {
            angleText.textContent = this.currentAngle + '°';
        }
        
        if (preciseInput) {
            preciseInput.value = this.currentAngle;
        }
        
        if (angleSlider) {
            angleSlider.value = this.currentAngle;
        }
        
        // 更新角度分类
        this.updateAngleClassification();
    }

    // 创建弧线路径
    createArcPath(cx, cy, radius, startAngle, endAngle) {
        const start = (startAngle * Math.PI) / 180;
        const end = (endAngle * Math.PI) / 180;
        
        const x1 = cx + radius * Math.cos(Math.PI - start);
        const y1 = cy - radius * Math.sin(Math.PI - start);
        const x2 = cx + radius * Math.cos(Math.PI - end);
        const y2 = cy - radius * Math.sin(Math.PI - end);
        
        const largeArc = endAngle - startAngle > 180 ? 1 : 0;
        
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 0 ${x2} ${y2}`;
    }

    // 设置精确角度
    setPreciseAngle(degrees) {
        const angle = Math.max(0, Math.min(180, parseFloat(degrees) || 0));
        this.updateAngle(angle);
    }

    // 设置快速角度
    setQuickAngle(degrees) {
        this.updateAngle(degrees);
        
        // 语音播报
        if (learningSystem && learningSystem.voiceEnabled) {
            const type = this.getAngleType(degrees);
            learningSystem.speak(`${degrees}度，这是${type}`);
        }
    }

    // 更新角度分类
    updateAngleClassification() {
        const typeElement = document.getElementById('angleType');
        const descElement = document.getElementById('angleDescription');
        
        if (!typeElement || !descElement) return;
        
        const type = this.getAngleType(this.currentAngle);
        const description = this.getAngleDescription(this.currentAngle);
        const color = this.getAngleColor(this.currentAngle);
        
        typeElement.textContent = type;
        typeElement.style.color = color;
        descElement.textContent = description;
    }

    // 获取角度类型
    getAngleType(angle) {
        if (angle === 0) return '零角';
        if (angle < 90) return '锐角';
        if (angle === 90) return '直角';
        if (angle < 180) return '钝角';
        if (angle === 180) return '平角';
        return '角';
    }

    // 获取角度描述
    getAngleDescription(angle) {
        if (angle === 0) return '两条边重合，角度为0°';
        if (angle < 90) return `小于90°的角，比直角小${90 - angle}°`;
        if (angle === 90) return '等于90°的角，两边互相垂直';
        if (angle < 180) return `大于90°小于180°的角，比直角大${angle - 90}°`;
        if (angle === 180) return '等于180°的角，两边成一条直线';
        return '角度描述';
    }

    // 获取角度颜色
    getAngleColor(angle) {
        if (angle === 0) return '#9E9E9E';
        if (angle < 90) return '#4CAF50';
        if (angle === 90) return '#2196F3';
        if (angle < 180) return '#FF9800';
        if (angle === 180) return '#F44336';
        return '#333';
    }

    // 保存测量结果
    saveMeasurement() {
        const measurement = {
            angle: this.currentAngle,
            type: this.getAngleType(this.currentAngle),
            timestamp: new Date().toLocaleString(),
            note: prompt('添加备注（可选）：') || ''
        };
        
        this.measurementHistory.unshift(measurement);
        
        // 只保留最近50条记录
        if (this.measurementHistory.length > 50) {
            this.measurementHistory = this.measurementHistory.slice(0, 50);
        }
        
        this.saveMeasurementHistory();
        
        // 显示保存成功提示
        this.showToast(`已保存测量：${this.currentAngle}° (${measurement.type})`);
        
        if (learningSystem) {
            learningSystem.awardPoints(5, '保存角度测量');
        }
    }

    // 显示测量记录
    showMeasurements() {
        const panel = document.getElementById('measurementPanel');
        const content = document.getElementById('measurementContent');
        
        if (this.measurementHistory.length === 0) {
            content.innerHTML = '<p class="no-measurements">暂无测量记录</p>';
        } else {
            let historyHTML = '';
            this.measurementHistory.forEach((item, index) => {
                historyHTML += `
                    <div class="measurement-item">
                        <div class="measurement-main">
                            <span class="measurement-angle">${item.angle}°</span>
                            <span class="measurement-type" style="color: ${this.getAngleColor(item.angle)}">${item.type}</span>
                        </div>
                        <div class="measurement-details">
                            <div class="measurement-time">${item.timestamp}</div>
                            ${item.note ? `<div class="measurement-note">${item.note}</div>` : ''}
                        </div>
                        <div class="measurement-actions">
                            <button onclick="protractor.useMeasurement(${index})">使用</button>
                            <button onclick="protractor.deleteMeasurement(${index})">删除</button>
                        </div>
                    </div>
                `;
            });
            content.innerHTML = historyHTML;
        }
        
        panel.style.display = 'block';
    }

    // 隐藏测量记录
    hideMeasurements() {
        document.getElementById('measurementPanel').style.display = 'none';
    }

    // 使用测量记录
    useMeasurement(index) {
        const measurement = this.measurementHistory[index];
        this.updateAngle(measurement.angle);
        this.hideMeasurements();
    }

    // 删除测量记录
    deleteMeasurement(index) {
        if (confirm('确定要删除这条测量记录吗？')) {
            this.measurementHistory.splice(index, 1);
            this.saveMeasurementHistory();
            this.showMeasurements(); // 刷新显示
        }
    }

    // 清空测量记录
    clearMeasurements() {
        if (confirm('确定要清空所有测量记录吗？')) {
            this.measurementHistory = [];
            this.saveMeasurementHistory();
            this.hideMeasurements();
        }
    }

    // 保存测量历史
    saveMeasurementHistory() {
        localStorage.setItem('protractorHistory', JSON.stringify(this.measurementHistory));
    }

    // 加载测量历史
    loadMeasurementHistory() {
        const saved = localStorage.getItem('protractorHistory');
        if (saved) {
            this.measurementHistory = JSON.parse(saved);
        }
    }

    // 显示提示消息
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'protractor-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }
}

// 创建量角器实例
const protractor = new Protractor();

// 页面加载完成后加载历史记录
document.addEventListener('DOMContentLoaded', function() {
    protractor.loadMeasurementHistory();
});