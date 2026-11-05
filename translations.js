// Simple i18n translations object
const translations = {
    pt: {
        loading: 'Carregando...',
        navHome: 'Home',
        navAbout: 'Sobre Mim',
        navWork: 'Portfólio',
        navContact: 'Contato',
        softwareDeveloper: 'Desenvolvedora de software',
        heroButton: 'Conheça meu trabalho ↗',
        cvDownload: 'Baixar currículo ↓',
        trajectory: 'Minha trajetória',
        learnMore: 'Conheça mais sobre mim ↗',
        formation: 'Formação',
        professionalExperience: 'Experiência profissional',
        areas: 'Áreas de atuação',
        areasIntro: 'Tecnologia, produto e boas experiências digitais se encontram no meu trabalho.',
        fullstack: 'Desenvolvimento Full Stack',
        fullstackDesc: 'Aplicações completas, conectando interfaces, serviços e dados.',
        frontend: 'Front-end & Design Systems',
        frontendDesc: 'Interfaces consistentes, componentes reutilizáveis e experiências acessíveis.',
        cloud: 'Cloud & Inteligência Artificial',
        cloudDesc: 'Soluções modernas com dados, automação e tecnologias de nuvem.',
        recentProjects: 'Projetos recentes',
        viewPortfolio: 'Ver portfólio completo ↗',
        accessApp: 'Acessar aplicação ↗',
        viewGithub: 'GitHub ↗'
    },
    en: {
        loading: 'Loading...',
        navHome: 'Home',
        navAbout: 'About',
        navWork: 'Work',
        navContact: 'Contact',
        softwareDeveloper: 'Software Developer',
        heroButton: 'View My Work ↗',
        cvDownload: 'Download Resume ↓',
        trajectory: 'My Journey',
        learnMore: 'Learn more about me ↗',
        formation: 'Education',
        professionalExperience: 'Professional Experience',
        areas: 'Areas of Expertise',
        areasIntro: 'Technology, product and great digital experiences come together in my work.',
        fullstack: 'Full Stack Development',
        fullstackDesc: 'Complete applications, connecting interfaces, services and data.',
        frontend: 'Front-end & Design Systems',
        frontendDesc: 'Consistent interfaces, reusable components and accessible experiences.',
        cloud: 'Cloud & Artificial Intelligence',
        cloudDesc: 'Modern solutions with data, automation and cloud technologies.',
        recentProjects: 'Recent Projects',
        viewPortfolio: 'View complete portfolio ↗',
        accessApp: 'Access application ↗',
        viewGithub: 'GitHub ↗'
    }
};

// Get translation function
function t(key) {
    const lang = localStorage.getItem('language') || 'pt';
    return translations[lang][key] || translations['pt'][key];
}

// Translate all elements with data-i18n attribute
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t(key);
    });
}

// Language switcher functionality
document.addEventListener('DOMContentLoaded', function() {
    const langLinks = document.querySelectorAll('.lang-link');
    const currentLang = localStorage.getItem('language') || 'pt';

    // Set initial language
    updateLanguage(currentLang);
    translatePage();

    // Language switcher
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            localStorage.setItem('language', lang);
            updateLanguage(lang);
            translatePage();
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
