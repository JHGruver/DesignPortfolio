// ===== Theme System =====
// NOTE: Initial theme detection happens in <head> inline script to prevent FOUC
// This section provides runtime theme switching functionality if needed later

const themes = {
    designer: 'theme-designer',
    business: 'theme-business',
    mentor: 'theme-mentor',
    classic: 'theme-classic',
    undecided: 'theme-undecided',
    default: 'theme-default'
};

// Function to switch themes dynamically (for future theme switcher UI)
function switchTheme(themeName) {
    if (!themes[themeName]) {
        console.error(`Theme "${themeName}" not found`);
        return;
    }

    const themeClass = themes[themeName];

    // Remove all existing theme classes from html element
    document.documentElement.classList.remove(...Object.values(themes));

    // Add the selected theme class
    document.documentElement.classList.add(themeClass);

    // Save to localStorage
    try {
        localStorage.setItem('preferredTheme', themeClass);
        console.log(`Theme switched to: ${themeClass}`);
    } catch (e) {
        console.error('Failed to save theme preference:', e);
    }
}

// Log current theme on load
console.log(`Active theme: ${document.documentElement.className || 'default'}`);

// ===== Designer Theme - Falling Octagon Shapes =====
function createFallingShape() {
    const theme = document.documentElement.className;

    // Only create shapes for designer theme
    if (theme !== 'theme-designer') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const shape = document.createElement('div');
    shape.className = 'shape-octagon';

    // Random horizontal position
    shape.style.left = Math.random() * window.innerWidth + 'px';
    shape.style.top = '-60px';

    // Random size variation
    const size = 40 + Math.random() * 40; // 40-80px
    shape.style.width = size + 'px';
    shape.style.height = size + 'px';

    // Random animation duration
    const duration = 3 + Math.random() * 2; // 3-5 seconds
    shape.style.animationDuration = duration + 's';

    document.body.appendChild(shape);

    // Remove shape after animation completes
    setTimeout(() => {
        if (shape.parentNode) {
            shape.parentNode.removeChild(shape);
        }
    }, duration * 1000);
}

// Create shapes on scroll for designer theme
let lastShapeTime = 0;
const shapeThrottle = 800; // Minimum time between shapes (ms)

function handleScroll() {
    const theme = document.documentElement.className;
    if (theme !== 'theme-designer') return;

    const now = Date.now();
    if (now - lastShapeTime > shapeThrottle) {
        createFallingShape();
        lastShapeTime = now;
    }
}

// Throttled scroll listener for shapes
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(handleScroll, 100);
}, { passive: true });

// Create initial shapes when page loads (designer theme only)
window.addEventListener('DOMContentLoaded', () => {
    const theme = document.documentElement.className;
    if (theme === 'theme-designer') {
        // Create 3 initial shapes
        setTimeout(() => createFallingShape(), 500);
        setTimeout(() => createFallingShape(), 1000);
        setTimeout(() => createFallingShape(), 1500);
    }
});

// ===== Mentor Theme - Floating Bubble Elements =====
function createFloatingBubble() {
    const theme = document.documentElement.className;

    // Only create bubbles for mentor theme
    if (theme !== 'theme-mentor') return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    // Random horizontal position
    const startX = Math.random() * window.innerWidth;
    bubble.style.left = startX + 'px';
    bubble.style.bottom = '-100px';

    // Random size variation (30-80px)
    const size = 30 + Math.random() * 50;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';

    // Random drift amount (horizontal movement as it floats)
    const drift = (Math.random() - 0.5) * 200; // -100px to +100px
    bubble.style.setProperty('--bubble-drift', drift + 'px');

    // Random animation duration (8-15 seconds for gentle float)
    const duration = 8 + Math.random() * 7;
    bubble.style.animationDuration = duration + 's';

    document.body.appendChild(bubble);

    // Remove bubble after animation completes
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.parentNode.removeChild(bubble);
        }
    }, duration * 1000);
}

