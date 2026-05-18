"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const meetSteps = [
  {
    id: "step-1",
    num: "01",
    title: "Intake Diagnostics",
    description: "Complete clinical metabolic panels and gut microbiome sequencing shipped directly to your location to establish your biological blueprint.",
  },
  {
    id: "step-2",
    num: "02",
    title: "Consortium Meeting",
    description: "Our supporting biochemists translate your biomarker telemetry into a cellular roadmap, outlining internal dietary bottlenecks.",
  },
  {
    id: "step-3",
    num: "03",
    title: "Protocol Synthesis",
    description: "Your Lead Nutritionist designs and delivers your bespoke weekly nutritional blueprint, adaptogens, and cognitive recovery cycles.",
  },
  {
    id: "step-4",
    num: "04",
    title: "Concierge Tuning",
    description: "Daily text adjustments, weekly check-in consultations, and 90-day clinical re-testing to mathematically prove your metabolic progress.",
  },
];

export default function OnboardingRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Dynamic scroll trigger to draw connecting energy line and activate nodes
      const progressLine = sectionRef.current?.querySelector(".roadmap-progress-line");
      const steps = sectionRef.current?.querySelectorAll(".roadmap-step-card");
      
      if (progressLine && steps && steps.length === 4) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: true,
          }
        });

        // 1. Draw the progress line from 0% to 100%
        tl.to(progressLine as HTMLElement, { width: "100%", ease: "none" }, 0);

        // 2. Sequentially light up each step card's border and opacity
        tl.to(steps[0] as HTMLElement, { opacity: 1, borderColor: "rgba(34, 197, 94, 0.4)", ease: "none" }, 0.0)
          .to(steps[1] as HTMLElement, { opacity: 1, borderColor: "rgba(34, 197, 94, 0.4)", ease: "none" }, 0.3)
          .to(steps[2] as HTMLElement, { opacity: 1, borderColor: "rgba(34, 197, 94, 0.4)", ease: "none" }, 0.6)
          .to(steps[3] as HTMLElement, { opacity: 1, borderColor: "rgba(34, 197, 94, 0.4)", ease: "none" }, 0.9);
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="onboarding-roadmap" className="relative z-10 bg-[#182211] w-full py-[6em] lg:py-[8em] overflow-hidden">
      <div className="max-w-[85em] mx-auto px-[var(--padding-web)]">
        
        {/* Onboarding Header */}
        <div className="mb-[5em]">
          <span className="text-[#8aab5a] text-[0.8em] font-bold uppercase tracking-widest block mb-[1.2em]">YOUR CLINICAL TIMELINE</span>
          <h2 className="text-60-regular text-[#F4EDE6] leading-tight max-w-[20em]">
            The onboarding journey to cellular peak performance.
          </h2>
        </div>

        {/* Desktop Interactive Stepped Connector Line */}
        <div className="relative w-full h-[2px] bg-[#F4EDE6]/10 mb-[3em] hidden md:block rounded-full">
          <div 
            className="roadmap-progress-line absolute top-0 left-0 h-full bg-[#22C55E] rounded-full shadow-[0_0_12px_#22C55E]" 
            style={{ width: "0%" }} 
          />
        </div>

        {/* 4-Column Responsive Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[2em] md:gap-[2.5em] lg:gap-[3.5em]">
          {meetSteps.map((step) => (
            <div
              key={step.id}
              className="roadmap-step-card opacity-30 md:opacity-20 border border-[#F4EDE6]/10 bg-[#2e3a1f]/10 p-[2.5em] rounded-[16px] flex flex-col gap-[1.2em] transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
            >
              {/* Numeric indicator */}
              <div className="text-[1.5em] font-semibold text-[#8aab5a] font-mono select-none">{step.num}</div>
              
              <h3 className="text-24-regular text-[#F4EDE6] leading-snug">{step.title}</h3>
              
              <p className="text-14-caps text-[#F4EDE6]/50 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
