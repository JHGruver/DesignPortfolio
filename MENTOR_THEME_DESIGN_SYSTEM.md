# Mentor Theme Design System

A comprehensive guide to the Mentor theme's design language, visual patterns, and implementation details.

---

## 🎨 Design Philosophy

The Mentor theme embodies **gentle guidance and approachability** through soft purple tones, nurturing shadows, and fluid animations. It's designed to feel welcoming, supportive, and professional—like a trusted mentor.

### Core Principles
1. **Soft & Approachable** - Purple gradients instead of harsh blacks/whites
2. **Gentle Motion** - Bounce easing creates playful, non-aggressive animations
3. **Layered Depth** - Multiple shadow layers create subtle dimensionality
4. **Clarity with Warmth** - Readable dark text on light backgrounds with purple accents

---

## 🎯 Color Palette

### Primary Colors

| Color | Value | Usage |
|-------|-------|-------|
| **Primary Purple** | `rgba(156, 39, 176, 1)` <br/> `#9C27B0` | Headings, accents, borders, metric values |
| **Light Purple** | `rgba(225, 190, 231, 0.X)` <br/> `#E1BEE7` | Gradient backgrounds, subtle glows |
| **Ultra-Light Lavender** | `rgba(243, 229, 245, 0.X)` <br/> `#F3E5F5` | Card backgrounds, hover states |

### Opacity Variations

**Purple Accent Opacities:**
- `1.0` - Full strength (headings, metric values)
- `0.95` - Strong accent (titles, primary text)
- `0.85-0.9` - Medium emphasis (subheadings, labels)
- `0.6-0.75` - Borders, dividers, icons
- `0.4-0.5` - Subtle borders, hover effects
- `0.2-0.35` - Very subtle accents, backgrounds
- `0.08-0.15` - Background tints, radial glows

### Text Colors

| Use Case | Value |
|----------|-------|
| **Primary Headings** | `rgba(156, 39, 176, 0.95)` |
| **Subheadings** | `rgba(156, 39, 176, 0.8-0.9)` |
| **Body Text (Dark)** | `rgba(50, 50, 50, 1)` to `rgba(80, 80, 80, 1)` |
| **Secondary Text** | `rgba(100, 100, 100, 0.8-0.85)` |

### Background Colors

| Component | Value |
|-----------|-------|
| **Section Backgrounds** | `linear-gradient(180deg, rgba(250, 250, 250, 1), rgba(243, 229, 245, 0.3-0.5))` |
| **Card Backgrounds** | `linear-gradient(135deg, rgba(255, 255, 255, 0.9-0.95), rgba(243, 229, 245, 0.5-0.6))` |
| **White Base** | `rgba(250, 250, 250, 1)` or `rgba(255, 255, 255, 0.8-1)` |

---

## ✨ Shadow System

### Shadow Layers
Shadows use **multiple layers** for depth and soft lighting effects.

#### Card/Component Shadows

**Default (Resting State):**
```css
box-shadow:
    0 4px 16px rgba(156, 39, 176, 0.1-0.12),
    0 2px 8px rgba(156, 39, 176, 0.06-0.08);
```

**Hover State:**
```css
box-shadow:
    0 12px 32px rgba(156, 39, 176, 0.18-0.2),
    0 6px 16px rgba(156, 39, 176, 0.12-0.15);
```

**Enhanced Hover (Larger Lifts):**
```css
box-shadow:
    0 16px 48px rgba(156, 39, 176, 0.2),
    0 8px 24px rgba(156, 39, 176, 0.15);
```

#### Button Shadows

**Default:**
```css
box-shadow:
    0 4px 12px rgba(156, 39, 176, 0.2-0.3),
    0 2px 4px rgba(156, 39, 176, 0.15-0.2);
```

**Hover:**
```css
box-shadow:
    0 12px 32px rgba(156, 39, 176, 0.3-0.4),
    0 6px 12px rgba(156, 39, 176, 0.2-0.25);
```

#### Text Shadows
```css
/* Headings - soft glow */
text-shadow: 0 2px 8px rgba(156, 39, 176, 0.15);

/* Metric values - subtle emphasis */
text-shadow: 0 2px 6px rgba(156, 39, 176, 0.2);
```

---

## 🎬 Animation System

