# Farm Minerals Spacing Specification

This document details the padding, margin, and gap values for each section of the Farm Minerals website across key breakpoints.

> [!NOTE]
> All `em` values scale relative to the `body` font-size, which is `0.96vw` on desktop.
> `--padding-web` = `1.88em` (~30px)
> `--padding-mobile` = `1em` (16px)

## Global Spacing Tokens
| Token Name | Desktop (1920px / 1280px) | Tablet (768px) | Mobile (375px) |
| :--- | :--- | :--- | :--- |
| Container Padding | 1.88em | 1em | 1em |
| Section Max-Width | None (Full Width) | None | None |

---

## 1. Hero Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding (L/R) | 1.88em | 1.88em | 1em | 0 |
| Section Container | Margin (T/B) | 0 | 0 | 0 | 0 |
| Hero Wrap | Grid Gap | 0px | 0px | 0px | 0px |
| Headline (H1) | Margin-Bottom | 1em | 1em | 1em | 1em |

## 2. Problem Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding (L) | 1.88em | 1.88em | 1em | 1em |
| Section Container | Padding (B) | 3em | 3em | 3em | 3em |
| Section Container | Margin (T/B) | 0 | 0 | 0 | 0 |
| Grid Gap | Column/Row | 0px | 0px | 0px | 0px |

## 3. Stats Section (Numbers)
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Content Wrapper | Padding (All) | 3.13em 1.88em | 3.13em 1.88em | 4em 1em | 4em 1em |
| Content Wrapper | Grid Gap | 10em | 10em | 4em | 4em |
| Number List | Grid Gap | 3.2em | 3.2em | 2.38em | 2.38em |
| Number Item | Padding (B) | 1em | 1em | 1em | 1em |

## 4. Product Showcase (Capsule)
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Margin-Top | -10em | -10em | 0 | 0 |
| Capsule Item | Padding-Top | 23em | 23em | 16em | 16em |
| Headline Wrapper | Grid Gap | 1.5em | 1.5em | 1em | 1em |

## 5. Carbon Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Content Wrapper | Padding (All) | 3.13em 1.88em | 3.13em 1.88em | 3.13em 1em | 3.13em 1em |
| Description Wrap | Grid Gap | 2.63em | 2.63em | 2.63em | 2.63em |

## 6. Products Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding (All) | 6em 1.88em 15em | 6em 1.88em 15em | 4em 1em 7em | 4em 1em 7em |
| Items Grid | Grid Gap | 1.88em | 1.88em | 1em | 1em |
| Items Grid | Margin-Top | 12em | 12em | 7em | 7em |

## 7. Field Trials Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Content Wrapper | Padding-Top | 3.13em | 3.13em | 0 | 0 |
| Content Wrapper | Padding-Bottom | 0 | 0 | 12em | 12em |
| Heading Wrap | Padding-Left | 1.88em | 1.88em | 1em | 1em |
| CTA Wrapper | Padding (L/R) | 3.75em | 3.75em | 1em | 1em |

## 8. Community Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding-Top | 5.31em | 5.31em | 4.63em | 4.63em |
| Section Container | Padding-Left | 1.88em | 1.88em | 1em | 1em |
| Splide Gap | Gap Value | 1.69em | 1.69em | 1.69em | 1.69em |

## 9. Final CTA Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding-Left | 1.88em | 1.88em | 1em | 1em |
| Text Wrapper | Padding (T/B) | 5.63em 7em | 5.63em 7em | 4em 0 | 4em 0 |
| Content Gap | Column/Row | 16.25em | 16.25em | 1.63em | 1.63em |
| Buttons Gap | Gap Value | 1.25em | 1.25em | 1.25em | 1.25em |

## 10. Footer Section
| Element | Property | 1920px | 1280px | 768px | 375px |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Section Container | Padding | 3.75em 1.88em 1.38em | 3.75em 1.88em 1.38em | 3.75em 1em 1.38em | 3.75em 1em 1.38em |
| Links Wrapper | Grid Gap | 5em | 5em | 2em | 2em |
| Bottom Wrap | Grid Gap | 0 | 0 | 4em | 4em |

---

> [!TIP]
> All measurements derived from `farmminerals-live.css`. Values marked as `1em` or `1.88em` refer to the CSS variables `--padding-mobile` and `--padding-web` respectively.
