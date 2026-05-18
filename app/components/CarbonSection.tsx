"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

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

      // 3. Simple fade-in for paragraph
      const para = containerRef.current?.querySelector(".reveal-para");
      if (para) {
        gsap.fromTo(
          para,
          { opacity: 0, y: "1em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: para,
              start: "top 90%",
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
          <div ref={contentRef}>
            <h2 className="reveal-head text-60-regular text-[#2e3a1f] mb-[1.5em]">
              <TextSplit text="Pure Bio-efficacy — Without the Chemical Burden" />
            </h2>
            <p className="reveal-para opacity-0 text-16-regular-caps text-[#2e3a1f]/60 mb-[3em] max-w-[28em]">
              Most wellness brands hide behind complex synthetic binders and industrial artificial coloring.
              <br /><br />
              With Nutrigetic, you experience absolute purity. Our formulas are cold-encapsulated from raw organic extracts — ensuring maximum natural absorption with zero synthetic fillers, heavy metals, or biological compromise.
            </p>
            <a
              href="#about"
              className="inline-flex items-center gap-[0.75em] px-[2em] py-[1em] border border-[#2e3a1f]/20 text-[#2e3a1f] text-14-caps w-fit transition-all duration-300 hover:bg-[#2e3a1f] hover:text-[#F4EDE6]"
            >
              <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
              learn more
              <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
            </a>
          </div>

          {/* Parallax Image */}
          <div ref={imageRef} className="relative h-[31.25em] md:h-[37.5em] overflow-hidden">
            <Image
              src="/images/68bdf00d8fb03044e2d3834d_field_img_(1).avif"
              alt="Biometric performance tracking"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
