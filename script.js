/**
 * ==========================================================
 *   Object Detection Dataset - Advanced JavaScript
 * ==========================================================
 *   Website: https://rskworld.in
 *   Founder: Molla Samser
 *   Designer & Tester: Rima Khatun
 *   Email: help@rskworld.in
 *   © 2026 RSK World - All Rights Reserved
 * ==========================================================
 */

// Configuration
const CONFIG = {
    typewriterText: ['Object Detection', 'Dataset'],
    typewriterSpeed: 100,
    classNames: ['person', 'car', 'dog', 'cat', 'bicycle', 'motorcycle', 'bus', 'truck', 'bird', 'chair'],
    classColors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A8E6CF', '#DDA0DD', '#98D8C8', '#F7DC6F', '#85C1E9', '#F5B7B1', '#D7BDE2'],
    annotationCounts: [1200, 800, 450, 400, 350, 300, 250, 280, 350, 420],
    soundEnabled: true
};

// State
let state = {
    currentTheme: 'dark',
    soundEnabled: true,
    drawnBoxes: [],
    isDrawing: false,
    startX: 0,
    startY: 0,
    selectedClass: 0,
    demoPaused: false
};

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initScrollProgress();
    initTypewriter();
    initMobileMenu();
    initThemeToggle();
    initSoundToggle();
    initCodeTabs();
    initBackToTop();
    initSmoothScroll();
    initScrollAnimations();
    initCounters();
    initCharts();
    initPlayground();
    initClassFilter();
    initKeyboardShortcuts();
    initNeuralCanvas();
    initTooltips();
    initMagneticButtons();
    initParallax();
    initCopyButtons();
    initDownloadHandler();
    initNewsletterForm();
    initHeaderScroll();
    duplicateClassCards();
    
    console.log(`
%c🎯 Object Detection Dataset
%cby RSK World

Website: https://rskworld.in
Founder: Molla Samser
Designer & Tester: Rima Khatun
📧 help@rskworld.in | 📞 +91 93305 39277
`, 'color: #0EA5A5; font-size: 20px; font-weight: bold;', 'color: #94A3B8;');
});

// Preloader
function initPreloader() {
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2000);
    });
}

// Custom Cursor
function initCustomCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring) return;
    
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });
    
    function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();
    
    document.querySelectorAll('a, button, .btn, .preview-card, .class-card, .feature-card').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('hover'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
}

// Scroll Progress
function initScrollProgress() {
    const progress = document.getElementById('scrollProgress');
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}

// Typewriter Effect
function initTypewriter() {
    const element = document.getElementById('typewriter');
    if (!element) return;
    
    const texts = CONFIG.typewriterText;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }
        
        const speed = isDeleting ? 50 : CONFIG.typewriterSpeed;
        setTimeout(type, speed);
    }
    type();
}

// Mobile Menu
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        menu.classList.toggle('active');
        playSound('click');
    });
    
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

// Theme Toggle
function initThemeToggle() {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(btn, savedTheme);
    
    btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(btn, newTheme);
        showToast(`Switched to ${newTheme} mode`, 'info');
        playSound('click');
    });
}

