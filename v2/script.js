const root = document.documentElement;
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".mobile-menu-toggle");
const scrollProgress = document.querySelector(".scroll-progress-bar");
const footerYear = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const navItems = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const faqItems = [...document.querySelectorAll(".faq-item")];

function syncNavHeight() {
    if (!nav) return;
    root.style.setProperty("--nav-height", `${Math.ceil(nav.offsetHeight)}px`);
}

function setMenuState(isOpen) {
    if (!navLinks || !navToggle) return;

    navLinks.classList.toggle("active", isOpen);
    navToggle.classList.toggle("active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
}

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    scrollProgress.style.width = `${Math.min(Math.max(ratio, 0), 1) * 100}%`;
}

function updateScrolledNav() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 18);
}

function updateActiveNavLink() {
    if (!nav || !navItems.length || !sections.length) return;

    const currentSection = sections.find((section) => {
        const top = section.offsetTop - nav.offsetHeight - 40;
        const bottom = top + section.offsetHeight;
        return window.scrollY >= top && window.scrollY < bottom;
    });

    navItems.forEach((link) => {
        const isActive = currentSection && link.getAttribute("href") === `#${currentSection.id}`;
        link.classList.toggle("active", Boolean(isActive));
    });
}

function handleScroll() {
    updateScrolledNav();
    updateScrollProgress();
    updateActiveNavLink();
}

function showFormMessage(type, message) {
    if (!contactForm) return;

    const existing = contactForm.querySelector(".form-message");
    if (existing) existing.remove();

    const messageEl = document.createElement("div");
    messageEl.className = `form-message form-message-${type}`;
    messageEl.setAttribute("role", "status");
    messageEl.textContent = message;
    contactForm.appendChild(messageEl);
}

if (navToggle) {
    navToggle.addEventListener("click", () => {
        setMenuState(!navLinks.classList.contains("active"));
    });
}

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        setMenuState(false);
    });
});

document.addEventListener("click", (event) => {
    if (!nav || !navLinks || !navLinks.classList.contains("active")) return;
    if (nav.contains(event.target)) return;
    setMenuState(false);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        setMenuState(false);
    }
});

faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
        if (!item.open) return;

        faqItems.forEach((otherItem) => {
            if (otherItem !== item) {
                otherItem.open = false;
            }
        });
    });
});

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");
        if (!submitButton) return;

        const originalHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = "<span>Sending...</span>";

        try {
            await new Promise((resolve) => window.setTimeout(resolve, 1200));
            contactForm.reset();
            showFormMessage("success", "Thank you. Your inquiry has been sent, and Dr. Mallick will respond within two business days.");
        } catch (error) {
            showFormMessage("error", "Something went wrong. Please email zainub@wavelengthpsychology.com directly.");
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalHTML;
        }
    });
}

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

window.addEventListener("resize", () => {
    syncNavHeight();
    if (window.innerWidth > 960) {
        setMenuState(false);
    }
    updateActiveNavLink();
});

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", () => {
    syncNavHeight();
    handleScroll();
});

syncNavHeight();
handleScroll();

if (window.ResizeObserver && nav) {
    const navObserver = new ResizeObserver(() => syncNavHeight());
    navObserver.observe(nav);
}

(function initScrollReveal() {
    const targets = document.querySelectorAll(
        ".about-grid, .approach-section .section-header, .principles-grid, .approach-full-text, .modalities-panel, .faq-section .section-header, .faq-single-col, .connect-shell"
    );
    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
    });
})();

(function animateHeroPoem() {
    const poemLines = document.querySelectorAll(".poem-line");
    const heroDivider = document.querySelector(".hero-divider");
    const heroActions = document.querySelector(".hero-actions");

    poemLines.forEach((line, i) => {
        setTimeout(() => {
            line.classList.add("poem-visible");
        }, 300 + i * 260);
    });

    const revealDelay = 300 + poemLines.length * 260 + 200;
    if (heroDivider) {
        setTimeout(() => heroDivider.classList.add("poem-visible"), revealDelay);
    }
    if (heroActions) {
        setTimeout(() => heroActions.classList.add("poem-visible"), revealDelay + 200);
    }
})();
