const emailForm = document.querySelector("[data-email-form]");

emailForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(emailForm);
    const name = formData.get("name").toString().trim();
    const senderEmail = formData.get("email").toString().trim();
    const subject = formData.get("subject").toString().trim();
    const message = formData.get("message").toString().trim();
    const body = `Nome: ${name}\nE-mail: ${senderEmail}\n\n${message}`;
    const composeUrl = new URL("https://mail.google.com/mail/");

    composeUrl.searchParams.set("view", "cm");
    composeUrl.searchParams.set("fs", "1");
    composeUrl.searchParams.set("to", "estela.argolo@gmail.com");
    composeUrl.searchParams.set("su", subject);
    composeUrl.searchParams.set("body", body);
    window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
});