function updateThemeIcon(btn, theme) {
    const icon = btn.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

// Sound Toggle
function initSoundToggle() {
    const btn = document.getElementById('soundToggle');
    if (!btn) return;
    
    const savedSound = localStorage.getItem('sound') !== 'false';
    state.soundEnabled = savedSound;
    updateSoundIcon(btn, savedSound);
    
    btn.addEventListener('click', () => {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('sound', state.soundEnabled);
        updateSoundIcon(btn, state.soundEnabled);
        showToast(`Sound ${state.soundEnabled ? 'enabled' : 'disabled'}`, 'info');
    });
}

function updateSoundIcon(btn, enabled) {
    const icon = btn.querySelector('i');
    icon.className = enabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
}

function playSound(type) {
    if (!state.soundEnabled) return;
    const audio = document.getElementById(type === 'click' ? 'clickSound' : 'successSound');
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

// Code Tabs
function initCodeTabs() {
    document.querySelectorAll('.code-tabs, .output-tabs').forEach(tabContainer => {
        const tabs = tabContainer.querySelectorAll('.code-tab, .output-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab || tab.dataset.format;
                const parent = tab.closest('section, .playground-output, .code-preview');
                
                parent.querySelectorAll('.code-tab, .output-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                parent.querySelectorAll('.code-block').forEach(block => block.classList.add('hidden'));
                const targetBlock = parent.querySelector(`#${tabType}-code`);
                if (targetBlock) targetBlock.classList.remove('hidden');
                
                if (tab.closest('.playground-output')) updatePlaygroundOutput();
                playSound('click');
            });
        });
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    
    const progressCircle = btn.querySelector('.progress-ring-circle');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollTop > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
        
        if (progressCircle) {
            const offset = 100 - scrollPercent;
            progressCircle.style.strokeDashoffset = offset;
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playSound('click');
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.feature-card, .preview-card, .class-card, .timeline-item, .stats-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    document.addEventListener('scroll', () => {
        document.querySelectorAll('.animate-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, stepTime);
}

// Charts
function initCharts() {
    initClassChart();
    initAnnotationChart();
}

function initClassChart() {
    const canvas = document.getElementById('classChart');
    if (!canvas) return;
    
    new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: CONFIG.classNames.map(n => n.charAt(0).toUpperCase() + n.slice(1)),
            datasets: [{
                data: CONFIG.annotationCounts,
                backgroundColor: CONFIG.classColors,
                borderColor: 'transparent',
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: { color: '#94A3B8', font: { size: 11 }, padding: 10, usePointStyle: true }
                }
            },
            cutout: '60%'
        }
    });
}

function initAnnotationChart() {
    const canvas = document.getElementById('annotationChart');
    if (!canvas) return;
    
    new Chart(canvas, {
        type: 'bar',
        data: {
            labels: CONFIG.classNames.map(n => n.charAt(0).toUpperCase() + n.slice(1)),
            datasets: [{
                label: 'Annotations',
                data: CONFIG.annotationCounts,
                backgroundColor: CONFIG.classColors.map(c => c + '80'),
                borderColor: CONFIG.classColors,
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B', font: { size: 10 } } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } }
            }
        }
    });
}

// Playground
function initPlayground() {
    const canvas = document.getElementById('playgroundCanvas');
    const classSelector = document.getElementById('classSelector');
    const clearBtn = document.getElementById('clearCanvas');
    const undoBtn = document.getElementById('undoAction');
    const copyBtn = document.getElementById('copyOutput');
    
    if (!canvas) return;
    
    classSelector?.addEventListener('change', (e) => {
        state.selectedClass = parseInt(e.target.value);
    });
    
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    clearBtn?.addEventListener('click', () => {
        state.drawnBoxes = [];
        updatePlaygroundCanvas();
        updatePlaygroundOutput();
        showToast('Canvas cleared', 'info');
    });
    
    undoBtn?.addEventListener('click', () => {
        if (state.drawnBoxes.length > 0) {
            state.drawnBoxes.pop();
            updatePlaygroundCanvas();
            updatePlaygroundOutput();
            showToast('Undone', 'info');
        }
    });
    
    copyBtn?.addEventListener('click', () => {
        const output = document.getElementById('outputCode');
        if (output) {
            navigator.clipboard.writeText(output.textContent).then(() => {
                showToast('Copied to clipboard!', 'success');
                playSound('success');
            });
        }
    });
    
    document.querySelectorAll('.tool-btn[data-tool]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tool-btn[data-tool]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function startDrawing(e) {
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    state.isDrawing = true;
    state.startX = e.clientX - rect.left;
    state.startY = e.clientY - rect.top;
    
    // Create temporary box
    const tempBox = document.createElement('div');
    tempBox.id = 'tempBox';
    tempBox.className = 'drawn-box temp';
    tempBox.style.cssText = `
        position: absolute;
        border: 2px dashed ${CONFIG.classColors[state.selectedClass]};
        background: ${CONFIG.classColors[state.selectedClass]}20;
        pointer-events: none;
    `;
    canvas.appendChild(tempBox);
}

function draw(e) {
    if (!state.isDrawing) return;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const tempBox = document.getElementById('tempBox');
    if (!tempBox) return;
    
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    
    const left = Math.min(state.startX, currentX);
    const top = Math.min(state.startY, currentY);
    const width = Math.abs(currentX - state.startX);
    const height = Math.abs(currentY - state.startY);
    
    tempBox.style.left = left + 'px';
    tempBox.style.top = top + 'px';
    tempBox.style.width = width + 'px';
    tempBox.style.height = height + 'px';
}

function stopDrawing(e) {
    if (!state.isDrawing) return;
    state.isDrawing = false;
    
    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const tempBox = document.getElementById('tempBox');
    
    if (tempBox) {
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        const left = Math.min(state.startX, currentX);
        const top = Math.min(state.startY, currentY);
        const width = Math.abs(currentX - state.startX);
        const height = Math.abs(currentY - state.startY);
        
        if (width > 10 && height > 10) {
            state.drawnBoxes.push({
                classId: state.selectedClass,
                x: left / rect.width,
                y: top / rect.height,
                w: width / rect.width,
                h: height / rect.height
            });
            updatePlaygroundCanvas();
            updatePlaygroundOutput();
            playSound('click');
        }
        
        tempBox.remove();
    }
}

function updatePlaygroundCanvas() {
    const canvas = document.getElementById('playgroundCanvas');
    if (!canvas) return;
    
    canvas.querySelectorAll('.drawn-box:not(.temp)').forEach(box => box.remove());
    
    state.drawnBoxes.forEach((box, i) => {
        const el = document.createElement('div');
        el.className = 'drawn-box';
        el.style.cssText = `
            position: absolute;
            left: ${box.x * 100}%;
            top: ${box.y * 100}%;
            width: ${box.w * 100}%;
            height: ${box.h * 100}%;
            border: 2px solid ${CONFIG.classColors[box.classId]};
            background: ${CONFIG.classColors[box.classId]}20;
            border-radius: 4px;
        `;
        
        const label = document.createElement('span');
        label.style.cssText = `
            position: absolute;
            top: -24px;
            left: -2px;
            padding: 2px 8px;
            background: ${CONFIG.classColors[box.classId]};
            color: white;
            font-size: 11px;
            font-weight: 600;
            border-radius: 4px;
            white-space: nowrap;
        `;
        label.textContent = CONFIG.classNames[box.classId];
        el.appendChild(label);
        canvas.appendChild(el);
    });
    
    const boxCount = document.getElementById('boxCount');
    if (boxCount) boxCount.textContent = state.drawnBoxes.length;
}

function updatePlaygroundOutput() {
    const output = document.getElementById('outputCode');
    if (!output) return;
    
    const activeTab = document.querySelector('.output-tab.active');
    const format = activeTab?.dataset.format || 'yolo';
    
    if (state.drawnBoxes.length === 0) {
        output.innerHTML = '<code># Draw boxes to see annotations here\n# Format: class_id x_center y_center width height</code>';
        return;
    }
    
    let code = '';
    
    if (format === 'yolo') {
        code = '# YOLO Format (normalized)\n';
        state.drawnBoxes.forEach(box => {
            const xCenter = (box.x + box.w / 2).toFixed(6);
            const yCenter = (box.y + box.h / 2).toFixed(6);
            code += `${box.classId} ${xCenter} ${yCenter} ${box.w.toFixed(6)} ${box.h.toFixed(6)}\n`;
        });
    } else if (format === 'coco') {
        const annotations = state.drawnBoxes.map((box, i) => ({
            id: i + 1,
            category_id: box.classId,
            bbox: [Math.round(box.x * 640), Math.round(box.y * 480), Math.round(box.w * 640), Math.round(box.h * 480)]
        }));
        code = JSON.stringify({ annotations }, null, 2);
    } else if (format === 'pascal') {
        code = '<?xml version="1.0"?>\n<annotation>\n';
        state.drawnBoxes.forEach(box => {
            code += `  <object>\n    <name>${CONFIG.classNames[box.classId]}</name>\n`;
            code += `    <bndbox>\n      <xmin>${Math.round(box.x * 640)}</xmin>\n`;
            code += `      <ymin>${Math.round(box.y * 480)}</ymin>\n`;
            code += `      <xmax>${Math.round((box.x + box.w) * 640)}</xmax>\n`;
            code += `      <ymax>${Math.round((box.y + box.h) * 480)}</ymax>\n    </bndbox>\n  </object>\n`;
        });
        code += '</annotation>';
    }
    
    output.innerHTML = `<code>${code}</code>`;
}

// Class Filter
function initClassFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.preview-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.class === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            playSound('click');
        });
    });
}

