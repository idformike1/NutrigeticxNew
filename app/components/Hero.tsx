"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Text reveal on page load
      const tl = gsap.timeline();
      const headlineChars = headlineRef.current?.querySelectorAll(".split-char");
      const sublineChars = sublineRef.current?.querySelectorAll(".split-char");

      if (headlineChars && sublineChars) {
        tl.fromTo(
          headlineChars,
          { opacity: 0, y: "0.5em" },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.02, 
            ease: "power3.out", 
            delay: 0.2 
          }
        )
          .fromTo(
            tabletRef.current,
            { opacity: 0, y: "2em", scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            sublineChars,
            { opacity: 0, y: "0.5em" },
            { 
              opacity: 1, 
              y: 0, 
              duration: 0.8, 
              stagger: 0.015, 
              ease: "power3.out" 
            },
            "-=0.7"
          )
          .fromTo(
            descRef.current,
            { opacity: 0, y: "1em" },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            "-=0.6"
          );
      }

      // 2. Background image parallax on scroll
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // 3. Hide the fixed tablet as the hero section scrolls out of view
      if (tabletRef.current) {
        gsap.to(tabletRef.current, {
          opacity: 0,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Cleanup
      return () => {
      };
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen bg-[#2e3a1f] overflow-hidden flex flex-col">
      {/* Background image */}
      <div ref={bgImageRef} className="absolute inset-0 z-0 bg-[#2e3a1f]">
        <Image
          src="/images/68cc66c2b616f1163c0b70ec_fm_Mobile.avif"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 0vw"
          className="object-cover object-center md:hidden"
          priority
        />
        <Image
          src="/images/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif"
          alt=""
          fill
          sizes="(min-width: 769px) 100vw, 0vw"
          className="object-cover object-top hidden md:block"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2e3a1f]/10 via-transparent to-[#2e3a1f]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-[var(--padding-web)] pt-[8em] pb-[var(--section-padding)] w-full">
        <div className="flex-1 flex flex-col justify-between gap-[12em] lg:gap-[20em]">
          {/* H1 */}
          <div ref={headlineRef} className="mb-0">
            <h1 id="h1-main" className="text-100-regular text-[#F4EDE6]">
              <TextSplit text="Your wellness journey" /><br />
              <TextSplit text="personalized, not generic." />
            </h1>
          </div>

          {/* Tablet (Fixed Centerpiece) */}
          <div ref={tabletRef} className="absolute md:fixed inset-0 z-0 flex items-center justify-center pointer-events-none opacity-0">
            <Image
              src="/images/wellness_hexagon_tablet.png"
              alt="Premium hexagonal wellness supplement tablet engraved with N"
              width={600}
              height={600}
              className="w-full max-w-[60vw] md:max-w-[30em] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              priority
            />
          </div>

          {/* Right Column Content Group (Unified Wrapper for Perfect Left Alignment) */}
          <div className="ml-auto w-full max-w-[28em] flex flex-col items-start text-left gap-[2em]">
            {/* H2 */}
            <div ref={sublineRef} className="w-full">
              <h2 id="h1-sub" className="text-60-regular text-[#F4EDE6]">
                <TextSplit text="For Your Energy." /><br />
                <TextSplit text="For Your Performance." />
              </h2>
            </div>

            {/* Description + CTA */}
            <div ref={descRef} className="flex flex-col gap-[2.5em] opacity-0 w-full items-start">
              <p className="text-18-caps text-[#F4EDE6]/75">
                Expert Nutrition, Fitness & Lifestyle Coaching Under One Roof.
              </p>
              <a
                id="hero-cta"
                href="#products"
                className="inline-flex items-center gap-[0.75em] px-[2em] py-[1em] border border-[#F4EDE6]/30 text-[#F4EDE6] text-14-caps w-fit transition-all duration-400 hover:bg-[#F4EDE6] hover:text-[#2e3a1f]"
              >
                <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
                Start With A Free Assessment.
                <span className="w-[0.375em] h-[0.375em] rounded-full bg-current" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Logos marquee strip */}
      <div className="relative z-10 w-full overflow-hidden py-[2em] border-t border-[#F4EDE6]/10 mt-auto">
        <div className="flex items-center marquee-content">
          {[...Array(2)].map((_, set) => (
            <div key={set} className="flex items-center gap-[4em] shrink-0 px-[2em]">
              {[
                { src: "/images/logo_fssai_v2.png", alt: "FSSAI India Logo" },
                { src: "/images/logo_icmr_v2.png", alt: "ICMR India Logo" },
                { src: "/images/logo_niti_aayog_v2.png", alt: "NITI Aayog Logo" },
                { src: "/images/logo_akshaya_patra_v2.png", alt: "Akshaya Patra Foundation Logo" },
                { src: "/images/logo_nin_v2.png", alt: "National Institute of Nutrition (NIN) India Logo" },
              ].map((logo, i) => (
                <div key={i} className="shrink-0 relative w-[8em] h-[2em]">
                  <Image src={logo.src} alt={logo.alt} fill sizes="8em" className="object-contain brightness-0 invert opacity-50" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-content {
          animation: marqueeScroll 25s linear infinite;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
