"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Footer items stagger reveal
    const ctx = gsap.context(() => {
      if (footerRef.current) {
        gsap.fromTo(
          footerRef.current.querySelectorAll(".footer-item"),
          { opacity: 0, y: "1.25em" },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 95%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);
  return (
    <footer
      ref={footerRef}
      className="relative z-0 bg-[#F4EDE6] text-[#2e3a1f] pt-[2.5em] md:pt-[3em] px-[var(--padding-mobile)] md:px-[var(--padding-web)] pb-[1.5em] md:pb-[2em] border-t border-[#2e3a1f]/10"
    >
      <div className="w-full">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-[1.5em] gap-y-[2.5em] md:gap-[3em] lg:gap-[6em] mb-[2.5em] md:mb-[3em]">
          <div className="footer-item col-span-2">
             <p className="text-14-caps text-[#8aab5a] mb-[0.6em] md:mb-[1em]">Fuel elite performance</p>
             <h2 className="text-32-regular md:text-44-regular font-light">Nutrigetic</h2>
          </div>
          
          <div className="footer-item">
            <p className="text-14-caps opacity-40 mb-[0.8em] md:mb-[1.25em]">Programs</p>
            <ul className="flex flex-col gap-[0.3em] md:gap-[0.5em]">
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriTab™ Energy</a></li>
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriPeak™ Recovery</a></li>
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriCore™ Daily</a></li>
            </ul>
          </div>
 
          <div className="footer-item">
            <p className="text-14-caps opacity-40 mb-[0.8em] md:mb-[1.25em]">Science</p>
            <ul className="flex flex-col gap-[0.3em] md:gap-[0.5em]">
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Bio-Telemetry</a></li>
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Cellular Absorption</a></li>
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Clinical Standards</a></li>
            </ul>
          </div>
 
          <div className="footer-item">
            <p className="text-14-caps opacity-40 mb-[0.8em] md:mb-[1.25em]">About</p>
            <ul className="flex flex-col gap-[0.3em] md:gap-[0.5em]">
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Approach</a></li>
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Longevity Hub</a></li>
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Blog</a></li>
            </ul>
          </div>
 
          <div className="footer-item">
            <p className="text-14-caps opacity-40 mb-[0.8em] md:mb-[1.25em]">Social</p>
            <ul className="flex flex-col gap-[0.3em] md:gap-[0.5em]">
              <li><a href="https://linkedin.com" target="_blank" className="text-14-caps hover:opacity-60 transition-opacity">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
   
        {/* Footer Bottom Info */}
        <div className="footer-item flex flex-col items-center justify-center pt-[2em] border-t border-[#2e3a1f]/10">
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[1.2em] md:gap-0 opacity-40">
             <p className="text-14-caps text-center md:text-left">© 2026 NUTRIGETIC INC.</p>
             <div className="flex flex-row flex-wrap items-center justify-center gap-[1.5em] md:gap-[3em]">
                <a href="/privacy" className="text-14-caps hover:underline">Privacy Policy</a>
                <a href="/terms" className="text-14-caps hover:underline">Terms of Use</a>
                <p className="text-14-caps">Created by Avri</p>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
