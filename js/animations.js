// Typing animation
class TypeWriter {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentChar = 0;
        this.isComplete = false;
    }

    type() {
        if (this.currentChar < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentChar);
            this.currentChar++;
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isComplete = true;
            document.querySelector('.nav').classList.add('visible');
        }
    }
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    const text = "In 2024, two brothers decided to head into the unknown, and solve the problems others said could not be solved. Armed with two laptops and two decades of product development experience, they launched Rudasoft. Today, despite the odds, they're reshaping the tech world one idea at a time. If you have a problem, if no one else can help, and if you can find them, maybe you can hire...";
    const typeWriter = new TypeWriter(typingElement, text, 50);
    typeWriter.type();

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Show navigation on scroll or typing completion
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 || typeWriter.isComplete) {
            document.querySelector('.nav').classList.add('visible');
        }
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });
});
