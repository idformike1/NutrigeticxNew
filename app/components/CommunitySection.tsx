"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

const communityItems = [
  {
    quote: "My VO2 Max output increased by 8.4% within 90 days of adopting the Nutrigetic cold-extraction protocol.",
    name: "Clara Vance",
    role: "OLYMPIC CYCLIST",
    metric: "VO2 MAX +8.4%",
    image: "/images/68c2a5d546bf825d7fca94d4_ezgif-6a9414d8402168.avif", // Running / Athlete telemetry
  },
  {
    quote: "The deep sleep architecture optimization has completely eliminated my mid-season neuromuscular fatigue.",
    name: "Dr. Aris Thorne",
    role: "LONGEVITY RESEARCHER",
    metric: "REM SLEEP +35%",
    image: "/images/nutrigetic_consortium.png", // Doctor / Lab
  },
  {
    quote: "We are seeing unprecedented lactic clearance rates and cellular metabolic efficiency in our high-altitude testing cohorts.",
    name: "Bolivia Clinical Trials",
    role: "COHORT 04",
    metric: "LACTIC CLEARANCE 3.5x",
    image: "/images/wellness_hero_tablet.png", // Telemetry dashboard
  },
  {
    quote: "Cellular hydration metrics and core body temperatures stabilized entirely within the first two weeks.",
    name: "Marcus Lin",
    role: "ENDURANCE TRIATHLETE",
    metric: "HYDRATION RETENTION 98%",
    image: "/images/nutrigetic_absorption_bg.png", // Bio-efficacy / Science
  },
];

export default function CommunitySection() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scroll animation for the gallery items
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
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="community" className="relative z-10 bg-[#0D1508] py-[var(--section-padding)] px-[var(--padding-web)] overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Editorial Header */}
      <div ref={headRef} className="max-w-[36em] mb-[5em]">
        <span className="reveal-up opacity-0 text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
          CLINICAL EVIDENCE
        </span>
        <h2 className="reveal-head text-60-regular text-[#F4EDE6] leading-tight">
          <TextSplit text="Cohort Testimonials &" /><br />
          <TextSplit text="Clinical Research." />
        </h2>
        <div className="reveal-up opacity-0 w-[6em] h-[2px] bg-[#F4EDE6]/10 mt-[2em] mb-[2em]" />
      </div>
 
      {/* Horizontal Scroll Gallery */}
      <div className="relative">
        <div ref={scrollRef} className="flex gap-[1.5em] lg:gap-[2.5em] px-0">
          {communityItems.map((item, i) => (
            <div
              key={i}
              className="shrink-0 w-[22em] md:w-[28em] aspect-[4/5] relative group overflow-hidden rounded-[24px] border border-[#F4EDE6]/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-[#22C55E]/30 transition-colors duration-500"
            >
              {/* Premium Background Image */}
              <Image
                src={item.image}
                alt={item.role}
                fill
                sizes="(max-width: 768px) 85vw, 30vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              
              {/* Deep Clinical Gradient for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D1508]/95 via-[#0D1508]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
              
              {/* Floating Bio-Metric Tag (Top Right) */}
              <div className="absolute top-[1.5em] right-[1.5em] bg-[#F4EDE6]/95 backdrop-blur-md border border-[#2e3a1f]/10 px-[0.8em] py-[0.5em] rounded-full shadow-lg flex items-center gap-[0.5em] opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 z-20">
                 <span className="w-[0.4em] h-[0.4em] rounded-full bg-[#22C55E] animate-pulse" />
                 <span className="text-[0.6rem] text-[#2e3a1f] tracking-[0.15em] font-bold font-mono uppercase whitespace-nowrap">
                   {item.metric}
                 </span>
              </div>

              {/* Content Panel (Bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-[2.5em] flex flex-col justify-end h-full z-10">
                
                {/* Quote Icon */}
                <div className="text-[#22C55E] text-[2.5rem] leading-none mb-[0.2em] opacity-60 font-serif">"</div>
                
                {/* Testimonial Text */}
                <h3 className="text-[1.3rem] font-light text-[#F4EDE6] leading-relaxed mb-[1.5em] group-hover:text-[#F4EDE6] transition-colors duration-300">
                  {item.quote}
                </h3>
                
                {/* Athlete / Researcher Meta */}
                <div className="flex items-center gap-[1em] border-t border-[#F4EDE6]/15 pt-[1.5em]">
                   <div>
                     <p className="text-[1rem] font-medium text-[#F4EDE6] leading-none mb-[0.4em]">{item.name}</p>
                     <p className="text-[0.65rem] text-[#8aab5a] tracking-widest font-bold uppercase">{item.role}</p>
                   </div>
                </div>
                
              </div>
            </div>
          ))}
          
          {/* Spacer to allow full scroll padding at the end */}
          <div className="shrink-0 w-[5em]" />
        </div>
      </div>
    </section>
  );
}
