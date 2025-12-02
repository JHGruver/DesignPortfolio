# Portfolio Theme Style Guide

This document outlines the complete styling system for the Jacob Gruver Design Portfolio, including all 4 theme button styles and the special "Undecided" mapping.

---

## Overview

The portfolio features 4 distinct visual themes, each targeting a different audience persona:
1. **Designer** - Fun, energetic, motion-rich
2. **Business (Hiring Manager/Investor)** - Professional, data-driven, metrics-focused
3. **Mentor/Mentee** - Approachable, collaborative, warm
4. **Undecided** - Simple, classic, minimalist (Newspaper Minimalist style)

---

## Theme 1: Designer 🎨

### Personality
Fun, energetic, motion-rich, playful, creative

### Color Palette
- **Primary**: Orange (`#ff6b35` to `#ff8c42`)
- **Background**: White with orange gradient overlay
- **Text**: Dark gray (`#2c2c2c`)
- **Accent**: Bright orange (`#ff6b35`)

### Typography
- **Font Family**: Space Grotesk (modern, geometric sans-serif)
- **Style**: Bold, contemporary, friendly

### Welcome Page Button Styling
```css
background: rgba(255, 255, 255, 0.15); /* Frosted glass */
border: 2px solid rgba(255, 107, 53, 0.3);
backdrop-filter: blur(10px);
border-radius: 16px;
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
```

### Button Hover State
```css
background: rgba(255, 255, 255, 0.25);
border-color: rgba(255, 255, 255, 0.4);
box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
transform: translateY(-8px);
animation: float 3s ease-in-out infinite;
```

### Special Effects
- **Icons**: Spin continuously (360° rotation) on hover
- **Shapes**: Octagons that fall, roll, and shrink
- **Animation**: Infinite floating effect

### Design Philosophy
Glassmorphism with vibrant gradients - like hovering UI elements that invite interaction

---

## Theme 2: Business (Hiring Manager/Investor) 💼

### Personality
Professional, data-driven, metrics-focused, technical, powerful

### Color Palette
- **Primary**: Dark blue (`#1565c0`)
- **Secondary**: Medium blue (`#1976d2`)
- **Accent**: Bright blue (`#42a5f5`)
- **Background**: Light blue (`#e3f2fd`)
- **Text**: White (`#ffffff`)

### Typography
- **Font Family**: JetBrains Mono (monospace, tech-like)
- **Style**: Technical, code-inspired, precise

### Welcome Page Button Styling
```css
background: #1565c0;
border: 2px solid #0d47a1;
border-radius: 8px; /* Sharp corners */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
color: #ffffff; /* All buttons get white text */
```

### Button Hover State
```css
background: #1976d2;
border-color: #42a5f5;
box-shadow: 0 8px 16px rgba(21, 101, 192, 0.3);
```

### Special "Hiring Manager/Investor" Button Hover
The actual "Hiring Manager/Investor" button gets an electric gradient effect:
```css
background: linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #42a5f5 100%);
border: 3px solid #42a5f5; /* Thicker border */
box-shadow:
  0 12px 24px rgba(66, 165, 245, 0.5),
  0 0 60px rgba(66, 165, 245, 0.4),
  inset 0 1px 0 rgba(66, 165, 245, 0.3);
```

### Special Effects
- **Icons**: All white stroke
- **Shapes**: Boxes that break into smaller boxes on landing
- **Counter**: Live hover duration counter in seconds

### Design Philosophy
Corporate data visualization aesthetic - like a financial dashboard with precision metrics

---

## Theme 3: Mentor/Mentee 🌸

### Personality
Approachable, collaborative, warm, friendly, supportive

### Color Palette
- **Primary**: Deep purple (`#4a148c`)
- **Secondary**: Pastel purple (`#e1bee7` to `#f3e5f5`)
- **Accent**: Medium purple (`#9c27b0`)
- **Background**: White with soft purple gradient
- **Text**: Deep purple (`#4a148c`)

