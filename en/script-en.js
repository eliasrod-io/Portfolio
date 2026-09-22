document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. Intersection Observer (Scroll Reveal)
       ========================================= */
    // Configures the observer to trigger when 15% of the element is visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adds the class that makes the element appear
                entry.target.classList.add('visible');

                // Optional: Uncomment the line below if you want the animation to run only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Selects all elements that will have the reveal effect
    const elementsToReveal = document.querySelectorAll(
        '.case-card, .timeline-item, .about-card'
    );
    
    // Adds the initial hidden class and starts observing
    elementsToReveal.forEach(el => {
        el.classList.add('reveal-element');
        revealObserver.observe(el);
    });


    /* =========================================
       2. Active Menu (Navigation Highlight)
       ========================================= */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";

        sections.forEach((section) => {
            // Gets the section's distance from the top
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // 150px offset to account for the sticky navbar
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


/* =========================================
   3. Contact Dropdown
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.querySelector('.contact-btn');
    const contactBalloon = document.querySelector('.contact-balloon');

    if (contactBtn && contactBalloon) {

        // Toggles visibility when the button is clicked
        contactBtn.addEventListener('click', (event) => {
            event.stopPropagation();

            // Prevents the click from immediately closing the balloon
            const isExpanded = contactBalloon.classList.toggle('show');

            contactBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Closes the balloon when clicking anywhere outside it
        document.addEventListener('click', (event) => {
            if (
                !contactBalloon.contains(event.target) &&
                !contactBtn.contains(event.target)
            ) {
                contactBalloon.classList.remove('show');
                contactBtn.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Closes the balloon when pressing the ESC key
        document.addEventListener('keydown', (event) => {
            if (
                event.key === 'Escape' &&
                contactBalloon.classList.contains('show')
            ) {
                contactBalloon.classList.remove('show');
                contactBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});


/* =========================================
   4. Theme Toggle (Light/Dark)
   ========================================= */
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Checks whether a theme is stored in localStorage
const currentTheme = localStorage.getItem('theme');

// Applies the stored theme when the page loads
if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');

    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}


// Toggle logic on click
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