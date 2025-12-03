// ===== Theme Configuration =====
const themes = {
    designer: 'theme-designer',
    business: 'theme-business',
    mentor: 'theme-mentor',
    classic: 'theme-classic',
    undecided: 'theme-classic', // Undecided uses classic (newspaper minimalist) theme
    default: 'theme-default'
};

// ===== DOM Elements =====
const body = document.body;
const choiceButtons = document.querySelectorAll('.choice-btn');
let currentTheme = 'default';
let hoverTimeout = null;
let hoverTimer = null;
let hoverStartTime = null;

// Touch device detection
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
let selectedButton = null; // Track which button is "selected" on touch devices

// ===== Page Loading Animation =====
function createLoadingAnimation() {
    // Hide all content initially
    document.querySelector('.welcome-message').style.opacity = '0';
    document.querySelector('.question-section').style.opacity = '0';
    document.querySelector('.hint-text').style.opacity = '0';

    // Hide button content but keep structure for positioning
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        btn.style.opacity = '0';
        btn.querySelectorAll('.icon-wrapper, .choice-title, .choice-description').forEach(el => {
            el.style.opacity = '0';
        });
    });

    // Get button positions for landing tiles
    const buttonPositions = Array.from(buttons).map(btn => {
        const rect = btn.getBoundingClientRect();
        return {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
            element: btn
        };
    });

    // Create falling tiles - fewer on mobile for performance
    const isMobile = window.innerWidth <= 768;
    const totalTiles = isMobile ? 10 : 20;
    const tilesContainer = document.createElement('div');
    tilesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 10000;
    `;
    document.body.appendChild(tilesContainer);

    // Generate tiles
    for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        const isLandingTile = i < 4;

        // Random starting position across screen width
        const startX = Math.random() * window.innerWidth;
        const startY = -100 - (Math.random() * 300);

        tile.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: ${startY}px;
            width: ${buttonPositions[0].width}px;
            height: ${buttonPositions[0].height}px;
            background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9));
            border: 2px solid rgba(200,200,200,0.5);
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        `;

        tilesContainer.appendChild(tile);

        // Animate tile
        setTimeout(() => {
            if (isLandingTile) {
                // This tile lands in a button position
                const targetPos = buttonPositions[i];
                const fallDuration = 800 + (Math.random() * 200);

                tile.style.transition = `all ${fallDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)`;
                tile.style.left = targetPos.left + 'px';
                tile.style.top = targetPos.top + 'px';

                // After landing, do a gentle giggle
                setTimeout(() => {
                    tile.style.transition = 'transform 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                    tile.style.transform = 'rotate(2deg)';

                    setTimeout(() => {
                        tile.style.transform = 'rotate(-1deg)';

                        setTimeout(() => {
                            tile.style.transform = 'rotate(0deg)';

                            // Fade out tile and reveal button
                            setTimeout(() => {
                                tile.style.transition = 'opacity 300ms ease-out';
                                tile.style.opacity = '0';
                                targetPos.element.style.transition = 'opacity 300ms ease-out';
                                targetPos.element.style.opacity = '1';

                                // Drop in button content
                                setTimeout(() => {
                                    dropInButtonContent(targetPos.element, i * 100);
                                }, 200);
                            }, 200);
                        }, 150);
                    }, 150);
                }, fallDuration);

            } else {
                // This tile falls off the bottom
                const fallDuration = 700 + (Math.random() * 300);
                tile.style.transition = `all ${fallDuration}ms cubic-bezier(0.5, 0, 0.75, 0)`;
                tile.style.top = (window.innerHeight + 100) + 'px';
                tile.style.transform = `rotate(${Math.random() * 360 - 180}deg)`;

                setTimeout(() => {
                    tile.remove();
                }, fallDuration);
            }
        }, i * 50);
    }

    // After all tiles settle, drop in text content
    setTimeout(() => {
        dropInTextContent();
        fadeInHint();

        // Clean up tiles container
        setTimeout(() => {
            tilesContainer.remove();
        }, 1000);
    }, 2800);
}