### Typography
- **Font Family**: Lexend (warm, friendly, readable)
- **Style**: Soft, approachable, welcoming

### Welcome Page Button Styling
```css
background: #f3e5f5; /* Pastel purple */
border: 2px solid #ce93d8;
border-radius: 16px;
box-shadow:
  0 4px 12px rgba(156, 39, 176, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.6); /* Skeuomorphic highlight */
```

### Button Hover State
```css
background: #e1bee7; /* Slightly darker purple */
box-shadow:
  0 8px 20px rgba(156, 39, 176, 0.2),
  inset 0 2px 0 rgba(255, 255, 255, 0.8);
```

### Special Effects
- **Shapes**: Organic bouncing circles that merge into a bubble
- **Shadows**: Layered, soft purple shadows
- **Style**: Skeuomorphic with inset highlights

### Design Philosophy
Soft, tactile design - like a comfortable pillow or warm embrace

---

## Theme 4: Undecided (Newspaper Minimalist) ❓

### Personality
Simple, classic, minimalist, editorial, timeless

### Color Palette
- **Primary**: Black (`#000000`)
- **Secondary**: Very dark gray (`#1a1a1a`)
- **Accent**: Dark gray (`#333333`)
- **Background**: White (`#ffffff`)
- **Text**: Black (`#000000`)

### Typography
- **Font Family**: Georgia, Times New Roman (serif, newspaper style)
- **Style**: Editorial, classic, timeless

### Welcome Page Button Styling
```css
background: #ffffff; /* Pure white */
border: 2px solid #000000; /* Black border */
border-radius: 0; /* Sharp corners - NO RADIUS */
box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1); /* Brutalist offset */
color: #000000;
```

### Button Hover State
```css
background: #000000; /* Black fill */
border-color: #000000;
box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3); /* Brutalist offset */
border-radius: 0; /* Enforced - NO RADIUS */
color: #ffffff; /* White text */
```

### Special Effects
- **Shapes**: Squares that spawn adjacent squares on landing
- **Icons**: White stroke on hover
- **Shadow**: Hard offset (no blur) - brutalist style

### Design Philosophy
Pure newspaper minimalist aesthetic - black and white only, 0 border radius, editorial typography, brutalist shadows

### Key CSS Variables (style.css)
```css
/* All border radius values are 0 */
--radius-md: 0px;
--radius-lg: 0px;
--radius-xl: 0px;
--radius-2xl: 0px;
--radius-3xl: 0px;

/* Hard shadows with no blur */
--shadow: 3px 3px 0px rgba(0, 0, 0, 1);
--shadow-lg: 6px 6px 0px rgba(0, 0, 0, 1);
--shadow-glow: none;

/* Minimal transitions */
--transition-base: all 0.2s linear;
--transition-spring: all 0.2s linear;
```

---

## Critical Implementation Details

### Undecided Theme Mapping

The "Undecided" button has a special implementation that maps it to the Classic (Newspaper Minimalist) theme:

#### In `welcome.html`:
```html
<button class="choice-btn" data-theme="undecided" data-target="index.html">
```

#### In `welcome-script.js`:
```javascript
const themes = {
    designer: 'theme-designer',
    business: 'theme-business',
    mentor: 'theme-mentor',
    classic: 'theme-classic',
    undecided: 'theme-classic', // Maps to classic theme
    default: 'theme-default'
};
```

#### In `index.html`:
```javascript
const themes = {
    designer: 'theme-designer',
    business: 'theme-business',
    mentor: 'theme-mentor',
    classic: 'theme-classic',
    undecided: 'theme-classic', // Maps to classic theme
    default: 'theme-default'
};
```

### Why This Matters

1. **Welcome Page Hover**: When hovering "Undecided" button, the welcome page preview shows the classic theme
2. **Button Appearance**: The undecided button itself uses classic newspaper minimalist styling
3. **Portfolio Navigation**: Clicking "Undecided" navigates to portfolio with classic theme applied
4. **Consistency**: All three locations (welcome-script.js, index.html, and CSS) must map undecided → classic