// Create bubbles on scroll for mentor theme
let lastBubbleTime = 0;
const bubbleThrottle = 1200; // Minimum time between bubbles (ms) - slower than shapes

function handleScrollBubbles() {
    const theme = document.documentElement.className;
    if (theme !== 'theme-mentor') return;

    const now = Date.now();
    if (now - lastBubbleTime > bubbleThrottle) {
        createFloatingBubble();
        lastBubbleTime = now;
    }
}

// Throttled scroll listener for bubbles
let bubbleScrollTimeout;
window.addEventListener('scroll', () => {
    if (bubbleScrollTimeout) {
        clearTimeout(bubbleScrollTimeout);
    }
    bubbleScrollTimeout = setTimeout(handleScrollBubbles, 100);
}, { passive: true });

// Create initial bubbles when page loads (mentor theme only)
window.addEventListener('DOMContentLoaded', () => {
    const theme = document.documentElement.className;
    if (theme === 'theme-mentor') {
        // Create 4 initial bubbles at staggered intervals
        setTimeout(() => createFloatingBubble(), 800);
        setTimeout(() => createFloatingBubble(), 1600);
        setTimeout(() => createFloatingBubble(), 2400);
        setTimeout(() => createFloatingBubble(), 3200);
    }
});

// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Intersection Observer for Fade-in Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in effect
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});

// ===== Active Navigation Link Highlight =====
const navLinksArray = Array.from(navLinks);
const sectionIds = navLinksArray.map(link => link.getAttribute('href').substring(1));

window.addEventListener('scroll', () => {
    let current = '';

    sectionIds.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = id;
            }
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Project Card Tilt Effect (Optional Enhancement) =====
const projectCardsForTilt = document.querySelectorAll('.project-card');

projectCardsForTilt.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// ===== Form Validation (if you add a contact form later) =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ===== Add Copy Year to Footer =====
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = `&copy; ${currentYear} Jacob Gruver. Designed with compassion.`;
    }
});

// ===== Keyboard Navigation Accessibility =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any scroll-intensive operations can go here
});

window.addEventListener('scroll', debouncedScroll);

// ===== 3D Card Stack Carousel =====
let currentProject = 0;
const projectCards = document.querySelectorAll('.project-card');
const prevButton = document.querySelector('.prev-orb');
const nextButton = document.querySelector('.next-orb');
const progressFill = document.querySelector('.progress-fill');
const progressHandle = document.querySelector('.progress-handle');
const currentNumberEl = document.querySelector('.current-number');
const totalProjects = projectCards.length;

function updateCardPositions() {
    projectCards.forEach((card, index) => {
        // Calculate relative position from current card
        let position = index - currentProject;

        // Wrap positions for circular effect
        if (position > 2) {
            position = position - totalProjects;
        } else if (position < -2) {
            position = position + totalProjects;
        }

        // Set data attribute for CSS positioning
        card.setAttribute('data-position', position);

        // Update z-index for proper stacking
        if (position === 0) {
            card.style.zIndex = 100;
        } else if (Math.abs(position) === 1) {
            card.style.zIndex = 90;
        } else if (Math.abs(position) === 2) {
            card.style.zIndex = 80;
        } else {
            card.style.zIndex = 10;
        }
    });
}

function updateProgress() {
    // Update number display
    if (currentNumberEl) {
        currentNumberEl.textContent = currentProject + 1;
    }

    // Update progress bar
    if (progressFill && progressHandle) {
        const progressPercentage = ((currentProject + 1) / totalProjects) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        progressHandle.style.left = `${progressPercentage}%`;
    }
}

function showProject(index) {
    // Wrap around if out of bounds
    if (index >= totalProjects) {
        currentProject = 0;
    } else if (index < 0) {
        currentProject = totalProjects - 1;
    } else {
        currentProject = index;
    }

    updateCardPositions();
    updateProgress();
}

