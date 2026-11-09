const contactForm = document.querySelector("[data-contact-form]");
const statusMessage = document.querySelector("[data-form-status]");
const submitButton = contactForm?.querySelector("[data-submit-button]");

const formCopy = {
    idle: { pt: "Enviar mensagem", en: "Send message" },
    sending: { pt: "Enviando...", en: "Sending..." },
    success: {
        pt: "Mensagem enviada com sucesso! Obrigada pelo contato.",
        en: "Message sent successfully! Thanks for reaching out.",
    },
    error: {
        pt: "Não foi possível enviar a mensagem. Tente novamente ou me chame no LinkedIn.",
        en: "The message could not be sent. Please try again or reach out on LinkedIn.",
    },
};

const currentLanguage = () => (document.documentElement.lang === "en" ? "en" : "pt");

let isSubmitting = false;
let lastStatus = null;

const renderSubmitButton = () => {
    if (!submitButton) {
        return;
    }

    const state = isSubmitting ? "sending" : "idle";
    submitButton.textContent = formCopy[state][currentLanguage()];
};

const renderStatusMessage = () => {
    if (!statusMessage || !lastStatus) {
        return;
    }

    statusMessage.textContent = formCopy[lastStatus][currentLanguage()];
};

contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (isSubmitting) {
        return;
    }

    isSubmitting = true;
    lastStatus = null;
    submitButton.disabled = true;
    statusMessage.textContent = "";
    statusMessage.classList.remove("is-success", "is-error");
    renderSubmitButton();

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            headers: { Accept: "application/json" },
            body: new FormData(contactForm),
        });
        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Web3Forms submission failed");
        }

        contactForm.reset();
        lastStatus = "success";
    } catch (error) {
        lastStatus = "error";
    }

    statusMessage.classList.add(lastStatus === "success" ? "is-success" : "is-error");
    renderStatusMessage();

    isSubmitting = false;
    submitButton.disabled = false;
    renderSubmitButton();
});

document.addEventListener("portfolio:languagechange", () => {
    renderSubmitButton();
    renderStatusMessage();
});
