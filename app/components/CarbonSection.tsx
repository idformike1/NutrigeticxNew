"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";
import OrganicPhysicsButton from "./OrganicPhysicsButton";

gsap.registerPlugin(ScrollTrigger);

export default function CarbonSection() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Image parallax
      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 2. Character stagger for heading
      const head = containerRef.current?.querySelector(".reveal-head");
      if (head) {
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
      }

      // 3. Simple fade-in for paragraph and button
      const reveals = containerRef.current?.querySelectorAll(".reveal-up");
      if (reveals) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y: "1em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      return () => {
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="s-carbon" className="relative z-10 bg-[#F4EDE6] overflow-hidden">
      <div className="w-full py-[var(--section-padding)] px-[var(--padding-web)]">
        <div className="grid md:grid-cols-2 gap-[5em] lg:gap-[8em] items-center">
          
          {/* Content */}
          <div ref={contentRef} className="max-w-[36em]">
            <span className="reveal-up opacity-0 text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
              PURITY STANDARDS
            </span>
            <h2 className="reveal-head text-60-regular text-[#2e3a1f] leading-tight">
              <TextSplit text="Pure Bio-Efficacy." /><br />
              <TextSplit text="Zero Chemical Burden." />
            </h2>
            <div className="reveal-up opacity-0 w-[6em] h-[2px] bg-[#2e3a1f]/15 mt-[2em] mb-[2em]" />
            
            <p className="reveal-up opacity-0 text-16-regular-caps text-[#2e3a1f]/70 mb-[3em] leading-relaxed">
              Most wellness brands hide behind complex synthetic binders, industrial artificial coloring, and low-absorption molecular structures.
              <br /><br />
              With Nutrigetic, you experience absolute purity. Our formulas are cold-encapsulated from raw organic extracts — ensuring maximum natural bioavailability with zero synthetic fillers, heavy metals, or biological compromise.
            </p>
            
            <div className="reveal-up opacity-0 inline-block">
              <OrganicPhysicsButton
                href="#about"
                text="VIEW EXTRACTION PROTOCOL"
                variant="dark"
              />
            </div>
          </div>

          {/* Parallax Image Upgrade */}
          <div ref={imageRef} className="relative h-[35em] md:h-[42em] overflow-hidden rounded-[16px] border border-[#2e3a1f]/10 shadow-[0_20px_50px_rgba(46,58,31,0.08)] group">
            <Image
              src="/images/nutrigetic_absorption_bg.png"
              alt="High-performance biometric telemetry and cold-extraction absorption"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Clinical overlay gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1508]/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            
            {/* Absolute Glassmorphic Tag */}
            <div className="absolute bottom-[2em] right-[2em] bg-[#F4EDE6]/90 backdrop-blur-md border border-[#2e3a1f]/10 px-[1.2em] py-[0.8em] rounded-full shadow-lg flex items-center gap-[0.6em] transform transition-transform duration-500 group-hover:-translate-y-1">
               <span className="w-[0.45em] h-[0.45em] rounded-full bg-[#22C55E] animate-pulse" />
               <span className="text-[0.65rem] text-[#2e3a1f] tracking-[0.15em] font-bold font-mono">COLD-ENCAPSULATED</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