// Navigation button event listeners
if (prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
        showProject(currentProject - 1);
    });

    nextButton.addEventListener('click', () => {
        showProject(currentProject + 1);
    });
}

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        showProject(currentProject - 1);
    } else if (e.key === 'ArrowRight') {
        showProject(currentProject + 1);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const carouselStack = document.querySelector('.carousel-stack');
if (carouselStack) {
    carouselStack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselStack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            showProject(currentProject + 1);
        } else {
            // Swipe right - previous
            showProject(currentProject - 1);
        }
    }
}

// Initialize carousel on page load
window.addEventListener('DOMContentLoaded', () => {
    updateCardPositions();
    updateProgress();
});

// Auto-play carousel (optional - commented out)
// let autoPlayInterval;
// function startAutoPlay() {
//     autoPlayInterval = setInterval(() => {
//         showProject(currentProject + 1);
//     }, 5000);
// }
// function stopAutoPlay() {
//     clearInterval(autoPlayInterval);
// }
// startAutoPlay();
//
// // Pause auto-play on hover
// const carouselMain = document.querySelector('.carousel-main');
// if (carouselMain) {
//     carouselMain.addEventListener('mouseenter', stopAutoPlay);
//     carouselMain.addEventListener('mouseleave', startAutoPlay);
// }

// ===== Designer Theme - Rotating Subtitle Animation =====
function initRotatingSubtitle() {
    const rotatingContainer = document.querySelector('.subtitle-rotating');
    if (!rotatingContainer) return;

    const texts = rotatingContainer.querySelectorAll('.rotate-text');
    if (texts.length === 0) return;

    let currentIndex = 0;

    function rotateText() {
        // Remove active class from current text
        texts[currentIndex].classList.remove('active');

        // Move to next text
        currentIndex = (currentIndex + 1) % texts.length;

        // Add active class to new text
        texts[currentIndex].classList.add('active');
    }

    // Rotate every 3 seconds
    setInterval(rotateText, 3000);
}

// ===== Designer Theme - Magnetic Button Cursor Effect =====
function initMagneticButtons() {
    const theme = document.documentElement.className;

    // Only for designer theme
    if (theme !== 'theme-designer') return;

    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Move button 20% of the distance to cursor (subtle magnetic effect)
            const moveX = x * 0.2;
            const moveY = y * 0.2;

            btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

// ===== Dark Mode Toggle for Classic/Undecided Theme =====
function initDarkModeToggle() {
    const heroImage = document.querySelector('.hero-image');
    const htmlElement = document.documentElement;

    if (!heroImage) return;

    // Check if we're on classic/undecided theme
    if (!htmlElement.classList.contains('theme-classic')) return;

    // Check localStorage for saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
    }

    // Add click handler to hero image
    heroImage.addEventListener('click', () => {
        htmlElement.classList.toggle('dark-mode');

        // Save preference
        const isNowDark = htmlElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isNowDark);

        console.log(`Dark mode ${isNowDark ? 'enabled' : 'disabled'}`);
    });

    // Add cursor pointer to indicate it's clickable
    heroImage.style.cursor = 'pointer';
}

// ===== Blueprint Dashboard Number Counter =====
function initBlueprintDashboard() {
    const heroImage = document.querySelector('.hero-image');
    const dashboard = document.querySelector('.business-metrics-dashboard');

    if (!heroImage || !dashboard) return;

    let isAnimating = false;

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    function animateProgressBars() {
        const bars = dashboard.querySelectorAll('.metric-bar span');
        bars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = width; // Trigger animation
        });
    }

    heroImage.addEventListener('mouseenter', () => {
        if (isAnimating) return;
        isAnimating = true;

        // Animate all metric values
        const metricValues = dashboard.querySelectorAll('.metric-value');
        metricValues.forEach(valueEl => {
            const target = parseInt(valueEl.getAttribute('data-target'));
            animateValue(valueEl, 0, target, 1500);
        });

        // Animate progress bars
        setTimeout(() => {
            animateProgressBars();
        }, 300);
    });

    heroImage.addEventListener('mouseleave', () => {
        // Reset all values
        const metricValues = dashboard.querySelectorAll('.metric-value');
        metricValues.forEach(valueEl => {
            valueEl.textContent = '0';
        });

        isAnimating = false;
    });
}

