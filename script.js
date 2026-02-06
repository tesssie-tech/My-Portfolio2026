document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // --- Portfolio Filtering & Navigation ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const devSection = document.getElementById('developer');
    const artSection = document.getElementById('artist');

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                // Toggle section visibility and scroll
                if (filterValue === 'all') {
                    fadeIn(devSection);
                    fadeIn(artSection);
                } else if (filterValue === 'developer') {
                    fadeIn(devSection);
                    hide(artSection);
                    devSection.scrollIntoView({ behavior: 'smooth' });
                } else if (filterValue === 'artist') {
                    hide(devSection);
                    fadeIn(artSection);
                    artSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Helper functions for smooth transitions
    function hide(element) {
        element.style.display = 'none';
    }

    function fadeIn(element) {
        element.style.display = 'block';
        setTimeout(() => {
            element.style.opacity = '1';
        }, 10);
    }
});


document.addEventListener('DOMContentLoaded', function () {
    // Function to handle the link click and animation
    function handleLinkClick(event) {
        const targetURL = this.getAttribute('href');
        const target = this.getAttribute('target');

        // Skip animation for:
        // 1. Links opening in new tab (_blank)
        // 2. Anchor links (starting with #) or empty links
        // 3. Special protocols (mailto:, tel:)
        if (target === '_blank' || 
            !targetURL || 
            targetURL.startsWith('#') || 
            targetURL.startsWith('mailto:') || 
            targetURL.startsWith('tel:')) {
            return;
        }

        event.preventDefault();

        // Create overlay structure
        const overlay = document.createElement('div');
        overlay.className = 'transition-overlay';
        
        const layer1 = document.createElement('div');
        layer1.className = 'transition-layer layer-1';
        
        const layer2 = document.createElement('div');
        layer2.className = 'transition-layer layer-2';
        
        overlay.appendChild(layer1);
        overlay.appendChild(layer2);
        document.body.appendChild(overlay);

        // After the animation, navigate to the new page
        setTimeout(function () {
            window.location.href = targetURL;
        }, 800); // Matches the CSS animation duration
    }

    // Attach the click handler to all links and buttons you want this effect on
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
});