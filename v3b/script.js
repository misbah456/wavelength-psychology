const root = document.documentElement;
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav-links");
const navToggle = document.querySelector(".mobile-menu-toggle");
const scrollProgress = document.querySelector(".scroll-progress-bar");
const footerYear = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const inquiryType = document.getElementById("type");
const messageLabel = document.getElementById("messageLabel");
const messageField = document.getElementById("message");
const formTypePanel = document.getElementById("formTypePanel");
const submitButtonText = document.getElementById("submitButtonText");
const contactRevealButton = document.getElementById("contactRevealButton");
const contactRevealResult = document.getElementById("contactRevealResult");
const navItems = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const faqItems = [...document.querySelectorAll(".faq-item")];

const formTypeContent = {
    consultation: {
        title: "Consultation request",
        body: "Share a little about what support you're looking for, and Dr. Mallick will follow up about next steps.",
        label: "What brings you to therapy?",
        placeholder: "Share a little about what support you're seeking.",
        button: "Send Request",
        compliance:
            "For records requests, please include the client name, date of birth, dates of service if known, and where records should be sent. If records need to go to a third party, a signed authorization may still be required."
    },
    records: {
        title: "Records request",
        body: "Please include the client name, date of birth, dates of service if known, and where the records should be sent. If records need to go to a third party, you can also use the Texas standard authorization form.",
        label: "What records are you requesting?",
        placeholder: "Please include the client name, date of birth, dates of service if known, and where the records should be sent.",
        button: "Send Records Request",
        compliance:
            "Records requests may require a signed authorization before records can be released. The Texas Attorney General provides a standard authorization form if records need to be disclosed to a third party."
    },
    general: {
        title: "General question",
        body: "If you are unsure where to start, you can use this space for a practical question and Dr. Mallick will point you in the right direction.",
        label: "How can we help?",
        placeholder: "Share your question, and we will follow up with the best next step.",
        button: "Send Request",
        compliance:
            "For records requests, please include the client name, date of birth, dates of service if known, and where records should be sent. If records need to go to a third party, a signed authorization may still be required."
    }
};

function updateInquiryTypeUI() {
    if (!inquiryType) return;

    const selectedType = formTypeContent[inquiryType.value] ? inquiryType.value : "consultation";
    const config = formTypeContent[selectedType];
    const complianceNote = contactForm?.querySelector(".form-compliance-note");

    if (formTypePanel) {
        const recordsLink =
            '<a href="https://www.texasattorneygeneral.gov/sites/default/files/files/divisions/consumer-protection/hb300-Authorization-Disclose-Health-Info.pdf" target="_blank" rel="noopener">Texas standard authorization form</a>';
        formTypePanel.innerHTML = `
            <p class="form-type-title">${config.title}</p>
            <p class="form-type-copy">${config.body.replace("Texas standard authorization form", recordsLink)}</p>
        `;
    }

    if (messageLabel) {
        messageLabel.textContent = config.label;
    }

    if (messageField) {
        messageField.placeholder = config.placeholder;
        messageField.required = selectedType === "records";
    }

    if (submitButtonText) {
        submitButtonText.textContent = config.button;
    }

    if (complianceNote) {
        const recordsLink =
            '<a href="https://www.texasattorneygeneral.gov/sites/default/files/files/divisions/consumer-protection/hb300-Authorization-Disclose-Health-Info.pdf" target="_blank" rel="noopener">Texas standard authorization form</a>';
        complianceNote.innerHTML = config.compliance.replace("Texas standard authorization form", recordsLink);
    }
}

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

if (contactRevealButton && contactRevealResult) {
    contactRevealButton.addEventListener("click", () => {
        const emailParts = ["zainub", "wavelengthpsychology", "com"];
        const phoneParts = ["747", "334", "0931"];
        const emailAddress = `${emailParts[0]}@${emailParts[1]}.${emailParts[2]}`;
        const phoneNumber = phoneParts.join("-");

        contactRevealResult.innerHTML = `
            <a href="mailto:${emailAddress}">${emailAddress}</a>
            <span aria-hidden="true"> · </span>
            <a href="tel:${phoneNumber}">${phoneNumber}</a>
        `;
        contactRevealButton.hidden = true;
    });
}

if (inquiryType) {
    inquiryType.addEventListener("change", updateInquiryTypeUI);
    updateInquiryTypeUI();
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
        const honeypot = contactForm.querySelector("input[name='company']");
        const formEndpoint = contactForm.dataset.endpoint?.trim();
        if (!submitButton) return;

        if (honeypot && honeypot.value.trim()) {
            contactForm.reset();
            showFormMessage("success", "Thank you.");
            return;
        }

        const originalHTML = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = "<span>Sending...</span>";

        try {
            if (!formEndpoint) {
                const missingEndpointMessage = inquiryType?.value === "records"
                    ? "This form is not connected yet. To make it live, add your form endpoint URL to the form's data-endpoint attribute in v3b/index.html. Until then, use the Texas authorization form linked above and the reveal button if you need direct contact information."
                    : "This form is not connected yet. To make it live, add your form endpoint URL to the form's data-endpoint attribute in v3b/index.html. Until then, the online consultation page or the reveal button are the best options.";
                showFormMessage("info", missingEndpointMessage);
                return;
            }

            const formData = new FormData(contactForm);
            formData.delete("company");

            const response = await fetch(formEndpoint, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            contactForm.reset();
            updateInquiryTypeUI();
            showFormMessage("success", "Thank you. Your inquiry has been sent, and Dr. Mallick will respond within two business days.");
        } catch (error) {
            showFormMessage("error", "Something went wrong while sending the form. Please try again, use the online consultation page, or reveal the direct contact information.");
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!poemLines.length) return;

    if (prefersReducedMotion) {
        poemLines.forEach((line) => line.classList.add("poem-visible"));
        heroDivider?.classList.add("poem-visible");
        heroActions?.classList.add("poem-visible");
        return;
    }

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
