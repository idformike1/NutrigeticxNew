"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const capsuleCards = [
  {
    id: "card-1",
    title: "Biochemical Dietary Engineering",
    description: "Every calorie, macro, and micro-nutrient is scientifically calculated based on your clinical biomarker, hormone, and gut telemetry, ensuring 100% absorption.",
  },
  {
    id: "card-2",
    title: "Daily Nutritionist Access",
    description: "Direct secure text communication with your dedicated Lead Nutritionist. Get real-time dietary updates for business travel, race days, or high-stress schedules.",
  },
  {
    id: "card-3",
    title: "Supporting Science Synthesis",
    description: "Our supporting biochemists, performance psychologists, and sports coaches feed telemetry to your nutritionist, keeping your diet and lifestyle in perfect alignment.",
  },
];

export default function NutritionPillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Stagger entrance animation for editorial cards
      const cards = sectionRef.current?.querySelectorAll(".pillar-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="nutrition-pillars" className="relative z-10 bg-[#F4EDE6] w-full py-[6em] lg:py-[8em]">
      <div className="max-w-[85em] mx-auto px-[var(--padding-web)]">
        
        {/* Editorial Section Header */}
        <div className="mb-[4em] max-w-[36em]">
          <span className="text-[#8aab5a] text-[0.8em] font-bold uppercase tracking-widest block mb-[1.2em]">OUR SYSTEM METHODOLOGY</span>
          <h2 className="text-60-regular text-[#2e3a1f] leading-tight">
            How we make nutrition mathematically perfect.
          </h2>
          <div className="w-[6em] h-[2px] bg-[#2e3a1f]/10 mt-[2em]" />
        </div>

        {/* 3-Column Premium Staggered Card Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[2.5em] lg:gap-[3.5em]">
          {capsuleCards.map((card) => (
            <div
              key={card.id}
              className="pillar-card group relative opacity-0 bg-[#EDE5DB] border border-[#2e3a1f]/10 p-[3em] rounded-[16px] flex flex-col min-h-[22em] justify-between transition-all duration-500 hover:-translate-y-[8px] hover:shadow-[0_20px_50px_rgba(46,58,31,0.06)]"
            >
              <div>
                <span className="text-[#8aab5a] text-[1.5em] font-semibold mb-[1.5em] block leading-none select-none">✦</span>
                <h3 className="text-30-regular text-[#2e3a1f] mb-[0.8em] leading-tight">{card.title}</h3>
                <p className="text-16-regular-caps text-[#2e3a1f]/60 leading-relaxed">{card.description}</p>
              </div>

              {/* High-End Glowing Active Bottom Indicator Line */}
              <div className="absolute bottom-0 left-[2em] right-[2em] h-[4px] bg-[#22C55E] rounded-full scale-x-0 transition-transform duration-500 group-hover:scale-x-100 origin-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
