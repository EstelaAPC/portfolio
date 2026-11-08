const emailForm = document.querySelector("[data-email-form]");

emailForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(emailForm);
    const name = formData.get("name").toString().trim();
    const senderEmail = formData.get("email").toString().trim();
    const subject = formData.get("subject").toString().trim();
    const message = formData.get("message").toString().trim();
    const body = `Nome: ${name}\nE-mail: ${senderEmail}\n\n${message}`;
    const mailto = new URL("mailto:estela.argolo@gmail.com");

    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", body);
    window.location.href = mailto.toString();
});
