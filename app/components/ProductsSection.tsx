"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "nutritab",
    name: "NutriTab™ Energy",
    tagline: "Hexagonal ATP-boosting formula for peak athletic output.",
    bioData: "ATP SYNTHESIS +42%",
    href: "#programs",
    bg: "#0D1508",
    glow: "rgba(138, 171, 90, 0.15)", // green glow
    image: "/images/wellness_hero_tablet.png",
  },
  {
    id: "nutripeak",
    name: "NutriPeak™ Recovery",
    tagline: "Metabolic trace minerals for accelerated muscle repair.",
    bioData: "LACTIC CLEARANCE 3.5x",
    href: "#programs",
    bg: "#0D1508",
    glow: "rgba(34, 197, 94, 0.12)", // active green glow
    image: "/images/wellness_hexagon_tablet.png",
  },
  {
    id: "nutricore",
    name: "NutriCore™ Daily",
    tagline: "Cellular longevity matrix with raw cold-extracted vitamins.",
    bioData: "OXIDATIVE STRESS -60%",
    href: "#programs",
    bg: "#0D1508",
    glow: "rgba(244, 237, 230, 0.08)", // beige glow
    image: "/images/nutrigetic_consortium.png", 
  },
];

export default function ProductsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Heading reveal with split text
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
      
      const reveals = headRef.current?.querySelectorAll(".reveal-up");
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
              trigger: headRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Grid items stagger reveal
      const productCards = gridRef.current?.querySelectorAll(".product-card");
      let mm = gsap.matchMedia();
      
      if (productCards && gridRef.current) {
        mm.add("(min-width: 768px)", () => {
          gsap.fromTo(
            productCards,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
                once: true,
              },
            }
          );
        });

        mm.add("(max-width: 767px)", () => {
          productCards.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true,
                },
              }
            );
          });
        });
      }

      return () => {
        mm.revert();
      };    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="products" className="relative z-10 bg-[#F4EDE6]">
      <div className="w-full pt-[4em] lg:pt-[6em] pb-[7em] lg:pb-[10em] px-[var(--padding-web)]">
        
        {/* Editorial Header */}
        <div ref={headRef} className="max-w-[36em]">
          <span className="reveal-up opacity-0 text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
            CLINICAL METABOLICS
          </span>
          <h2 className="reveal-head text-60-regular text-[#2e3a1f] leading-tight">
            <TextSplit text="For Infinite Energy." /><br />
            <TextSplit text="For Elite Longevity." />
          </h2>
          <div className="reveal-up opacity-0 w-[6em] h-[2px] bg-[#2e3a1f]/15 mt-[2em] mb-[2em]" />
        </div>
 
        {/* Product Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-[1.5em] lg:gap-[2.5em] mt-[5em] lg:mt-[7em]">
          {products.map((product) => (
            <a
              key={product.id}
              id={`product-${product.id}`}
              href={product.href}
              className="product-card opacity-0 relative block overflow-hidden group rounded-[24px] border border-[#2e3a1f]/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-[#22C55E]/40 hover:shadow-[0_20px_50px_rgba(34,197,94,0.15)] transition-all duration-500 min-h-[22em] md:min-h-[32em]"
            >
              {/* Dark Clinical Background */}
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundColor: product.bg }}
              />
              
              {/* Radial Hover Glow (Mix blend screen for neon effect) */}
              <div 
                className="absolute inset-0 opacity-40 transition-opacity duration-700 group-hover:opacity-100 mix-blend-screen pointer-events-none"
                style={{ background: `radial-gradient(circle at top right, ${product.glow}, transparent 70%)` }}
              />

              {/* Product Image / Holographic Watermark */}
              <div className="absolute bottom-[-5%] right-[-15%] w-[110%] h-[85%] opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none mix-blend-lighten">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="33vw"
                  className="object-contain object-bottom-right"
                />
                {/* Gradient fade to blend image smoothly into the dark card */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1508]/80 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#0D1508]/20 to-[#0D1508]/90" />
              </div>

              {/* Card Content */}
              <div className="relative z-10 p-[1.8em] md:p-[2.5em] flex flex-col justify-between h-full min-h-[22em] md:min-h-[32em]">
                {/* Top: Branding & Floating Bio-Data Tag */}
                <div className="flex justify-between items-start gap-[1em]">
                  <p className="text-[0.65rem] text-[#F4EDE6]/40 tracking-widest font-bold uppercase mt-[0.5em]">Nutrigetic</p>
                  
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/20 px-[0.8em] py-[0.5em] rounded-full backdrop-blur-sm flex items-center gap-[0.5em] shadow-[0_5px_15px_rgba(34,197,94,0.1)]">
                    <span className="w-[0.35em] h-[0.35em] rounded-full bg-[#22C55E] animate-pulse" />
                    <span className="text-[0.55rem] text-[#22C55E] tracking-[0.12em] font-bold font-mono uppercase whitespace-nowrap">
                      {product.bioData}
                    </span>
                  </div>
                </div>

                {/* Bottom: Text & CTA */}
                <div className="mt-auto">
                  <h3 className="text-[2rem] font-light text-[#F4EDE6] leading-tight mb-[0.4em]">{product.name}</h3>
                  <p className="text-[0.9rem] text-[#F4EDE6]/60 font-light mb-[2.5em] leading-relaxed max-w-[95%]">{product.tagline}</p>
                  
                  {/* Clinical CTA Link */}
                  <div className="flex items-center gap-[0.6em] text-[0.7rem] text-[#22C55E] tracking-widest font-bold uppercase">
                    <span>View clinical data</span>
                    <svg viewBox="0 0 10 10" className="w-[0.8em] h-[0.8em] fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                      <path d="M1 5h8M5 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
