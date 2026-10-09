const carousels = document.querySelectorAll("[data-carousel]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

for (const carousel of carousels) {
    const slides = [...carousel.querySelectorAll(".carousel-slide")];
    const indicators = [...carousel.querySelectorAll("[data-slide-to]")];

    if (slides.length < 2 || indicators.length !== slides.length) {
        throw new Error("Carousel markup is incomplete.");
    }

    let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));
    let timer;

    const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === activeIndex;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
            slide.inert = !isActive;
        });

        indicators.forEach((indicator, indicatorIndex) => {
            const isActive = indicatorIndex === activeIndex;
            indicator.classList.toggle("is-active", isActive);

            if (isActive) {
                indicator.setAttribute("aria-current", "true");
            } else {
                indicator.removeAttribute("aria-current");
            }
        });
    };

    const stopTimer = () => {
        window.clearInterval(timer);
        timer = undefined;
    };

    const startTimer = () => {
        stopTimer();

        if (
            !reducedMotion.matches
            && !document.hidden
            && !carousel.matches(":hover")
            && !carousel.contains(document.activeElement)
        ) {
            timer = window.setInterval(() => showSlide(activeIndex + 1), 5000);
        }
    };

    indicators.forEach((indicator) => {
        indicator.addEventListener("click", () => {
            showSlide(Number(indicator.dataset.slideTo));
            startTimer();
        });
    });

    carousel.addEventListener("mouseenter", stopTimer);
    carousel.addEventListener("mouseleave", startTimer);
    carousel.addEventListener("focusin", stopTimer);
    carousel.addEventListener("focusout", (event) => {
        if (!carousel.contains(event.relatedTarget)) {
            startTimer();
        }
    });

    document.addEventListener("visibilitychange", startTimer);
    reducedMotion.addEventListener("change", startTimer);

    showSlide(activeIndex);
    startTimer();
}