// Keyboard Shortcuts
function initKeyboardShortcuts() {
    const modal = document.getElementById('shortcutsModal');
    const closeBtn = document.getElementById('closeModal');
    
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key.toLowerCase()) {
            case 'd':
                document.getElementById('downloadBtn')?.click();
                break;
            case 't':
                document.getElementById('themeToggle')?.click();
                break;
            case 's':
                document.getElementById('statistics')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'p':
                document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'm':
                document.getElementById('soundToggle')?.click();
                break;
            case 'arrowup':
                if (e.ctrlKey) window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case '?':
                modal?.classList.add('active');
                break;
            case 'escape':
                modal?.classList.remove('active');
                document.getElementById('lightbox')?.classList.remove('active');
                break;
        }
    });
    
    closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
}

// Neural Network Canvas
function initNeuralCanvas() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(14, 165, 165, 0.5)';
            ctx.fill();
            
            // Draw connections
            particles.slice(i + 1).forEach(p2 => {
                const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(14, 165, 165, ${0.2 * (1 - dist / 150)})`;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Tooltips
function initTooltips() {
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.dataset.tooltip;
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0,0,0,0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                z-index: 9999;
                pointer-events: none;
            `;
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.bottom + 10 + 'px';
        });
        
        el.addEventListener('mouseleave', () => {
            document.querySelectorAll('.tooltip').forEach(t => t.remove());
        });
    });
}

