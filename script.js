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
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 改变背景透明度
        if (scrollTop > 100) {
            header.style.background = 'rgba(102, 126, 234, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            header.style.backdropFilter = 'none';
        }
        
        // 隐藏/显示导航栏（向下滚动隐藏，向上滚动显示）
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// 表单处理
function initFormHandling() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 显示加载状态
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟发送过程
            setTimeout(() => {
                // 显示成功消息
                showNotification('感谢您的留言！我们会尽快回复您。', 'success');
                
                // 重置表单
                form.reset();
                
                // 恢复按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
        
        // 表单验证
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
}

// 字段验证
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // 移除之前的错误样式
    field.classList.remove('error');
    
    // 验证规则
    let isValid = true;
    
    if (field.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
    }
}

// 清除验证样式
function clearValidation(e) {
    e.target.classList.remove('error');
}

// 移动端菜单
function initMobileMenu() {
    // 创建移动端菜单按钮
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // 创建汉堡菜单按钮
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.setAttribute('aria-label', '菜单');
    
    // 添加样式
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    nav.appendChild(menuToggle);
    
    // 移动端显示菜单按钮
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    function handleMediaQuery(e) {
        if (e.matches) {
            menuToggle.style.display = 'block';
            navLinks.style.cssText = `
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(102, 126, 234, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                transform: translateY(-100%);
                transition: transform 0.3s ease;
                z-index: 999;
            `;
        } else {
            menuToggle.style.display = 'none';
            navLinks.style.cssText = '';
        }
    }
    
    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery);
    
    // 菜单切换功能
    menuToggle.addEventListener('click', function() {
        const isOpen = navLinks.style.transform === 'translateY(0px)';
        navLinks.style.transform = isOpen ? 'translateY(-100%)' : 'translateY(0px)';
        menuToggle.innerHTML = isOpen ? '☰' : '✕';
    });
    
    // 点击菜单项后关闭菜单
    navLinks.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            navLinks.style.transform = 'translateY(-100%)';
            menuToggle.innerHTML = '☰';
        }
    });
}

// 通知系统
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
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
        border-color: #ff6b6b !important;
        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2) !important;
    }
    
    .notification {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.9rem;
        line-height: 1.4;
    }
`;
document.head.appendChild(errorStyles);