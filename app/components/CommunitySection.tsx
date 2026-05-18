"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

const communityItems = [
  {
    title: "Empowering High-Performance Athletes",
    category: "Impact",
    image: "/images/68bdf00d8fb03044e2d3834d_field_img_(1).avif",
  },
  {
    title: "12-Month Telemetry Efficacy Trials",
    category: "Science",
    image: "/images/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif",
  },
  {
    title: "Singapore Sleep & Longevity Study",
    category: "Cohorts",
    image: "/images/68cc66c2b616f1163c0b70ec_fm_Mobile.avif",
  },
  {
    title: "The Future of Cellular Bio-Energy",
    category: "Efficacy",
    image: "/images/68cc66c2b616f1163c0b70ec_fm_Mobile.avif",
  },
];

export default function CommunitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scroll animation for the community items
      if (scrollRef.current) {
        gsap.to(scrollRef.current, {
          x: () => -(scrollRef.current!.scrollWidth - window.innerWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${scrollRef.current!.scrollWidth / 2}`,
            scrub: 1,
            pin: true,
          },
        });
      }

      // 1. Title reveal with character split
      const title = containerRef.current?.querySelector(".title-reveal");
      if (title) {
        const chars = title.querySelectorAll(".split-char");
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
              trigger: title,
              start: "top 85%",
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="community" className="relative z-10 bg-[#2e3a1f] py-[var(--section-padding)] px-[var(--padding-web)] overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="mb-[5em]">
        <h2 className="title-reveal text-60-regular text-[#F4EDE6]">
          <TextSplit text="Latest from the" /><br />
          <TextSplit text="cohort" />
        </h2>
      </div>
 
      <div className="relative">
        <div ref={scrollRef} className="flex gap-[1.69em] px-0">
          {communityItems.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[18.75em] md:w-[25em] aspect-[4/5] relative group overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 75vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-[2em]">
                <p className="text-14-caps text-[#8aab5a] mb-[0.5em]">{item.category}</p>
                <h3 className="text-[1.5rem] font-light text-[#F4EDE6] leading-tight group-hover:underline">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
          
          {/* Spacer to allow full scroll */}
          <div className="shrink-0 w-[2.5em]" />
        </div>
      </div>
    </section>
  );
}