// === CASE STUDY METRIC COUNTERS ===
function initCaseStudyCounters() {
    if (!document.documentElement.classList.contains('theme-business')) return;

    const metricElements = document.querySelectorAll('.case-studies p[style*="font-size: 32px"]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const animateCounter = (element) => {
        const text = element.textContent.trim();

        // Extract number and unit
        const match = text.match(/^([\$\+]?)(\d+(?:\.\d+)?[KkMm]?)([\+]?)$/);
        if (!match) return;

        const prefix = match[1];
        const numberStr = match[2];
        const suffix = match[3];

        // Parse the number (handle K, M suffixes)
        let multiplier = 1;
        let cleanNumber = numberStr;

        if (numberStr.endsWith('K') || numberStr.endsWith('k')) {
            multiplier = 1000;
            cleanNumber = numberStr.slice(0, -1);
        } else if (numberStr.endsWith('M') || numberStr.endsWith('m')) {
            multiplier = 1000000;
            cleanNumber = numberStr.slice(0, -1);
        }

        const targetValue = parseFloat(cleanNumber);
        if (isNaN(targetValue)) return;

        const duration = 2000; // 2 seconds
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;
        const increment = targetValue / totalFrames;

        let currentValue = 0;
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            currentValue += increment;

            if (frame >= totalFrames) {
                currentValue = targetValue;
                clearInterval(counter);
            }

            // Format the number
            let displayValue = currentValue.toFixed(cleanNumber.includes('.') ? 1 : 0);

            // Add back the suffix
            if (multiplier === 1000) {
                displayValue += 'K';
            } else if (multiplier === 1000000) {
                displayValue += 'M';
            }

            element.textContent = prefix + displayValue + suffix;
        }, 1000 / fps);

        // Store original value in case we need to reset
        element.setAttribute('data-original', text);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-counted')) {
                entry.target.setAttribute('data-counted', 'true');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    metricElements.forEach(element => observer.observe(element));

    // Add tooltips and progress bars
    addMetricTooltips();
    animateProgressBars();
}

// === PHASE 2: Add interactive tooltips with calculation breakdowns ===
function addMetricTooltips() {
    const metricContainers = document.querySelectorAll('.case-studies div[style*="border-left: 3px solid"]');

    // Detailed calculation tooltips for each metric
    const tooltipData = {
        'INVESTOR FUNDING SECURED': {
            label: 'CALCULATION BREAKDOWN',
            calculations: [
                'Seed Round: $150K (60%)',
                'Angel Investment: $75K (30%)',
                'Grant Funding: $25K (10%)'
            ],
            note: 'Design deliverables directly influenced pitch deck success'
        },
        'CLIENT SALES GENERATED': {
            label: 'REVENUE ATTRIBUTION',
            calculations: [
                'Enterprise Contracts: $85K',
                'SMB Subscriptions: $40K',
                'White-Label Licenses: $15K'
            ],
            note: 'Direct conversion from design-led demos'
        },
        'AI TOOLS ANALYZED': {
            label: 'RESEARCH METHODOLOGY',
            calculations: [
                'Primary Competitors: 15 tools',
                'Secondary Market: 10 tools',
                'Emerging Players: 5+ tools'
            ],
            note: 'Comprehensive analysis informed product positioning'
        },
        'VEHICLES DEPLOYED': {
            label: 'DEPLOYMENT SCALE',
            calculations: [
                'Jaguar Models: ~15M units',
                'Land Rover: ~15M units',
                'Licensed OEMs: Confidential'
            ],
            note: 'Multi-year production across global markets'
        },
        'PRODUCTION YEARS': {
            label: 'TIMELINE BREAKDOWN',
            calculations: [
                'Gen 2 Launch: 2018',
                'Gen 3 Evolution: 2019-2021',
                'Active Production: 3 years'
            ],
            note: 'Design system remained stable across updates'
        },
        'SYSTEM EVOLUTION': {
            label: 'VERSION PROGRESSION',
            calculations: [
                'Gen 2: Initial Design System',
                'Gen 3: Enhanced UX + Voice',
                'Incremental: 12+ updates'
            ],
            note: 'Iterative improvements based on user testing'
        }
    };

    metricContainers.forEach(container => {
        const label = container.querySelector('p[style*="text-transform: uppercase"]');
        if (label) {
            const labelText = label.textContent.trim();
            const data = tooltipData[labelText];

            if (data) {
                // Create tooltip element
                const tooltip = document.createElement('div');
                tooltip.className = 'metric-tooltip';

                // Build tooltip content
                let tooltipHTML = `<span class="metric-tooltip-label">${data.label}</span>`;

                data.calculations.forEach(calc => {
                    tooltipHTML += `<span class="metric-tooltip-calc">→ ${calc}</span>`;
                });

                tooltipHTML += `<span class="metric-tooltip-note">${data.note}</span>`;

                tooltip.innerHTML = tooltipHTML;
                container.appendChild(tooltip);
            }
        }
    });
}

