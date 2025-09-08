// This script handles the logo click functionality to redirect to home page
document.addEventListener('DOMContentLoaded', function() {
    // Find all logo elements (both in header and footer)
    const logoElements = document.querySelectorAll('.logo, .footer-logo');
    
    // Add click event listener to each logo element
    logoElements.forEach(logo => {
        // Check if the logo is an image or container
        const logoImage = logo.querySelector('img');
        
        // Add click handler to the logo container
        logo.addEventListener('click', function(e) {
            // Prevent default if it's a link
            e.preventDefault();
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
        
        // Also add to the image itself for better accessibility
        if (logoImage) {
            logoImage.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
            
            // Make the image non-selectable and add pointer cursor
            logoImage.style.cursor = 'pointer';
            logoImage.style.userSelect = 'none';
        }
        
        // Add pointer cursor to the logo container
        logo.style.cursor = 'pointer';
    });
    
    // Also handle any logo links that might be wrapped
    const logoLinks = document.querySelectorAll('a.logo, .logo a');
    logoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    });
    
    // Ensure the script works even if DOM content is already loaded
    if (document.readyState === 'loading') {
        document.addEventListener('readystatechange', function() {
            if (document.readyState === 'interactive') {
                initializeLogoClick();
            }
        });
    } else {
        initializeLogoClick();
    }
    
    function initializeLogoClick() {
        const logos = document.querySelectorAll('.logo');
        logos.forEach(logo => {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        });
    }
});