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
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
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
      className="relative z-0 bg-[#F4EDE6] text-[#2e3a1f] pt-[6em] px-[var(--padding-web)] pb-[2em] border-t border-[#2e3a1f]/10"
    >
      <div className="w-full">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[3em] lg:gap-[6em] mb-[10em]">
          <div className="footer-item col-span-2 opacity-0">
             <p className="text-14-caps text-[#8aab5a] mb-[1em]">Fuel elite performance</p>
             <h2 className="text-44-regular mb-[2em]">Nutrigetic</h2>
          </div>
          
          <div className="footer-item opacity-0">
            <p className="text-14-caps opacity-40 mb-[2em]">Programs</p>
            <ul className="flex flex-col gap-[1em]">
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriTab™ Energy</a></li>
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriPeak™ Recovery</a></li>
              <li><a href="#programs" className="text-14-caps hover:opacity-60 transition-opacity">NutriCore™ Daily</a></li>
            </ul>
          </div>
 
          <div className="footer-item opacity-0">
            <p className="text-14-caps opacity-40 mb-[2em]">Science</p>
            <ul className="flex flex-col gap-[1em]">
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Bio-Telemetry</a></li>
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Cellular Absorption</a></li>
              <li><a href="#science" className="text-14-caps hover:opacity-60 transition-opacity">Clinical Standards</a></li>
            </ul>
          </div>
 
          <div className="footer-item opacity-0">
            <p className="text-14-caps opacity-40 mb-[2em]">About</p>
            <ul className="flex flex-col gap-[1em]">
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Approach</a></li>
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Longevity Hub</a></li>
              <li><a href="#about" className="text-14-caps hover:opacity-60 transition-opacity">Blog</a></li>
            </ul>
          </div>
 
          <div className="footer-item opacity-0">
            <p className="text-14-caps opacity-40 mb-[2em]">Social</p>
            <ul className="flex flex-col gap-[1em]">
              <li><a href="https://linkedin.com" target="_blank" className="text-14-caps hover:opacity-60 transition-opacity">LinkedIn ↗</a></li>
            </ul>
          </div>
        </div>
  
        {/* Big Leaf Icon at bottom */}
        <div className="footer-item opacity-0 flex flex-col items-center justify-center pt-[5em] border-t border-[#2e3a1f]/10">
          <div className="mb-[5em]">
             <svg width="10em" height="7em" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#2e3a1f]">
                <path d="M60 80C60 80 50 60 40 50C30 40 0 40 0 40C0 40 30 35 40 25C50 15 60 0 60 0C60 0 70 15 80 25C90 35 120 40 120 40C120 40 90 45 80 55C70 65 60 80 60 80Z" fill="currentColor" />
              </svg>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-[4em] lg:gap-0 opacity-40">
             <p className="text-14-caps">© 2026 NUTRIGETIC INC.</p>
             <div className="flex gap-[3em]">
                <a href="/privacy" className="text-14-caps hover:underline">Privacy Policy</a>
                <a href="/terms" className="text-14-caps hover:underline">Terms of Use</a>
             </div>
             <p className="text-14-caps">WEBSITE BY ADELT</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