// === PHASE 2: Animate progress bars on scroll ===
function animateProgressBars() {
    const metricContainers = document.querySelectorAll('.case-studies div[style*="border-left: 3px solid"]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('metric-visible');
            }
        });
    }, {
        threshold: 0.3
    });

    metricContainers.forEach(container => observer.observe(container));
}

// === DASHBOARD DIVIDERS: Animate aggregate metrics between case studies ===
function initDividerDashboards() {
    const dividers = document.querySelectorAll('.case-study-divider');
    if (!dividers.length) return;

    // Counter animation function for divider metrics
    const animateDividerCounter = (element) => {
        const text = element.textContent.trim();
        const targetAttr = element.getAttribute('data-value');

        if (!targetAttr) return;

        // Parse different formats: $390K, 100%, 30M+, 18mo, 45+, 3
        let match = text.match(/^([\$]?)(\d+(?:\.\d+)?[KkMm]?)([\+%mo]*)$/);

        if (!match) {
            match = targetAttr.match(/^(\d+(?:\.\d+)?[KkMm]?)([\+%mo]*)$/);
            if (!match) return;
            match = ['', '', match[1], match[2]]; // Adjust for missing prefix
        }

        const prefix = match[1] || '';
        const numberStr = match[2];
        const suffix = match[3] || '';

        // Parse multipliers
        let multiplier = 1;
        let cleanNumber = numberStr;

        if (numberStr.endsWith('K') || numberStr.endsWith('k')) {
            multiplier = 1000;
            cleanNumber = numberStr.slice(0, -1);
        } else if (numberStr.endsWith('M') || numberStr.endsWith('m')) {
            multiplier = 1000000;
            cleanNumber = numberStr.slice(0, -1);
        }

        const targetValue = parseFloat(cleanNumber);
        if (isNaN(targetValue)) return;

        const duration = 2000; // 2 seconds
        const fps = 60;
        const totalFrames = (duration / 1000) * fps;
        const increment = targetValue / totalFrames;

        let currentValue = 0;
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            currentValue += increment;

            if (frame >= totalFrames) {
                currentValue = targetValue;
                clearInterval(counter);
            }

            // Format the number
            let displayValue = currentValue.toFixed(cleanNumber.includes('.') ? 1 : 0);

            // Add back multiplier suffix
            if (multiplier === 1000) {
                displayValue += 'K';
            } else if (multiplier === 1000000) {
                displayValue += 'M';
            }

            element.textContent = prefix + displayValue + suffix;
        }, 1000 / fps);
    };

    // Animate progress bars in dividers
    const animateDividerProgress = (divider) => {
        const progressBars = divider.querySelectorAll('.divider-metric-bar span');
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            // Force reflow
            void bar.offsetWidth;
            bar.style.width = targetWidth;
        });
    };

    // Intersection Observer for dividers
    const observerOptions = {
        threshold: 0.4,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');

                // Add visible class for slide-up animation
                entry.target.classList.add('divider-visible');

                // Animate all metric counters in this divider
                const metricValues = entry.target.querySelectorAll('.divider-metric-value');
                setTimeout(() => {
                    metricValues.forEach(value => animateDividerCounter(value));
                }, 400); // Delay to let slide-up complete first

                // Animate progress bars
                setTimeout(() => {
                    animateDividerProgress(entry.target);
                }, 600);
            }
        });
    }, observerOptions);

    dividers.forEach(divider => observer.observe(divider));
}

