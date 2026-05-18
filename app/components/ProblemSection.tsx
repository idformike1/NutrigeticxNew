"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Pin section and horizontal battery continuous gradient reveal on scroll
      const gradientFill = sectionRef.current?.querySelector(".battery-gradient-fill");
      const maskCells = sectionRef.current?.querySelectorAll(".battery-mask-cell");
      if (gradientFill && maskCells && maskCells.length === 3) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top", // Pin when section top touches viewport top
            end: "+=120%",   // Pin for 120% of viewport height scroll
            scrub: true,
            pin: true,        // Enable pinning!
            anticipatePin: 1,
          }
        });

        // Animate the continuous gradient width expansion and sequentially reveal the mask slots
        tl.to(gradientFill as HTMLElement, { width: "100%", ease: "none" }, 0)
          .to(maskCells[0] as HTMLElement, { backgroundColor: "transparent", ease: "none" }, 0.05)
          .to(maskCells[1] as HTMLElement, { backgroundColor: "transparent", ease: "none" }, 0.35)
          .to(maskCells[2] as HTMLElement, { backgroundColor: "transparent", ease: "none" }, 0.65);
      }

      // 2. Character stagger for headings
      const revealHeads = sectionRef.current?.querySelectorAll(".reveal-head");
      if (revealHeads) {
        revealHeads.forEach((head) => {
          const chars = head.querySelectorAll(".split-char");
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
                trigger: head,
                start: "top 85%",
              },
            }
          );
        });
      }

      // 3. Simple fade-in for paragraphs
      const revealParas = sectionRef.current?.querySelectorAll(".reveal-para");
      if (revealParas) {
        gsap.fromTo(
          revealParas,
          { opacity: 0, y: "1em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: revealParas,
              start: "top 90%",
            },
          }
        );
      }

      return () => {
      };
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="s-second" className="relative z-10 bg-[#F4EDE6] overflow-hidden w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[45em] md:min-h-[50em] lg:min-h-[55em]">
        {/* Left: Premium static image backdrop with overlay (Flush split-screen) */}
        <div className="relative overflow-hidden w-full h-[35em] md:h-full min-h-[35em]">
          <Image
            src="/images/nutrigetic_absorption_bg.png"
            alt="Nutrigetic organic metabolic absorption background"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="absolute inset-0 w-full h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2e3a1f]/90 via-[#2e3a1f]/20 to-transparent" />
          <div ref={contentRef} className="absolute bottom-0 left-0 right-0 p-[2em] lg:p-[4em]">
            <div className="max-w-[36em] md:max-w-[38em] lg:max-w-none">
              <h2 className="reveal-head text-60-regular text-[#F4EDE6] mb-[0.8em] leading-tight">
                <TextSplit text="Most wellness routines never get absorbed." />
              </h2>
              <p className="reveal-para opacity-0 text-16-regular-caps text-[#F4EDE6]/60">
                Generic plans, standard advice, and off-the-shelf supplements fail to align with your unique biochemistry. They pass through unabsorbed — leaving you depleted, fatigued, and frustrated.
              </p>
            </div>
          </div>
        </div>

        {/* Right: stat + bio-energy animation (Flush bottom layout) */}
        <div className="relative flex flex-col justify-between pt-[4em] lg:pt-[6em] px-[2em] lg:px-[4em] pb-0 w-full h-full min-h-[35em] md:min-h-0">
          <div className="reveal-up-stat max-w-[36em] lg:max-w-none">
            <h2 className="reveal-head text-60-regular text-[#2e3a1f] mb-[1em] leading-tight">
              <TextSplit text="Up to 80% of traditional health plans fail within the first 30 days." />
            </h2>
            <p className="reveal-para opacity-0 text-[#2e3a1f]/40 text-[0.75em] uppercase tracking-wider font-bold">Source: Clinical Sports Medicine Journal, 2025</p>
          </div>

          {/* Premium Horizontal Battery Block with Status Labels */}
          <div className="relative mt-auto w-full flex flex-col justify-center md:justify-start pt-[3em] pb-[2.5em] md:pb-[3.5em]">
            {/* Telemetry Labels */}
            <div className="w-[18em] md:w-[22em] lg:w-[32em] flex justify-between items-end mb-[0.8em] text-[#2e3a1f]">
              <div className="flex items-center gap-[0.5em]">
                <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[#2e3a1f] text-[0.75em] uppercase tracking-wider font-bold">CELL METABOLIC LOAD</span>
              </div>
            </div>

            {/* Premium Horizontal Segmented Battery Cell (4 Partitions with Continuous Gradient Reveal) */}
            <div className="relative w-[18em] h-[6em] md:w-[22em] md:h-[7.5em] lg:w-[32em] lg:h-[10.5em] flex items-center border-[6px] border-[#2e3a1f] rounded-[18px] bg-transparent select-none -mb-[1px] shadow-[0_15px_40px_rgba(46,58,31,0.08)]">
              {/* Battery tip (horizontal right cap) */}
              <div className="absolute -right-[15px] top-1/2 -translate-y-1/2 w-[10px] h-[3em] bg-[#2e3a1f] rounded-r-[5px] z-10" />
              
              {/* 1. Underlying Continuous Gradient Fill Chamber */}
              <div className="absolute inset-[0.6em] overflow-hidden rounded-[10px] z-0">
                <div 
                  className="battery-gradient-fill h-full bg-gradient-to-r from-[#EF4444] via-[#F97316] via-[#A3E635] to-[#22C55E]"
                  style={{ width: "25%" }} 
                />
              </div>

              {/* 2. Masking Slots Grid on top (Creates transparent windows and beige dividers) */}
              <div className="absolute inset-[0.6em] grid grid-cols-4 gap-[0.6em] z-10">
                {/* Slot 1: Always transparent to show Red */}
                <div className="border-[4px] border-[#F4EDE6] rounded-[10px] bg-transparent" />
                {/* Slot 2: Masked with page background color, fades to transparent */}
                <div className="battery-mask-cell border-[4px] border-[#F4EDE6] rounded-[10px] bg-[#F4EDE6]" />
                {/* Slot 3: Masked, fades to transparent */}
                <div className="battery-mask-cell border-[4px] border-[#F4EDE6] rounded-[10px] bg-[#F4EDE6]" />
                {/* Slot 4: Masked, fades to transparent */}
                <div className="battery-mask-cell border-[4px] border-[#F4EDE6] rounded-[10px] bg-[#F4EDE6]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
