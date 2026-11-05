// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langLinks = document.querySelectorAll('.lang-link');
    const currentLang = localStorage.getItem('language') || 'pt';

    // Set initial language
    updateLanguage(currentLang);

    // Language switcher
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            updateLanguage(lang);
            // Reload page with new language
            location.reload();
        });
    });

    function updateLanguage(lang) {
        langLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-lang') === lang) {
                link.classList.add('active');
            }
        });

        document.documentElement.lang = lang === 'en' ? 'en-US' : 'pt-BR';
    }
});
