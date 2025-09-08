// Initialize lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lucide icons
    if (typeof lucide !== 'undefined') {
        try {
            lucide.createIcons();
        } catch (error) {
            console.warn('Lucide icons initialization failed:', error);
        }
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

    // Search and filter functionality
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const blogPosts = document.querySelectorAll('.blog-post');
    const emptyState = document.getElementById('emptyState');

    // Filter blog posts
    function filterPosts() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();
        let visibleCount = 0;

        blogPosts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const categories = post.className.toLowerCase();
            
            const matchesSearch = searchText === '' || 
                title.includes(searchText) || 
                excerpt.includes(searchText);
            
            const matchesCategory = selectedCategory === '' || 
                categories.includes(selectedCategory);
            
            if (matchesSearch && matchesCategory) {
                post.style.display = 'block';
                visibleCount++;
            } else {
                post.style.display = 'none';
            }
        });

        // Show empty state if no posts match
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    // Event listeners for search and filter
    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterPosts);
    }

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate successful submission
            alert(`Thank you for subscribing with ${email}! You'll receive our newsletter soon.`);
            this.reset();
        });
    }

    // Animation on scroll for blog posts
    const animateOnScroll = () => {
        const posts = document.querySelectorAll('.blog-post');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        posts.forEach(post => {
            observer.observe(post);
            // Set initial state for animation
            post.style.opacity = 0;
            post.style.transform = 'translateY(30px)';
            post.style.transition = 'all 0.6s ease';
        });
    };

    // Initialize animations
    animateOnScroll();

    // Reinitialize icons if needed
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Handle window load
    window.addEventListener('load', function() {
        // Ensure all SVGs are visible
        setTimeout(() => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }, 100);
    });
});