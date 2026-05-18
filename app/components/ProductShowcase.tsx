"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

export default function ProductShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Pinned Scroll Department Panel Reveal
      const deptCards = sectionRef.current?.querySelectorAll(".dept-card");
      if (deptCards && deptCards.length === 3) {
        gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "top top",
            end: "+=300%",
            pin: true,
            scrub: true,
          }
        })
        .fromTo(deptCards[0] as HTMLElement, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(deptCards[0] as HTMLElement, { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(deptCards[1] as HTMLElement, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
        .to(deptCards[1] as HTMLElement, { opacity: 0, y: -50, duration: 1 }, "+=0.5")
        .fromTo(deptCards[2] as HTMLElement, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
      }

      // 2. Phase 2 Reveal
      const phase2 = containerRef.current?.querySelector(".phase-2");
      if (phase2) {
        gsap.fromTo(
          phase2.querySelectorAll(".split-char"),
          { opacity: 0, y: "0.5em" },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.01, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: phase2,
              start: "top 80%",
            }
          }
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  // Helper alias to reference container in scope trigger selections
  const sectionRef = containerRef;

  return (
    <section ref={containerRef} id="capsule" className="relative z-10 bg-[#2e3a1f] mt-0">
      {/* Interactive Pinned Panel Section */}
      <div ref={stickyRef} className="relative h-screen overflow-hidden bg-[#2e3a1f]">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          {/* Left Column: Full-Height Consortium Team Image */}
          <div className="relative w-full h-[40vh] md:h-full min-h-[20em] md:min-h-0">
            <Image
              src="/images/nutrigetic_consortium.png"
              alt="Nutrigetic multidisciplinary scientific consortium team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e3a1f]/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#2e3a1f]/30" />
          </div>

          {/* Right Column: Dynamic Department Panel Scroll Viewport */}
          <div className="relative w-full h-[60vh] md:h-full flex items-center justify-center p-[2em] lg:p-[4em] bg-[#2e3a1f]">
            <div className="relative w-full max-w-[28em] h-[18em] flex items-center justify-center">
              {/* Card 1: Lead Nutritionist */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block">01 / DEDICATED LEAD NUTRITIONIST</span>
                <h2 className="text-44-regular mb-[0.6em] leading-tight">Bespoke dietary engineering.</h2>
                <p className="text-16-regular-caps opacity-60">Your personal Lead Nutritionist is the chief architect of your health, designing daily, precision nutrient-density protocols matched to your body.</p>
              </div>

              {/* Card 2: Biochemist Input */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block">02 / BIOCHEMICAL TELEMETRY INPUT</span>
                <h2 className="text-44-regular mb-[0.6em] leading-tight">Biomarker-driven dietary edits.</h2>
                <p className="text-16-regular-caps opacity-60">Our biochemists run blood and gut genomic screens, translating cellular data directly into your nutritionist's hands to customize your food plans.</p>
              </div>

              {/* Card 3: Sports & Performance Science Input */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block">03 / NEURO & PHYSICAL SCIENCE INPUT</span>
                <h2 className="text-44-regular mb-[0.6em] leading-tight">Remove the barriers to absorption.</h2>
                <p className="text-16-regular-caps opacity-60">Supporting performance psychologists and sports coaches align stress management, sleep, and physical loads to place your gut in the optimal state for absorption.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 2: Precision Nutrition, Fully Integrated */}
      <div className="phase-2 opacity-0 max-w-[85em] mx-auto px-[var(--padding-web)] py-[var(--section-padding)]">
        <div className="grid md:grid-cols-2 gap-[5em] items-start">
          <div>
            <h2 className="text-60-regular text-[#F4EDE6] mb-[1em]">
              <TextSplit text="Precision Nutrition, Fully Integrated" />
            </h2>
            <p className="text-18-caps text-[#F4EDE6]/60 mb-[3em] max-w-[28em]">
              Nutrigetic combines elite personal nutritionists with the back-end support of biochemists, psychologists, and sports coaches to make your dietary absorption mathematically perfect.
            </p>
            <a
              href="#programs"
              className="inline-flex items-center gap-[0.75em] px-[2em] py-[1em] border border-[#F4EDE6]/30 text-[#F4EDE6] text-14-caps w-fit transition-all duration-300 hover:bg-[#F4EDE6] hover:text-[#2e3a1f]"
            >
              <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
              meet our nutritionists
              <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
