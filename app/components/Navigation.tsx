"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const orangeBandRef = useRef<HTMLDivElement>(null);
  const creamBandRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.documentElement.classList.remove("lenis-stopped");
    }
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [menuOpen]);

  // Keyboard accessibility: Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useGSAP(() => {
    // 1. Navigation theme inversion based on sections
    const sections = [
      { id: "#hero", theme: "light" },
      { id: "#s-second", theme: "dark" },
      { id: "#capsule", theme: "light" },
      { id: "#nutrition-pillars", theme: "dark" },
      { id: "#onboarding-roadmap", theme: "light" },
      { id: "#s-numbers", theme: "dark" },
      { id: "#s-carbon", theme: "dark" },
      { id: "#products", theme: "dark" },
      { id: "#trials", theme: "dark" },
      { id: "#community", theme: "light" },
      { id: "#final-cta", theme: "light" },
    ];

    sections.forEach(({ id, theme }) => {
      const el = document.querySelector(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 5em",
        end: "bottom 5em",
        onToggle: (self) => {
          if (self.isActive) setActiveTheme(theme as "light" | "dark");
        },
      });
    });

    // 2. Entrance animation for nav
    gsap.fromTo(
      navRef.current,
      { y: "-100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useGSAP(() => {
    if (menuOpen) {
      // Immediately fade out the underlying main nav bar to prevent overlaps
      gsap.to(navRef.current, { opacity: 0, pointerEvents: "none", duration: 0.2 });
      
      // Ensure content panel is visible at start of slide down
      gsap.set(contentRef.current, { opacity: 1 });

      // Reset text element states to hidden before animation runs
      gsap.set([".menu-right-link", ".menu-left-social", ".menu-left-policy"], { opacity: 0, y: 40 });

      const tl = gsap.timeline();
      
      // Sequential wipe animation
      tl.fromTo(
        orangeBandRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.8, ease: "power3.inOut" }
      )
      .fromTo(
        creamBandRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.8, ease: "power3.inOut" },
        "-=0.6"
      )
      .fromTo(
        sidebarRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.9, ease: "power3.inOut" },
        "-=0.6"
      )
      .fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.6"
      );

      // GSAP Staggered entry for right links (settling softly with power4.out)
      tl.to(
        ".menu-right-link",
        { opacity: 1, y: 0, duration: 0.85, ease: "power4.out", stagger: 0.15 },
        "-=0.05"
      );

      // GSAP Staggered entry for left socials (starts at same time as right links)
      tl.to(
        ".menu-left-social",
        { opacity: 1, y: 0, duration: 0.85, ease: "power4.out", stagger: 0.1 },
        "<"
      );

      // GSAP Staggered entry for left policies (also starts at same time!)
      tl.to(
        ".menu-left-policy",
        { opacity: 1, y: 0, duration: 0.85, ease: "power4.out", stagger: 0.1 },
        "<"
      );
    } else {
      // Fade main nav bar back in on close
      gsap.to(navRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.3 });
    }
  }, [menuOpen]);

  const closeMenu = () => {
    // Fade out text content quickly as background slides away
    gsap.to(contentRef.current, { opacity: 0, duration: 0.25 });

    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    tl.to(sidebarRef.current, { y: "-100%", duration: 0.7, ease: "power3.inOut" })
      .to(creamBandRef.current, { y: "-100%", duration: 0.6, ease: "power3.inOut" }, "-=0.55")
      .to(orangeBandRef.current, { y: "-100%", duration: 0.5, ease: "power3.inOut" }, "-=0.45")
      .to(overlayRef.current, { opacity: 0, duration: 0.4 }, "-=0.4");
  };

  const NutrigeticLogo = () => (
    <div className="flex items-center gap-[0.7em] group cursor-pointer">
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-current transition-transform duration-700 group-hover:rotate-[180deg] shrink-0"
        role="img"
        aria-label="Nutrigetic Logo"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.35" />
        <path d="M10 6C10 6 16 11 16 16C16 21 10 26 10 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 6C22 6 16 11 16 16C16 21 22 26 22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="14" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="12" y1="22" x2="20" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <path d="M16 9C16 9 12.5 13 16 19C19.5 13 16 9 16 9Z" fill="currentColor" />
      </svg>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[1.15em] font-semibold tracking-[0.05em] uppercase text-current">Nutrigetic</span>
        <span className="text-[0.55em] font-semibold tracking-[0.2em] uppercase text-current/60 mt-[0.25em]">Clinical Performance</span>
      </div>
    </div>
  );

  const navLinks = [
    {
      label: "Programs",
      links: [
        { href: "#programs", label: "NutriTab™ Energy" },
        { href: "#programs", label: "NutriPeak™ Recovery" },
        { href: "#programs", label: "NutriCore™ Daily" },
      ],
    },
    {
      label: "About",
      links: [
        { href: "#about", label: "Coaching Approach" },
        { href: "#about", label: "Longevity Commitment" },
      ],
    },
    {
      label: "Science",
      links: [
        { href: "#science", label: "Bio-Telemetry & Data" },
        { href: "#science", label: "NutriPeak™ Research" },
        { href: "#science", label: "NutriCore™ Longevity" },
        { href: "#science", label: "Clinical Safety & Efficacy" },
      ],
    },
    { label: "Insights", href: "#blog" },
    { label: "Contact", href: "#contact-us" },
  ];

  return (
    <>
      {/* Default styles for static positioning and hover effects */}
      <style>{`
        /* Default hidden state for menu links animated via GSAP */
        .menu-right-link, .menu-left-social, .menu-left-policy {
          opacity: 0;
          transform: translateY(40px);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Expanding underline hover effect on all menu links */
        .menu-link-underline {
          position: relative;
          display: inline-block;
        }
        .menu-link-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 1.5px;
          bottom: -1px;
          left: 0;
          background-color: #F4EDE6;
          transform-origin: bottom left;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .menu-link-underline:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* Main Nav Bar */}
      <nav
        ref={navRef}
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-[110] flex items-center justify-between px-[1.2em] lg:px-[1.88em] h-[4em] md:h-[5em] transition-all duration-500 ${
          activeTheme === "dark"
            ? scrolled
              ? "bg-[#f4ede6]/90 text-[#2e3a1f] backdrop-blur-md shadow-sm border-b border-[#2e3a1f]/10"
              : "bg-[#f4ede6] text-[#2e3a1f] shadow-sm"
            : scrolled
              ? "bg-[#0d1508]/85 text-[#f4ede6] backdrop-blur-md shadow-sm border-b border-white/5"
              : "bg-transparent text-[#f4ede6]"
        }`}
      >
        <button
          id="menu-btn"
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-3 cursor-pointer text-current hover:opacity-85 transition-opacity"
          aria-label="Open menu"
        >
          {/* Square rounded hamburger icon */}
          <div className="w-[26px] h-[26px] border border-current/40 rounded-md flex flex-col justify-center items-center gap-[3.5px]">
            <span className="w-3.5 h-[1.2px] bg-current block" />
            <span className="w-3.5 h-[1.2px] bg-current block" />
          </div>
          <span className="text-[14px] font-medium tracking-[0.05em] uppercase hidden md:block">Menu</span>
        </button>

        <a href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" aria-label="Nutrigetic">
          <NutrigeticLogo />
        </a>

        <a href="#contact-us" id="nav-contact" className="text-14-caps relative group hidden md:block">
          Contact us
          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
        </a>
      </nav>

      {/* Sidebar overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[120]">
          {/* Backdrop overlay */}
          <div
            ref={overlayRef}
            style={{ opacity: 0 }}
            className="absolute inset-0 bg-black/45 backdrop-blur-md"
            onClick={closeMenu}
          />

          {/* Layer 1: Orange Band */}
          <div
            ref={orangeBandRef}
            style={{ transform: "translateY(-100%)" }}
            className="absolute top-0 left-0 right-0 w-full h-full md:h-[60vh] bg-[#e97052] z-10 shadow-2xl"
          />

          {/* Layer 2: Cream Band */}
          <div
            ref={creamBandRef}
            style={{ transform: "translateY(-100%)" }}
            className="absolute top-0 left-0 right-0 w-full h-full md:h-[60vh] bg-[#f4ede6] z-20 shadow-2xl"
          />

          {/* Layer 3: Brand Green Band (Background Curtain Only) */}
          <div
            ref={sidebarRef}
            style={{ transform: "translateY(-100%)" }}
            className="absolute top-0 left-0 right-0 w-full h-full md:h-[60vh] bg-[#2e3a1f] z-30 shadow-2xl pointer-events-none"
          />

          {/* Layer 4: Static Menu Content Panel (Always static on Y, overlays the green curtain) */}
          <div
            ref={contentRef}
            className="absolute top-0 left-0 right-0 w-full h-full md:h-[60vh] text-[#F4EDE6] flex flex-col overflow-y-auto z-40"
          >
            {/* Header bar inside the panel (border removed) */}
            <div className="w-full flex items-center justify-between px-[1.2em] lg:px-[1.88em] h-[4em] md:h-[5em] shrink-0 relative">
              <button
                onClick={closeMenu}
                className="flex items-center gap-3 cursor-pointer text-[#F4EDE6] hover:opacity-80 transition-opacity z-[130]"
                aria-label="Close menu"
              >
                {/* Square rounded close icon */}
                <div className="w-[26px] h-[26px] border border-white/40 rounded-md flex items-center justify-center">
                  <span className="w-3.5 h-[1.2px] bg-white block" />
                </div>
                <span className="text-[14px] font-medium tracking-[0.05em] uppercase">Close</span>
              </button>

              <a href="/" onClick={closeMenu} className="absolute left-1/2 -translate-x-1/2 z-[130]" aria-label="Nutrigetic">
                <NutrigeticLogo />
              </a>

              <a href="#contact-us" onClick={closeMenu} className="text-[14px] font-medium tracking-[0.05em] uppercase hover:opacity-80 transition-opacity z-[130] flex items-center gap-1">
                Contact us ↗
              </a>
            </div>

            {/* Menu columns (centered on desktop, borders removed) */}
            <div className="flex flex-col md:flex-row w-full px-6 md:px-[8%] lg:px-[10%] pt-6 md:pt-8 pb-8 md:pb-10 flex-grow overflow-y-auto items-stretch md:items-center">
              {/* Left column: secondary & legal links (centered, ordered second on mobile, first on desktop) */}
              <div className="w-full md:w-[35%] flex flex-col justify-center order-2 md:order-1 mb-8 md:mb-0 pb-4 md:pb-1 pr-0 md:pr-8 pt-0">
                {/* Secondary links (Upper left - row spacing reduced further: gap-[1px], py-0) */}
                <div className="flex flex-col gap-[1px] mb-6 md:mb-10">
                  <a
                    href="mailto:hello@nutrigetic.com"
                    className="menu-left-social text-[16px] font-medium tracking-tight opacity-80 hover:opacity-100 transition-opacity py-0 block menu-link-underline w-fit"
                  >
                    hello@nutrigetic.com
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-left-social text-[16px] font-medium tracking-tight opacity-80 hover:opacity-100 transition-opacity py-0 block menu-link-underline w-fit"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-left-social text-[16px] font-medium tracking-tight opacity-80 hover:opacity-100 transition-opacity py-0 block menu-link-underline w-fit"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="menu-left-social text-[16px] font-medium tracking-tight opacity-80 hover:opacity-100 transition-opacity py-0 block menu-link-underline w-fit"
                  >
                    YouTube
                  </a>
                </div>

                {/* Policy/Legal links (Lower left - row spacing reduced by half: gap-[1px], py-[1px]) */}
                <div className="flex flex-col gap-[1px]">
                  <a
                    href="#privacy"
                    onClick={closeMenu}
                    className="menu-left-policy text-[0.8rem] opacity-65 hover:opacity-95 transition-opacity block menu-link-underline py-[1px] w-fit"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="#terms"
                    onClick={closeMenu}
                    className="menu-left-policy text-[0.8rem] opacity-65 hover:opacity-95 transition-opacity block menu-link-underline py-[1px] w-fit"
                  >
                    Terms & Conditions
                  </a>
                  <a
                    href="#efficacy"
                    onClick={closeMenu}
                    className="menu-left-policy text-[0.8rem] opacity-65 hover:opacity-95 transition-opacity block menu-link-underline py-[1px] w-fit"
                  >
                    Efficacy Standards
                  </a>
                  <a
                    href="#safety"
                    onClick={closeMenu}
                    className="menu-left-policy text-[0.8rem] opacity-65 hover:opacity-95 transition-opacity block menu-link-underline py-[1px] w-fit"
                  >
                    Safety Protocols
                  </a>
                </div>
              </div>

              {/* Right column: primary links - centered, ordered first on mobile, second on desktop */}
              <div className="w-full md:w-[65%] flex flex-col justify-center items-start order-1 md:order-2 pl-0 md:pl-[12%] py-2 gap-1 md:gap-1.5">
                {navLinks.map((item) => (
                  <div
                    key={item.label}
                    className="menu-right-link w-full flex flex-col items-start"
                    onMouseEnter={() => setHoveredLink(item.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        onClick={closeMenu}
                        className={`flex items-center py-0.5 text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] font-medium leading-[1.05] tracking-tight transition-opacity duration-300 ${
                          hoveredLink && hoveredLink !== item.label ? "opacity-30" : "opacity-100"
                        }`}
                      >
                        <span className="menu-link-underline">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <div className="w-full flex flex-col items-start">
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          className={`flex items-center py-0.5 text-[2.5rem] md:text-[3.2rem] lg:text-[3.8rem] font-medium leading-[1.05] tracking-tight w-full text-left cursor-pointer transition-opacity duration-300 ${
                            hoveredLink && hoveredLink !== item.label ? "opacity-30" : "opacity-100"
                          }`}
                        >
                          <span className="menu-link-underline">
                            {item.label}
                          </span>
                          <span className={`ml-4 text-xl opacity-50 transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-45" : ""
                          }`}>+</span>
                        </button>

                        <div
                          className={`grid transition-all duration-300 ease-in-out w-full ${
                            activeDropdown === item.label
                              ? "grid-rows-[1fr] opacity-100 mt-1 mb-2"
                              : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="flex flex-col items-start gap-1.5 pl-4 border-l border-white/10 mt-1">
                              {item.links?.map((link) => (
                                <a
                                  key={link.label}
                                  href={link.href}
                                  onClick={closeMenu}
                                  className="text-14-caps opacity-65 hover:opacity-100 transition-opacity py-0.5 block menu-link-underline w-fit"
                                >
                                  {link.label}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