---

## Common Button Behaviors Across All Themes

### Base Button Behavior
- **Hover lift**: All buttons rise on hover (except Classic uses offset instead)
- **Icon scale**: Icons scale to 1.1x on hover
- **Smooth transitions**: 0.4s cubic-bezier easing
- **Border radius**: 16px (except Business at 8px, Undecided at 0px)
- **Padding**: 2.5rem 1.5rem
- **Min height**: 280px

### Exception: Undecided (Classic) Theme
- **Transform**: `translateY(-4px) translateX(-2px)` (diagonal offset)
- **Border radius**: `0` (enforced with `!important`)
- **Transition**: 0.2s linear (faster, more minimal)

---

## Button Icon Styling by Theme

| Theme | Icon Color | Hover Effect |
|-------|-----------|--------------|
| **Designer** | White | Spin 360° continuously |
| **Business** | White | Scale 1.1x |
| **Mentor** | Deep purple (#4a148c) | Scale 1.1x |
| **Undecided** | Black → White on hover | Scale 1.1x |

---

## Falling Shapes Animation by Theme

### Designer
- **Shape**: Octagons
- **Behavior**: Fall, roll, and shrink
- **Timing**: 3 shapes with 100ms delay between each

### Business
- **Shape**: Boxes
- **Behavior**: Fall and break into 4 smaller boxes on landing
- **Timing**: 3 shapes with 100ms delay, break at 1500ms

### Mentor
- **Shape**: Circles
- **Behavior**: Bounce and merge into one large bubble
- **Timing**: 3 shapes with 120ms delay, merge at 2500ms

### Undecided (Classic)
- **Shape**: Squares
- **Behavior**: Fall and spawn 2 adjacent squares on landing
- **Timing**: 3 shapes with 100ms delay, spawn at 1500ms

---

## File Structure

```
Design Portfolio/
├── index.html              # Portfolio page (maps undecided → classic)
├── welcome.html            # Welcome/choice page
├── style.css              # Portfolio theme styles (includes theme-undecided)
├── welcome-style.css      # Welcome page theme styles
├── welcome-script.js      # Welcome page logic (maps undecided → classic)
└── THEME_STYLE_GUIDE.md   # This file
```

---

## Testing Checklist

When verifying the "Undecided" theme implementation:

- [ ] Undecided button has `data-theme="undecided"` in HTML
- [ ] `welcome-script.js` maps `undecided: 'theme-classic'`
- [ ] `index.html` script maps `undecided: 'theme-classic'`
- [ ] Welcome page preview shows classic theme on undecided hover
- [ ] Undecided button has 0 border radius (not 16px)
- [ ] Undecided button hover shows black fill with white text
- [ ] Undecided button uses brutalist offset shadow (not soft blur)
- [ ] Portfolio page applies classic theme when undecided is clicked
- [ ] All CSS variables for theme-undecided use 0px border radius

---

## Design Principles Summary

| Theme | Principle | Visual Language |
|-------|-----------|-----------------|
| **Designer** | Glassmorphism | Frosted glass, vibrant gradients, playful motion |
| **Business** | Data Visualization | Technical precision, blue spectrum, metric-driven |
| **Mentor** | Skeuomorphism | Soft textures, warm colors, tactile depth |
| **Undecided** | Newspaper Minimalism | Editorial typography, brutalist shadows, pure B&W |

---

## Maintenance Notes

### When Adding New Components
1. Ensure all border-radius uses CSS variables
2. Test with all 4 themes
3. Verify undecided theme uses 0 border radius
4. Check that black/white contrast meets WCAG AA standards

### When Updating Themes
1. Update CSS variables in `style.css` for portfolio page
2. Update theme-specific overrides in `welcome-style.css` for welcome page
3. Test hover states in browser
4. Verify JavaScript theme mappings remain consistent

---

*Last Updated: 2025*
*Maintained by: Jacob Gruver*
