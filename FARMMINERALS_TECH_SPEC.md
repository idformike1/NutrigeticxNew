# Farm Minerals: Technical Reverse-Engineering Specification

This document contains precise technical data extracted directly from `farmminerals-dom.html`. All values are sourced from inline styles, internal `<style>` blocks, or captured DOM attributes.

---

## 1. Component Section Analysis

### [Section] Hero
- **Selector**: `.hero`
- **Computed Styles (at breakpoints)**:
  - **1920px (Desktop)**: `font-size: 0.96vw` (from `body`).
  - **768px (Tablet)**: `font-size: 1.75vw`.
  - **375px (Mobile)**: `font-size: 4vw`.
- **Padding/Margin**: Not found in captured HTML (External CSS).
- **Typography**:
  - `h1.text-100-regular`: Font-weight 400. Letter-spacing -0.03em. Line-height 0.93.
  - `.hero-description .text-16-regular-caps`: Uppercase. Letter-spacing 0.04em.
- **Assets**:
  - Background (Desktop): `https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif`
  - Background (Mobile): `https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68cc66c2b616f1163c0b70ec_fm_Mobile.avif`
  - Object-fit: Not found in captured HTML.
- **Z-Index**: Not found in captured HTML (likely default or external).

### [Section] Problem
- **Selector**: `#s-second`, `.second-section`
- **Assets**:
  - Background Video: `https://farm-minerals.b-cdn.net/corn.mp4`
  - Object-fit: Not found in captured HTML.
- **Interactive Element**: Corn SVG filling (ID `abda465b-bc11-3602-3386-d8b89a776177`).
  - Logic: Height 0em -> transition via ScrollTrigger (Logic not fully detailed in HTML inline, but referenced in IX2 attributes).

### [Section] Product Showcase (Capsule)
- **Selector**: `.capsule`
- **Assets**:
  - Video Scrubbing: `https://farm-minerals.b-cdn.net/tab.mp4`
- **Z-Index**: Not found in captured HTML.

### [Section] Stats
- **Selector**: `#s-numbers`, `.numbers`
- **Assets**:
  - Video: `https://farm-minerals.b-cdn.net/farm_main_video.mp4`
- **Typography**:
  - `.text-80-regular`: Counter font size.

### [Section] Community
- **Selector**: `.splide--posts`
- **Carousel Settings (from script)**:
  - `perPage`: 2.5 (Desktop), 1.5 (Tablet), 1 (Mobile).
  - `gap`: "1.69em".
  - `speed`: 1000ms.
  - `type`: "loop".

### [Section] Footer
- **Selector**: `.footer`
- **Reveal Implementation**:
  - `position: sticky` (from `globals.css` capture).
  - `bottom: 0`.
  - `z-index: 1`.
  - The preceding `<main>` tag has `position: relative` and `z-index: 2`.

---

## 2. GSAP & ScrollTrigger Configuration

### Animation 1: Video Scrubbing (ProductShowcase)
- **Trigger**: `.capsule`
- **Start**: `top top`
- **End**: `bottom bottom`
- **Scrub**: `1` (numeric scrub for inertia).
- **Pin**: Not explicitly found in the script block, but implied by the section structure and Webflow default scrubbing behavior for canvas/video.
- **Properties**:
  - Target: `frameObj.frame`
  - From: 0
  - To: `total - 1` (mapped to frame length).
  - Ease: "none".

### Animation 2: Text Stagger (Global)
- **Plugin**: `SplitText`
- **Target**: `[text-split]`, `[text-split-delay]`
- **Properties**:
  - Type: `chars` (Split into characters).
  - Animation: `autoAlpha: 0 -> 1`.
  - Stagger: Enabled (value not found in captured HTML).
  - Trigger: `top bottom` (Reveals as it enters the viewport).

### Animation 3: Header Color Inversion
- **Trigger**: Scroll event.
- **Target Sections**: `#s-second`, `#s-numbers`, `#s-carbon`, `#products`, `#s-trials`.
- **Mapping**: 
  - If header overlaps target section -> Color `#404F1D` (DARK).
  - Else -> Color `#F4EDE6` (LIGHT).
- **Elements Affected**: Navigation links, Lottie menu icon, Logo (SVG fill).

---

## 3. Footer Reveal Technical Logic
Webflow implements the reveal using a z-index stack:
1.  **Main Content Layer**:
    - Selector: `main.main`
    - Style: `position: relative; z-index: 2;`
    - Background: Solid (prevents transparency leak).
2.  **Footer Layer**:
    - Selector: `section.footer` (or `footer` tag)
    - Style: `position: sticky; bottom: 0; z-index: 1;`
3.  **Result**: As the user scrolls past the last section of `main`, the sticky footer stays at the bottom and is "revealed" as the content above moves out of view.

---

## 4. Video Scrubbing Mapping
- **Asset**: `tab.mp4`
- **Mapping Function**: `const i = Math.round(frameObj.frame); drawFrame(i);`
- **Scroll Distance**: The total vertical height of the `.capsule` section container.
- **Mapping Type**: Linear (Progress 0.0 = Frame 0, Progress 1.0 = Frame End).
- **Canvas Rendering**: Uses `object-fit: cover` logic via `Math.max(cw / iw, ch / ih)` inside `drawFrame`.

---

## 5. Design Tokens (Captured)
- **Colors**:
  - `LIGHT`: `#F4EDE6`
  - `DARK`: `#404F1D`
- **Typography (Body Base)**:
  - Desktop: `0.96vw`
  - Tablet: `1.75vw`
  - Mobile: `4vw`

---
*Note: Layout specifics like exact padding-top/bottom values in pixels were not found in the captured HTML source and reside in the external minified CSS file.*
