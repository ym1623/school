// 统计图制作工具

class ChartMaker {
    constructor() {
        this.currentData = [];
        this.chartType = 'bar'; // bar, line, pie
        this.chartConfig = {
            title: '统计图',
            xLabel: '类别',
            yLabel: '数量',
            colors: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4', '#795548']
        };
        this.init();
    }

    init() {
        console.log('统计图制作工具初始化');
    }

    // 创建统计图制作工具界面
    createChartMakerInterface() {
        return `
            <div class="chart-maker-container">
                <div class="chart-maker-tool">
                    <div class="chart-maker-header">
                        <h4>📊 统计图制作工具</h4>
                        <button class="close-tool" onclick="closeTool()">×</button>
                    </div>
                    
                    <div class="chart-maker-main">
                        <div class="chart-maker-sidebar">
                            <div class="control-section">
                                <h5>图表类型</h5>
                                <div class="chart-type-selector">
                                    <label class="chart-type-option">
                                        <input type="radio" name="chartType" value="bar" checked onchange="chartMaker.setChartType('bar')">
                                        <span class="chart-type-icon">📊</span>
                                        <span>条形图</span>
                                    </label>
                                    <label class="chart-type-option">
                                        <input type="radio" name="chartType" value="line" onchange="chartMaker.setChartType('line')">
                                        <span class="chart-type-icon">📈</span>
                                        <span>折线图</span>
                                    </label>
                                    <label class="chart-type-option">
                                        <input type="radio" name="chartType" value="pie" onchange="chartMaker.setChartType('pie')">
                                        <span class="chart-type-icon">🥧</span>
                                        <span>饼图</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>图表设置</h5>
                                <div class="chart-settings">
                                    <div class="setting-item">
                                        <label>标题：</label>
                                        <input type="text" id="chartTitleInput" value="统计图" onchange="chartMaker.updateConfig()">
                                    </div>
                                    <div class="setting-item">
                                        <label>X轴标签：</label>
                                        <input type="text" id="xLabelInput" value="类别" onchange="chartMaker.updateConfig()">
                                    </div>
                                    <div class="setting-item">
                                        <label>Y轴标签：</label>
                                        <input type="text" id="yLabelInput" value="数量" onchange="chartMaker.updateConfig()">
                                    </div>
                                </div>
                            </div>
                            
                            <div class="control-section">
                                <h5>数据管理</h5>
                                <div class="data-input">
                                    <div class="input-row">
                                        <input type="text" id="dataName" placeholder="项目名称">
                                        <input type="number" id="dataValue" placeholder="数值" min="0">
                                        <button onclick="chartMaker.addData()">添加</button>
                                    </div>
                                </div>
                                
                                <div class="data-list" id="chartDataList">
                                    <p class="no-data">暂无数据</p>
                                </div>
                                
                                <div class="data-actions">
                                    <button onclick="chartMaker.loadSampleData()">示例数据</button>
                                    <button onclick="chartMaker.clearData()">清空数据</button>
                                    <button onclick="chartMaker.exportChart()">导出图表</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="chart-maker-canvas">
                            <div class="canvas-header">
                                <h5>图表预览</h5>
                                <div class="canvas-tools">
                                    <button onclick="chartMaker.refreshChart()">刷新</button>
                                    <button onclick="chartMaker.saveChart()">保存</button>
                                </div>
                            </div>
                            
                            <div id="chartCanvas" class="chart-canvas">
                                <div class="canvas-placeholder">
                                    <div class="placeholder-icon">📊</div>
                                    <p>添加数据后将显示图表</p>
                                    <p class="placeholder-tip">选择图表类型并添加数据开始制作</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="chart-maker-footer">
                        <div class="chart-templates">
                            <h5>快速模板</h5>
                            <div class="template-buttons">
                                <button onclick="chartMaker.loadTemplate('grades')">成绩统计</button>
                                <button onclick="chartMaker.loadTemplate('sports')">运动项目</button>
                                <button onclick="chartMaker.loadTemplate('weather')">天气统计</button>
                                <button onclick="chartMaker.loadTemplate('books')">图书统计</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 设置图表类型
    setChartType(type) {
        this.chartType = type;
        this.updateChart();
    }

    // 更新配置
    updateConfig() {
        this.chartConfig.title = document.getElementById('chartTitleInput').value;
        this.chartConfig.xLabel = document.getElementById('xLabelInput').value;
        this.chartConfig.yLabel = document.getElementById('yLabelInput').value;
        this.updateChart();
    }

    // 添加数据
    addData() {
        const nameInput = document.getElementById('dataName');
        const valueInput = document.getElementById('dataValue');
        
        const name = nameInput.value.trim();
        const value = parseFloat(valueInput.value);
        
        if (!name || isNaN(value) || value < 0) {
            alert('请输入有效的项目名称和数值！');
            return;
        }
        
        // 检查是否已存在
        const existingIndex = this.currentData.findIndex(item => item.name === name);
        if (existingIndex !== -1) {
            this.currentData[existingIndex].value = value;
        } else {
            this.currentData.push({ name, value });
        }
        
        nameInput.value = '';
        valueInput.value = '';
        
        this.updateDataList();
        this.updateChart();
        
        if (learningSystem) {
            learningSystem.awardPoints(5, '添加图表数据');
        }
    }

    // 更新数据列表
    updateDataList() {
        const dataList = document.getElementById('chartDataList');
        
        if (this.currentData.length === 0) {
            dataList.innerHTML = '<p class="no-data">暂无数据</p>';
            return;
        }
        
        let listHTML = '';
        this.currentData.forEach((item, index) => {
            listHTML += `
                <div class="data-item">
                    <span class="data-name">${item.name}</span>
                    <span class="data-value">${item.value}</span>
                    <button onclick="chartMaker.removeData(${index})" class="remove-btn">×</button>
                </div>
            `;
        });
        
        dataList.innerHTML = listHTML;
    }

    // 删除数据
    removeData(index) {
        this.currentData.splice(index, 1);
        this.updateDataList();
        this.updateChart();
    }

    // 清空数据
    clearData() {
        if (this.currentData.length > 0 && confirm('确定要清空所有数据吗？')) {
            this.currentData = [];
            this.updateDataList();
            this.updateChart();
        }
    }

    // 加载示例数据
    loadSampleData() {
        this.currentData = [
            { name: '语文', value: 85 },
            { name: '数学', value: 92 },
            { name: '英语', value: 78 },
            { name: '科学', value: 88 }
        ];
        
        this.chartConfig.title = '各科成绩统计';
        this.chartConfig.xLabel = '科目';
        this.chartConfig.yLabel = '分数';
        
        document.getElementById('chartTitleInput').value = this.chartConfig.title;
        document.getElementById('xLabelInput').value = this.chartConfig.xLabel;
        document.getElementById('yLabelInput').value = this.chartConfig.yLabel;
        
        this.updateDataList();
        this.updateChart();
    }

    // 加载模板
    loadTemplate(templateName) {
        const templates = {
            grades: {
                title: '期末考试成绩统计',
                xLabel: '科目',
                yLabel: '平均分',
                data: [
                    { name: '语文', value: 87 },
                    { name: '数学', value: 91 },
                    { name: '英语', value: 83 },
                    { name: '科学', value: 89 }
                ]
            },
            sports: {
                title: '最喜欢的运动项目',
                xLabel: '运动项目',
                yLabel: '人数',
                data: [
                    { name: '篮球', value: 15 },
                    { name: '足球', value: 12 },
                    { name: '乒乓球', value: 18 },
                    { name: '羽毛球', value: 10 }
                ]
            },
            weather: {
                title: '一周天气统计',
                xLabel: '天气',
                yLabel: '天数',
                data: [
                    { name: '晴天', value: 4 },
                    { name: '多云', value: 2 },
                    { name: '雨天', value: 1 }
                ]
            },
            books: {
                title: '图书馆借阅统计',
                xLabel: '图书类型',
                yLabel: '借阅次数',
                data: [
                    { name: '科普', value: 25 },
                    { name: '故事', value: 32 },
                    { name: '历史', value: 18 },
                    { name: '艺术', value: 15 }
                ]
            }
        };
        
        const template = templates[templateName];
        if (template) {
            this.currentData = template.data;
            this.chartConfig.title = template.title;
            this.chartConfig.xLabel = template.xLabel;
            this.chartConfig.yLabel = template.yLabel;
            
            document.getElementById('chartTitleInput').value = this.chartConfig.title;
            document.getElementById('xLabelInput').value = this.chartConfig.xLabel;
            document.getElementById('yLabelInput').value = this.chartConfig.yLabel;
            
            this.updateDataList();
            this.updateChart();
            
            if (learningSystem) {
                learningSystem.awardPoints(10, `加载${template.title}模板`);
            }
        }
    }

    // 更新图表
    updateChart() {
        const canvas = document.getElementById('chartCanvas');
        
        if (this.currentData.length === 0) {
            canvas.innerHTML = `
                <div class="canvas-placeholder">
                    <div class="placeholder-icon">📊</div>
                    <p>添加数据后将显示图表</p>
                    <p class="placeholder-tip">选择图表类型并添加数据开始制作</p>
                </div>
            `;
            return;
        }
        
        switch (this.chartType) {
            case 'bar':
                this.createBarChart(canvas);
                break;
            case 'line':
                this.createLineChart(canvas);
                break;
            case 'pie':
                this.createPieChart(canvas);
                break;
        }
    }

    // 创建条形图
    createBarChart(container) {
        const maxValue = Math.max(...this.currentData.map(item => item.value));
        const chartWidth = 500;
        const chartHeight = 400;
        const barWidth = Math.min(60, (chartWidth - 120) / this.currentData.length - 20);
        
        let svgContent = `
            <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">
                <!-- 标题 -->
                <text x="${chartWidth/2}" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">${this.chartConfig.title}</text>
                
                <!-- 坐标轴 -->
                <line x1="80" y1="350" x2="${chartWidth-40}" y2="350" stroke="#333" stroke-width="2"/>
                <line x1="80" y1="80" x2="80" y2="350" stroke="#333" stroke-width="2"/>
                
                <!-- Y轴标签 -->
                <text x="25" y="215" text-anchor="middle" font-size="12" fill="#666" transform="rotate(-90, 25, 215)">${this.chartConfig.yLabel}</text>
                
                <!-- X轴标签 -->
                <text x="${chartWidth/2}" y="390" text-anchor="middle" font-size="12" fill="#666">${this.chartConfig.xLabel}</text>
        `;
        
        // Y轴刻度
        const scaleStep = Math.ceil(maxValue / 5);
        for (let i = 0; i <= 5; i++) {
            const value = i * scaleStep;
            const y = 350 - (value / maxValue) * 250;
            svgContent += `
                <line x1="75" y1="${y}" x2="85" y2="${y}" stroke="#666" stroke-width="1"/>
                <text x="70" y="${y + 4}" text-anchor="end" font-size="10" fill="#666">${value}</text>
            `;
        }
        
        // 条形
        this.currentData.forEach((item, index) => {
            const x = 100 + index * (barWidth + 30);
            const barHeight = (item.value / maxValue) * 250;
            const y = 350 - barHeight;
            const color = this.chartConfig.colors[index % this.chartConfig.colors.length];
            
            svgContent += `
                <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="${color}" opacity="0.8"/>
                <text x="${x + barWidth/2}" y="${y - 5}" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">${item.value}</text>
                <text x="${x + barWidth/2}" y="370" text-anchor="middle" font-size="11" fill="#333">${item.name}</text>
            `;
        });
        
        svgContent += '</svg>';
        container.innerHTML = svgContent;
    }

    // 创建折线图
    createLineChart(container) {
        const maxValue = Math.max(...this.currentData.map(item => item.value));
        const chartWidth = 500;
        const chartHeight = 400;
        
        let svgContent = `
            <svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}">
                <!-- 标题 -->
                <text x="${chartWidth/2}" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">${this.chartConfig.title}</text>
                
