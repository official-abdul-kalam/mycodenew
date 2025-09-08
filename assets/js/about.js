// Initialize lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.value-card, .team-member, .timeline-item, .mission-content');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered delay for timeline items
                    if (entry.target.classList.contains('timeline-item')) {
                        const delay = Array.from(document.querySelectorAll('.timeline-item')).indexOf(entry.target) * 200;
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s ease';
                        }, delay);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
            // Set initial state for animation
            element.style.opacity = 0;
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
        });
    };

    // Initialize animations
    animateOnScroll();

    // Reinitialize icons if needed
    setInterval(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 1000);

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Reinitialize icons on resize
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 250);
    });
});