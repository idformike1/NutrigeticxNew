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
      // 1. Pinned Scroll Option 3: The Concentric Radar Deck (Symmetric Circular Viewport)
      const bgImages = sectionRef.current?.querySelectorAll(".consortium-bg-image");
      const radarPulse = sectionRef.current?.querySelector(".consortium-radar-pulse");
      const pathProgress = sectionRef.current?.querySelector(".consortium-path-progress");
      const signalDot = sectionRef.current?.querySelector(".consortium-signal-dot");
      const deptCards = sectionRef.current?.querySelectorAll(".dept-card");
      
      if (stickyRef.current && bgImages && bgImages.length === 3 && radarPulse && pathProgress && signalDot && deptCards && deptCards.length === 3) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: true,
          }
        });

        // Set initial state for the absolute stacked images
        gsap.set(bgImages[0] as HTMLElement, { opacity: 1 });
        gsap.set(bgImages[1] as HTMLElement, { opacity: 0 });
        gsap.set(bgImages[2] as HTMLElement, { opacity: 0 });

        // Slow cinematic zoom of all images inside circular frame
        bgImages.forEach((bgImg) => {
          tl.to(bgImg as HTMLElement, { scale: 1.25, ease: "none", duration: 5 }, 0);
        });

        // Timeline Progress Path vertical drawing
        tl.to(pathProgress as HTMLElement, { height: "100%", ease: "none", duration: 5 }, 0);
        
        // Signal dot glides down the path line
        tl.fromTo(signalDot as HTMLElement, { top: "0%", opacity: 0 }, { opacity: 1, duration: 0.2 }, 0)
          .to(signalDot as HTMLElement, { top: "100%", ease: "none", duration: 4.6 }, 0.2)
          .to(signalDot as HTMLElement, { opacity: 0, duration: 0.2 }, 4.8);

        // Sequentially trigger card reveals, sliding them in, and trigger radar flashes and image transitions
        tl.fromTo(deptCards[0] as HTMLElement, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 0.0)
          .fromTo(radarPulse as HTMLElement, { opacity: 0 }, { opacity: 0.5, duration: 0.3, ease: "power1.out" }, 0.0)
          .to(radarPulse as HTMLElement, { opacity: 0, duration: 0.4 }, 0.3)
          
          // Card 1 Exit / Image 1 Exit
          .to(deptCards[0] as HTMLElement, { opacity: 0, x: -30, duration: 0.5 }, 1.2)
          .to(bgImages[0] as HTMLElement, { opacity: 0, duration: 0.5 }, 1.2)
          
          // Card 2 Entry / Image 2 Entry
          .fromTo(bgImages[1] as HTMLElement, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 2.0)
          .fromTo(deptCards[1] as HTMLElement, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 2.0)
          .fromTo(radarPulse as HTMLElement, { opacity: 0 }, { opacity: 0.5, duration: 0.3, ease: "power1.out" }, 2.0)
          .to(radarPulse as HTMLElement, { opacity: 0, duration: 0.4 }, 2.3)
          
          // Card 2 Exit / Image 2 Exit
          .to(deptCards[1] as HTMLElement, { opacity: 0, x: -30, duration: 0.5 }, 3.2)
          .to(bgImages[1] as HTMLElement, { opacity: 0, duration: 0.5 }, 3.2)
          
          // Card 3 Entry / Image 3 Entry
          .fromTo(bgImages[2] as HTMLElement, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 4.0)
          .fromTo(deptCards[2] as HTMLElement, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.5 }, 4.0)
          .fromTo(radarPulse as HTMLElement, { opacity: 0 }, { opacity: 0.5, duration: 0.3, ease: "power1.out" }, 4.0)
          .to(radarPulse as HTMLElement, { opacity: 0, duration: 0.4 }, 4.3);
      }

    },
    { scope: containerRef, dependencies: [] }
  );

  // Helper alias to reference container in scope trigger selections
  const sectionRef = containerRef;

  return (
    <section ref={containerRef} id="capsule" className="relative z-10 bg-[#2e3a1f] mt-0 overflow-hidden">
      {/* Interactive Pinned Section */}
      <div ref={stickyRef} className="relative h-screen overflow-hidden bg-[#2e3a1f]">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full">
          
          {/* Left Column: Symmetrical Circular Viewport & Dashed Radar Ring */}
          <div className="relative w-full h-[45vh] md:h-full flex items-center justify-center bg-[#2e3a1f] select-none overflow-hidden">
            
            {/* Rotating dashed outer coordinate technical ring */}
            <div 
              className="absolute w-[20em] h-[20em] md:w-[24em] md:h-[24em] lg:w-[28em] lg:h-[28em] border border-[#8aab5a]/30 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"
              style={{ borderStyle: "dashed" }}
            />
            
            {/* Centered clean circular image viewport with diagnostic glow */}
            <div className="relative w-[17em] h-[17em] md:w-[21em] md:h-[21em] lg:w-[25em] lg:h-[25em] rounded-full overflow-hidden border-[4px] border-[#EDE5DB]/10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] z-10">
              {/* Image 1: Dedicated Lead Nutritionist */}
              <Image
                src="/images/nutrigetic_consortium.png"
                alt="Nutrigetic dedicated clinical nutrition panel"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="consortium-bg-image absolute inset-0 w-full h-full object-cover object-center scale-[1.1] will-change-transform opacity-100"
                priority
              />
              {/* Image 2: Biochemist Input */}
              <Image
                src="/images/wellness_hexagon_tablet.png"
                alt="Nutrigetic biochemical telemetry diagnostic screens"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="consortium-bg-image absolute inset-0 w-full h-full object-cover object-center scale-[1.1] will-change-transform opacity-0"
              />
              {/* Image 3: Sports Science & Psych Input */}
              <Image
                src="/images/nutrigetic_absorption_bg.png"
                alt="Nutrigetic metabolic absorption and sports psychology diagnostics"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="consortium-bg-image absolute inset-0 w-full h-full object-cover object-center scale-[1.1] will-change-transform opacity-0"
              />
              
              {/* Dynamic radar scanning pulse flash overlay */}
              <div className="consortium-radar-pulse absolute inset-0 bg-[#22C55E]/20 opacity-0 mix-blend-screen pointer-events-none transition-opacity duration-300" />
            </div>

          </div>

          {/* Right Column: Shutter Panel with Vertical Connector Timeline */}
          <div className="relative w-full h-[55vh] md:h-full flex items-center justify-center p-[2em] lg:p-[4em] bg-[#2e3a1f]">
            
            {/* Left Vertical Biometric Progress Path & Signal Dot */}
            <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-[#F4EDE6]/10 hidden md:block z-10 rounded-full">
              <div 
                className="consortium-path-progress absolute top-0 left-0 w-full bg-[#22C55E] rounded-full shadow-[0_0_10px_#22C55E]"
                style={{ height: "0%" }}
              />
              <div 
                className="consortium-signal-dot absolute left-[-4px] w-[10px] h-[10px] bg-[#22C55E] rounded-full shadow-[0_0_12px_#22C55E] opacity-0"
                style={{ top: "0%" }}
              />
            </div>

            <div className="relative w-full max-w-[28em] h-[20em] flex items-center justify-center md:pl-[2em]">
              
              {/* Card 1: Lead Nutritionist */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block select-none">01 / DEDICATED LEAD NUTRITIONIST</span>
                <h2 className="text-[2.4em] md:text-[2.8em] mb-[0.6em] leading-tight">Bespoke dietary engineering.</h2>
                <p className="text-16-regular-caps opacity-60 leading-relaxed">Your personal Lead Nutritionist is the chief architect of your health, designing daily, precision nutrient-density protocols matched to your body.</p>
              </div>

              {/* Card 2: Biochemist Input */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block select-none">02 / BIOCHEMICAL TELEMETRY INPUT</span>
                <h2 className="text-[2.4em] md:text-[2.8em] mb-[0.6em] leading-tight">Biomarker-driven dietary edits.</h2>
                <p className="text-16-regular-caps opacity-60 leading-relaxed">Our biochemists run blood and gut genomic screens, translating cellular data directly into your nutritionist's hands to customize your food plans.</p>
              </div>

              {/* Card 3: Sports & Performance Science Input */}
              <div className="dept-card opacity-0 absolute inset-0 flex flex-col justify-center text-[#F4EDE6]">
                <span className="text-[#8aab5a] text-14-caps font-bold tracking-wider mb-[1em] block select-none">03 / NEURO & PHYSICAL SCIENCE INPUT</span>
                <h2 className="text-[2.4em] md:text-[2.8em] mb-[0.6em] leading-tight">Remove the barriers to absorption.</h2>
                <p className="text-16-regular-caps opacity-60 leading-relaxed">Supporting performance psychologists and sports coaches align stress, sleep, and physical loads to place your gut in the optimal state for absorption.</p>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
