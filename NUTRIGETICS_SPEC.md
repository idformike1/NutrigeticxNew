# Nutrigetics: Technical & Design Specification

This document serves as the comprehensive source of truth for the Nutrigetics web platform, outlining the structural, visual, and interactive systems as of May 2026.

---

## 1. Full Page Structure (Visual Order)
1. **Global Navigation**: Fixed header with dynamic theme switching.
2. **Hero Section**: High-impact brand introduction with immersive video/image background and product feature.
3. **Problem Section**: Scientific context "The metabolic problem" with interactive SVG path-filling and video.
4. **Product Showcase (Capsule)**: Scroll-linked video scrubbing (scrubbing `tab.mp4`) with sticky pinning.
5. **Stats Grid**: Numerical performance metrics with auto-counting animations.
6. **Carbon Section**: Large-scale environmental/metabolic impact section with parallax background.
7. **Products Grid**: Modular cards for NutriTab™, NutriPeak™, and NutriCore™.
8. **Field Trials (Map)**: Interactive global map with study locations.
9. **Community Carousel**: Horizontal-scrolling latest news and clinical impact stories.
10. **Final CTA**: "See the Difference" panoramic section.
11. **Footer**: Sticky-reveal footer with large brand iconography.

---

## 2. Component Inventory
| Component Name | File Path | Purpose |
| :--- | :--- | :--- |
| `Navigation` | `app/components/Navigation.tsx` | Fixed header, theme toggling, mobile menu. |
| `Hero` | `app/components/Hero.tsx` | Main brand entrance + CTA. |
| `ProblemSection` | `app/components/ProblemSection.tsx` | Contextual science + animated dynamic SVG. |
| `ProductShowcase` | `app/components/ProductShowcase.tsx` | Sticky video scrubbing (the "Capsule" interaction). |
| `StatsGrid` | `app/components/StatsGrid.tsx` | Performance counters + benefit cards. |
| `CarbonSection` | `app/components/CarbonSection.tsx` | Large text + parallax metabolic section. |
| `ProductsSection` | `app/components/ProductsSection.tsx` | Tiled product catalog. |
| `TrialsSection` | `app/components/TrialsSection.tsx` | Global map + study locations. |
| `CommunitySection` | `app/components/CommunitySection.tsx` | Horizontal carousel for impact stories. |
| `FinalCTA` | `app/components/FinalCTA.tsx` | Final conversion point. |
| `Footer` | `app/components/Footer.tsx` | Brand links, iconography, and reveal effect. |
| `SmoothScrollProvider`| `app/components/SmoothScrollProvider.tsx`| Lenis initialization and GSAP sync. |

---

## 3. Animation Details (GSAP & ScrollTrigger)

### Global Configuration
- **Library**: GSAP 3.12.5 + ScrollTrigger.
- **Scroller**: Lenis 1.1.20 (Smooth Scroll).
- **Easing Defaults**: `power3.out` for entrance; `none` for scrub.

### Key Animations
| Trigger Element | Animation Type | Details |
| :--- | :--- | :--- |
| **Hero Headline** | Load Stagger | Opacity: 0 -> 1, Y: 30 -> 0. Delay: 0.2s. |
| **Hero Background**| Parallax | `yPercent: 15`, Scrub: true. |
| **Problem SVG** | Draw SVG | `stroke-dashoffset` linked to scroll. Scrub: 1. |
| **Showcase Video** | Video Scrub | `currentTime` mapped to ScrollTrigger progress. |
| **Stats Numbers** | Count Up | `textContent` increment from 0 to target. Duration: 2s. |
| **Community Section**| Pin + Horizontal | `x: -(width)` while pinned. Scrub: 1. |
| **Footer Reveal** | Sticky Reveal | `z-index: 1` sticky behind `main` (z-index: 2). |

---

## 4. Breakpoint Behavior
| Breakpoint | Pixel Width | Layout Adjustments |
| :--- | :--- | :--- |
| **Mobile** | < 768px | Single column grids. Stacked navigation. Scaled-down `text-100`. |
| **Tablet** | 768px - 1279px | 2-column grids for stats/products. Hamburger menu enabled. |
| **Desktop** | 1280px - 1919px | 3-column or 4-column layouts. Full nav menu. |
| **UltraWide** | ≥ 1920px | Max-width container (1400px) centered with larger side padding. |

---

## 5. Color Palette (Hex)
- **Brand Green (Primary)**: `#2e3a1f`
- **Brand Beige (Background)**: `#f4ede6`
- **Light Green (Accent)**: `#8aab5a`
- **Card Backgrounds**: Transparent variants of primary colors.
- **Borders**: `#2e3a1f` with 10-15% opacity.

---

## 6. Typography (Aeonik System)
| Class Name | Font Size | Line Height | Usage |
| :--- | :--- | :--- | :--- |
| `text-100-regular` | `clamp(3rem, 9vw, 6.25rem)` | 0.93 | Main Hero Headlines |
| `text-60-regular` | `clamp(2rem, 5vw, 3.75rem)` | 1.08 | Section Titles |
| `text-44-regular` | `clamp(1.75rem, 4vw, 2.75rem)` | 1.1 | Large List Items / Footer |
| `text-14-caps` | 0.875rem | 1.5 | Navigation, Tags, Labels (Uppercase) |
| `text-16-regular-caps`| 1rem | 1.55 | Body Copy (Uppercase) |

---

## 7. Asset Mapping
- **Hero Video/Image**: `68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif` (Desktop)
- **Problem Video**: `corn.mp4`
- **Showcase Video**: `tab.mp4` (Tablet dissolving)
- **Product Watermark**: `68b94bde63c0321ac7dc4bfc_tablet_new.avif`
- **Map Assets**: Custom SVG implementation in `TrialsSection.tsx`.

---

## 8. Interactive Elements
- **Navigation Toggle**: On scroll down (y > 100), background switches from transparent to `#f4ede6`, text from light to dark.
- **Product Cards**: Scale up (1.05) on hover; background color transitions.
- **CTAs**: Solid background fills with inverted text color on hover; subtle scale transform (1.02).
- **Mobile Menu**: Full-screen overlay with staggered link reveal.

---

## 9. Known Discrepancies
- **Image Optimization**: Local images are served as static files; live site uses CDN host with dynamic resizing.
- **Form Submission**: Contact form is visual/frontend-only; no backend persistence implemented.
- **Scroll Logic**: Native custom ScrollTrigger vs. custom Lenis + GSAP implementation.
- **SVG Paths**: Some SVG path data in `ProblemSection` was simplified for performance.

---
*Created by Antigravity (Advanced Agentic Coding @ Google Deepmind)*
