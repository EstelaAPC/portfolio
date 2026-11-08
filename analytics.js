// Add your GA4 Measurement ID here (format: G-XXXXXXXXXX).
const GA_MEASUREMENT_ID = "G-H9JY1Y6JQ4";

if (!/^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID)) {
    console.info("Google Analytics is disabled. Add a valid GA4 Measurement ID in analytics.js.");
} else {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID);

    const analyticsScript = document.createElement("script");
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    analyticsScript.onerror = () => {
        console.error("Google Analytics could not be loaded.");
    };
    document.head.append(analyticsScript);

    const pagePath = `${window.location.pathname}${window.location.hash}`;

    document.addEventListener("click", (event) => {
        const target = event.target instanceof Element ? event.target : null;
        const link = target?.closest("a");

        if (link instanceof HTMLAnchorElement) {
            const destination = new URL(link.href, window.location.href);
            const linkLabel = link.getAttribute("aria-label")
                || link.textContent.trim()
                || link.getAttribute("title")
                || "unlabeled";

            window.gtag("event", "portfolio_link_click", {
                link_label: linkLabel,
                link_url: `${destination.origin}${destination.pathname}${destination.hash}`,
                link_type: link.hasAttribute("download")
                    ? "download"
                    : destination.origin === window.location.origin ? "internal" : "external",
                page_path: pagePath
            });
            return;
        }

        const button = target?.closest("button");

        if (!(button instanceof HTMLButtonElement)) {
            return;
        }

        if (button.hasAttribute("data-language")) {
            window.gtag("event", "language_change", {
                language: button.dataset.language,
                page_path: pagePath
            });
            return;
        }

        if (button.hasAttribute("data-slide-to")) {
            const carouselLabel = button.closest('[role="group"]')?.getAttribute("aria-label")
                || "carousel";

            window.gtag("event", "carousel_slide_select", {
                carousel: carouselLabel,
                slide: button.getAttribute("aria-label") || button.dataset.slideTo,
                page_path: pagePath
            });
            return;
        }

        window.gtag("event", "portfolio_button_click", {
            button_label: button.getAttribute("aria-label") || button.textContent.trim() || "unlabeled",
            page_path: pagePath
        });
    });
}
