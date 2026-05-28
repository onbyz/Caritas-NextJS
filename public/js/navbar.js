document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const megaMenu = document.getElementById('mega-menu');
    const navLinks = document.querySelectorAll('.mega-menu-nav a');
    const tabSections = document.querySelectorAll('.menu-tab-section');

    // --- Menu Open/Close Functionality ---
    const openMenu = () => {
        megaMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling the main body
    };

    const closeMenu = () => {
        megaMenu.classList.remove('is-open');
        document.body.style.overflow = ''; // Restore body scrolling
    };

    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);

    // Close menu when clicking outside (optional, but good for full-screen menus)
    // megaMenu.addEventListener('click', (e) => {
    //     if (e.target === megaMenu) {
    //         closeMenu();
    //     }
    // });
    
    // Close menu on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && megaMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });

    // --- Tab Switching Functionality ---
    const switchTab = (tabId) => {
        // Deactivate all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        tabSections.forEach(section => section.classList.remove('active'));

        // Activate the selected link and section
        const activeLink = document.querySelector(`.mega-menu-nav a[data-tab-id="${tabId}"]`);
        const activeSection = document.getElementById(tabId);
        
        if (activeLink) {
            activeLink.classList.add('active');
        }
        if (activeSection) {
            activeSection.classList.add('active');
        }
    };
    
    // Add click listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab-id');
            switchTab(tabId);
        });
    });
    
    // Initialize: Ensure the first tab is open on load
    if (navLinks.length > 0) {
        navLinks[0].click();
    }
});