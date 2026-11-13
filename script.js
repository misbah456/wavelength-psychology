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
const messageHint = document.getElementById("messageHint");
const submitButtonText = document.getElementById("submitButtonText");
const contactRevealButton = document.getElementById("contactRevealButton");
const contactRevealResult = document.getElementById("contactRevealResult");
const navItems = [...document.querySelectorAll(".nav-links a[href^='#']")];
const sections = [...document.querySelectorAll("main section[id]")];
const faqItems = [...document.querySelectorAll(".faq-item")];

const defaultHint = "Please don't include health details here. This form is not for emergencies.";

const formTypeContent = {
    consultation: {
        label: "How can we help?",
        placeholder: "A sentence or two is plenty.",
        hint: defaultHint,
        button: "Send message",
        compliance: ""
    },
    records: {
        label: "How should we reach you?",
        placeholder: "The best phone number or email, and a good time to reach you.",
        hint: "Please don't include a date of birth or health details here. Dr. Mallick will follow up to confirm the details.",
        button: "Send records request",
        compliance:
            "Records requests may require a signed authorization before records can be released. If records need to go to a third party, you can use the Texas standard authorization form."
    },
    general: {
        label: "How can we help?",
        placeholder: "Share your question, and we'll follow up with the best next step.",
        hint: defaultHint,
        button: "Send message",
        compliance: ""
    }
};

function updateInquiryTypeUI() {
    if (!inquiryType) return;

    const selectedType = formTypeContent[inquiryType.value] ? inquiryType.value : "consultation";
    const config = formTypeContent[selectedType];
    const complianceNote = contactForm?.querySelector(".form-compliance-note");

    if (messageLabel) {
        messageLabel.textContent = config.label;
    }

    if (messageField) {
        messageField.placeholder = config.placeholder;
        messageField.required = selectedType === "records";
    }

    if (messageHint) {
        messageHint.textContent = config.hint;
    }

    if (submitButtonText) {
        submitButtonText.textContent = config.button;
    }

    if (complianceNote) {
        complianceNote.hidden = !config.compliance;
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
        const target = link.dataset.section ? `#${link.dataset.section}` : link.getAttribute("href");
        const isActive = currentSection && target === `#${currentSection.id}`;
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
            const formData = new FormData(contactForm);
            formData.delete("company");

            const response = await fetch(contactForm.action, {
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
            showFormMessage("success", "Thank you. Your message has been sent, and Dr. Mallick will respond within two business days.");
        } catch (error) {
            showFormMessage("error", "Something went wrong while sending the form. Please try again, book through the online consultation page, or choose \"Show email and phone\" on this page.");
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