// Magnetic Buttons
function initMagneticButtons() {
    document.querySelectorAll('.magnetic').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// Parallax
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.shape').forEach((shape, i) => {
            const speed = 0.05 * (i + 1);
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });
}

// Copy Buttons
function initCopyButtons() {
    document.getElementById('copyCodeBtn')?.addEventListener('click', () => {
        const activeBlock = document.querySelector('.code-block:not(.hidden)');
        if (activeBlock) {
            navigator.clipboard.writeText(activeBlock.textContent).then(() => {
                showToast('Code copied!', 'success');
                playSound('success');
            });
        }
    });
    
    document.querySelectorAll('.snippet-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.dataset.code;
            navigator.clipboard.writeText(code).then(() => {
                showToast('Command copied!', 'success');
                playSound('success');
            });
        });
    });
}

// Download Handler
function initDownloadHandler() {
    const downloadBtns = document.querySelectorAll('#downloadBtn, #mainDownloadBtn');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            showToast('Download started!', 'success');
            playSound('success');
            createConfetti();
        });
    });
}

// Newsletter Form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input').value;
        if (email) {
            showToast('Thanks for subscribing!', 'success');
            form.reset();
            playSound('success');
        }
    });
}

// Header Scroll
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Duplicate Class Cards for infinite scroll
function duplicateClassCards() {
    const track = document.getElementById('classesTrack');
    if (!track) return;
    track.innerHTML += track.innerHTML;
}

// Toast Notifications
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i><span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Confetti
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = CONFIG.classColors;
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            left: ${Math.random() * 100}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            animation-delay: ${Math.random() * 0.5}s;
            animation-duration: ${2 + Math.random() * 2}s;
        `;
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}