// ===== Timeline Hover Dashboard Interactions =====
function initTimelineHoverDashboards() {
    const timelineCards = document.querySelectorAll('.timeline-card');

    timelineCards.forEach(card => {
        const dashboard = card.querySelector('.hover-dashboard');
        if (!dashboard) return;

        card.addEventListener('mouseenter', () => {
            // Expand the dashboard
            dashboard.style.maxHeight = '500px';
            dashboard.style.borderTopColor = 'rgba(66, 165, 245, 0.3)';
            dashboard.style.marginTop = '20px';

            // Add glow effect to card
            card.style.boxShadow = '0 0 30px rgba(66, 165, 245, 0.3)';
            card.style.background = 'rgba(66, 165, 245, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            // Collapse the dashboard
            dashboard.style.maxHeight = '0';
            dashboard.style.borderTopColor = 'transparent';
            dashboard.style.marginTop = '0';

            // Remove glow effect
            card.style.boxShadow = 'none';
            card.style.background = 'rgba(66, 165, 245, 0.05)';
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initRotatingSubtitle();
    initMagneticButtons();  // Designer theme magnetic button effect
    initDarkModeToggle();
    initBlueprintDashboard();
    initCaseStudyCounters();
    initDividerDashboards(); // Add dashboard divider animations
    initTimelineHoverDashboards(); // Add timeline hover interactions
    initConfettiMetrics(); // Add confetti explosion to metric cards
});

// ===== Confetti Explosion on Metric Cards (Designer Theme) =====
function initConfettiMetrics() {
    if (!document.documentElement.classList.contains('theme-designer')) return;

    const metricCards = document.querySelectorAll('.metric-card');

    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createConfetti(this);
        });
    });
}

function createConfetti(card) {
    const colors = ['#ff6b35', '#FF6F91', '#00D9C0', '#9D4EDD', '#FFB627'];
    const shapes = ['◆', '●', '▲', '■', '★'];
    const confettiCount = 15;

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        confetti.textContent = shape;
        confetti.style.position = 'absolute';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '50%';
        confetti.style.color = color;
        confetti.style.fontSize = `${12 + Math.random() * 16}px`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        confetti.style.animation = `confetti ${0.8 + Math.random() * 0.4}s ease-out forwards`;

        card.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 1200);
    }
}

