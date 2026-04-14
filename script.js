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
    const headerProjectButtons = document.querySelectorAll('[data-filter-target="developer"]');
    const devSection = document.getElementById('developer');
    const artSection = document.getElementById('artist');

    function setActiveFilter(filterValue) {
        filterButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-filter') === filterValue);
        });
    }

    function applyFilter(filterValue, shouldScroll = false) {
        if (!devSection || !artSection) {
            return;
        }

        setActiveFilter(filterValue);

        if (filterValue === 'all') {
            fadeIn(devSection);
            fadeIn(artSection);
        } else if (filterValue === 'developer') {
            fadeIn(devSection);
            hide(artSection);
            if (shouldScroll) {
                devSection.scrollIntoView({ behavior: 'smooth' });
            }
        } else if (filterValue === 'artist') {
            hide(devSection);
            fadeIn(artSection);
            if (shouldScroll) {
                artSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                applyFilter(btn.getAttribute('data-filter'), true);
            });
        });
    }

    headerProjectButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            applyFilter('developer', true);
        });
    });

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
        const isLiveDemo = this.classList.contains('live-demo-btn');
        const isArtLink = this.classList.contains('view-art-btn');
        const isAnimatedExternalLink = isLiveDemo || isArtLink;

        // Skip animation for:
        // 1. Links opening in new tab (_blank)
        // 2. Anchor links (starting with #) or empty links
        // 3. Special protocols (mailto:, tel:)
        if ((!isAnimatedExternalLink && target === '_blank') || 
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
            if (isAnimatedExternalLink) {
                window.open(targetURL, '_blank', 'noopener,noreferrer');
            } else {
                window.location.href = targetURL;
            }
        }, 800); // Matches the CSS animation duration
    }

    // Attach the click handler to all links and buttons you want this effect on
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
        link.addEventListener('click', handleLinkClick);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    function setupSectionPagination(config) {
        const grid = document.querySelector(config.gridSelector);
        const items = Array.from(document.querySelectorAll(config.itemSelector));
        const pagination = document.getElementById(config.paginationId);
        const prevButton = document.getElementById(config.prevButtonId);
        const nextButton = document.getElementById(config.nextButtonId);
        const indicator = document.getElementById(config.indicatorId);

        if (!grid || items.length === 0 || !pagination || !prevButton || !nextButton || !indicator) {
            return;
        }

        let currentPage = 1;
        let itemsPerPage = getItemsPerPage();

        function getItemsPerPage() {
            return window.matchMedia('(max-width: 768px)').matches ? config.mobilePageSize : config.desktopPageSize;
        }

        function renderPage() {
            const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

            if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;

            items.forEach((item, index) => {
                item.style.display = index >= startIndex && index < endIndex ? '' : 'none';
            });

            if (totalPages <= 1) {
                pagination.style.display = 'none';
            } else {
                pagination.style.display = 'flex';
            }

            indicator.textContent = `Page ${currentPage} of ${totalPages}`;
            prevButton.disabled = currentPage === 1;
            nextButton.disabled = currentPage === totalPages;
        }

        prevButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage -= 1;
                renderPage();
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        nextButton.addEventListener('click', () => {
            const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));
            if (currentPage < totalPages) {
                currentPage += 1;
                renderPage();
                grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        window.addEventListener('resize', () => {
            const newItemsPerPage = getItemsPerPage();
            if (newItemsPerPage !== itemsPerPage) {
                itemsPerPage = newItemsPerPage;
                currentPage = 1;
                renderPage();
            }
        });

        renderPage();
    }

    setupSectionPagination({
        gridSelector: '.project-grid',
        itemSelector: '.project-grid .project-card',
        paginationId: 'dev-pagination',
        prevButtonId: 'dev-prev',
        nextButtonId: 'dev-next',
        indicatorId: 'dev-page-indicator',
        desktopPageSize: 4,
        mobilePageSize: 2
    });

    setupSectionPagination({
        gridSelector: '.art-grid',
        itemSelector: '.art-grid .art-piece',
        paginationId: 'art-pagination',
        prevButtonId: 'art-prev',
        nextButtonId: 'art-next',
        indicatorId: 'art-page-indicator',
        desktopPageSize: 4,
        mobilePageSize: 2
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');
    const canUseCustomCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (!cursor || !canUseCustomCursor) {
        return;
    }

    const baseTransform = 'translate(-50%, -50%) scale(1)';
    const pressedTransform = 'translate(-50%, -50%) scale(0.85)';

    document.addEventListener('mousemove', event => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.classList.add('visible');
    });

    document.addEventListener('mouseleave', () => {
        cursor.classList.remove('visible');
    });

    document.addEventListener('mouseenter', () => {
        cursor.classList.add('visible');
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = pressedTransform;
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = baseTransform;
    });
});