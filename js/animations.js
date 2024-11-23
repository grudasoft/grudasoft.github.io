// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2  // Increased threshold for better timing
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add a slight delay for sequential reveals
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 100);
        }
    });
}, observerOptions);

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

// Function to handle intro sequence
function startIntroSequence() {
    const intro = document.querySelector('.intro');
    const mainContainer = document.querySelector('.container');
    const typewriter = document.querySelector('.typewriter');
    
    if (!intro || !mainContainer || !typewriter) return;
    
    const text = typewriter.textContent.trim();
    typewriter.textContent = '';
    // Split by newlines first, then words
    const lines = text.split('\n');
    const words = lines.map(line => line.trim().split(/\s+/));
    let currentLine = 0;
    let currentWord = 0;
    
    const header = document.querySelector('.header');
    if (header) {
        header.style.opacity = '1';
        header.classList.add('visible');
    }
    
    intro.style.display = 'flex';
    intro.style.opacity = '1';
    
    function typeWord() {
        if (currentLine < words.length) {
            if (currentWord < words[currentLine].length) {
                typewriter.textContent += words[currentLine][currentWord] + ' ';
                currentWord++;
                setTimeout(typeWord, Math.random() * 150 + 100);
            } else {
                typewriter.textContent += '\n\n';
                currentLine++;
                currentWord = 0;
                setTimeout(typeWord, Math.random() * 800 + 400); // Longer pause between lines
            }
        } else {
            // After typing is complete, show the rest of the content
            mainContainer.style.opacity = '1';
            mainContainer.classList.add('visible');
            
            // Initialize scroll animations for all elements
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in');
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        }
    }
    
    typeWord();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    startIntroSequence();
});
