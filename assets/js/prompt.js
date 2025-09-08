// Initialize lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Category tabs functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const promptCards = document.querySelectorAll('.prompt-card');
    const searchInput = document.getElementById('searchInput');
    const tagFilter = document.getElementById('tagFilter');
    const emptyState = document.getElementById('emptyState');

    // Show category
    function showCategory(category) {
        promptCards.forEach(card => {
            if (category === 'all' || card.classList.contains(`category-${category}`)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Filter prompts by search and tag
    function filterPrompts() {
        const searchText = searchInput.value.toLowerCase();
        const selectedTag = tagFilter.value.toLowerCase();
        let visibleCount = 0;

        promptCards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            const tags = card.getAttribute('data-tags').toLowerCase();
            const isVisible = card.style.display !== 'none';

            const matchesSearch = searchText === '' || 
                title.includes(searchText) || 
                description.includes(searchText);
            
            const matchesTag = selectedTag === '' || tags.includes(selectedTag);
            
            if (matchesSearch && matchesTag && isVisible) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show empty state if no prompts match
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    // Tab button click event
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Get category
            const category = this.getAttribute('data-category');
            
            // Show only cards of selected category
            promptCards.forEach(card => {
                if (category === 'all' || card.classList.contains(`category-${category}`)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Reset search and filter
            searchInput.value = '';
            tagFilter.value = '';
            
            // Check if any cards are visible
            const visibleCards = Array.from(promptCards).filter(card => 
                card.style.display !== 'none'
            );
            
            if (visibleCards.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
            }
        });
    });

    // Search input event
    searchInput.addEventListener('input', filterPrompts);
    
    // Tag filter event
    tagFilter.addEventListener('change', filterPrompts);

    // Copy button functionality for all copy buttons
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async function() {
            try {
                // Get the prompt text from the card description
                const card = this.closest('.prompt-card');
                const description = card.querySelector('.card-description').textContent;
                
                // Add animation
                this.classList.add('copy-animation');
                setTimeout(() => this.classList.remove('copy-animation'), 500);
                
                // Copy to clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(description);
                } else {
                    // Fallback for browsers that don't support navigator.clipboard
                    const textArea = document.createElement('textarea');
                    textArea.value = description;
                    // Move textarea out of the screen to prevent flashing
                    textArea.style.position = 'absolute';
                    textArea.style.left = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                }
                
                // Change button appearance
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('copied');
                }, 2000);
                
            } catch (err) {
                console.error('Could not copy text: ', err);
                // Fallback method
                try {
                    const textArea = document.createElement('textarea');
                    textArea.value = description;
                    textArea.style.position = 'absolute';
                    textArea.style.left = '-999999px';
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

    // Ensure at least one category is visible on load
    window.addEventListener('load', function() {
        // Make sure trending category is visible
        const trendingButton = document.querySelector('.tab-button[data-category="trending"]');
        if (trendingButton) {
            trendingButton.click();
        }
        
        // Ensure icons are visible
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Reinitialize icons if needed
    setInterval(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 1000);
});