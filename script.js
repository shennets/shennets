// DOM elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const fiberCanvas = document.getElementById('fiberCanvas');
const speedGauge = document.getElementById('speedGauge');
const speedValue = document.getElementById('speedValue');
const faqItems = document.querySelectorAll('.faq-item');
const countdownTimer = document.getElementById('countdown');

// Navigation scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile navigation toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Fiber optic animation canvas
function initFiberAnimation() {
    const canvas = fiberCanvas;
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const fibers = [];
    const numFibers = 8;
    
    for (let i = 0; i < numFibers; i++) {
        fibers.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            length: Math.random() * 100 + 50,
            angle: Math.random() * Math.PI * 2
        });
    }
    
    function drawFiber(fiber) {
        const gradient = ctx.createLinearGradient(
            fiber.x, fiber.y,
            fiber.x + Math.cos(fiber.angle) * fiber.length,
            fiber.y + Math.sin(fiber.angle) * fiber.length
        );
        
        gradient.addColorStop(0, `rgba(255, 102, 0, 0)`);
        gradient.addColorStop(0.5, `rgba(255, 102, 0, ${fiber.opacity})`);
        gradient.addColorStop(1, `rgba(255, 0, 128, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(fiber.x, fiber.y);
        ctx.lineTo(
            fiber.x + Math.cos(fiber.angle) * fiber.length,
            fiber.y + Math.sin(fiber.angle) * fiber.length
        );
        ctx.stroke();
        
        // Add glow effect
        ctx.shadowColor = '#FF6600';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
    
    function updateFiber(fiber) {
        fiber.x += fiber.dx;
        fiber.y += fiber.dy;
        fiber.angle += 0.005;
        
        if (fiber.x < -fiber.length || fiber.x > canvas.width + fiber.length) {
            fiber.dx *= -1;
        }
        if (fiber.y < -fiber.length || fiber.y > canvas.height + fiber.length) {
            fiber.dy *= -1;
        }
        
        fiber.opacity += (Math.random() - 0.5) * 0.02;
        fiber.opacity = Math.max(0.1, Math.min(0.8, fiber.opacity));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fibers.forEach(fiber => {
            updateFiber(fiber);
            drawFiber(fiber);
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Speed gauge animation
function animateSpeedGauge() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let currentSpeed = 0;
                const targetSpeed = 10;
                const increment = targetSpeed / 100;
                
                const speedAnimation = setInterval(() => {
                    currentSpeed += increment;
                    speedValue.textContent = currentSpeed.toFixed(1);
                    
                    if (currentSpeed >= targetSpeed) {
                        clearInterval(speedAnimation);
                        speedValue.textContent = targetSpeed.toFixed(1);
                    }
                }, 30);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (speedGauge) {
        observer.observe(speedGauge);
    }
}

// FAQ accordion functionality
function initFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Countdown timer
function initCountdownTimer() {
    if (!countdownTimer) return;
    
    // Set target date (7 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Reset to 7 days from now
            targetDate.setTime(now + 7 * 24 * 60 * 60 * 1000);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const zipChecker = document.querySelector('.zip-input-container');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            if (email) {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                newsletterForm.reset();
            }
        });
    }
    
    if (zipChecker) {
        const zipButton = zipChecker.querySelector('.zip-button');
        const zipInput = zipChecker.querySelector('.zip-input');
        
        zipButton.addEventListener('click', () => {
            const zipCode = zipInput.value.trim();
            if (zipCode.length === 5 && /^\d+$/.test(zipCode)) {
                showNotification(`Great news! Service is available in ${zipCode}`, 'success');
            } else if (zipCode.length > 0) {
                showNotification('Please enter a valid 5-digit ZIP code', 'error');
            } else {
                showNotification('Please enter your ZIP code', 'error');
            }
        });
        
        zipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                zipButton.click();
            }
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#FF6600',
        color: 'white',
        borderRadius: '8px',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.package-card, .testimonial-card, .feature-card, .service-icon');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Button click effects
function initButtonEffects() {
    document.querySelectorAll('button, .cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease forwards;
    }
`;
document.head.appendChild(style);

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    initFiberAnimation();
    animateSpeedGauge();
    initFAQ();
    initCountdownTimer();
    initSmoothScrolling();
    initFormHandling();
    initScrollAnimations();
    initButtonEffects();
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('canvas').forEach(canvas => {
            canvas.style.animationPlayState = 'running';
        });
    }
});

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // Handle escape key for mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Handle tab navigation for dropdowns
    if (e.key === 'Tab') {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(document.activeElement)) {
                dropdown.querySelector('.dropdown-content').style.opacity = '0';
                dropdown.querySelector('.dropdown-content').style.visibility = 'hidden';
            }
        });
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Error handling for failed image loads
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Failed to load image:', this.src);
    });
});