                <!-- 坐标轴 -->
                <line x1="80" y1="350" x2="${chartWidth-40}" y2="350" stroke="#333" stroke-width="2"/>
                <line x1="80" y1="80" x2="80" y2="350" stroke="#333" stroke-width="2"/>
        `;
        
        // 计算点的位置
        const points = [];
        const stepX = (chartWidth - 120) / (this.currentData.length - 1);
        
        this.currentData.forEach((item, index) => {
            const x = 80 + index * stepX;
            const y = 350 - (item.value / maxValue) * 250;
            points.push({ x, y, value: item.value, name: item.name });
        });
        
        // 绘制折线
        if (points.length > 1) {
            let pathData = `M ${points[0].x} ${points[0].y}`;
            for (let i = 1; i < points.length; i++) {
                pathData += ` L ${points[i].x} ${points[i].y}`;
            }
            svgContent += `<path d="${pathData}" stroke="#2196F3" stroke-width="3" fill="none"/>`;
        }
        
        // 绘制数据点
        points.forEach(point => {
            svgContent += `
                <circle cx="${point.x}" cy="${point.y}" r="6" fill="#2196F3"/>
                <text x="${point.x}" y="${point.y - 15}" text-anchor="middle" font-size="12" font-weight="bold" fill="#333">${point.value}</text>
                <text x="${point.x}" y="370" text-anchor="middle" font-size="11" fill="#333">${point.name}</text>
            `;
        });
        
        svgContent += '</svg>';
        container.innerHTML = svgContent;
    }

    // 创建饼图
    createPieChart(container) {
        const total = this.currentData.reduce((sum, item) => sum + item.value, 0);
        const centerX = 250;
        const centerY = 200;
        const radius = 120;
        
        let svgContent = `
            <svg width="500" height="400" viewBox="0 0 500 400">
                <!-- 标题 -->
                <text x="250" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#333">${this.chartConfig.title}</text>
        `;
        
        let currentAngle = 0;
        
        this.currentData.forEach((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (item.value / total) * 360;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArc = angle > 180 ? 1 : 0;
            const color = this.chartConfig.colors[index % this.chartConfig.colors.length];
            
            svgContent += `
                <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z" 
                      fill="${color}" opacity="0.8" stroke="white" stroke-width="2"/>
            `;
            
            // 标签
            const labelAngle = currentAngle + angle / 2;
            const labelX = centerX + (radius + 30) * Math.cos((labelAngle * Math.PI) / 180);
            const labelY = centerY + (radius + 30) * Math.sin((labelAngle * Math.PI) / 180);
            
            svgContent += `
                <text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="11" fill="#333">
                    ${item.name}<tspan x="${labelX}" dy="12">${percentage.toFixed(1)}%</tspan>
                </text>
            `;
            
            currentAngle = endAngle;
        });
        
        svgContent += '</svg>';
        container.innerHTML = svgContent;
    }

    // 刷新图表
    refreshChart() {
        this.updateChart();
    }

    // 保存图表
    saveChart() {
        if (this.currentData.length === 0) {
            alert('请先添加数据！');
            return;
        }
        
        const chartData = {
            type: this.chartType,
            config: this.chartConfig,
            data: this.currentData,
            timestamp: new Date().toISOString()
        };
        
        const savedCharts = JSON.parse(localStorage.getItem('savedCharts') || '[]');
        savedCharts.push(chartData);
        localStorage.setItem('savedCharts', JSON.stringify(savedCharts));
        
        alert('图表已保存！');
        
        if (learningSystem) {
            learningSystem.awardPoints(15, '保存统计图');
        }
    }

    // 导出图表
    exportChart() {
        if (this.currentData.length === 0) {
            alert('请先添加数据！');
            return;
        }
        
        const canvas = document.getElementById('chartCanvas');
        const svg = canvas.querySelector('svg');
        
        if (svg) {
            // 创建下载链接
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement('a');
            downloadLink.href = svgUrl;
            downloadLink.download = `${this.chartConfig.title}.svg`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            if (learningSystem) {
                learningSystem.awardPoints(20, '导出统计图');
            }
        }
    }
}

// 创建统计图制作工具实例
const chartMaker = new ChartMaker();