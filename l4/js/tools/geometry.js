// 几何画板工具

class GeometryBoard {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.currentTool = 'select';
        this.shapes = [];
        this.selectedShape = null;
        this.isDrawing = false;
        this.startPoint = null;
        this.currentColor = '#000000';
        this.currentLineWidth = 2;
    }

    // 创建几何画板界面
    createGeometryInterface() {
        return `
            <div class="geometry-container">
                <div class="geometry-tool">
                    <div class="geometry-header">
                        <h4>📐 几何画板</h4>
                        <button class="close-tool" onclick="geometryBoard.closeTool()">×</button>
                    </div>
                    
                    <div class="geometry-main">
                        <div class="geometry-toolbar">
                            <div class="tool-group">
                                <h5>绘图工具</h5>
                                <div class="tool-buttons">
                                    <button class="tool-btn active" onclick="geometryBoard.selectTool('select')">选择</button>
                                    <button class="tool-btn" onclick="geometryBoard.selectTool('line')">直线</button>
                                    <button class="tool-btn" onclick="geometryBoard.selectTool('rectangle')">矩形</button>
                                    <button class="tool-btn" onclick="geometryBoard.selectTool('circle')">圆形</button>
                                    <button class="tool-btn" onclick="geometryBoard.selectTool('triangle')">三角形</button>
                                </div>
                            </div>
                            
                            <div class="tool-group">
                                <h5>样式设置</h5>
                                <div class="style-controls">
                                    <label>颜色：</label>
                                    <input type="color" id="colorPicker" value="#000000" onchange="geometryBoard.setColor(this.value)">
                                    <label>线宽：</label>
                                    <input type="range" id="lineWidthSlider" min="1" max="10" value="2" onchange="geometryBoard.setLineWidth(this.value)">
                                    <span id="lineWidthValue">2</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="geometry-canvas-container">
                            <canvas id="geometryCanvas" width="800" height="600"></canvas>
                            <div class="canvas-info">
                                <span id="mouseCoordinates">坐标: (0, 0)</span>
                                <span id="shapeInfo">选择图形查看信息</span>
                            </div>
                        </div>
                        
                        <div class="geometry-panel">
                            <div class="panel-section">
                                <h5>图形列表</h5>
                                <div id="shapesList" class="shapes-list">
                                    <p>暂无图形</p>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>操作</h5>
                                <div class="action-buttons">
                                    <button onclick="geometryBoard.clearCanvas()" class="action-btn">清空画布</button>
                                    <button onclick="geometryBoard.undo()" class="action-btn">撤销</button>
                                    <button onclick="geometryBoard.saveImage()" class="action-btn">保存图片</button>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>快速图形</h5>
                                <div class="quick-shapes">
                                    <button onclick="geometryBoard.addQuickShape('square')" class="quick-btn">正方形</button>
                                    <button onclick="geometryBoard.addQuickShape('equilateral')" class="quick-btn">等边三角形</button>
                                    <button onclick="geometryBoard.addQuickShape('rightTriangle')" class="quick-btn">直角三角形</button>
                                </div>
                            </div>
                            
                            <div class="panel-section">
                                <h5>学习提示</h5>
                                <div class="learning-tips">
                                    <div class="tip-item">
                                        <strong>矩形：</strong>对边相等，四个角都是直角
                                    </div>
                                    <div class="tip-item">
                                        <strong>圆形：</strong>所有点到圆心的距离相等
                                    </div>
                                    <div class="tip-item">
                                        <strong>三角形：</strong>三边之和大于第三边
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 初始化几何画板
    init() {
        this.canvas = document.getElementById('geometryCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupEventListeners();
        this.updateShapesList();
    }

    // 设置事件监听器
    setupEventListeners() {
        if (!this.canvas) return;
        
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    }

    // 处理鼠标按下
    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.startPoint = { x, y };
        this.isDrawing = true;
        
        if (this.currentTool === 'select') {
            this.selectShapeAt(x, y);
        }
    }

    // 处理鼠标移动
    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.updateCoordinates(x, y);
        
        if (this.isDrawing && this.startPoint) {
            this.drawPreview(x, y);
        }
    }

    // 处理鼠标释放
    handleMouseUp(e) {
        if (this.isDrawing && this.startPoint) {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.createShape(this.startPoint, { x, y });
        }
        
        this.isDrawing = false;
        this.startPoint = null;
        this.redraw();
    }

    // 选择工具
    selectTool(tool) {
        this.currentTool = tool;
        
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        this.showMessage(`已选择${this.getToolName(tool)}工具`);
    }

    // 获取工具名称
    getToolName(tool) {
        const names = {
            select: '选择',
            line: '直线',
            rectangle: '矩形',
            circle: '圆形',
            triangle: '三角形'
        };
        return names[tool] || tool;
    }

    // 设置颜色
    setColor(color) {
        this.currentColor = color;
    }

    // 设置线宽
    setLineWidth(width) {
        this.currentLineWidth = parseInt(width);
        document.getElementById('lineWidthValue').textContent = width;
    }

    // 绘制预览
    drawPreview(x, y) {
        this.redraw();
        
        this.ctx.strokeStyle = this.currentColor;
        this.ctx.lineWidth = this.currentLineWidth;
        this.ctx.setLineDash([5, 5]);
        
        switch (this.currentTool) {
            case 'line':
                this.drawLine(this.startPoint, { x, y });
                break;
            case 'rectangle':
                this.drawRectangle(this.startPoint, { x, y });
                break;
            case 'circle':
                this.drawCircle(this.startPoint, { x, y });
                break;
            case 'triangle':
                this.drawTriangle(this.startPoint, { x, y });
                break;
        }
        
        this.ctx.setLineDash([]);
    }

    // 创建图形
    createShape(start, end) {
        const shape = {
            type: this.currentTool,
            start: start,
            end: end,
            color: this.currentColor,
            lineWidth: this.currentLineWidth,
            id: Date.now()
        };
        
        this.shapes.push(shape);
        this.updateShapesList();
        this.showMessage(`已创建${this.getToolName(this.currentTool)}`);
    }

    // 绘制直线
    drawLine(start, end) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.stroke();
    }

    // 绘制矩形
    drawRectangle(start, end) {
        const width = end.x - start.x;
        const height = end.y - start.y;
        this.ctx.strokeRect(start.x, start.y, width, height);
    }

    // 绘制圆形
    drawCircle(start, end) {
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        this.ctx.beginPath();
        this.ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
        this.ctx.stroke();
    }

    // 绘制三角形
    drawTriangle(start, end) {
        const width = end.x - start.x;
        const height = end.y - start.y;
        
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.lineTo(start.x - width, end.y);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    // 重绘画布
    redraw() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.shapes.forEach(shape => {
            this.drawShape(shape);
        });
    }

    // 绘制图形
    drawShape(shape) {
        this.ctx.strokeStyle = shape.color;
        this.ctx.lineWidth = shape.lineWidth;
        
        switch (shape.type) {
            case 'line':
                this.drawLine(shape.start, shape.end);
                break;
            case 'rectangle':
                this.drawRectangle(shape.start, shape.end);
                break;
            case 'circle':
                this.drawCircle(shape.start, shape.end);
                break;
            case 'triangle':
                this.drawTriangle(shape.start, shape.end);
                break;
        }
    }

    // 选择图形
    selectShapeAt(x, y) {
        this.selectedShape = null;
        
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            if (this.isPointInShape(x, y, shape)) {
                this.selectedShape = shape;
                this.updateShapeInfo(shape);
                break;
            }
        }
        
        this.redraw();
        this.highlightSelectedShape();
    }

    // 检查点是否在图形内
    isPointInShape(x, y, shape) {
        switch (shape.type) {
            case 'line':
                return this.isPointOnLine(x, y, shape.start, shape.end);
            case 'rectangle':
                return this.isPointInRectangle(x, y, shape.start, shape.end);
            case 'circle':
                return this.isPointInCircle(x, y, shape.start, shape.end);
            default:
                return false;
        }
    }

    // 检查点是否在直线上
    isPointOnLine(x, y, start, end) {
        const tolerance = 5;
        const distance = this.pointToLineDistance(x, y, start, end);
        return distance <= tolerance;
    }

    // 计算点到直线的距离
    pointToLineDistance(x, y, start, end) {
        const A = x - start.x;
        const B = y - start.y;
        const C = end.x - start.x;
        const D = end.y - start.y;
        
        const dot = A * C + B * D;
        const lenSq = C * C + D * D;
        let param = -1;
        
        if (lenSq !== 0) param = dot / lenSq;
        
        let xx, yy;
        if (param < 0) {
            xx = start.x;
            yy = start.y;
        } else if (param > 1) {
            xx = end.x;
            yy = end.y;
        } else {
            xx = start.x + param * C;
            yy = start.y + param * D;
        }
        
        const dx = x - xx;
        const dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // 检查点是否在矩形内
    isPointInRectangle(x, y, start, end) {
        const minX = Math.min(start.x, end.x);
        const maxX = Math.max(start.x, end.x);
        const minY = Math.min(start.y, end.y);
        const maxY = Math.max(start.y, end.y);
        
        return x >= minX && x <= maxX && y >= minY && y <= maxY;
    }

    // 检查点是否在圆内
    isPointInCircle(x, y, start, end) {
        const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
        const distance = Math.sqrt(Math.pow(x - start.x, 2) + Math.pow(y - start.y, 2));
        return distance <= radius;
    }

    // 高亮选中的图形
    highlightSelectedShape() {
        if (!this.selectedShape) return;
        
        this.ctx.strokeStyle = '#ff0000';
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([5, 5]);
        
        this.drawShape(this.selectedShape);
        
        this.ctx.setLineDash([]);
    }

    // 更新坐标显示
    updateCoordinates(x, y) {
        const coordinatesDiv = document.getElementById('mouseCoordinates');
        if (coordinatesDiv) {
            coordinatesDiv.textContent = `坐标: (${Math.round(x)}, ${Math.round(y)})`;
        }
    }

    // 更新图形信息
    updateShapeInfo(shape) {
        const infoDiv = document.getElementById('shapeInfo');
        if (!infoDiv) return;
        
        let info = '';
        switch (shape.type) {
            case 'line':
                const length = Math.sqrt(Math.pow(shape.end.x - shape.start.x, 2) + Math.pow(shape.end.y - shape.start.y, 2));
                info = `直线 - 长度: ${Math.round(length)}px`;
                break;
            case 'rectangle':
                const width = Math.abs(shape.end.x - shape.start.x);
                const height = Math.abs(shape.end.y - shape.start.y);
                const area = width * height;
                info = `矩形 - 宽: ${Math.round(width)}px, 高: ${Math.round(height)}px, 面积: ${Math.round(area)}px²`;
                break;
            case 'circle':
                const radius = Math.sqrt(Math.pow(shape.end.x - shape.start.x, 2) + Math.pow(shape.end.y - shape.start.y, 2));
                const circleArea = Math.PI * radius * radius;
                info = `圆形 - 半径: ${Math.round(radius)}px, 面积: ${Math.round(circleArea)}px²`;
                break;
            default:
                info = `${this.getToolName(shape.type)}`;
        }
        
        infoDiv.textContent = info;
    }

    // 更新图形列表
    updateShapesList() {
        const listDiv = document.getElementById('shapesList');
        if (!listDiv) return;
        
        if (this.shapes.length === 0) {
            listDiv.innerHTML = '<p>暂无图形</p>';
            return;
        }
        
        const listHTML = this.shapes.map((shape, index) => `
            <div class="shape-item ${this.selectedShape === shape ? 'selected' : ''}" onclick="geometryBoard.selectShapeByIndex(${index})">
                <span class="shape-name">${this.getToolName(shape.type)} ${index + 1}</span>
                <button onclick="geometryBoard.deleteShape(${index}); event.stopPropagation();" class="delete-btn">🗑️</button>
            </div>
        `).join('');
        
        listDiv.innerHTML = listHTML;
    }

    // 通过索引选择图形
    selectShapeByIndex(index) {
        if (index >= 0 && index < this.shapes.length) {
            this.selectedShape = this.shapes[index];
            this.updateShapeInfo(this.selectedShape);
            this.redraw();
            this.highlightSelectedShape();
            this.updateShapesList();
        }
    }

    // 删除图形
    deleteShape(index) {
        if (confirm('确定要删除这个图形吗？')) {
            this.shapes.splice(index, 1);
            this.selectedShape = null;
            this.redraw();
            this.updateShapesList();
            this.showMessage('图形已删除');
        }
    }

    // 清空画布
    clearCanvas() {
        if (confirm('确定要清空所有图形吗？')) {
            this.shapes = [];
            this.selectedShape = null;
            this.redraw();
            this.updateShapesList();
            this.showMessage('画布已清空');
        }
    }

    // 撤销
    undo() {
        if (this.shapes.length > 0) {
            this.shapes.pop();
            this.selectedShape = null;
            this.redraw();
            this.updateShapesList();
            this.showMessage('已撤销上一步操作');
        }
    }

    // 保存图片
    saveImage() {
        const link = document.createElement('a');
        link.download = `几何画板_${new Date().toLocaleDateString()}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
        this.showMessage('图片保存成功！');
    }

    // 添加快速图形
    addQuickShape(type) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 100;
        
        let shape;
        switch (type) {
            case 'square':
                shape = {
                    type: 'rectangle',
                    start: { x: centerX - size/2, y: centerY - size/2 },
                    end: { x: centerX + size/2, y: centerY + size/2 },
                    color: this.currentColor,
                    lineWidth: this.currentLineWidth,
                    id: Date.now()
                };
                break;
            case 'equilateral':
                shape = {
                    type: 'triangle',
                    start: { x: centerX, y: centerY - size/2 },
                    end: { x: centerX + size/2, y: centerY + size/2 },
                    color: this.currentColor,
                    lineWidth: this.currentLineWidth,
                    id: Date.now()
                };
                break;
            case 'rightTriangle':
                shape = {
                    type: 'triangle',
                    start: { x: centerX - size/2, y: centerY + size/2 },
                    end: { x: centerX + size/2, y: centerY - size/2 },
                    color: this.currentColor,
                    lineWidth: this.currentLineWidth,
                    id: Date.now()
                };
                break;
        }
        
        if (shape) {
            this.shapes.push(shape);
            this.redraw();
            this.updateShapesList();
            this.showMessage(`已添加${this.getToolName(type)}`);
        }
    }

    // 显示消息
    showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'geometry-message';
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
const geometryBoard = new GeometryBoard(); 