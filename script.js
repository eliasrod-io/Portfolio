document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. Intersection Observer (Scroll Reveal)
       ========================================= */
    // Configura o observador para disparar quando 15% do elemento estiver na tela
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que faz o elemento aparecer
                entry.target.classList.add('visible');
                // Opcional: Descomente a linha abaixo se quiser que anime apenas 1 vez
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que terão o efeito de surgimento
    const elementsToReveal = document.querySelectorAll('.case-card, .timeline-item, .about-card');
    
    // Adiciona a classe inicial de oculto e começa a observar
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });


    /* =========================================
       2. Active Menu (Destaque na Navegação)
       ========================================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach((section) => {
            // Pega a distância da seção até o topo
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Ajuste de 150px para compensar a navbar fixa
            if (scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.querySelector('.contact-btn');
    const contactBalloon = document.querySelector('.contact-balloon');

    if (contactBtn && contactBalloon) {
        // Alterna a visibilidade ao clicar no botão
        contactBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique feche o balão imediatamente
            const isExpanded = contactBalloon.classList.toggle('show');
            contactBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Fecha o balão ao clicar em qualquer lugar fora dele
        document.addEventListener('click', (event) => {
            if (!contactBalloon.contains(event.target) && !contactBtn.contains(event.target)) {
                contactBalloon.classList.remove('show');
                contactBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fecha o balão ao pressionar a tecla ESC
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && contactBalloon.classList.contains('show')) {
                contactBalloon.classList.remove('show');
                contactBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

/* =========================================
   Theme Toggle (Light/Dark)
   ========================================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Verifica se há um tema guardado no localStorage
const currentTheme = localStorage.getItem('theme');

// Aplica o tema guardado ao carregar a página
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

// Lógica de alternância ao clicar
themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    }
});