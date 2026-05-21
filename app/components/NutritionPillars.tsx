"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

gsap.registerPlugin(ScrollTrigger);

const capsuleCards = [
  {
    id: "card-1",
    num: "01",
    sub: "PRECISION DIETARY METRICS",
    title: "Biochemical Dietary Engineering",
    description: "Every calorie, macro, and micro-nutrient is scientifically calculated based on your clinical biomarker, hormone, and gut telemetry, ensuring 100% absorption.",
    features: [
      "Clinical Blood & Biomarker Screening",
      "Hormonal Signal Mapping",
      "Gut Microbiome & Telemetry Profiling"
    ]
  },
  {
    id: "card-2",
    num: "02",
    sub: "REAL-TIME CLINICAL DIAL",
    title: "Daily Nutritionist Access",
    description: "Direct secure text communication with your dedicated Lead Nutritionist. Get real-time dietary updates for business travel, race days, or high-stress schedules.",
    features: [
      "24/7 Secure Encrypted Text Conduit",
      "Dynamic Meal Plan Calibrations",
      "Active Performance Event Syncing"
    ]
  },
  {
    id: "card-3",
    num: "03",
    sub: "INTERDISCIPLINARY TELEMETRY",
    title: "Supporting Science Synthesis",
    description: "Our supporting biochemists, performance psychologists, and sports coaches feed telemetry to your nutritionist, keeping your diet and lifestyle in perfect alignment.",
    features: [
      "Biochemist Formulation Audits",
      "Cognitive Load & Stress Mapping",
      "Coaching Staff Telemetry Integration"
    ]
  },
];

