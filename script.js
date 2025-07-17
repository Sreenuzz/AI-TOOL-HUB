// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// Donation Form Submission
const donationForm = document.getElementById('donationForm');
const thankYou = document.getElementById('thankYou');

if (donationForm && thankYou) {
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show thank you message
        donationForm.style.display = 'none';
        thankYou.style.display = 'block';
    });
}
// Select all elements with the class 'category-card'
document.querySelectorAll('.category-card').forEach(card => {
  // Add click event to each card
  card.addEventListener('click', () => {
    // Get the category name, format it for URL (lowercase and hyphenated)
    const category = card.innerText.toLowerCase().replace(/ /g, '-');
    
    // Redirect user to a relevant search or info page
    window.location.href = `https://www.futurepedia.io/search?tools=${category}`;
  });
});

// Mobile menu toggle for coding.html
const menuToggleCoding = document.querySelector('.menu-toggle');
const navCoding = document.querySelector('nav');

if (menuToggleCoding && navCoding) {
    menuToggleCoding.addEventListener('click', (e) => {
        e.stopPropagation();
        navCoding.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navCoding.contains(e.target) && !menuToggleCoding.contains(e.target)) {
            navCoding.classList.remove('active');
        }
    });
}

// Filter tools by category
const categoryButtons = document.querySelectorAll('.category-btn');
const tools = document.querySelectorAll('.tool-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter tools
        tools.forEach(tool => {
            if (category === 'all' || tool.getAttribute('data-category') === category) {
                tool.style.display = 'block';
            } else {
                tool.style.display = 'none';
            }
        });

        // Update results count
        const visibleTools = document.querySelectorAll('.tool-card[style="display: block;"]');
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) resultsCount.textContent = visibleTools.length;
    });
});

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        tools.forEach(tool => {
            const toolName = tool.querySelector('.tool-name').textContent.toLowerCase();
            const toolDescription = tool.querySelector('.tool-description').textContent.toLowerCase();
            const toolCategory = tool.querySelector('.tool-category').textContent.toLowerCase();

            if (toolName.includes(searchTerm) ||
                toolDescription.includes(searchTerm) ||
                toolCategory.includes(searchTerm)) {
                tool.style.display = 'block';
            } else {
                tool.style.display = 'none';
            }
        });

        // Update results count
        const visibleTools = document.querySelectorAll('.tool-card[style="display: block;"]');
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) resultsCount.textContent = visibleTools.length;
    });
}

// Sort functionality
const sortSelect = document.getElementById('sortSelect');
const toolsGrid = document.getElementById('toolsGrid');

if (sortSelect && toolsGrid) {
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const toolsArray = Array.from(tools);

        toolsArray.sort((a, b) => {
            const aName = a.querySelector('.tool-name').textContent.toLowerCase();
            const bName = b.querySelector('.tool-name').textContent.toLowerCase();
            const aPopularity = a.getAttribute('data-popularity');
            const bPopularity = b.getAttribute('data-popularity');

            // Popularity mapping for sorting
            const popularityMap = { high: 3, medium: 2, low: 1 };

            switch (sortValue) {
                case 'popular':
                    return popularityMap[bPopularity] - popularityMap[aPopularity];
                case 'new':
                    // For simplicity, we'll sort by position in the list
                    return Array.from(toolsGrid.children).indexOf(b) - Array.from(toolsGrid.children).indexOf(a);
                case 'name':
                    return aName.localeCompare(bName);
                default:
                    return 0;
            }
        });

        // Re-append sorted tools
        toolsArray.forEach(tool => {
            toolsGrid.appendChild(tool);
        });
    });
}

// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animation for cards on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-card, .stat-box').forEach(card => {
    observer.observe(card);
});

// Add active state to navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// --- image.html specific interactivity ---

// Add interactivity to category buttons (image.html)
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // In a real implementation, this would filter the tools
        console.log(`Filtering by: ${button.textContent}`);
    });
});

// Add search functionality (image.html)
const imageSearchInput = document.querySelector('.search-bar input');
if (imageSearchInput) {
    imageSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log(`Searching for: ${searchTerm}`);
        // In a real implementation, this would filter the tools
    });
}

// Mobile menu toggle (image.html)
const imageMenuToggle = document.querySelector('.menu-toggle');
const imageNav = document.querySelector('nav');
if (imageMenuToggle && imageNav) {
    imageMenuToggle.addEventListener('click', () => {
        imageNav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!imageNav.contains(e.target) && !imageMenuToggle.contains(e.target)) {
            imageNav.classList.remove('active');
        }
    });
}

// Add animation to cards on scroll (image.html)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.tool-card, .stat-box').forEach(card => {
    imageObserver.observe(card);
});
