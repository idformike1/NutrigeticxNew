"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTheme, setActiveTheme] = useState<"light" | "dark">("light");

  useGSAP(() => {
    // 1. Navigation theme inversion based on sections
    const sections = [
      { id: "#hero", theme: "light" },
      { id: "#s-second", theme: "dark" },
      { id: "#s-numbers", theme: "dark" },
      { id: "#capsule", theme: "light" },
      { id: "#s-carbon", theme: "dark" },
      { id: "#products", theme: "dark" },
      { id: "#trials", theme: "dark" },
      { id: "#community", theme: "light" },
      { id: "#final-cta", theme: "light" },
    ];

    sections.forEach(({ id, theme }) => {
      ScrollTrigger.create({
        trigger: id,
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
      const tl = gsap.timeline();
      tl.fromTo(
        sidebarRef.current,
        { xPercent: -100 },
        { xPercent: 0, duration: 0.5, ease: "power4.out" }
      ).fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        "-=0.3"
      );
    }
  }, [menuOpen]);

  const closeMenu = () => {
    const tl = gsap.timeline({ onComplete: () => setMenuOpen(false) });
    tl.to(sidebarRef.current, { xPercent: -100, duration: 0.4, ease: "power4.in" })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.2");
  };

  const NutrigeticLogo = () => (
    <div className="flex flex-col items-center">
      {/* Leaf icon */}
      <svg width="32" height="18" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-1">
        <path d="M16 18C16 18 13.5 14 10 12C6.5 10 0 10 0 10C0 10 6.5 8 10 6C13.5 4 16 0 16 0C16 0 18.5 4 22 6C25.5 8 32 10 32 10C32 10 25.5 12 22 14C18.5 16 16 18 16 18Z" fill="currentColor" />
      </svg>
      {/* Text logo */}
      <span className="text-[1.125em] font-medium tracking-tight leading-none">Nutrigetic</span>
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
      <nav
        ref={navRef}
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[1em] lg:px-[1.88em] h-[5em] transition-all duration-500 ${
          activeTheme === "dark" ? "bg-[#f4ede6] text-[#2e3a1f] shadow-sm" : "bg-transparent text-[#f4ede6]"
        }`}
      >
        <button
          id="menu-btn"
          onClick={() => setMenuOpen(true)}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Open menu"
        >
          <div className="w-7 h-5 flex flex-col justify-between">
            <span className="block h-[1.5px] w-full bg-current" />
            <span className="block h-[1.5px] w-full bg-current" />
          </div>
          <span className="text-14-caps hidden md:block">menu</span>
        </button>

        <a href="/" className="absolute left-1/2 -translate-x-1/2 mt-2" aria-label="Nutrigetic">
          <NutrigeticLogo />
        </a>

        <a href="#contact-us" id="nav-contact" className="text-14-caps relative group hidden md:block">
          Contact us
          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full" />
        </a>
      </nav>

      {/* Sidebar overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeMenu}
          />
          <div
            ref={sidebarRef}
            className="relative w-[340px] md:w-[400px] h-full flex flex-col bg-[#1e2a10] text-[#F4EDE6]"
          >
            <div className="flex items-center justify-between px-8 pt-6 pb-4 border-b border-white/10">
              <div style={{ width: 70 }}><NutrigeticLogo /></div>
              <button onClick={closeMenu} className="text-14-caps opacity-70 hover:opacity-100 transition-opacity" aria-label="Close">
                close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {navLinks.map((item) => (
                <div key={item.label} className="border-b border-white/10">
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-3 py-4 text-[1.5rem] font-light tracking-tight hover:opacity-70 transition-opacity">
                      <span className="text-[#8aab5a] text-xs">✦</span>
                      {item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                        className="flex items-center gap-3 py-4 text-[1.5rem] font-light tracking-tight hover:opacity-70 transition-opacity w-full text-left"
                      >
                        <span className="text-[#8aab5a] text-xs">✦</span>
                        {item.label}
                        <span className="ml-auto text-sm opacity-50">{activeDropdown === item.label ? "−" : "+"}</span>
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pb-3 pl-6 flex flex-col gap-2">
                          {item.links?.map((link) => (
                            <a key={link.href} href={link.href} className="text-14-caps opacity-60 hover:opacity-100 transition-opacity py-1">
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="px-8 py-6 border-t border-white/10 flex justify-between items-end">
              <div>
                <p className="text-14-caps text-[#8aab5a]">fuel your energy</p>
                <a href="mailto:hello@nutrigetic.com" className="text-14-caps opacity-60 hover:opacity-100 transition-opacity">hello@nutrigetic.com</a>
              </div>
              <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-14-caps opacity-60 hover:opacity-100 transition-opacity">
                linkedin
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
