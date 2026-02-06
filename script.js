// ============================================
// WAVELENGTH PSYCHOLOGY - ULTRA DYNAMIC JS
// Award-Winning Interactive Features
// ============================================

// Initialize AOS (Animate On Scroll) - Organic & Slow
AOS.init({
    duration: 1200,
    easing: 'ease-out-quart',
    once: true,
    offset: 50
});

// ============================================
// LOADING SCREEN
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 1200);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
});

// Smooth follower animation
function animateFollower() {
    const dx = mouseX - followerX;
    const dy = mouseY - followerY;

    followerX += dx * 0.1;
    followerY += dy * 0.1;

    cursorFollower.style.transform = `translate(${followerX - 4}px, ${followerY - 4}px)`;

    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
document.querySelectorAll('a, button, .magnetic-btn, .magnetic-element').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// PARTICLE CANVAS BACKGROUND
// ============================================
const particleCanvas = document.getElementById('particleCanvas');
if (particleCanvas) {
    const ctx = particleCanvas.getContext('2d');

    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
        constructor() {
            this.x = Math.random() * particleCanvas.width;
            this.y = Math.random() * particleCanvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > particleCanvas.width) this.x = 0;
            if (this.x < 0) this.x = particleCanvas.width;
            if (this.y > particleCanvas.height) this.y = 0;
            if (this.y < 0) this.y = particleCanvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(26, 159, 173, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections
        particles.forEach((a, i) => {
            particles.slice(i + 1).forEach(b => {
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = `rgba(26, 159, 173, ${0.15 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        particleCanvas.width = window.innerWidth;
        particleCanvas.height = window.innerHeight;
    });
}

// ============================================
// GRADIENT BLOB FOLLOWS MOUSE
// ============================================
const gradientBlob = document.getElementById('gradientBlob');
if (gradientBlob) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        gradientBlob.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    });
}

// ============================================
// TYPING ANIMATION
// ============================================
const typingText = document.getElementById('typingText');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let index = 0;

    setTimeout(() => {
        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100);
            }
        }
        type();
    }, 1500);
}

// ============================================
// ANIMATED COUNTERS
// ============================================
const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.dataset.count);
            let current = 0;
            const increment = target / 60;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    statNumber.textContent = target + (target === 100 ? '%' : '+');
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
                }
            }, 30);

            observeCounters.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    observeCounters.observe(stat);
});

// ============================================
// TILT CARD EFFECT (3D)
// ============================================
document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ============================================
// MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('.magnetic-btn, .magnetic-element').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
document.querySelectorAll('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ============================================
// METHODS TABS - INTERACTIVE
// ============================================
const methodTabs = document.querySelectorAll('.method-tab');
const methodPanels = document.querySelectorAll('.method-panel');

methodTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const method = tab.dataset.method;

        // Remove active from all
        methodTabs.forEach(t => t.classList.remove('active'));
        methodPanels.forEach(p => p.classList.remove('active'));

        // Add active to clicked
        tab.classList.add('active');
        document.getElementById(method).classList.add('active');
    });
});

// ============================================
// ACCORDION - ANIMATED
// ============================================
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Close all accordions
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked accordion if it wasn't active
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// NAVIGATION SCROLL EFFECTS
// ============================================
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================
const hero = document.querySelector('.hero');
const heroContent = document.querySelector('.hero-content');

if (hero && heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.8;
        }
    });
}

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonHTML = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));

            showFormMessage('success', 'Thank you! Your message has been sent. I\'ll respond within 24-48 hours.');
            contactForm.reset();

        } catch (error) {
            showFormMessage('error', 'Oops! Something went wrong. Please try emailing directly at dr.mallick@wavelengthpsychology.com');
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
        }
    });
}

function showFormMessage(type, message) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) existingMessage.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.style.cssText = `
        padding: 1rem 1.5rem;
        margin-top: 1rem;
        border-radius: 0.75rem;
        font-size: 0.9375rem;
        font-weight: 500;
        text-align: center;
        animation: fadeInUp 0.5s ease;
        ${type === 'success' ?
            'background: linear-gradient(135deg, #2ab4c3, #1a9fad); color: white;' :
            'background: #f2c49a; color: #8b4513;'}
    `;
    messageDiv.textContent = message;

    contactForm.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 6000);
}

// ============================================
// FORM INPUT ENHANCEMENTS
// ============================================
document.querySelectorAll('.animated-input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.checkValidity()) {
            this.style.borderColor = '#92a88f';
            this.style.background = 'rgba(146, 168, 143, 0.05)';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = '#2ab4c3';
        this.style.background = 'white';
    });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.style.color = '#1a9fad';
                navLink.style.fontWeight = '600';
            } else {
                navLink.style.color = '';
                navLink.style.fontWeight = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// HERO SCROLL INDICATOR
// ============================================
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    window.addEventListener('scroll', () => {
        heroScroll.style.opacity = window.pageYOffset > 100 ? '0' : '1';
    });
}

// ============================================
// LAZY LOAD IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c✨ Wavelength Psychology', 'font-size: 24px; font-weight: bold; color: #1a9fad;');
console.log('%cCreating spaces where healing happens through connection.', 'font-size: 14px; color: #6d7782; font-style: italic;');
console.log('%c🌊 Built with care', 'font-size: 12px; color: #e68a52;');

// ============================================
// REFRESH AOS ON DYNAMIC CONTENT
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        AOS.refresh();
    }, 500);
});