// ===== Newspaper Theme - Inline Style Override =====
// This function overrides all inline blue styles with newspaper black/cream theme
function applyNewspaperTheme() {
    // Only apply to undecided/newspaper theme
    if (!document.documentElement.classList.contains('theme-undecided')) return;

    console.log('Applying newspaper theme overrides...');

    // Get all elements in the document
    const allElements = document.querySelectorAll('*');

    allElements.forEach(el => {
        if (!el.style.cssText) return; // Skip elements without inline styles

        let styleText = el.style.cssText;
        let modified = false;

        // Replace all blue color variations
        const blueReplacements = {
            // Dark blue backgrounds -> Black/Dark gray
            '#0D2F61': '#1a1a1a',
            '#0d2f61': '#1a1a1a',

            // Light blue accents -> Black
            '#42A5F5': '#000',
            '#42a5f5': '#000',

            // RGBA blue backgrounds -> Light gray/transparent
            'rgba(66, 165, 245, 0.05)': 'rgba(0,0,0,0.03)',
            'rgba(66, 165, 245, 0.1)': 'rgba(0,0,0,0.08)',
            'rgba(66, 165, 245, 0.2)': 'rgba(0,0,0,0.12)',
            'rgba(66, 165, 245, 0.3)': 'rgba(0,0,0,0.15)',
            'rgba(66,165,245,0.05)': 'rgba(0,0,0,0.03)',
            'rgba(66,165,245,0.1)': 'rgba(0,0,0,0.08)',
            'rgba(66,165,245,0.2)': 'rgba(0,0,0,0.12)',
            'rgba(66,165,245,0.3)': 'rgba(0,0,0,0.15)',
        };

        // Apply color replacements
        for (const [oldColor, newColor] of Object.entries(blueReplacements)) {
            if (styleText.includes(oldColor)) {
                styleText = styleText.replace(new RegExp(oldColor, 'g'), newColor);
                modified = true;
            }
        }

        // Replace Courier New with Playfair Display SC for labels/uppercase text
        if (styleText.includes('Courier New')) {
            // Check if element has uppercase text or is a label
            const hasUppercase = el.textContent && el.textContent === el.textContent.toUpperCase();
            const isLabel = el.classList.contains('label') ||
                          el.tagName === 'LABEL' ||
                          styleText.includes('text-transform: uppercase');

            if (hasUppercase || isLabel) {
                styleText = styleText.replace(/font-family:[^;]+Courier New[^;]*/gi,
                    "font-family: 'Playfair Display SC', Georgia, serif");
            } else {
                styleText = styleText.replace(/font-family:[^;]+Courier New[^;]*/gi,
                    "font-family: Georgia, 'Times New Roman', serif");
            }
            modified = true;
        }

        // Remove border-radius for sharp newspaper corners
        if (styleText.includes('border-radius') && !styleText.includes('border-radius: 0')) {
            styleText = styleText.replace(/border-radius:[^;]+;?/gi, 'border-radius: 0;');
            modified = true;
        }

        // Apply modified styles
        if (modified) {
            el.style.cssText = styleText;
        }
    });

    console.log('Newspaper theme overrides applied successfully!');
}

// Initialize newspaper theme on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyNewspaperTheme);
} else {
    // DOM already loaded
    applyNewspaperTheme();
}

// ===== Theme-Specific Page Links =====
function updateThemeLinks() {
    const currentTheme = document.documentElement.className;

    // Map themes to their pages
    const themePages = {
        'theme-mentor': {
            contact: 'contact-mentor.html',
            resume: 'resume-mentor.html'
        },
        'theme-designer': {
            contact: 'contact-designer.html',
            resume: 'resume-designer.html'
        },
        'theme-business': {
            contact: 'contact-business.html',
            resume: 'resume-business.html'
        },
        'theme-classic': {
            contact: 'contact-classic.html',
            resume: 'resume-classic.html'
        },
        'theme-undecided': {
            contact: 'contact-undecided.html',
            resume: 'resume-undecided.html'
        },
        'theme-default': {
            contact: 'contact.html',
            resume: 'resume.html'
        }
    };

    const pages = themePages[currentTheme] || themePages['theme-default'];

    // Update contact CTA
    const contactCTA = document.getElementById('contact-cta');
    if (contactCTA) {
        contactCTA.href = pages.contact;
        console.log(`Contact CTA updated to: ${pages.contact}`);
    }

    // Update all resume links (View CSV buttons)
    const resumeLinks = document.querySelectorAll('a[href="resume.html"]');
    resumeLinks.forEach(link => {
        link.href = pages.resume;
        console.log(`Resume link updated to: ${pages.resume}`);
    });
}

// Initialize theme links on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateThemeLinks);
} else {
    updateThemeLinks();
}

console.log('Portfolio website loaded successfully!');
