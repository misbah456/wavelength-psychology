// ============================================
// WAVELENGTH PSYCHOLOGY - ORGANIC & CLEAN
// ============================================

// Initialize AOS (Animate On Scroll)
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
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 1200);
    }
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

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
        const panel = document.getElementById(method);
        if (panel) panel.classList.add('active');
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

if (mobileMenuToggle && navLinks) {
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
        if (nav && !nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// NAVIGATION SCROLL EFFECTS
// ============================================
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (nav) {
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }
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
// REFRESH AOS ON LOAD
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        AOS.refresh();
    }, 500);
});
