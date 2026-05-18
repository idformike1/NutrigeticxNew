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

  useGSAP(
    () => {
      // 1. Character stagger for heading
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

      // 2. Simple fade-in for content
      const content = containerRef.current?.querySelector(".reveal-content");
      if (content) {
        gsap.fromTo(
          content,
          { opacity: 0, y: "1.25em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: content,
              start: "top 80%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="final-cta" className="relative z-10 bg-[#2e3a1f] overflow-hidden">
      {/* Background panoramic image (sheep grazing) */}
      <div className="absolute top-0 left-0 right-0 h-[25em] z-0 overflow-hidden">
        <Image
          src="/images/68cc66c2b616f1163c0b70ec_fm_Mobile.avif"
          alt="Rolling fields"
          fill
          sizes="100vw"
          className="object-cover object-bottom opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2e3a1f]" />
      </div>
 
      <div className="relative z-10 w-full px-[var(--padding-web)] py-[var(--section-padding)] flex flex-col md:flex-row gap-[5em] lg:gap-[15em] items-center">
        <div className="flex-1">
          <h2 className="reveal-head text-100-regular text-[#F4EDE6] mb-[1.5em]">
            <TextSplit text="Unlock Your True" /><br />
            <TextSplit text="Performance" />
          </h2>
          <div className="reveal-content opacity-0">
            <p className="text-16-regular-caps text-[#F4EDE6]/60 mb-[4em] max-w-[32em]">
              EXPERIENCE THE NUTRIGETIC METHOD — TAILORED ENTIRELY TO YOUR OWN CLINICAL BIOMARKERS. WE SCREEN EACH APPLICANT TO PRESERVE EARLY-STAGE ELITE COACHING FOCUS.
            </p>
            
            <div className="flex flex-wrap gap-[1.5em]">
              <a
                href="#free-assessment"
                className="inline-flex items-center gap-[0.75em] px-[2.5em] py-[1.25em] bg-[#F4EDE6] text-[#2e3a1f] text-14-caps transition-transform hover:scale-105 active:scale-95"
              >
                <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
                Apply for assessment
                <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
              </a>
              <a
                href="#contact-us"
                className="inline-flex items-center gap-[0.75em] px-[2.5em] py-[1.25em] border border-[#F4EDE6]/30 text-[#F4EDE6] text-14-caps transition-colors hover:bg-[#F4EDE6]/10"
              >
                Talk to a biometric coach
              </a>
            </div>
          </div>
        </div>

        {/* Decorative images on the right */}
        <div className="flex-1 hidden lg:grid grid-cols-2 gap-[2em] items-start">
           <div className="relative aspect-[4/5] mt-[6em] shadow-2xl">
             <Image src="/images/68bdf00d8fb03044e2d3834d_field_img_(1).avif" alt="Coaching session" fill sizes="25vw" className="object-cover rounded-[0.25em]" />
           </div>
           <div className="relative aspect-[4/5] shadow-2xl">
             <Image src="/images/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif" alt="Running telemetry" fill sizes="25vw" className="object-cover rounded-[0.25em]" />
           </div>
        </div>
      </div>
    </section>
  );
}
