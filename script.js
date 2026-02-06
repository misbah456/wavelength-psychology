// ============================================
// WAVELENGTH PSYCHOLOGY - INTERACTIVE JS
// Advanced Micro-interactions & Animations
// ============================================

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

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
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
const scrollThreshold = 50;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class for styling
    if (currentScroll > scrollThreshold) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// SMOOTH SCROLL WITH OFFSET
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#"
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            const offset = 80; // Height of fixed nav
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - FADE IN ON SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            // Optional: unobserve after animation
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const fadeElements = document.querySelectorAll('.help-card, .approach-card, .timeline-item, .meet-content, .meet-sidebar');
fadeElements.forEach(el => {
    fadeInObserver.observe(el);
});

// ============================================
// WAVE ANIMATION
// ============================================
const waveAnimation = document.querySelector('.wave-animation');
if (waveAnimation) {
    const wavePaths = waveAnimation.querySelectorAll('.wave-path');

    wavePaths.forEach((path, index) => {
        // Animate wave paths
        let offset = 0;
        const speed = 0.5 + (index * 0.2);

        function animateWave() {
            offset += speed;
            path.style.transform = `translateX(${offset % 100}px)`;
            requestAnimationFrame(animateWave);
        }

        animateWave();
    });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonHTML = submitButton.innerHTML;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending...</span>';

        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual backend)
        try {
            // TODO: Replace with actual form handling service
            // Options: Formspree, Netlify Forms, Cloudflare Workers, etc.

            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showFormMessage('success', 'Thank you! Your message has been sent. I\'ll respond within 24-48 hours.');
            contactForm.reset();

        } catch (error) {
            // Show error message
            showFormMessage('error', 'Oops! Something went wrong. Please try emailing directly at dr.mallick@wavelengthpsychology.com');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
        }
    });
}

function showFormMessage(type, message) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

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

    // Remove message after 6 seconds
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(-10px)';
        setTimeout(() => messageDiv.remove(), 300);
    }, 6000);
}

// ============================================
// FORM VALIDATION ENHANCEMENTS
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');

formInputs.forEach(input => {
    // Show success state on valid input
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '' && this.checkValidity()) {
            this.style.borderColor = '#92a88f';
            this.style.background = 'rgba(146, 168, 143, 0.05)';
        }
    });

    // Reset border on focus
    input.addEventListener('focus', function() {
        this.style.borderColor = '#2ab4c3';
        this.style.background = 'white';
    });

    // Real-time validation
    input.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = '#c7cfd8';
        }
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
// TIMELINE ANIMATION
// ============================================
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    timelineObserver.observe(item);
});

// ============================================
// HERO SCROLL INDICATOR
// ============================================
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    // Hide scroll indicator after scrolling
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            heroScroll.style.opacity = '0';
        } else {
            heroScroll.style.opacity = '1';
        }
    });

    // Animate scroll indicator
    heroScroll.style.animation = 'fadeInUp 1s ease 1s both, bounce 2s ease-in-out 2s infinite';
}

