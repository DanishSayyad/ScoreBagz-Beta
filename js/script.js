// Dynamic banner spacing based on navbar height
function adjustBannerSpacing() {
    const navbar = document.querySelector('nav');
    const bannerContainer = document.getElementById('banner-container');
    
    if (navbar && bannerContainer) {
        const navbarHeight = navbar.offsetHeight;
        bannerContainer.style.paddingTop = navbarHeight + 'px';
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    // Adjust banner spacing on load
    adjustBannerSpacing();
    
    // Re-adjust on window resize
    window.addEventListener('resize', adjustBannerSpacing);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Side menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sideMenu = document.getElementById('side-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    
    if (menuToggle && sideMenu && menuOverlay) {
        const openMenu = () => {
            sideMenu.classList.remove('-translate-x-full');
            menuOverlay.classList.remove('hidden');
        };
        
        const closeMenu = () => {
            sideMenu.classList.add('-translate-x-full');
            menuOverlay.classList.add('hidden');
        };
        
        menuToggle.addEventListener('click', openMenu);
        menuOverlay.addEventListener('click', closeMenu);
    }
});

// Smooth scrolling for any future navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});