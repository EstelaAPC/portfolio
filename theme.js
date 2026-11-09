const themeStorageKey = "portfolio-theme";
const storedTheme = localStorage.getItem(themeStorageKey);
const initialTheme = storedTheme === "light" ? "light" : "dark";

document.documentElement.dataset.theme = initialTheme;

const updateThemeControls = (theme) => {
    const isDark = theme === "dark";
    const isEnglish = document.documentElement.lang === "en";
    const label = isEnglish
        ? isDark ? "Switch to light mode" : "Switch to dark mode"
        : isDark ? "Ativar modo claro" : "Ativar modo escuro";

    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = isDark ? "#0e0d14" : "#fff7fa";

    document.querySelectorAll("[data-theme-image]").forEach((image) => {
        const source = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;

        if (source && image.getAttribute("src") !== source) {
            image.setAttribute("src", source);
        }
    });

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        button.setAttribute("aria-label", label);
        button.setAttribute("title", label);
        button.setAttribute("aria-pressed", String(isDark));
    });
};

updateThemeControls(initialTheme);

document.addEventListener("DOMContentLoaded", () => {
    updateThemeControls(document.documentElement.dataset.theme);

    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
        button.addEventListener("click", () => {
            const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
            localStorage.setItem(themeStorageKey, nextTheme);
            updateThemeControls(nextTheme);
        });
    });
});
