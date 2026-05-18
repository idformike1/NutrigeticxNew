"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const products = [
  {
    id: "croptab",
    name: "NutriTab™ Energy",
    tagline: "Precision-designed hexagonal formula for natural athletic energy",
    href: "#programs",
    bg: "#7c914d",
  },
  {
    id: "nutripeak",
    name: "NutriPeak™ Recovery",
    tagline: "Scientifically optimized recovery with critical metabolic trace minerals",
    href: "#programs",
    bg: "#4a5e2a",
  },
  {
    id: "elevate-feed",
    name: "NutriCore™ Daily",
    tagline: "Daily bio-essential vitamins & elements for cellular longevity",
    href: "#programs",
    bg: "#3a4d20",
  },
];

export default function ProductsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Heading reveal
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // 2. Grid items stagger reveal
      const productCards = gridRef.current?.querySelectorAll(".product-card");
      if (productCards && gridRef.current) {
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
      }

      return () => {
      };
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="products" className="relative z-10 bg-[#F4EDE6]">
      <div className="w-full pt-[4em] lg:pt-[6em] pb-[7em] lg:pb-[15em] px-[1em] lg:px-[1.88em]">
        <div ref={headRef} className="opacity-0 mb-0">
          <h2 className="text-60-regular text-[#2e3a1f]">
            For Infinite Energy.<br />For Elite Longevity.
          </h2>
        </div>
 
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-[1em] lg:gap-[1.88em] mt-[7em] lg:mt-[12em]">
          {products.map((product) => (
            <a
              key={product.id}
              id={`product-${product.id}`}
              href={product.href}
              className="product-card opacity-0 relative block overflow-hidden group"
              style={{ minHeight: "26.25em" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundColor: product.bg }}
              />
              {/* Tablet watermark */}
              <div className="absolute bottom-0 right-0 w-[65%] h-[75%] opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                <Image
                  src="/images/wellness_hexagon_tablet.png"
                  alt=""
                  fill
                  sizes="33vw"
                  className="object-contain object-bottom-right"
                />
              </div>

              <div className="relative z-10 p-[2em] flex flex-col justify-between" style={{ minHeight: "26.25em" }}>
                <p className="text-14-caps text-[#F4EDE6]/40">Nutrigetic</p>
                <div>
                  <h3 className="text-[2rem] font-light text-[#F4EDE6] leading-tight mb-[0.5em]">{product.name}</h3>
                  <p className="text-14-caps text-[#F4EDE6]/55 mb-[1.5em]">{product.tagline}</p>
                  <div className="flex items-center gap-[0.5em] text-14-caps text-[#F4EDE6]">
                    <span>Learn more</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
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