### Easing Function
**Bounce Easing** (signature of Mentor theme):
```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```
Creates a playful, friendly "bounce" at the end of animations.

### Timing
- **Quick interactions:** `0.3s ease`
- **Standard:** `0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Smooth cards:** `0.5s cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Complex transitions:** `0.6s cubic-bezier(0.34, 1.56, 0.64, 1)`
- **Progress bars:** `1.5s cubic-bezier(0.34, 1.56, 0.64, 1)`

### Transform Patterns

#### Lift Effects
```css
/* Small lift - subtle elements */
transform: translateY(-4px) scale(1.02);

/* Medium lift - cards */
transform: translateY(-6px) scale(1.02);
transform: translateY(-8px) scale(1.01-1.03);

/* Large lift - emphasis */
transform: translateY(-12px) scale(1.01-1.02);
```

#### Scale Effects
```css
/* Subtle growth */
scale(1.01-1.02)

/* Noticeable growth */
scale(1.03-1.05)

/* Icon emphasis */
scale(1.1-1.15)
```

#### Combined Transforms
```css
/* Button hover */
transform: translateY(-6px) scale(1.02);

/* Card hover */
transform: translateY(-8px) scale(1.01);

/* Metric card hover */
transform: translateY(-6px) scale(1.05);

/* Icon hover */
transform: scale(1.15) translateY(-4px);
```

---

## 📦 Component Patterns

### 1. Cards

**Structure:**
```css
html.theme-mentor .card-component {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 229, 245, 0.5));
    border: 1px solid rgba(156, 39, 176, 0.2);
    border-radius: 8px;
    box-shadow:
        0 4px 16px rgba(156, 39, 176, 0.1),
        0 2px 8px rgba(156, 39, 176, 0.06);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

html.theme-mentor .card-component:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow:
        0 12px 32px rgba(156, 39, 176, 0.18),
        0 6px 16px rgba(156, 39, 176, 0.12);
    border-color: rgba(156, 39, 176, 0.35);
}
```

**Border Radius:**
- Small components: `4px`
- Standard cards: `6px` to `8px`
- Large sections: `12px`

---

### 2. Buttons

**Structure:**
```css
html.theme-mentor .btn {
    background: linear-gradient(135deg, rgba(156, 39, 176, 0.95), rgba(156, 39, 176, 0.85));
    color: rgba(255, 255, 255, 1);
    box-shadow:
        0 4px 12px rgba(156, 39, 176, 0.3),
        0 2px 6px rgba(156, 39, 176, 0.2);
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 4px;
}

html.theme-mentor .btn:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow:
        0 12px 32px rgba(156, 39, 176, 0.4),
        0 6px 16px rgba(156, 39, 176, 0.25);
}
```

**Optional Gloss Effect:**
```css
html.theme-mentor .btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
}

html.theme-mentor .btn:hover::before {
    opacity: 1;
}
```

---

### 3. Sections with Background Glows

**Pattern:**
```css
html.theme-mentor .section {
    background: linear-gradient(180deg, rgba(250, 250, 250, 1), rgba(243, 229, 245, 0.4));
    position: relative;
}

html.theme-mentor .section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60-80%;
    height: 60-80%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at center, rgba(225, 190, 231, 0.12-0.15), transparent 65-70%);
    pointer-events: none;
    z-index: 0;
}
```

---

### 4. Metric/Statistics Cards

**Dashboard Container:**
```css
html.theme-mentor .divider-dashboard {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 229, 245, 0.6));
    border: 2px solid rgba(156, 39, 176, 0.25);
    border-radius: 12px;
    padding: 32px 40px;
    box-shadow:
        0 4px 20px rgba(156, 39, 176, 0.12),
        0 2px 10px rgba(156, 39, 176, 0.08);
}
```

**Individual Metric Card:**
```css
html.theme-mentor .divider-metric {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(156, 39, 176, 0.2);
    border-radius: 8px;
    padding: 24px 20px;
}

/* Top accent line (appears on hover) */
html.theme-mentor .divider-metric::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(156, 39, 176, 0.6), rgba(156, 39, 176, 0.3));
    opacity: 0;
    transition: opacity 0.3s ease;
}

html.theme-mentor .divider-metric:hover::before {
    opacity: 1;
}
```

