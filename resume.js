// ===== Two-Page Resume Carousel =====

let currentPage = 1;
const totalPages = 5;

// Get elements
const pages = document.querySelectorAll('.carousel-page');
const indicators = document.querySelectorAll('.page-indicator');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
const pageCounter = document.getElementById('current-page');
const pageCounterEnd = document.getElementById('current-page-end');

function updateCarousel() {
    // Show two pages at a time, moving one page at a time
    pages.forEach((page, index) => {
        const pageNum = index + 1;
        page.style.display = 'none';

        // Show current page and next page (if exists)
        if (pageNum === currentPage || pageNum === currentPage + 1) {
            page.style.display = 'block';
        }
    });

    // Update indicators - highlight current and next page
    indicators.forEach((indicator, index) => {
        const pageNum = index + 1;
        if (pageNum === currentPage || pageNum === currentPage + 1) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });

    // Update counter
    if (pageCounter && pageCounterEnd) {
        pageCounter.textContent = currentPage;
        const endPage = Math.min(currentPage + 1, totalPages);
        pageCounterEnd.textContent = endPage;
    }

    // Update button states
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages - 1;
    prevBtn.style.opacity = currentPage === 1 ? '0.3' : '1';
    nextBtn.style.opacity = currentPage >= totalPages - 1 ? '0.3' : '1';
}

function goToPage(page) {
    if (page < 1 || page > totalPages - 1) return;
    currentPage = page;
    updateCarousel();
}

function nextPage() {
    if (currentPage < totalPages - 1) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// Event listeners
prevBtn?.addEventListener('click', prevPage);
nextBtn?.addEventListener('click', nextPage);

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        const targetPage = index + 1;
        // If clicking on last page, show page 4-5
        if (targetPage === totalPages) {
            goToPage(totalPages - 1);
        } else {
            goToPage(targetPage);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevPage();
    } else if (e.key === 'ArrowRight') {
        nextPage();
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carousel = document.querySelector('.carousel-viewer');

carousel?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel?.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next page
            nextPage();
        } else {
            // Swipe right - prev page
            prevPage();
        }
    }
}

// Initialize
updateCarousel();

console.log('Two-page resume carousel loaded');
