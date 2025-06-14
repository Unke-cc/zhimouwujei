// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    initSmoothScrolling();
    
    // 滚动动画
    initScrollAnimations();
    
    // 导航栏滚动效果
    initHeaderScrollEffect();
    
    // 表单处理
    initFormHandling();
    
    // 移动端菜单
    initMobileMenu();
});

// 平滑滚动
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .about-text, .about-image, .contact-form').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 导航栏滚动效果
function initHeaderScrollEffect() {
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    // 使用节流函数优化性能
    const throttledScrollHandler = throttle(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 使用CSS类控制样式变化，避免直接修改style属性
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // 隐藏/显示导航栏（向下滚动隐藏，向上滚动显示）
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    }, 16); // 约60fps
    
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
}

// 表单处理
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (!form || !submitBtn) return;
    
    // 表单验证器
    const formValidator = {
        rules: {
            required: (value) => value.trim() !== '',
            email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        
        validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            
            // 清除之前的错误样式
            field.classList.remove('error');
            
            // 必填验证
            if (field.hasAttribute('required') && !this.rules.required(value)) {
                isValid = false;
            }
            
            // 邮箱验证
            if (field.type === 'email' && value && !this.rules.email(value)) {
                isValid = false;
            }
            
            // 添加错误样式
            if (!isValid) {
                field.classList.add('error');
            }
            
            return isValid;
        },
        
        validateForm() {
            const fields = form.querySelectorAll('input[required], textarea[required]');
            return Array.from(fields).every(field => this.validateField(field));
        },
        
        clearValidation(field) {
            field.classList.remove('error');
        }
    };
    
    // 表单提交处理
    const formHandler = {
        async submit(e) {
            e.preventDefault();
            
            // 验证表单
            if (!formValidator.validateForm()) {
                showNotification('请检查表单中的错误信息', 'error');
                return;
            }
            
            // 显示加载状态
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            try {
                // 模拟发送过程
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // 显示成功消息
                showNotification('感谢您的留言！我们会尽快回复您。', 'success');
                
                // 重置表单
                form.reset();
                
            } catch (error) {
                showNotification('发送失败，请稍后重试', 'error');
            } finally {
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    };
    
    // 绑定事件
    form.addEventListener('submit', formHandler.submit);
    
    // 为所有输入字段添加验证
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', (e) => formValidator.validateField(e.target));
        input.addEventListener('input', (e) => formValidator.clearValidation(e.target));
    });
}

// 移动端菜单
function initMobileMenu() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    // 检查元素是否存在
    if (!nav || !navLinks || !menuToggle || !menuOverlay) {
        console.error('移动端菜单初始化失败：找不到必要的DOM元素');
        return;
    }
    
    // 菜单状态管理
    const menuState = {
        isOpen: false,
        
        open() {
            this.isOpen = true;
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            menuToggle.innerHTML = '✕';
            menuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        },
        
        close() {
            this.isOpen = false;
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            menuToggle.innerHTML = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        },
        
        toggle() {
            this.isOpen ? this.close() : this.open();
        }
    };
    
    // 事件监听器
    const eventHandlers = {
        // 菜单切换
        toggleMenu: () => menuState.toggle(),
        
        // 点击菜单项关闭
        clickMenuItem: (e) => {
            if (e.target.tagName === 'A') menuState.close();
        },
        
        // 点击遮罩层关闭
        clickOverlay: () => menuState.close(),
        
        // 点击外部关闭
        clickOutside: (e) => {
            if (menuState.isOpen && !nav.contains(e.target) && !menuOverlay.contains(e.target)) {
                menuState.close();
            }
        },
        
        // ESC键关闭
        keyDown: (e) => {
            if (e.key === 'Escape' && menuState.isOpen) {
                menuState.close();
                menuToggle.focus();
            }
        },
        
        // 窗口大小改变时关闭
        resize: () => {
            if (window.innerWidth > 768 && menuState.isOpen) {
                menuState.close();
            }
        }
    };
    
    // 绑定事件
    menuToggle.addEventListener('click', eventHandlers.toggleMenu);
    navLinks.addEventListener('click', eventHandlers.clickMenuItem);
    menuOverlay.addEventListener('click', eventHandlers.clickOverlay);
    document.addEventListener('click', eventHandlers.clickOutside);
    document.addEventListener('keydown', eventHandlers.keyDown);
    window.addEventListener('resize', eventHandlers.resize);
}

// 通知系统
function showNotification(message, type = 'info') {
    // 通知配置
    const notificationConfig = {
        success: { bg: '#34C759', icon: '✓' },
        error: { bg: '#FF3B30', icon: '✕' },
        info: { bg: '#007AFF', icon: 'ℹ' },
        warning: { bg: '#FF9500', icon: '⚠' }
    };
    
    const config = notificationConfig[type] || notificationConfig.info;
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${config.icon}</span>
        <span class="notification-message">${message}</span>
    `;
    
    // 应用样式
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: config.bg,
        color: 'white',
        padding: '12px 16px',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        maxWidth: '320px',
        wordWrap: 'break-word',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // 显示动画
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // 自动隐藏
    const hideTimeout = setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, type === 'error' ? 4000 : 3000); // 错误消息显示更长时间
    
    // 点击关闭
    notification.addEventListener('click', () => {
        clearTimeout(hideTimeout);
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    });
}

// 添加一些实用工具函数

// 节流函数
function throttle(func, wait) {
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

// 防抖函数
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// 检测设备类型
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 添加CSS错误样式
const errorStyles = document.createElement('style');
errorStyles.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: #FF3B30 !important;
        box-shadow: 0 0 0 2px rgba(255, 59, 48, 0.2) !important;
        background-color: rgba(255, 59, 48, 0.05) !important;
    }
    
    .form-group input.error:focus,
    .form-group textarea.error:focus {
        border-color: #FF3B30 !important;
        box-shadow: 0 0 0 3px rgba(255, 59, 48, 0.15) !important;
    }
`;
document.head.appendChild(errorStyles);