**Metric Values (Gradient Text):**
```css
html.theme-mentor .divider-metric-value {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, rgba(156, 39, 176, 1), rgba(156, 39, 176, 0.7));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

---

### 5. Progress Bars

```css
html.theme-mentor .progress-bar {
    height: 4px;
    background: rgba(156, 39, 176, 0.15);
    border-radius: 4px;
    overflow: hidden;
}

html.theme-mentor .progress-bar span {
    background: linear-gradient(90deg, rgba(156, 39, 176, 0.9), rgba(156, 39, 176, 0.6));
    border-radius: 4px;
    transition: width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 0 8px rgba(156, 39, 176, 0.4);
}
```

---

### 6. Tags/Labels

```css
html.theme-mentor .tag {
    background: linear-gradient(135deg, rgba(156, 39, 176, 0.12), rgba(225, 190, 231, 0.15));
    color: rgba(156, 39, 176, 0.95);
    border: 1px solid rgba(156, 39, 176, 0.25);
    padding: 6px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

html.theme-mentor .tag:hover {
    background: linear-gradient(135deg, rgba(156, 39, 176, 0.2), rgba(225, 190, 231, 0.25));
    transform: scale(1.05);
    box-shadow: 0 2px 8px rgba(156, 39, 176, 0.2);
}
```

---

### 7. Borders & Dividers

**Border Colors by Context:**
- Subtle: `rgba(156, 39, 176, 0.12-0.15)`
- Standard: `rgba(156, 39, 176, 0.2-0.25)`
- Hover: `rgba(156, 39, 176, 0.35-0.4)`
- Accent bars: `rgba(156, 39, 176, 0.5-0.6)`

**Left Accent Bars:**
```css
border-left: 4px solid rgba(156, 39, 176, 0.6);
```

**Bottom Dividers:**
```css
border-bottom: 1px solid rgba(156, 39, 176, 0.15);
```

---

## 🖼️ Special Effects

### Network Web (Hero Image)

**Concept:** Profile icons fan out from behind the hero image on hover, connected by thin purple lines.

```css
/* Connection lines */
html.theme-mentor .hero-image::before {
    width: 1000px;
    height: 1000px;
    background-image:
        /* 1px thin lines at multiple angles */
        linear-gradient(45deg, transparent 49.5%, rgba(156, 39, 176, 0.25) 49.5%, ...);
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Network nodes using box-shadow pattern */
html.theme-mentor .hero-image::after {
    content: '👤';
    box-shadow:
        /* 16 nodes positioned in two rings */
        0 -350px 0 0 rgba(225, 190, 231, 0.9),
        247px -247px 0 0 rgba(225, 190, 231, 0.9),
        /* ... */;
}

html.theme-mentor .hero-image:hover::before,
html.theme-mentor .hero-image:hover::after {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
}
```

---

## 📐 Layout & Spacing

### Grid Systems

**Three-column grids:**
```css
grid-template-columns: repeat(3, 1fr);
gap: 24px-32px;
```

**Responsive auto-fit:**
```css
grid-template-columns: repeat(auto-fit, minmax(180px-200px, 1fr));
gap: 24px;
```

### Spacing Scale (Base: 8px)

| Size | Value | Usage |
|------|-------|-------|
| xs | 4px | Tiny gaps, fine adjustments |
| sm | 8px | Compact spacing |
| md | 16px | Icon margins, inner padding |
| lg | 24px | Card gaps, section spacing |
| xl | 32px | Large section gaps |
| 2xl | 40px | Major section padding |
| 3xl | 48px-64px | Section top/bottom margins |
| 4xl | 80px-120px | Major section separators |

---

## 🎨 Typography

### Font Weights
- **Light:** 300-400 (body text, descriptions)
- **Regular:** 400-500 (standard text)
- **Semibold:** 600 (labels, emphasis)
- **Bold:** 700 (subheadings, metric labels)
- **Extra Bold:** 800-900 (large metric values)

### Text Transforms
- **UPPERCASE:** Labels, tags, small headings
- **Letter Spacing:** `0.5px` (labels), `1px` (uppercase headings)

---

## 🔄 Overriding Inline Styles

The Mentor theme uses **attribute selectors** to override hardcoded inline styles:

### Color Overrides
```css
/* Override hardcoded white text */
html.theme-mentor .section p[style*="color: #ffffff"],
html.theme-mentor .section p[style*="color:#ffffff"] {
    color: rgba(50, 50, 50, 1) !important;
}

/* Override hardcoded borders */
html.theme-mentor .section div[style*="border: 1px solid #ffffff"] {
    border-color: rgba(156, 39, 176, 0.2) !important;
}
```

### Background Overrides
```css
/* Override black backgrounds */
html.theme-mentor div[style*="background: #000000"],
html.theme-mentor div[style*="background:#000000"] {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(243, 229, 245, 0.6)) !important;
}
```

---

## 📋 Component Checklist

When creating a new component in the Mentor theme, ensure:

- [ ] **Colors:** Primary purple `rgba(156, 39, 176, X)` is used
- [ ] **Gradients:** White-to-lavender gradients on cards
- [ ] **Shadows:** Layered soft shadows (default + hover states)
- [ ] **Borders:** Purple borders with appropriate opacity
- [ ] **Radius:** 4-12px border-radius depending on size
- [ ] **Animations:** Bounce easing `cubic-bezier(0.34, 1.56, 0.64, 1)`
- [ ] **Hover Effects:** Lift (`translateY`) + scale (1.01-1.05)
- [ ] **Transitions:** 0.4-0.6s for standard interactions
- [ ] **Typography:** Readable dark text on light backgrounds
- [ ] **Z-index:** Proper layering (backgrounds at 0, content at 1+)

---

## 🎯 Implementation Examples

### Example 1: Simple Card Component
```css
html.theme-mentor .my-card {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 229, 245, 0.5));
    border: 1px solid rgba(156, 39, 176, 0.2);
    border-radius: 8px;
    padding: 24px;
    box-shadow:
        0 4px 16px rgba(156, 39, 176, 0.1),
        0 2px 8px rgba(156, 39, 176, 0.06);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

