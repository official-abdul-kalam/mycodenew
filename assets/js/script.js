// Initialize lucide icons
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    // Copy button functionality for all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            try {
                // Get the prompt text from the card description
                const card = this.closest('.trending-card');
                const description = card.querySelector('.card-description').textContent;
                
                // Add animation
                this.classList.add('copy-animation');
                setTimeout(() => this.classList.remove('copy-animation'), 500);
                
                // Copy to clipboard
                await navigator.clipboard.writeText(description);
                
                // Change button appearance
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('Could not copy text: ', err);
                // Fallback method for browsers that don't support navigator.clipboard
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = description;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    // Change button appearance
                    button.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        button.classList.remove('copied');
                    }, 2000);
                } catch (fallbackErr) {
                    console.error('Fallback copy method also failed: ', fallbackErr);
                }
            }
        });
    });

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

    // Animation on scroll for cards
    const cards = document.querySelectorAll('.trending-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
        // Set initial state for animation
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
    });
});