export default function NutritionPillars() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopTriggerRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState(0);

  useGSAP(
    () => {
      // 1. Title Character Stagger
      const headlines = sectionRef.current?.querySelectorAll(".reveal-head");
      headlines?.forEach((headline) => {
        const chars = headline.querySelectorAll(".split-char");
        gsap.fromTo(
          chars,
          { opacity: 0, y: "0.5em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.01,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headline,
              start: "top 85%",
            }
          }
        );
      });

      // 2. Continuous rotating animations for the telemetry viewports
      gsap.to(".animate-spin-slow", {
        rotation: 360,
        duration: 35,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".animate-spin-reverse-slow", {
        rotation: -360,
        duration: 30,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".animate-sweep", {
        rotation: 360,
        duration: 6,
        repeat: -1,
        ease: "none"
      });

      // 3. Desktop Overlay Stacking Timeline (Cards slide from down with fade)
      if (desktopTriggerRef.current) {
        // Set initial states: Card 1 is active, Cards 2 and 3 are completely hidden (opacity: 0, translated down by 350px)
        gsap.set("#desktop-pillar-card-2", { y: 350, opacity: 0 });
        gsap.set("#desktop-pillar-card-2 .card-body-content", { opacity: 0 });
        gsap.set("#desktop-pillar-card-3", { y: 350, opacity: 0 });
        gsap.set("#desktop-pillar-card-3 .card-body-content", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopTriggerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            onUpdate: (self) => {
              const progress = self.progress;
              // Sync three active telemetry states in the right column
              if (progress < 0.35) {
                setActiveState(0);
              } else if (progress < 0.70) {
                setActiveState(1);
              } else {
                setActiveState(2);
              }
            }
          }
        });

        // Frame 1 to Frame 2: Card 1 shifts up by -110px (body fades out), Card 2 fades in and slides from down (y: 350px -> 0)
        tl.to("#desktop-pillar-card-1", {
          y: -110,
          duration: 1,
          ease: "power2.inOut"
        }, 0);

        tl.to("#desktop-pillar-card-1 .card-body-content", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0);

        tl.fromTo("#desktop-pillar-card-2",
          { y: 350, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
          0
        );

        tl.to("#desktop-pillar-card-2 .card-body-content", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0.2);

        // Frame 2 to Frame 3: Card 1 shifts higher by -220px, Card 2 shifts up by -110px (body fades out), Card 3 fades in and slides from down (y: 350px -> 0)
        tl.to("#desktop-pillar-card-1", {
          y: -220,
          duration: 1,
          ease: "power2.inOut"
        }, 1.2);

        tl.to("#desktop-pillar-card-2", {
          y: -110,
          duration: 1,
          ease: "power2.inOut"
        }, 1.2);

        tl.to("#desktop-pillar-card-2 .card-body-content", {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, 1.2);

        tl.fromTo("#desktop-pillar-card-3",
          { y: 350, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
          1.2
        );

        tl.to("#desktop-pillar-card-3 .card-body-content", {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        }, 1.4);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="nutrition-pillars" className="relative z-10 bg-[#F4EDE6] w-full">
      
      {/* ========================================================================= */}
      {/* 💻 DESKTOP HIGH-FIDELITY PINNED DECK VIEW (md:block)                     */}
      {/* ========================================================================= */}
      <div ref={desktopTriggerRef} className="hidden md:block h-[260vh] w-full relative">
        {/* Sticky viewport locked to screen (pt-[6em] prevents navbar overlap) */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-start pt-[6em] pb-[3em] px-[var(--padding-web)] overflow-hidden max-w-[85em] mx-auto">
          
          {/* Editorial Header (Untouched & frozen at top) */}
          <div className="max-w-[36em] mb-[1em] mt-[0.5em]">
            <span className="text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
              OUR SYSTEM METHODOLOGY
            </span>
            <h2 className="reveal-head text-60-regular text-[#2e3a1f] leading-tight">
              <TextSplit text="How we make nutrition mathematically perfect." />
            </h2>
            <div className="w-[6em] h-[2px] bg-[#2e3a1f]/10 mt-[2em]" />
          </div>

          {/* Main Inversed Split Row (Aligned to start to reduce whitespace) */}
          <div className="flex flex-row gap-[5em] items-start flex-1 min-h-0 mb-[2em] mt-[0.5em]">
            
            {/* Left Column: Stacked Cards Deck (Absolute Layering starting at top-[240px]) */}
            <div className="w-1/2 relative h-[38em] mt-[0.5em]">
              
              {/* Card 1 (Starts Active) */}
              <div
                id="desktop-pillar-card-1"
                className="absolute inset-x-0 top-[240px] h-[28em] bg-[#EDE5DB]/95 backdrop-blur border border-[#2e3a1f]/10 p-[2.8em] rounded-[24px] flex flex-col justify-between shadow-[0_15px_45px_rgba(46,58,31,0.03)] z-10"
              >
                {/* Header content (Always visible) */}
                <div className="flex justify-between items-start mb-[1em] h-[3.5em]">
                  <div className="flex items-center">
                    <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                    <span className="text-[0.75rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">{capsuleCards[0].sub}</span>
                  </div>
                  <span className="text-[2.2rem] font-light leading-none select-none text-[#2e3a1f]/10 font-mono tracking-tighter">
                    {capsuleCards[0].num}
                  </span>
                </div>
                {/* Body Content (Fades out when inactive) */}
                <div className="card-body-content flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[2rem] font-light text-[#2e3a1f] mb-[0.6em] leading-tight">{capsuleCards[0].title}</h3>
                    <p className="text-[1.02rem] text-[#2e3a1f]/75 leading-relaxed font-light mb-[1.8em]">{capsuleCards[0].description}</p>
                  </div>
                  <div className="border-t border-[#2e3a1f]/10 pt-[1.5em] mt-auto">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.2em] font-bold mb-[0.8em]">SYSTEM FEATURES</p>
                    <ul className="flex flex-col gap-[0.5em]">
                      {capsuleCards[0].features.map((feature, i) => (
                        <li key={i} className="flex items-center text-[0.82rem] text-[#2e3a1f]/80 font-medium">
                          <span className="text-[#22C55E] mr-[0.8em] font-mono text-[0.7rem]">✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div
                id="desktop-pillar-card-2"
                className="absolute inset-x-0 top-[240px] h-[28em] bg-[#EDE5DB]/95 backdrop-blur border border-[#2e3a1f]/10 p-[2.8em] rounded-[24px] flex flex-col justify-between shadow-[0_15px_45px_rgba(46,58,31,0.03)] z-20"
              >
                {/* Header content (Always visible) */}
                <div className="flex justify-between items-start mb-[1em] h-[3.5em]">
                  <div className="flex items-center">
                    <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                    <span className="text-[0.75rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">{capsuleCards[1].sub}</span>
                  </div>
                  <span className="text-[2.2rem] font-light leading-none select-none text-[#2e3a1f]/10 font-mono tracking-tighter">
                    {capsuleCards[1].num}
                  </span>
                </div>
                {/* Body Content (Fades out when inactive) */}
                <div className="card-body-content flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[2rem] font-light text-[#2e3a1f] mb-[0.6em] leading-tight">{capsuleCards[1].title}</h3>
                    <p className="text-[1.02rem] text-[#2e3a1f]/75 leading-relaxed font-light mb-[1.8em]">{capsuleCards[1].description}</p>
                  </div>
                  <div className="border-t border-[#2e3a1f]/10 pt-[1.5em] mt-auto">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.2em] font-bold mb-[0.8em]">SYSTEM FEATURES</p>
                    <ul className="flex flex-col gap-[0.5em]">
                      {capsuleCards[1].features.map((feature, i) => (
                        <li key={i} className="flex items-center text-[0.82rem] text-[#2e3a1f]/80 font-medium">
                          <span className="text-[#22C55E] mr-[0.8em] font-mono text-[0.7rem]">✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div
                id="desktop-pillar-card-3"
                className="absolute inset-x-0 top-[240px] h-[28em] bg-[#EDE5DB]/95 backdrop-blur border border-[#2e3a1f]/10 p-[2.8em] rounded-[24px] flex flex-col justify-between shadow-[0_15px_45px_rgba(46,58,31,0.03)] z-30"
              >
                {/* Header content (Always visible) */}
                <div className="flex justify-between items-start mb-[1em] h-[3.5em]">
                  <div className="flex items-center">
                    <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                    <span className="text-[0.75rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">{capsuleCards[2].sub}</span>
                  </div>
                  <span className="text-[2.2rem] font-light leading-none select-none text-[#2e3a1f]/10 font-mono tracking-tighter">
                    {capsuleCards[2].num}
                  </span>
                </div>
                {/* Body Content (Fades out when inactive) */}
                <div className="card-body-content flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-[2rem] font-light text-[#2e3a1f] mb-[0.6em] leading-tight">{capsuleCards[2].title}</h3>
                    <p className="text-[1.02rem] text-[#2e3a1f]/75 leading-relaxed font-light mb-[1.8em]">{capsuleCards[2].description}</p>
                  </div>
                  <div className="border-t border-[#2e3a1f]/10 pt-[1.5em] mt-auto">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.2em] font-bold mb-[0.8em]">SYSTEM FEATURES</p>
                    <ul className="flex flex-col gap-[0.5em]">
                      {capsuleCards[2].features.map((feature, i) => (
                        <li key={i} className="flex items-center text-[0.82rem] text-[#2e3a1f]/80 font-medium">
                          <span className="text-[#22C55E] mr-[0.8em] font-mono text-[0.7rem]">✦</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pinned Biometric Viewport Dashboard */}
            <div className="w-1/2 flex items-start justify-center select-none pt-[240px]">
              <div className="relative w-[24em] h-[24em] rounded-full border border-[#2e3a1f]/10 bg-[#EDE5DB]/35 flex items-center justify-center p-[2.2em] shadow-[inset_0_4px_24px_rgba(46,58,31,0.02)]">
                
                {/* Outer Rotating Telemetry Ticks */}
                <svg className="absolute w-[98%] h-[98%] animate-spin-slow opacity-25" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="47" fill="none" stroke="#2e3a1f" strokeWidth="0.5" strokeDasharray="3 4 8 2 1 5" />
                </svg>

                {/* Middle Border Guide Ring */}
                <div className="absolute inset-[1.5em] rounded-full border border-[#2e3a1f]/5 pointer-events-none" />

                {/* Telemetry STATE 0: Biochemical Lattice */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    activeState === 0 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                  }`}
                >
                  <svg className="w-[75%] h-[75%]" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="14" fill="none" stroke="#22C55E" strokeWidth="0.75" strokeDasharray="2 2" className="opacity-70 animate-pulse" />
                    <ellipse cx="50" cy="50" rx="32" ry="12" fill="none" stroke="#2e3a1f" strokeWidth="0.5" transform="rotate(30 50 50)" strokeDasharray="40 2 10 2" className="animate-spin-slow" />
                    <ellipse cx="50" cy="50" rx="32" ry="12" fill="none" stroke="#2e3a1f" strokeWidth="0.5" transform="rotate(-30 50 50)" strokeDasharray="20 4 20 4" className="animate-spin-reverse-slow" />
                    <circle cx="23" cy="34" r="1.5" fill="#22C55E" className="animate-pulse" />
                    <circle cx="77" cy="66" r="1.5" fill="#22C55E" className="animate-pulse" />
                    <circle cx="34" cy="77" r="1.2" fill="#8aab5a" />
                    <circle cx="66" cy="23" r="1.2" fill="#8aab5a" />
                    <g>
                      <circle cx="50" cy="50" r="5" fill="#2e3a1f" />
                      <circle cx="50" cy="50" r="2" fill="#22C55E" className="animate-ping" style={{ animationDuration: '2s' }} />
                      <circle cx="50" cy="50" r="1.5" fill="#22C55E" />
                    </g>
                  </svg>
                  <div className="absolute bottom-[2.5em] text-center w-full">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.25em] font-semibold">CELLULAR SCAN ACTIVE</p>
                    <p className="text-[0.55rem] text-[#22C55E] tracking-[0.1em] font-mono mt-1">Nutrient Bioavailability: 98.6%</p>
                  </div>
                </div>

                {/* Telemetry STATE 1: Daily Access Radar */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    activeState === 1 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                  }`}
                >
                  <svg className="w-[75%] h-[75%]" viewBox="0 0 100 100">
                    <line x1="15" y1="50" x2="85" y2="50" stroke="#2e3a1f" strokeWidth="0.25" strokeDasharray="1 2" className="opacity-45" />
                    <line x1="50" y1="15" x2="50" y2="85" stroke="#2e3a1f" strokeWidth="0.25" strokeDasharray="1 2" className="opacity-45" />
                    <circle cx="50" cy="50" r="10" fill="none" stroke="#2e3a1f" strokeWidth="0.5" className="opacity-40" />
                    <circle cx="50" cy="50" r="22" fill="none" stroke="#2e3a1f" strokeWidth="0.5" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#22C55E" strokeWidth="0.5" strokeDasharray="10 6" className="opacity-40" />
                    <line x1="50" y1="50" x2="50" y2="16" stroke="#22C55E" strokeWidth="0.75" strokeLinecap="round" className="animate-sweep origin-center" />
                    <g>
                      <circle cx="50" cy="50" r="4.5" fill="#2e3a1f" />
                      <circle cx="50" cy="50" r="2.5" fill="#22C55E" className="animate-pulse" />
                      <circle cx="68" cy="38" r="1.5" fill="#22C55E" className="animate-ping" style={{ animationDuration: '3s' }} />
                    </g>
                  </svg>
                  <div className="absolute bottom-[2.5em] text-center w-full">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.25em] font-semibold">CONDUIT LINK ESTABLISHED</p>
                    <p className="text-[0.55rem] text-[#22C55E] tracking-[0.1em] font-mono mt-1">Nutritionist Sync: Real-Time</p>
                  </div>
                </div>

                {/* Telemetry STATE 2: Science Synthesis Matrix */}
                <div 
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                    activeState === 2 ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                  }`}
                >
                  <svg className="w-[75%] h-[75%]" viewBox="0 0 100 100">
                    <polygon points="50,20 76,65 24,65" fill="none" stroke="#2e3a1f" strokeWidth="0.5" className="animate-spin-slow origin-center" />
                    <circle cx="50" cy="20" r="3" fill="#22C55E" className="animate-pulse" />
                    <circle cx="76" cy="65" r="3" fill="#8aab5a" className="animate-pulse" />
                    <circle cx="24" cy="65" r="3" fill="#2e3a1f" />
                    <circle cx="50" cy="50" r="28" fill="none" stroke="#2e3a1f" strokeWidth="0.25" className="opacity-40" />
                    <path d="M44 50 L56 50 M50 44 L50 56" stroke="#22C55E" strokeWidth="0.5" className="opacity-70" />
                    <circle cx="50" cy="50" r="6" fill="none" stroke="#22C55E" strokeWidth="0.5" className="animate-ping" style={{ animationDuration: '4s' }} />
                  </svg>
                  <div className="absolute bottom-[2.5em] text-center w-full">
                    <p className="text-[0.65rem] text-[#2e3a1f]/40 tracking-[0.25em] font-semibold">SYNTHESIS MATRIX LOCKED</p>
                    <p className="text-[0.55rem] text-[#22C55E] tracking-[0.1em] font-mono mt-1">Clinical Consensus: 100% Aligned</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📱 MOBILE RESPONSIVE EDITORIAL FLOW (block md:hidden)                   */}
      <div className="block md:hidden w-full pt-[4em] pb-[12em] px-[var(--padding-web)]">
        
        {/* Editorial Header */}
        <div className="max-w-[36em] mb-[3.5em]">
          <span className="text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
            OUR SYSTEM METHODOLOGY
          </span>
          <h2 className="reveal-head text-60-regular text-[#2e3a1f] leading-tight">
            <TextSplit text="How we make nutrition mathematically perfect." />
          </h2>
          <div className="w-[6em] h-[2px] bg-[#2e3a1f]/10 mt-[2em]" />
        </div>

        {/* Natural Vertical List of Cards with Sticky Stacking */}
        <div className="flex flex-col gap-[2em] relative">
          {capsuleCards.map((card, index) => (
            <div
              key={card.id}
              className="sticky bg-[#EDE5DB]/95 border border-[#2e3a1f]/10 p-[2.2em] rounded-[24px] flex flex-col justify-between shadow-[0_-10px_35px_rgba(46,58,31,0.06)] min-h-[22em]"
              style={{
                top: `calc(4.5em + ${index * 1.8}em)`,
                zIndex: index + 1,
              }}
            >
              <div className="flex justify-between items-start mb-[1.2em]">
                <div className="flex items-center">
                  <span className="w-[0.4em] h-[0.4em] rounded-full bg-[#22C55E] mr-[0.4em] animate-pulse" />
                  <span className="text-[0.65rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">{card.sub}</span>
                </div>
                <span className="text-[1.8rem] font-light leading-none select-none text-[#2e3a1f]/10 font-mono">
                  {card.num}
                </span>
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[1.6rem] font-light text-[#2e3a1f] mb-[0.6em] leading-tight">{card.title}</h3>
                  <p className="text-[0.95rem] text-[#2e3a1f]/75 leading-relaxed font-light mb-[1.8em]">{card.description}</p>
                </div>
                <div className="border-t border-[#2e3a1f]/10 pt-[1.2em] mt-auto">
                  <p className="text-[0.6rem] text-[#2e3a1f]/40 tracking-[0.2em] font-bold mb-[0.8em]">SYSTEM FEATURES</p>
                  <ul className="flex flex-col gap-[0.4em]">
                    {card.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-[0.78rem] text-[#2e3a1f]/80 font-medium">
                        <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
