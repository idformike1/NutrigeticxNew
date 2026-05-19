"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Character stagger for heading
      const head = headRef.current?.querySelector(".reveal-head");
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

      // 2. Simple fade-in for content and subheadings
      const reveals = containerRef.current?.querySelectorAll(".reveal-up");
      if (reveals) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y: "1.25em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="final-cta" className="relative z-10 bg-[#0D1508] overflow-hidden">
      
      {/* Background panoramic image (Upgraded from Sheep to Clinical Telemetry) */}
      <div className="absolute top-0 left-0 right-0 h-[35em] z-0 overflow-hidden pointer-events-none">
        <Image
          src="/images/wellness_hero_tablet.png"
          alt="Biometric performance dashboard"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-30 mix-blend-lighten"
        />
        {/* Deep gradient fade to blend the panoramic image seamlessly into the background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D1508]/10 via-[#0D1508]/80 to-[#0D1508]" />
      </div>
 
      <div className="relative z-10 w-full px-[var(--padding-web)] py-[var(--section-padding)] flex flex-col md:flex-row gap-[5em] lg:gap-[10em] items-center">
        
        {/* Left Content Column */}
        <div className="flex-1" ref={headRef}>
          {/* Standardized Editorial Header */}
          <span className="reveal-up opacity-0 text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
            CLINICAL INTAKE
          </span>
          <h2 className="reveal-head text-100-regular text-[#F4EDE6] leading-tight">
            <TextSplit text="Unlock Your True" /><br />
            <TextSplit text="Performance" />
          </h2>
          <div className="reveal-up opacity-0 w-[6em] h-[2px] bg-[#F4EDE6]/10 mt-[2em] mb-[2em]" />
          
          <div className="reveal-up opacity-0">
            <p className="text-16-regular-caps text-[#F4EDE6]/60 mb-[4em] max-w-[32em] leading-relaxed">
              EXPERIENCE THE NUTRIGETIC METHOD — TAILORED ENTIRELY TO YOUR OWN CLINICAL BIOMARKERS. WE SCREEN EACH APPLICANT TO PRESERVE EARLY-STAGE ELITE COACHING FOCUS.
            </p>
            
            <div className="flex flex-wrap gap-[1.5em] items-center">
              {/* Primary Glowing Capsule CTA */}
              <a
                href="#free-assessment"
                className="inline-flex items-center gap-[0.8em] px-[2.8em] py-[1.25em] bg-[#22C55E] text-[#0D1508] text-14-caps font-bold tracking-widest rounded-full transition-all duration-500 ease-out hover:scale-105 hover:bg-[#F4EDE6] hover:text-[#0D1508] shadow-[0_15px_40px_rgba(34,197,94,0.25)] hover:shadow-[0_20px_50px_rgba(244,237,230,0.12)] active:scale-95 group"
              >
                <span className="w-[0.45em] h-[0.45em] rounded-full bg-[#0D1508] group-hover:animate-ping" />
                APPLY FOR ASSESSMENT
                <span className="w-[0.45em] h-[0.45em] rounded-full bg-[#0D1508] group-hover:animate-ping" />
              </a>
              
              {/* Secondary Outlined CTA */}
              <a
                href="#contact-us"
                className="inline-flex items-center gap-[0.75em] px-[2.5em] py-[1.2em] border border-[#F4EDE6]/20 text-[#F4EDE6] text-14-caps font-bold tracking-widest rounded-full transition-colors duration-300 hover:bg-[#F4EDE6]/10 hover:border-[#F4EDE6]/40"
              >
                Talk to a biometric coach
              </a>
            </div>
          </div>
        </div>

        {/* Right Decorative Images Gallery (Upgraded from Farms to Science) */}
        <div className="flex-1 hidden lg:grid grid-cols-2 gap-[2em] items-start relative">
           
           {/* Glow behind the images for depth */}
           <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-[#8aab5a]/10 rounded-full blur-[100px] pointer-events-none z-0" />
           
           {/* Image 1: Clinical Coaching/Consultation (Replacing Farm Field) */}
           <div className="relative aspect-[4/5] mt-[6em] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[16px] overflow-hidden border border-[#F4EDE6]/5 z-10 group">
             <Image 
               src="/images/consortium_nutritionist.png" 
               alt="Clinical biometric coaching session" 
               fill 
               sizes="25vw" 
               className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D1508]/80 via-transparent to-transparent opacity-60" />
           </div>
           
           {/* Image 2: Active Telemetry Testing */}
           <div className="relative aspect-[4/5] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[16px] overflow-hidden border border-[#F4EDE6]/5 z-10 group">
             <Image 
               src="/images/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif" 
               alt="Athlete running telemetry" 
               fill 
               sizes="25vw" 
               className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0D1508]/80 via-transparent to-transparent opacity-60" />
           </div>
           
        </div>
      </div>
    </section>
  );
}