function dropInButtonContent(button, delay) {
    const icon = button.querySelector('.icon-wrapper');
    const title = button.querySelector('.choice-title');
    const description = button.querySelector('.choice-description');

    setTimeout(() => {
        if (icon) {
            icon.style.cssText = `
                opacity: 0;
                transform: translateY(-50px);
                transition: all 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
            `;
            setTimeout(() => {
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, 50);
        }
    }, delay);

    setTimeout(() => {
        if (title) {
            title.style.cssText = `
                opacity: 0;
                transform: translateY(-30px);
                transition: all 450ms cubic-bezier(0.34, 1.56, 0.64, 1);
            `;
            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 50);
        }
    }, delay + 150);

    setTimeout(() => {
        if (description) {
            description.style.cssText = `
                opacity: 0;
                transform: translateY(-20px);
                transition: all 400ms cubic-bezier(0.34, 1.56, 0.64, 1);
            `;
            setTimeout(() => {
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }, 50);
        }
    }, delay + 250);
}

function dropInTextContent() {
    const welcomeMessage = document.querySelector('.welcome-message');
    const questionSection = document.querySelector('.question-section');

    // Welcome title
    setTimeout(() => {
        welcomeMessage.style.cssText = `
            opacity: 0;
            transform: translateY(-50px);
            transition: all 600ms cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        setTimeout(() => {
            welcomeMessage.style.opacity = '1';
            welcomeMessage.style.transform = 'translateY(0)';
        }, 50);
    }, 0);

    // Question
    setTimeout(() => {
        questionSection.style.cssText = `
            opacity: 0;
            transform: translateY(-40px);
            transition: all 550ms cubic-bezier(0.34, 1.56, 0.64, 1);
        `;
        setTimeout(() => {
            questionSection.style.opacity = '1';
            questionSection.style.transform = 'translateY(0)';
        }, 50);
    }, 200);
}

function fadeInHint() {
    const hint = document.querySelector('.hint-text');
    setTimeout(() => {
        hint.style.transition = 'opacity 800ms ease-out';
        hint.style.opacity = '0.7';
    }, 400);
}

// ===== Rave Mode Easter Egg =====
let raveMode = false;
let raveInterval = null;
let raveTilesInterval = null;
let raveTheme = 'default';
let raveTiles = [];

// Theme-specific color palettes
const raveThemes = {
    default: {
        colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0080', '#80FF00', '#0080FF', '#FF8000', '#8000FF', '#00FF80', '#FF0040'],
        shapes: 'mixed'
    },
    designer: {
        colors: ['#FF6B35', '#F7931E', '#00D9FF', '#FFC857', '#C200FB', '#FF006E', '#06FFA5', '#FFB627'],
        shapes: 'mixed'
    },
    business: {
        colors: ['#1565C0', '#0D47A1', '#42A5F5', '#1976D2', '#2196F3', '#64B5F6', '#1E88E5', '#0277BD'],
        shapes: 'square'
    },
    mentor: {
        colors: ['#9C27B0', '#E1BEE7', '#F3E5F5', '#BA68C8', '#AB47BC', '#CE93D8', '#8E24AA', '#7B1FA2'],
        shapes: 'circle'
    },
    undecided: {
        colors: ['#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3'],
        shapes: 'square'
    },
    classic: {
        colors: ['#000000', '#1A1A1A', '#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3'],
        shapes: 'square'
    }
};

function activateRaveMode() {
    if (raveMode) {
        deactivateRaveMode();
        return;
    }

    raveMode = true;
    const container = document.querySelector('.welcome-container');
    const title = document.querySelector('.welcome-title');

    // Add rave overlay
    const raveOverlay = document.createElement('div');
    raveOverlay.id = 'rave-overlay';
    raveOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: screen;
    `;
    document.body.appendChild(raveOverlay);

    // Start with default theme colors
    let colors = raveThemes.default.colors;
    let colorIndex = 0;

    raveInterval = setInterval(() => {
        // Update colors based on current rave theme
        colors = raveThemes[raveTheme].colors;

        body.style.background = `linear-gradient(135deg, ${colors[colorIndex]}, ${colors[(colorIndex + 1) % colors.length]})`;
        body.style.transition = 'background 200ms ease';

        // Pulse title
        title.style.transform = `scale(${1 + Math.random() * 0.1})`;
        title.style.color = colors[(colorIndex + 2) % colors.length];
        title.style.textShadow = `0 0 20px ${colors[(colorIndex + 3) % colors.length]}, 0 0 40px ${colors[(colorIndex + 4) % colors.length]}`;

        colorIndex = (colorIndex + 1) % colors.length;
    }, 200);

    // Create dancing tiles
    const tilesContainer = document.createElement('div');
    tilesContainer.id = 'rave-tiles';
    tilesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(tilesContainer);

    // Spawn dancing tiles
    const tileCount = 30;
    raveTiles = [];

    for (let i = 0; i < tileCount; i++) {
        const tile = document.createElement('div');
        tile.className = 'rave-tile';
        const size = 50 + Math.random() * 100;
        tile.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : Math.random() * 30 + 'px'};
            opacity: 0.6;
            transform-origin: center;
            transition: border-radius 300ms ease;
        `;
        tilesContainer.appendChild(tile);
        raveTiles.push({
            element: tile,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10,
            size: size,
            originalBorderRadius: tile.style.borderRadius
        });
    }

    // Animate dancing tiles
    raveTilesInterval = setInterval(() => {
        const currentColors = raveThemes[raveTheme].colors;
        const currentShapes = raveThemes[raveTheme].shapes;

        raveTiles.forEach((tile, index) => {
            // Update position
            tile.x += tile.vx;
            tile.y += tile.vy;

            // Bounce off edges
            if (tile.x < 0 || tile.x > window.innerWidth) tile.vx *= -1;
            if (tile.y < 0 || tile.y > window.innerHeight) tile.vy *= -1;

            // Update rotation
            tile.rotation += tile.rotationSpeed;

            // Update shape based on theme
            if (currentShapes === 'circle') {
                tile.element.style.borderRadius = '50%';
            } else if (currentShapes === 'square') {
                tile.element.style.borderRadius = '0px';
            } else {
                // Mixed - restore original
                tile.element.style.borderRadius = tile.originalBorderRadius;
            }

            // Apply transform and color
            const color = currentColors[index % currentColors.length];
            tile.element.style.left = tile.x + 'px';
            tile.element.style.top = tile.y + 'px';
            tile.element.style.transform = `rotate(${tile.rotation}deg) scale(${1 + Math.sin(Date.now() / 500 + index) * 0.3})`;
            tile.element.style.background = `linear-gradient(135deg, ${color}, ${currentColors[(index + 1) % currentColors.length]})`;
            tile.element.style.boxShadow = `0 0 20px ${color}`;
        });
    }, 50);

    // Pulse all buttons and add hover listeners for theme changes
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach((btn, index) => {
        const pulseInterval = setInterval(() => {
            const currentColors = raveThemes[raveTheme].colors;
            btn.style.transform = `scale(${1 + Math.sin(Date.now() / 300 + index) * 0.1}) rotate(${Math.sin(Date.now() / 500 + index) * 5}deg)`;
            btn.style.boxShadow = `0 0 30px ${currentColors[Math.floor(Math.random() * currentColors.length)]}`;
        }, 100);
        btn.dataset.raveInterval = pulseInterval;

        // Add hover listener to change rave theme
        const btnTheme = btn.getAttribute('data-theme');
        btn.addEventListener('mouseenter', () => {
            if (raveMode) {
                raveTheme = btnTheme;
            }
        });

        btn.addEventListener('mouseleave', () => {
            if (raveMode) {
                raveTheme = 'default';
            }
        });
    });

    // Add click hint
    title.style.cursor = 'pointer';
    title.title = 'Click again to stop the rave!';
}

function deactivateRaveMode() {
    raveMode = false;
    raveTheme = 'default';
    raveTiles = [];

    // Clear intervals
    if (raveInterval) {
        clearInterval(raveInterval);
        raveInterval = null;
    }
    if (raveTilesInterval) {
        clearInterval(raveTilesInterval);
        raveTilesInterval = null;
    }

    // Remove rave elements
    const raveOverlay = document.getElementById('rave-overlay');
    const raveTilesContainer = document.getElementById('rave-tiles');
    if (raveOverlay) raveOverlay.remove();
    if (raveTilesContainer) raveTilesContainer.remove();

    // Reset body background
    body.style.background = '';
    body.style.transition = 'background 500ms ease';

    // Reset title
    const title = document.querySelector('.welcome-title');
    title.style.transform = '';
    title.style.color = '';
    title.style.textShadow = '';
    title.style.cursor = 'pointer';
    title.title = 'Click for a surprise!';

    // Reset buttons
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        if (btn.dataset.raveInterval) {
            clearInterval(parseInt(btn.dataset.raveInterval));
            delete btn.dataset.raveInterval;
        }
        btn.style.transform = '';
        btn.style.boxShadow = '';
    });

    // Revert to current theme
    if (currentTheme !== 'default') {
        changeTheme(currentTheme);
    }
}

// ===== Initialize =====
function init() {
    // Run loading animation
    createLoadingAnimation();

    // Easter egg: Click on title to activate rave mode
    const title = document.querySelector('.welcome-title');
    title.style.cursor = 'pointer';
    title.title = 'Click for a surprise!';
    title.addEventListener('click', activateRaveMode);

    // Set up hover events for each button
    choiceButtons.forEach(button => {
        const theme = button.getAttribute('data-theme');

        if (!isTouchDevice) {
            // Desktop: Mouse hover behavior
            button.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    changeTheme(theme);
                }, 50);

                createFallingShapes(button, theme);

                if (theme === 'business') {
                    startHoverCounter(button);
                }
            });

            button.addEventListener('mouseleave', () => {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    if (currentTheme !== 'default') {
                        revertToDefault();
                    }
                }, 100);

                stopHoverCounter(button);
            });

            // Desktop click - navigate immediately
            button.addEventListener('click', () => {
                navigateToTheme(theme, button);
            });
        } else {
            // Touch device: Tap to preview, tap again to confirm
            button.addEventListener('click', (e) => {
                e.preventDefault();

                if (selectedButton === button) {
                    // Second tap on same button - navigate
                    navigateToTheme(theme, button);
                } else {
                    // First tap - preview theme
                    // Remove selection from previous button
                    if (selectedButton) {
                        selectedButton.classList.remove('touch-selected');
                    }

                    // Select this button and preview theme
                    selectedButton = button;
                    button.classList.add('touch-selected');
                    changeTheme(theme);
                    createFallingShapes(button, theme);

                    if (theme === 'business') {
                        startHoverCounter(button);
                    }
                }
            });
        }
    });

    // Touch: Tap outside buttons to deselect
    if (isTouchDevice) {
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.choice-btn') && selectedButton) {
                selectedButton.classList.remove('touch-selected');
                selectedButton = null;
                revertToDefault();
            }
        });
    }

    // Helper function to navigate to theme
    function navigateToTheme(theme, button) {
        localStorage.setItem('preferredTheme', theme);
        addThemeTransition(theme, button);
        const target = button.getAttribute('data-target');
        const transitionDuration = getTransitionDuration(theme);
        setTimeout(() => {
            window.location.href = target + '?theme=' + theme;
        }, transitionDuration);
    }

    // Container hover - maintain theme
    const container = document.querySelector('.choices-container');
    container.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
    });

    container.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
            revertToDefault();
        }, 200);
    });

    // Keyboard navigation
    setupKeyboardNavigation();

    // Check for returning user preference
    checkSavedPreference();
}

// ===== Falling Shapes Functions =====
function createFallingShapes(button, theme) {
    // Get button's center position
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance to bottom of viewport
    const viewportHeight = window.innerHeight;
    const distanceToBottom = viewportHeight - centerY - 40; // 40 is half shape height, so shape sits on bottom

    // Theme-specific shape creation
    switch(theme) {
        case 'designer':
            createDesignerOctagons(centerX, centerY, distanceToBottom);
            break;
        case 'business':
            createBusinessBoxes(centerX, centerY, distanceToBottom);
            break;
        case 'mentor':
            createMentorMergingShapes(centerX, centerY, distanceToBottom);
            break;
        case 'classic':
            createClassicSquares(centerX, centerY, distanceToBottom);
            break;
        case 'undecided':
            createClassicSquares(centerX, centerY, distanceToBottom);
            break;
        default:
            createDefaultShapes(centerX, centerY, distanceToBottom);
    }
}

// Designer: Octagons that fall, roll, and shrink
function createDesignerOctagons(centerX, centerY, distanceToBottom) {
    const delays = [0, 100, 200];
    const horizontalOffsets = [0, -30, 40];

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'falling-shape shape-octagon';
            shape.setAttribute('data-shape-index', i);
            shape.setAttribute('data-theme-shape', 'designer');

            shape.style.left = `${centerX - 40}px`;
            shape.style.top = `${centerY - 40}px`;
            shape.style.setProperty('--fall-distance', `${distanceToBottom}px`);
            shape.style.setProperty('--horizontal-offset', `${horizontalOffsets[i]}px`);

            document.body.appendChild(shape);

            // Remove after animation completes (4s animation + delay)
            setTimeout(() => shape.remove(), 4500);
        }, delays[i]);
    }
}

// Business: Boxes that break into smaller boxes
function createBusinessBoxes(centerX, centerY, distanceToBottom) {
    const delays = [0, 100, 200];
    const horizontalOffsets = [0, -30, 40];

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'falling-shape shape-box';
            shape.setAttribute('data-shape-index', i);
            shape.setAttribute('data-theme-shape', 'business');

            shape.style.left = `${centerX - 40}px`;
            shape.style.top = `${centerY - 40}px`;
            shape.style.setProperty('--fall-distance', `${distanceToBottom}px`);
            shape.style.setProperty('--horizontal-offset', `${horizontalOffsets[i]}px`);

            document.body.appendChild(shape);

            // When box lands, break it into smaller boxes
            setTimeout(() => {
                breakIntoSmallerBoxes(shape, centerX + horizontalOffsets[i], centerY + distanceToBottom);
                shape.remove();
            }, 1500); // Break when it lands
        }, delays[i]);
    }
}

// Helper: Break box into smaller boxes
function breakIntoSmallerBoxes(parentBox, landX, landY) {
    const smallBoxCount = 4;
    const offsets = [
        { x: -15, y: -15 },
        { x: 15, y: -15 },
        { x: -15, y: 15 },
        { x: 15, y: 15 }
    ];

    for (let i = 0; i < smallBoxCount; i++) {
        setTimeout(() => {
            const smallBox = document.createElement('div');
            smallBox.className = 'falling-shape shape-box small-box';
            smallBox.style.width = '30px';
            smallBox.style.height = '30px';
            smallBox.style.left = `${landX - 15}px`;
            smallBox.style.top = `${landY - 15}px`;
            smallBox.style.animation = `scatterBox${i} 1s ease-out forwards`;
            smallBox.style.setProperty('--scatter-x', `${offsets[i].x}px`);
            smallBox.style.setProperty('--scatter-y', `${offsets[i].y}px`);

            document.body.appendChild(smallBox);

            setTimeout(() => smallBox.remove(), 2000);
        }, i * 50);
    }
}

// Mentor: Organic bouncing circles that merge into a bubble
function createMentorMergingShapes(centerX, centerY, distanceToBottom) {
    const delays = [0, 120, 240];
    const horizontalOffsets = [0, -35, 45];
    const shapes = [];

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'falling-shape shape-circle mentor-circle';
            shape.setAttribute('data-shape-index', i);
            shape.setAttribute('data-theme-shape', 'mentor');

            shape.style.left = `${centerX - 40}px`;
            shape.style.top = `${centerY - 40}px`;
            shape.style.setProperty('--fall-distance', `${distanceToBottom}px`);
            shape.style.setProperty('--horizontal-offset', `${horizontalOffsets[i]}px`);
            shape.style.setProperty('--merge-x', `${centerX - 40}px`);
            shape.style.setProperty('--merge-y', `${centerY + distanceToBottom - 40}px`);

            document.body.appendChild(shape);
            shapes.push({ element: shape, offset: horizontalOffsets[i] });

            // After all shapes have bounced and started merging
            if (i === 2) {
                setTimeout(() => {
                    createMergedBubble(shapes, centerX, centerY + distanceToBottom);
                }, 2500);
            }
        }, delays[i]);
    }
}

// Helper: Create organic merged bubble
function createMergedBubble(shapes, centerX, centerY) {
    // Fade out individual shapes as they merge
    shapes.forEach(({ element }) => {
        element.style.transition = 'opacity 0.6s ease-out';
        element.style.opacity = '0';
    });

    setTimeout(() => {
        shapes.forEach(({ element }) => element.remove());

        // Create merged bubble with organic wobble
        const bubble = document.createElement('div');
        bubble.className = 'falling-shape shape-circle merged-bubble';
        bubble.style.width = '140px';
        bubble.style.height = '140px';
        bubble.style.left = `${centerX - 70}px`;
        bubble.style.top = `${centerY - 70}px`;
        bubble.style.animation = 'organicBubbleMerge 2s ease-out forwards';

        document.body.appendChild(bubble);

        setTimeout(() => {
            bubble.style.transition = 'opacity 0.8s ease-out';
            bubble.style.opacity = '0';
            setTimeout(() => bubble.remove(), 800);
        }, 2000);
    }, 600);
}

// Classic/Undecided: Squares that burst into pixels like fireworks
function createClassicSquares(centerX, centerY, distanceToBottom) {
    const delays = [0, 100, 200];
    const horizontalOffsets = [0, -30, 40];

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'falling-shape shape-square';
            shape.setAttribute('data-shape-index', i);
            shape.setAttribute('data-theme-shape', 'classic');

            shape.style.left = `${centerX - 40}px`;
            shape.style.top = `${centerY - 40}px`;
            shape.style.setProperty('--fall-distance', `${distanceToBottom}px`);
            shape.style.setProperty('--horizontal-offset', `${horizontalOffsets[i]}px`);

            document.body.appendChild(shape);

            // When square hits the bottom, burst into firework pixels
            setTimeout(() => {
                createFireworkBurst(centerX + horizontalOffsets[i], centerY + distanceToBottom);
                shape.remove();
            }, 1500); // Time to fall and hit

        }, delays[i]);
    }
}

// Helper: Create firework burst effect with pixels
function createFireworkBurst(landX, landY) {
    const pixelCount = 16; // Number of pixels in the burst
    const angleStep = (Math.PI * 2) / pixelCount;

    for (let i = 0; i < pixelCount; i++) {
        const angle = angleStep * i;
        const distance = 80 + Math.random() * 40; // Random distance for organic feel
        const velocityX = Math.cos(angle) * distance;
        const velocityY = Math.sin(angle) * distance;

        setTimeout(() => {
            const pixel = document.createElement('div');
            pixel.className = 'firework-pixel';
            pixel.style.width = '8px';
            pixel.style.height = '8px';
            pixel.style.left = `${landX - 4}px`;
            pixel.style.top = `${landY - 4}px`;
            pixel.style.setProperty('--burst-x', `${velocityX}px`);
            pixel.style.setProperty('--burst-y', `${velocityY}px`);
            pixel.style.animation = 'fireworkBurst 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';

            document.body.appendChild(pixel);

            setTimeout(() => pixel.remove(), 1200);
        }, i * 15); // Slight stagger for more dynamic effect
    }
}

// Default: Simple circles (fallback)
function createDefaultShapes(centerX, centerY, distanceToBottom) {
    const delays = [0, 100, 200];
    const horizontalOffsets = [0, -30, 40];

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'falling-shape';
            shape.setAttribute('data-shape-index', i);

            shape.style.left = `${centerX - 40}px`;
            shape.style.top = `${centerY - 40}px`;
            shape.style.setProperty('--fall-distance', `${distanceToBottom}px`);
            shape.style.setProperty('--horizontal-offset', `${horizontalOffsets[i]}px`);

            document.body.appendChild(shape);

            setTimeout(() => shape.remove(), 3000);
        }, delays[i]);
    }
}

// ===== Hover Counter Functions =====
function startHoverCounter(button) {
    // Remove any existing counter
    stopHoverCounter(button);

    // Create counter element
    const counter = document.createElement('div');
    counter.className = 'hover-counter';
    counter.textContent = '0.0s';
    button.appendChild(counter);

    // Start timing
    hoverStartTime = Date.now();

    // Update counter every 100ms
    hoverTimer = setInterval(() => {
        const elapsed = (Date.now() - hoverStartTime) / 1000;
        counter.textContent = `${elapsed.toFixed(1)}s`;
    }, 100);
}

function stopHoverCounter(button) {
    // Clear timer
    if (hoverTimer) {
        clearInterval(hoverTimer);
        hoverTimer = null;
    }

    // Remove counter element
    const counter = button.querySelector('.hover-counter');
    if (counter) {
        counter.remove();
    }

    hoverStartTime = null;
}

// ===== Theme Changing =====
function changeTheme(newTheme) {
    // Remove all theme classes
    Object.values(themes).forEach(themeClass => {
        body.classList.remove(themeClass);
    });

    // Add new theme class
    const themeClass = themes[newTheme];
    if (themeClass) {
        body.classList.add(themeClass);
        currentTheme = newTheme;
    }

    // Add special effects for specific themes
    addThemeEffects(newTheme);
}

function revertToDefault() {
    changeTheme('default');
}

// ===== Theme-Specific Effects =====
function addThemeEffects(theme) {
    // Remove any existing special effects
    removeThemeEffects();

    switch(theme) {
        case 'designer':
            addDesignerEffects();
            break;
        case 'business':
            addBusinessEffects();
            break;
        case 'mentor':
            addMentorEffects();
            break;
        case 'classic':
            addClassicEffects();
            break;
    }
}

function removeThemeEffects() {
    // Remove any dynamically added effect elements
    const existingEffects = document.querySelectorAll('.theme-effect');
    existingEffects.forEach(effect => effect.remove());
}

function addDesignerEffects() {
    // Add floating particles or shapes for fun/energetic feel
    // Already handled in CSS animations
}

function addBusinessEffects() {
    // Data visualization effects already in CSS
    // Could add animated chart elements here if desired
}

function addMentorEffects() {
    // Warm, welcoming effects
    // Could add subtle pulse animations
}

function addClassicEffects() {
    // Minimalist approach - rely on CSS
}

// ===== Keyboard Navigation =====
function setupKeyboardNavigation() {
    const buttonsArray = Array.from(choiceButtons);
    let currentIndex = -1;

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                currentIndex = (currentIndex + 1) % buttonsArray.length;
                focusButton(buttonsArray[currentIndex]);
                break;

            case 'ArrowLeft':
                e.preventDefault();
                currentIndex = currentIndex <= 0 ? buttonsArray.length - 1 : currentIndex - 1;
                focusButton(buttonsArray[currentIndex]);
                break;

            case '1':
                buttonsArray[0].click();
                break;

            case '2':
                buttonsArray[1].click();
                break;

            case '3':
                buttonsArray[2].click();
                break;

            case '4':
                buttonsArray[3].click();
                break;

            case 'Enter':
                if (currentIndex >= 0) {
                    buttonsArray[currentIndex].click();
                }
                break;
        }
    });
}

function focusButton(button) {
    button.focus();
    const theme = button.getAttribute('data-theme');
    changeTheme(theme);
}

// ===== Saved Preference =====
function checkSavedPreference() {
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        // Show a subtle indicator that we remember their preference
        const buttons = document.querySelectorAll(`[data-theme="${savedTheme}"]`);
        buttons.forEach(button => {
            button.style.borderWidth = '3px';
        });
    }
}

// ===== Theme-Specific Transitions =====
function addThemeTransition(theme, button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    switch(theme) {
        case 'designer':
            addDesignerTransition();
            break;
        case 'business':
            addBusinessTransition(centerX, centerY);
            break;
        case 'mentor':
            addMentorTransition(centerX, centerY);
            break;
        case 'classic':
        case 'undecided':
            addClassicTransition();
            break;
        default:
            body.classList.add('exiting');
    }
}

function getTransitionDuration(theme) {
    const durations = {
        'designer': 1200,
        'business': 1000,
        'mentor': 1400,
        'classic': 800,
        'undecided': 800,
        'default': 600
    };
    return durations[theme] || 600;
}

// Designer: Explosion of colorful shapes
function addDesignerTransition() {
    body.classList.add('transition-designer');

    // Create explosion of colorful octagons
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const shape = document.createElement('div');
            shape.className = 'explosion-octagon';

            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            const angle = (Math.PI * 2 * i) / 30;
            const distance = 100 + Math.random() * 400;
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;

            shape.style.left = `${startX}px`;
            shape.style.top = `${startY}px`;
            shape.style.setProperty('--end-x', `${endX}px`);
            shape.style.setProperty('--end-y', `${endY}px`);
            shape.style.setProperty('--rotation', `${Math.random() * 720}deg`);

            document.body.appendChild(shape);
        }, i * 20);
    }
}

// Business: Grid wipe from center
function addBusinessTransition(centerX, centerY) {
    body.classList.add('transition-business');

    const gridSize = 8;
    const cellWidth = window.innerWidth / gridSize;
    const cellHeight = window.innerHeight / gridSize;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.style.left = `${col * cellWidth}px`;
            cell.style.top = `${row * cellHeight}px`;
            cell.style.width = `${cellWidth}px`;
            cell.style.height = `${cellHeight}px`;

            // Calculate distance from center for stagger
            const cellCenterX = (col + 0.5) * cellWidth;
            const cellCenterY = (row + 0.5) * cellHeight;
            const distance = Math.sqrt(
                Math.pow(cellCenterX - centerX, 2) +
                Math.pow(cellCenterY - centerY, 2)
            );
            const maxDistance = Math.sqrt(
                Math.pow(window.innerWidth / 2, 2) +
                Math.pow(window.innerHeight / 2, 2)
            );
            const delay = (distance / maxDistance) * 600;

            cell.style.animationDelay = `${delay}ms`;
            document.body.appendChild(cell);
        }
    }
}

// Mentor: Organic bubble expand and merge
function addMentorTransition(centerX, centerY) {
    body.classList.add('transition-mentor');

    // Create expanding bubble from click point
    const bubble = document.createElement('div');
    bubble.className = 'transition-bubble';
    bubble.style.left = `${centerX}px`;
    bubble.style.top = `${centerY}px`;
    document.body.appendChild(bubble);

    // Create secondary bubbles for organic feel
    const bubbleCount = 8;
    for (let i = 0; i < bubbleCount; i++) {
        setTimeout(() => {
            const secondaryBubble = document.createElement('div');
            secondaryBubble.className = 'transition-bubble-secondary';
            const angle = (Math.PI * 2 * i) / bubbleCount;
            const distance = 150;
            secondaryBubble.style.left = `${centerX + Math.cos(angle) * distance}px`;
            secondaryBubble.style.top = `${centerY + Math.sin(angle) * distance}px`;
            document.body.appendChild(secondaryBubble);
        }, i * 80);
    }
}

// Classic/Undecided: Ink blot spread
function addClassicTransition() {
    body.classList.add('transition-classic');

    // Create ink blot effect from corners
    const corners = [
        { x: 0, y: 0 },
        { x: window.innerWidth, y: 0 },
        { x: 0, y: window.innerHeight },
        { x: window.innerWidth, y: window.innerHeight }
    ];

    corners.forEach((corner, index) => {
        setTimeout(() => {
            const blot = document.createElement('div');
            blot.className = 'ink-blot';
            blot.style.left = `${corner.x}px`;
            blot.style.top = `${corner.y}px`;
            document.body.appendChild(blot);
        }, index * 100);
    });
}

// ===== Exit Animation =====
// Add CSS class for exit animation
const style = document.createElement('style');
style.textContent = `
    body.exiting {
        animation: fadeOut 0.6s ease-out forwards;
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;
document.head.appendChild(style);

// ===== Analytics/Tracking (Optional) =====
function trackThemeSelection(theme) {
    // If you want to track which themes users choose
    console.log('Theme selected:', theme);

    // Example: Send to analytics
    // if (window.gtag) {
    //     gtag('event', 'theme_selection', {
    //         'theme': theme
    //     });
    // }
}

// ===== Preload Assets =====
function preloadAssets() {
    // Preload the next page for faster transition
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'index.html';
    document.head.appendChild(link);
}

// ===== Performance Optimization =====
// Debounce theme changes to prevent rapid switching
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Smooth Scroll for Better UX =====
function addSmoothScroll() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// ===== Touch Support for Mobile =====
function setupTouchSupport() {
    let touchStartTime;

    choiceButtons.forEach(button => {
        button.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            const theme = button.getAttribute('data-theme');
            changeTheme(theme);
        });

        button.addEventListener('touchend', (e) => {
            const touchDuration = Date.now() - touchStartTime;

            // If touch was brief (tap), navigate
            if (touchDuration < 500) {
                button.click();
            }
        });
    });
}

// ===== Accessibility Announcements =====
function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = `Preview: ${theme} theme activated`;
    document.body.appendChild(announcement);

    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Add screen reader only styles
const srStyle = document.createElement('style');
srStyle.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(srStyle);

// ===== Enhanced Theme Changing with Announcements =====
const originalChangeTheme = changeTheme;
changeTheme = function(newTheme) {
    originalChangeTheme(newTheme);
    announceThemeChange(newTheme);
};

// ===== Easter Egg: Konami Code =====
function setupKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateEasterEgg() {
    // Fun surprise - cycle through all themes rapidly
    let index = 0;
    const themeKeys = Object.keys(themes).filter(t => t !== 'default');

    const interval = setInterval(() => {
        changeTheme(themeKeys[index % themeKeys.length]);
        index++;

        if (index > 12) { // Cycle 3 times through all themes
            clearInterval(interval);
            revertToDefault();
        }
    }, 200);
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    init();
    preloadAssets();
    addSmoothScroll();
    setupTouchSupport();
    setupKonamiCode();

    // Log welcome message
    console.log('%c👋 Welcome to Jacob Gruver\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
    console.log('%cHover over the options to preview different experiences', 'font-size: 14px; color: #666;');
    console.log('%cBuilt with compassion and attention to detail', 'font-size: 12px; font-style: italic; color: #999;');
});

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { changeTheme, themes };
}
