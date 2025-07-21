// 语音识别工具 - 现代化升级版

class SpeechRecognitionTool {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
        this.currentInput = null;
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.dataArray = null;
        this.visualizationCanvas = null;
        this.visualizationCtx = null;
        
        this.init();
    }
    
    init() {
        if (this.isSupported) {
            this.setupSpeechRecognition();
            this.setupAudioVisualization();
            console.log('语音识别工具初始化完成');
        } else {
            console.warn('浏览器不支持语音识别功能');
        }
    }
    
    setupSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // 配置语音识别参数
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'zh-CN';
        this.recognition.maxAlternatives = 1;
        
        // 绑定事件处理器
        this.recognition.onstart = () => this.onRecognitionStart();
        this.recognition.onresult = (event) => this.onRecognitionResult(event);
        this.recognition.onerror = (event) => this.onRecognitionError(event);
        this.recognition.onend = () => this.onRecognitionEnd();
    }
    
    setupAudioVisualization() {
        // 创建音频可视化画布
        this.visualizationCanvas = document.createElement('canvas');
        this.visualizationCanvas.width = 200;
        this.visualizationCanvas.height = 60;
        this.visualizationCanvas.style.cssText = `
            border-radius: var(--radius-md);
            background: var(--gray-800);
            display: none;
            margin-top: var(--spacing-sm);
        `;
        
        this.visualizationCtx = this.visualizationCanvas.getContext('2d');
    }
    
    // 开始语音识别
    startRecognition(inputElement) {
        if (!this.isSupported) {
            this.showNotification('您的浏览器不支持语音识别功能', 'error');
            return;
        }
        
        if (this.isListening) {
            this.stopRecognition();
            return;
        }
        
        this.currentInput = inputElement;
        
        // 请求麦克风权限
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.setupAudioAnalysis(stream);
                this.recognition.start();
                this.showNotification('正在听取您的语音...', 'info');
            })
            .catch(error => {
                console.error('麦克风权限被拒绝:', error);
                this.showNotification('需要麦克风权限才能使用语音识别', 'error');
            });
    }
    
    setupAudioAnalysis(stream) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        
        this.microphone.connect(this.analyser);
        
        // 显示可视化画布
        if (this.currentInput && this.currentInput.parentNode) {
            this.currentInput.parentNode.appendChild(this.visualizationCanvas);
            this.visualizationCanvas.style.display = 'block';
        }
        
        this.drawVisualization();
    }
    
    drawVisualization() {
        if (!this.isListening) return;
        
        const draw = () => {
            if (!this.isListening) return;
            
            requestAnimationFrame(draw);
            
            this.analyser.getByteFrequencyData(this.dataArray);
            
            this.visualizationCtx.fillStyle = 'var(--gray-800)';
            this.visualizationCtx.fillRect(0, 0, this.visualizationCanvas.width, this.visualizationCanvas.height);
            
            const barWidth = (this.visualizationCanvas.width / this.bufferLength) * 2.5;
            let barHeight;
            let x = 0;
            
            for (let i = 0; i < this.bufferLength; i++) {
                barHeight = this.dataArray[i] / 2;
                
                // 创建渐变效果
                const gradient = this.visualizationCtx.createLinearGradient(0, 0, 0, this.visualizationCanvas.height);
                gradient.addColorStop(0, 'var(--primary-color)');
                gradient.addColorStop(1, 'var(--secondary-color)');
                
                this.visualizationCtx.fillStyle = gradient;
                this.visualizationCtx.fillRect(x, this.visualizationCanvas.height - barHeight, barWidth, barHeight);
                
                x += barWidth + 1;
            }
        };
        
        draw();
    }
    
    onRecognitionStart() {
        this.isListening = true;
        this.updateButtonState(true);
        this.showNotification('开始听取语音...', 'info');
        
        // 添加脉冲动画效果
        if (this.currentInput) {
            this.currentInput.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.3)';
            this.addPulseAnimation(this.currentInput);
        }
    }
    
    onRecognitionResult(event) {
        let finalTranscript = '';
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        
        // 更新输入框内容
        if (this.currentInput) {
            if (finalTranscript) {
                this.currentInput.value = finalTranscript;
                this.currentInput.dispatchEvent(new Event('input', { bubbles: true }));
            } else if (interimTranscript) {
                // 显示临时结果
                this.showInterimResult(interimTranscript);
            }
        }
    }
    
    onRecognitionError(event) {
        console.error('语音识别错误:', event.error);
        this.isListening = false;
        this.updateButtonState(false);
        this.cleanupAudio();
        
        let errorMessage = '语音识别出现错误';
        switch (event.error) {
            case 'no-speech':
                errorMessage = '没有检测到语音，请重试';
                break;
            case 'audio-capture':
                errorMessage = '无法访问麦克风';
                break;
            case 'not-allowed':
                errorMessage = '麦克风权限被拒绝';
                break;
            case 'network':
                errorMessage = '网络连接错误';
                break;
            default:
                errorMessage = '语音识别失败，请重试';
        }
        
        this.showNotification(errorMessage, 'error');
    }
    
    onRecognitionEnd() {
        this.isListening = false;
        this.updateButtonState(false);
        this.cleanupAudio();
        
        if (this.currentInput) {
            this.currentInput.style.boxShadow = '';
            this.removePulseAnimation(this.currentInput);
        }
        
        this.showNotification('语音识别结束', 'success');
    }
    
    stopRecognition() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
        }
    }
    
    updateButtonState(isListening) {
        const buttons = document.querySelectorAll('.speech-btn');
        buttons.forEach(btn => {
            if (isListening) {
                btn.innerHTML = '<i class="fas fa-stop"></i>';
                btn.style.background = 'linear-gradient(135deg, var(--error-color), #e53e3e)';
                btn.style.animation = 'pulse 1s infinite';
            } else {
                btn.innerHTML = '<i class="fas fa-microphone"></i>';
                btn.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
                btn.style.animation = '';
            }
        });
    }
    
    cleanupAudio() {
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        if (this.visualizationCanvas) {
            this.visualizationCanvas.style.display = 'none';
        }
        
        this.analyser = null;
        this.microphone = null;
        this.dataArray = null;
    }
    
    showInterimResult(text) {
        // 创建临时结果显示
        let interimDisplay = this.currentInput.parentNode.querySelector('.interim-result');
        if (!interimDisplay) {
            interimDisplay = document.createElement('div');
            interimDisplay.className = 'interim-result';
            interimDisplay.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--primary-light);
                color: var(--primary-dark);
                padding: var(--spacing-sm);
                border-radius: var(--radius-md);
                font-size: var(--font-size-sm);
                z-index: 10;
                margin-top: var(--spacing-xs);
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            `;
            this.currentInput.parentNode.style.position = 'relative';
            this.currentInput.parentNode.appendChild(interimDisplay);
        }
        
        interimDisplay.textContent = `正在听取: ${text}`;
        interimDisplay.style.opacity = '1';
        interimDisplay.style.transform = 'translateY(0)';
    }
    
    hideInterimResult() {
        const interimDisplay = this.currentInput?.parentNode.querySelector('.interim-result');
        if (interimDisplay) {
            interimDisplay.style.opacity = '0';
            interimDisplay.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (interimDisplay.parentNode) {
                    interimDisplay.parentNode.removeChild(interimDisplay);
                }
            }, 300);
        }
    }
    
    addPulseAnimation(element) {
        element.style.animation = 'pulse 1s infinite';
    }
    
    removePulseAnimation(element) {
        element.style.animation = '';
    }
    
    showNotification(message, type = 'info') {
        if (window.LearningPlatform && window.LearningPlatform.showNotification) {
            window.LearningPlatform.showNotification(message, type);
        } else {
            // 备用通知方法
            const notification = document.createElement('div');
            notification.className = `speech-notification speech-notification-${type}`;
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
                font-size: var(--font-size-sm);
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
    }
    
    // 创建语音按钮
    createSpeechButton(inputElement) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'speech-btn';
        button.innerHTML = '<i class="fas fa-microphone"></i>';
        button.title = '点击开始语音输入';
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.startRecognition(inputElement);
        });
        
        // 添加按钮悬停效果
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        return button;
    }
    
    // 为输入框添加语音功能
    addSpeechToInput(inputElement) {
        if (!inputElement) return;
        
        // 检查是否已经添加了语音按钮
        if (inputElement.parentNode.querySelector('.speech-btn')) {
            return;
        }
        
        // 创建语音按钮
        const speechButton = this.createSpeechButton(inputElement);
        
        // 将按钮添加到输入框旁边
        const wrapper = document.createElement('div');
        wrapper.style.cssText = `
            position: relative;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        `;
        
        inputElement.parentNode.insertBefore(wrapper, inputElement);
        wrapper.appendChild(inputElement);
        wrapper.appendChild(speechButton);
        
        // 添加输入框焦点效果
        inputElement.addEventListener('focus', () => {
            speechButton.style.opacity = '1';
            speechButton.style.transform = 'scale(1)';
        });
        
        inputElement.addEventListener('blur', () => {
            if (!this.isListening) {
                speechButton.style.opacity = '0.7';
                speechButton.style.transform = 'scale(0.9)';
            }
        });
    }
    
    // 批量添加语音功能到所有输入框
    addSpeechToAllInputs() {
        const inputs = document.querySelectorAll('input[type="text"], input[type="number"], textarea');
        inputs.forEach(input => {
            this.addSpeechToInput(input);
        });
    }
    
    // 销毁实例
    destroy() {
        this.stopRecognition();
        this.cleanupAudio();
        this.isListening = false;
        this.currentInput = null;
    }
}

// 创建全局实例
const speechRecognition = new SpeechRecognitionTool();

// 页面加载完成后自动添加语音功能
document.addEventListener('DOMContentLoaded', () => {
    // 延迟添加语音功能，确保所有输入框都已加载
    setTimeout(() => {
        speechRecognition.addSpeechToAllInputs();
    }, 1000);
    
    // 监听动态添加的元素
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // 元素节点
                    const inputs = node.querySelectorAll ? node.querySelectorAll('input[type="text"], input[type="number"], textarea') : [];
                    inputs.forEach(input => {
                        speechRecognition.addSpeechToInput(input);
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// 导出供其他模块使用
window.SpeechRecognitionTool = SpeechRecognitionTool;
window.speechRecognition = speechRecognition;

console.log('语音识别工具加载完成'); 