html.theme-mentor .my-card:hover {
    transform: translateY(-8px) scale(1.01);
    box-shadow:
        0 12px 32px rgba(156, 39, 176, 0.18),
        0 6px 16px rgba(156, 39, 176, 0.12);
    border-color: rgba(156, 39, 176, 0.35);
}

html.theme-mentor .my-card h3 {
    color: rgba(156, 39, 176, 0.95);
    margin-bottom: 12px;
}

html.theme-mentor .my-card p {
    color: rgba(80, 80, 80, 1);
    line-height: 1.6;
}
```

### Example 2: Section with Radial Glow
```css
html.theme-mentor .my-section {
    background: linear-gradient(180deg, rgba(250, 250, 250, 1), rgba(243, 229, 245, 0.4));
    position: relative;
    padding: 80px 20px;
}

html.theme-mentor .my-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70%;
    height: 70%;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle at center, rgba(225, 190, 231, 0.15), transparent 70%);
    pointer-events: none;
    z-index: 0;
}

html.theme-mentor .my-section .content {
    position: relative;
    z-index: 1;
}
```

---

## 📊 Summary Table

| Element | Key Attributes |
|---------|----------------|
| **Primary Color** | `rgba(156, 39, 176, 1)` |
| **Easing** | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| **Card Background** | `linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(243, 229, 245, 0.5))` |
| **Border** | `1px solid rgba(156, 39, 176, 0.2)` |
| **Border Radius** | `4px` - `12px` |
| **Shadow (Default)** | `0 4px 16px rgba(156, 39, 176, 0.1)` |
| **Shadow (Hover)** | `0 12px 32px rgba(156, 39, 176, 0.18)` |
| **Lift (Hover)** | `translateY(-6px to -12px)` |
| **Scale (Hover)** | `scale(1.01-1.05)` |
| **Transition** | `0.4-0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` |

---

## 🚀 Future Enhancements

Potential additions to the Mentor theme:
- Animated purple particle effects for hero sections
- Pulse animations on key metric values
- Gradient text animations for headings
- Soft purple glow trails following cursor on interactive elements
- Loading states with purple progress indicators

---

## 📝 Notes

- **Accessibility:** All animations respect `prefers-reduced-motion`
- **Performance:** Gradients and shadows are optimized for 60fps
- **Consistency:** All purple values stem from the base `#9C27B0`
- **Scalability:** Design tokens can be extracted into CSS variables for easier maintenance

---

**Version:** 1.0
**Last Updated:** 2025
**Theme Location:** `/style.css` lines 14710-15662
