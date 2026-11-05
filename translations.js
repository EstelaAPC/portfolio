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
        viewGithub: 'GitHub ↗',
        financeflowTitle: 'FinanceFlow',
        financeflowDesc: 'Plataforma de gestão financeira com Angular e .NET, usando AWS Lambda, Amazon DynamoDB e AWS SDK. Aplicação cloud-native publicada na AWS.',
        orquestraTitle: 'Orquestra',
        orquestraDesc: 'API REST para automatizar processos empresariais, integrar serviços e acompanhar cada etapa das solicitações.',
        netguardTitle: 'NetGuard',
        netguardDesc: 'Plataforma proativa para monitorar redes corporativas, detectar incidentes e acompanhar métricas.',
        nexoraTitle: 'Nexora Design System',
        nexoraDesc: 'Biblioteca de Web Components reutilizáveis, criada com Lit e TypeScript para interfaces acessíveis e consistentes.',
        codequestTitle: 'CodeQuest',
        codequestDesc: 'Um RPG educativo que transforma conceitos de programação em desafios interativos, construções criativas e aventuras guiadas pelo robô Byte.',
        playNow: 'Jogar agora ↗',
        viewDocs: 'Ver documentação ↗',
        viewGithubLink: 'Ver no GitHub ↗',
        letsTalk: 'Vamos conversar?',
        buildTogether: 'Vamos construir algo juntos.',
        getInTouch: 'Entre em contato ↗',
        copyright: '© 2026 Estela Argolo'
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
        viewGithub: 'GitHub ↗',
        financeflowTitle: 'FinanceFlow',
        financeflowDesc: 'Financial management platform with Angular and .NET, using AWS Lambda, Amazon DynamoDB and AWS SDK. Cloud-native application published on AWS.',
        orquestraTitle: 'Orquestra',
        orquestraDesc: 'REST API to automate business processes, integrate services and track each step of requests.',
        netguardTitle: 'NetGuard',
        netguardDesc: 'Proactive platform to monitor corporate networks, detect incidents and track metrics.',
        nexoraTitle: 'Nexora Design System',
        nexoraDesc: 'Reusable Web Components library, created with Lit and TypeScript for accessible and consistent interfaces.',
        codequestTitle: 'CodeQuest',
        codequestDesc: 'An educational RPG that transforms programming concepts into interactive challenges, creative builds and adventures guided by the robot Byte.',
        playNow: 'Play now ↗',
        viewDocs: 'View documentation ↗',
        viewGithubLink: 'View on GitHub ↗',
        letsTalk: 'Let\'s talk?',
        buildTogether: 'Let\'s build something together.',
        getInTouch: 'Get in touch ↗',
        copyright: '© 2026 Estela Argolo'
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