// Add bounce animation
const style = document.createElement('style');
style.textContent = `
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }

    .hero-scroll {
        position: absolute;
        bottom: 40px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        opacity: 1;
    }

    .hero-scroll:hover {
        color: var(--teal-700);
        transform: translateX(-50%) translateY(5px);
    }

    .hero-scroll svg {
        opacity: 0.6;
    }

    .hero-badge {
        display: inline-block;
        padding: 0.5rem 1.25rem;
        background: rgba(255, 255, 255, 0.9);
        border: 1px solid var(--teal-200);
        border-radius: 50px;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--teal-800);
        margin-bottom: 1.5rem;
        letter-spacing: 0.02em;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 8px rgba(26, 159, 173, 0.1);
    }

    .title-line {
        display: block;
    }

    .title-line.highlight {
        background: linear-gradient(135deg, var(--teal-700), var(--terracotta-600));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .hero-grain {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.03;
        z-index: 0;
        pointer-events: none;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
    }

    .btn svg {
        margin-left: 0.5rem;
        transition: transform 0.3s ease;
    }

    .btn:hover svg {
        transform: translateX(5px);
    }

    .btn-full {
        width: 100%;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 640px) {
        .form-row {
            grid-template-columns: 1fr;
        }
    }

    .philosophy-banner {
        padding: 3rem 1.5rem;
        background: linear-gradient(135deg, var(--teal-700), var(--teal-800));
        color: white;
        text-align: center;
    }

    .banner-text {
        font-family: 'Cormorant Garamond', serif;
        font-size: clamp(1.25rem, 3vw, 1.75rem);
        font-style: italic;
        max-width: 900px;
        margin: 0 auto;
        line-height: 1.7;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 400;
    }

    .logo-wave {
        font-size: 1.75rem;
        margin-right: 0.25rem;
        display: inline-block;
        color: var(--teal-600);
        animation: wave-wiggle 3s ease-in-out infinite;
    }

    @keyframes wave-wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-10deg); }
        75% { transform: rotate(10deg); }
    }

    .meet-section {
        padding: var(--space-4xl) 0;
        background: var(--surface);
    }

    .meet-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-3xl);
        align-items: start;
    }

    @media (min-width: 1024px) {
        .meet-grid {
            grid-template-columns: 1.3fr 1fr;
        }
    }

    .meet-content {
        order: 2;
    }

    .meet-image-container {
        order: 1;
        position: relative;
    }

    @media (min-width: 1024px) {
        .meet-content {
            order: 1;
        }

        .meet-image-container {
            order: 2;
        }
    }

    .profile-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .image-decoration {
        position: absolute;
        inset: -8px;
        background: linear-gradient(135deg, var(--teal-400), var(--terracotta-400));
        border-radius: var(--radius-2xl);
        z-index: -1;
        opacity: 0.3;
    }

    .intro-text {
        margin-bottom: var(--space-lg);
    }

    .lead {
        font-size: var(--text-xl);
        font-weight: 400;
        color: var(--text-primary);
        line-height: 1.7;
    }

    .approach-highlight {
        background: linear-gradient(135deg, var(--teal-100), var(--cream-200));
        padding: var(--space-xl);
        border-radius: var(--radius-xl);
        margin: var(--space-xl) 0;
        border-left: 4px solid var(--teal-600);
    }

    .approach-highlight h3 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-sm);
        color: var(--teal-800);
    }

    .credentials-compact {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-md);
        margin-top: var(--space-xl);
    }

    @media (min-width: 640px) {
        .credentials-compact {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .cred-item {
        padding: var(--space-md);
        background: var(--cream-100);
        border-radius: var(--radius-lg);
    }

    .cred-item strong {
        display: block;
        font-size: var(--text-sm);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--terracotta-600);
        margin-bottom: 0.5rem;
    }

    .cred-item p {
        font-size: var(--text-sm);
        line-height: 1.6;
        color: var(--text-secondary);
    }

    .fact-item {
        display: flex;
        align-items: center;
        gap: var(--space-sm);
        padding: var(--space-xs) 0;
    }

    .fact-item svg {
        color: var(--terracotta-500);
        flex-shrink: 0;
    }

    .fact-item span {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        line-height: 1.5;
    }

    .help-categories {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-xl);
        margin-bottom: var(--space-3xl);
    }

    @media (min-width: 768px) {
        .help-categories {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .help-categories {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .help-card.featured {
        border: 2px solid var(--teal-300);
        background: linear-gradient(135deg, var(--surface), var(--teal-50));
    }

    .card-icon {
        color: var(--teal-600);
        margin-bottom: var(--space-md);
    }

    .card-question {
        font-style: italic;
        color: var(--teal-700);
        margin-bottom: var(--space-md);
        font-size: var(--text-base);
    }

    .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-xs);
        margin-top: var(--space-md);
    }

    .card-tags span {
        display: inline-block;
        padding: 0.35rem 0.85rem;
        font-size: var(--text-xs);
        font-weight: 500;
        background: var(--teal-100);
        color: var(--teal-800);
        border-radius: var(--radius-full);
        transition: all 0.2s ease;
    }

    .help-card:hover .card-tags span {
        background: var(--teal-600);
        color: white;
    }

    .demographics {
        text-align: center;
        padding: var(--space-xl);
        background: var(--cream-100);
        border-radius: var(--radius-2xl);
    }

    .demographics h3 {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-lg);
        color: var(--text-primary);
    }

    .demo-grid {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-sm);
        justify-content: center;
    }

    .demo-item {
        padding: 0.5rem 1.25rem;
        background: var(--surface);
        border: 2px solid var(--teal-200);
        border-radius: var(--radius-full);
        font-size: var(--text-sm);
        font-weight: 500;
        color: var(--teal-800);
        transition: all 0.2s ease;
    }

    .demo-item:hover {
        background: var(--teal-600);
        color: white;
        border-color: var(--teal-600);
        transform: translateY(-2px);
    }

    .approach-section {
        padding: var(--space-4xl) 0;
        background: linear-gradient(180deg, var(--surface), var(--cream-100));
    }

    .section-header.centered {
        text-align: center;
    }

    .methods-section {
        margin-top: var(--space-3xl);
        padding: var(--space-2xl);
        background: var(--surface);
        border-radius: var(--radius-2xl);
        border: 2px solid var(--teal-100);
    }

    .methods-section h3 {
        text-align: center;
        font-size: var(--text-2xl);
        margin-bottom: var(--space-xl);
        color: var(--text-primary);
    }

    .methods-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    @media (min-width: 640px) {
        .methods-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .methods-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .method-item {
        display: flex;
        align-items: center;
        gap: var(--space-md);
        padding: var(--space-md);
        background: var(--cream-100);
        border-radius: var(--radius-lg);
        transition: all 0.3s ease;
    }

    .method-item:hover {
        background: var(--teal-100);
        transform: translateX(5px);
    }

    .method-item svg {
        color: var(--teal-600);
        flex-shrink: 0;
    }

    .method-item h4 {
        font-size: var(--text-base);
        color: var(--text-primary);
        font-weight: 500;
    }

    .expect-section {
        margin-top: var(--space-3xl);
        padding: var(--space-2xl);
        background: linear-gradient(135deg, var(--teal-700), var(--teal-800));
        border-radius: var(--radius-2xl);
        color: white;
    }

    .expect-section h3 {
        font-size: var(--text-3xl);
        color: white;
        text-align: center;
        margin-bottom: var(--space-md);
    }

    .expect-intro {
        text-align: center;
        font-size: var(--text-lg);
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: var(--space-xl);
    }

    .expect-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    .expect-item {
        display: flex;
        gap: var(--space-md);
        align-items: start;
    }

    .expect-item .check {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        color: var(--terracotta-300);
    }

    .expect-item p {
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.7;
        font-size: var(--text-base);
    }

    .journey-section {
        padding: var(--space-4xl) 0;
        background: linear-gradient(180deg, var(--cream-100), var(--teal-50));
    }

    .journey-timeline {
        max-width: 900px;
        margin: var(--space-3xl) auto;
        position: relative;
    }

    .journey-timeline::before {
        content: '';
        position: absolute;
        left: 50%;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(180deg, transparent, var(--teal-400) 10%, var(--teal-400) 90%, transparent);
        transform: translateX(-50%);
    }

    @media (max-width: 768px) {
        .journey-timeline::before {
            left: 30px;
        }
    }

    .timeline-marker {
        position: absolute;
        left: 50%;
        top: 30px;
        width: 20px;
        height: 20px;
        background: var(--surface);
        border: 4px solid var(--teal-600);
        border-radius: 50%;
        transform: translateX(-50%);
        z-index: 10;
        box-shadow: 0 0 0 8px rgba(26, 159, 173, 0.1);
        transition: all 0.3s ease;
    }

    @media (max-width: 768px) {
        .timeline-marker {
            left: 30px;
        }
    }

    .timeline-item:hover .timeline-marker {
        background: var(--teal-600);
        transform: translateX(-50%) scale(1.3);
        box-shadow: 0 0 0 12px rgba(26, 159, 173, 0.15);
    }

    .timeline-content {
        background: var(--surface);
        padding: var(--space-xl);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-md);
        transition: all 0.3s ease;
    }

    .timeline-content:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-xl);
    }

    .timeline-content h4 {
        font-size: var(--text-xl);
        color: var(--teal-800);
        margin-bottom: 0.5rem;
    }

    .timeline-content p {
        font-size: var(--text-base);
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }

    .timeline-content span {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        font-weight: 400;
    }

    .journey-quote {
        margin-top: var(--space-3xl);
        text-align: center;
        padding: var(--space-2xl);
        background: var(--surface);
        border-radius: var(--radius-2xl);
        border-left: 4px solid var(--terracotta-500);
    }

    .journey-quote p {
        font-family: 'Cormorant Garamond', serif;
        font-size: var(--text-2xl);
        font-style: italic;
        color: var(--text-primary);
        line-height: 1.6;
    }

    .practical-info {
        padding: var(--space-4xl) 0;
        background: var(--cream-100);
    }

    .practical-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-lg);
    }

    @media (min-width: 768px) {
        .practical-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .practical-card {
        background: var(--surface);
        padding: var(--space-xl);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-sm);
        border: 2px solid var(--teal-100);
    }

    .practical-card h3 {
        font-size: var(--text-xl);
        margin-bottom: var(--space-md);
        color: var(--teal-800);
    }

    .practical-card ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: var(--space-xs);
    }

    .practical-card li {
        padding-left: var(--space-md);
        position: relative;
        font-size: var(--text-base);
        color: var(--text-secondary);
    }

    .practical-card li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: var(--teal-600);
        font-weight: 700;
    }

    .practical-card p {
        font-size: var(--text-base);
        color: var(--text-secondary);
        margin-bottom: var(--space-sm);
    }

    .practical-card strong {
        color: var(--teal-700);
    }

    .connect-section {
        padding: var(--space-4xl) 0;
        background: var(--surface);
    }

    .connect-header {
        text-align: center;
        margin-bottom: var(--space-3xl);
    }

    .connect-header h2 {
        margin-bottom: var(--space-md);
    }

    .connect-intro {
        font-size: var(--text-xl);
        max-width: 800px;
        margin: 0 auto;
        color: var(--text-secondary);
        line-height: 1.7;
    }

    .connect-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-3xl);
    }

    @media (min-width: 1024px) {
        .connect-grid {
            grid-template-columns: 1fr 1.3fr;
        }
    }

    .contact-methods {
        display: flex;
        flex-direction: column;
        gap: var(--space-lg);
        margin-bottom: var(--space-xl);
    }

    .contact-method {
        display: flex;
        gap: var(--space-md);
        align-items: start;
    }

    .method-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, var(--teal-500), var(--teal-600));
        border-radius: var(--radius-lg);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        flex-shrink: 0;
        box-shadow: var(--shadow-md);
    }

    .contact-method h4 {
        font-size: var(--text-lg);
        margin-bottom: 0.25rem;
        color: var(--text-primary);
    }

    .contact-method a {
        color: var(--teal-700);
        font-weight: 500;
        transition: color 0.2s ease;
    }

    .contact-method a:hover {
        color: var(--teal-900);
    }

    .contact-method p {
        font-size: var(--text-base);
        color: var(--text-secondary);
        margin: 0;
    }

    .contact-method .small {
        font-size: var(--text-sm);
        color: var(--text-tertiary);
    }

    .crisis-info {
        padding: var(--space-md);
        background: var(--terracotta-100);
        border-radius: var(--radius-lg);
        border-left: 4px solid var(--terracotta-600);
    }

    .crisis-info p {
        font-size: var(--text-sm);
        color: var(--text-secondary);
        margin: 0;
    }

    .crisis-info strong {
        color: var(--terracotta-800);
    }

    .crisis-info a {
        color: var(--terracotta-700);
        font-weight: 600;
    }

    .connect-form-container {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px) saturate(180%);
        border-radius: var(--radius-2xl);
        padding: var(--space-2xl);
        box-shadow: var(--shadow-xl);
        border: 1px solid rgba(255, 255, 255, 0.5);
    }

    .connect-form h3 {
        font-size: var(--text-2xl);
        margin-bottom: var(--space-xl);
        color: var(--text-primary);
    }

    .footer-logo {
        font-family: 'Cormorant Garamond', serif;
        font-size: var(--text-2xl);
        font-weight: 600;
        color: white;
        margin-bottom: var(--space-md);
    }

    .footer-brand {
        max-width: 400px;
    }

    .footer-links {
        display: flex;
        gap: var(--space-3xl);
    }

    .footer-col {
        display: flex;
        flex-direction: column;
    }

    .footer-col h4 {
        color: white;
        margin-bottom: var(--space-md);
        font-size: var(--text-lg);
    }

    .footer-col a {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: var(--text-base);
        margin-bottom: var(--space-xs);
        transition: all 0.2s ease;
    }

    .footer-col a:hover {
        color: var(--teal-300);
        transform: translateX(5px);
    }

    .footer-tagline {
        font-style: italic;
        color: rgba(255, 255, 255, 0.5);
        font-size: var(--text-sm);
    }
`;
document.head.appendChild(style);

// ============================================
// PAGE LOAD ANIMATIONS
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    highlightNavigation();

    // Add stagger effect to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// ============================================
// PERFORMANCE: LAZY LOAD IMAGES
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
console.log('%c🌊 Built with care by Claude', 'font-size: 12px; color: #e68a52;');

// ============================================
// END OF SCRIPT
// ============================================
