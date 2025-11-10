// Reusable Reviews Marquee Module
const ReviewsMarquee = {
    // Load and display reviews with marquee functionality
    async init(containerId, jsonPath = 'data/reviews.json') {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const reviews = await response.json();
            const marqueeContainer = document.getElementById(containerId);
            
            if (!marqueeContainer) {
                console.error(`Container with id "${containerId}" not found`);
                return;
            }
            
            // Helper function to create star rating HTML
            function getStars(rating) {
                return '★'.repeat(rating) + '☆'.repeat(5 - rating);
            }
            
            // Helper function to create a review card
            function createReviewCard(review) {
                return `
                    <div class="review-card p-6 rounded-xl shadow-md">
                        <div class="flex items-center mb-4">
                            <img src="${review.image}" alt="${review.name}" class="w-12 h-12 rounded-full border-2 border-purple-200 mr-4" onerror="this.src='assets/icons/person.svg'">
                            <div>
                                <h4 class="font-bold text-black">${review.name}</h4>
                                <div class="flex text-yellow-400">
                                    ${getStars(review.rating)}
                                </div>
                            </div>
                        </div>
                        <p class="text-gray-600 italic">"${review.review}"</p>
                    </div>
                `;
            }
            
            // Create reviews HTML - duplicate twice for seamless loop
            const reviewsHTML = reviews.map(createReviewCard).join('');
            marqueeContainer.innerHTML = reviewsHTML + reviewsHTML; // Duplicate for seamless scrolling
            
            // Pause/resume logic
            let pauseTimeout;
            const isMobile = window.innerWidth < 768;
            
            if (isMobile) {
                // Mobile: Click to pause/resume
                marqueeContainer.addEventListener('click', function() {
                    this.classList.add('paused');
                    clearTimeout(pauseTimeout);
                    // Auto-resume after 3 seconds
                    pauseTimeout = setTimeout(() => {
                        this.classList.remove('paused');
                    }, 3000);
                });
            } else {
                // Desktop: Hover to pause
                marqueeContainer.addEventListener('mouseenter', function() {
                    this.classList.add('paused');
                    clearTimeout(pauseTimeout);
                });
                
                marqueeContainer.addEventListener('mouseleave', function() {
                    clearTimeout(pauseTimeout);
                    // Resume after 3 seconds
                    pauseTimeout = setTimeout(() => {
                        this.classList.remove('paused');
                    }, 3000);
                });
            }
            
            console.log('Reviews loaded successfully!');
            
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }
};

// Auto-initialize if the reviews marquee container exists
document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviewsMarquee');
    if (reviewsContainer) {
        // Check if we're in a subdirectory (like pages/)
        const isSubdirectory = window.location.pathname.includes('/pages/');
        const jsonPath = isSubdirectory ? '../data/reviews.json' : 'data/reviews.json';
        ReviewsMarquee.init('reviewsMarquee', jsonPath);
    }
});
