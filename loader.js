const navigation = performance.getEntriesByType("navigation")[0];
const isReload = navigation && navigation.type === "reload";
const cameFromThisSite = document.referrer
    && new URL(document.referrer).origin === window.location.origin;

if (cameFromThisSite && !isReload) {
    document.documentElement.classList.add("page-loader-skipped");
}

document.addEventListener("DOMContentLoaded", () => {
    const loader = document.querySelector("[data-page-loader]");

    if (!loader) {
        return;
    }

    if (document.documentElement.classList.contains("page-loader-skipped")) {
        loader.remove();
        return;
    }

    const minimumDisplayTime = 2000;
    const startedAt = performance.now();

    const hideLoader = () => {
        const remainingTime = Math.max(0, minimumDisplayTime - (performance.now() - startedAt));

        window.setTimeout(() => {
            loader.classList.add("is-hidden");
            document.body.removeAttribute("aria-busy");
        }, remainingTime);
    };

    document.body.setAttribute("aria-busy", "true");
    window.addEventListener("load", hideLoader, { once: true });
});
