"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

const trialLocations = [
  { country: "USA", focus: "Athletic Performance", x: "20%", y: "35%" },
  { country: "Bolivia", focus: "Altitude Adaptability", x: "25%", y: "65%" },
  { country: "Ireland", focus: "Active Recovery", x: "45%", y: "25%" },
  { country: "Spain", focus: "Metabolic Health", x: "47%", y: "35%" },
  { country: "Serbia", focus: "Cardiovascular Endurance", x: "52%", y: "30%" },
  { country: "DRC", focus: "Cellular Hydration", x: "53%", y: "60%" },
  { country: "Israel", focus: "Cognitive Focus", x: "57%", y: "40%" },
  { country: "Uzbekistan", focus: "Immune Health", x: "65%", y: "30%" },
  { country: "Vietnam", focus: "Stress Adaptation", x: "78%", y: "55%" },
  { country: "Singapore", focus: "Sleep & Longevity", x: "80%", y: "65%" },
];

export default function TrialsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Character stagger for headings
      const revealHeads = containerRef.current?.querySelectorAll(".reveal-head");
      if (revealHeads) {
        revealHeads.forEach((head) => {
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
        });
      }

      // Simple reveal for other elements
      const reveals = containerRef.current?.querySelectorAll(".reveal-up");
      if (reveals) {
        gsap.fromTo(
          reveals,
          { opacity: 0, y: "1.25em" },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
            },
          }
        );
      }

      // Map markers animation
      const markers = containerRef.current?.querySelectorAll(".map-marker");
      if (markers) {
        gsap.fromTo(
          markers,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="trials" className="relative z-10 bg-[#F4EDE6] overflow-hidden">
      <div className="w-full py-[var(--section-padding)] px-[var(--padding-web)]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[5em] gap-[3em]">
          <div>
            <h2 className="reveal-head text-60-regular text-[#2e3a1f] mb-[1em]">
              <TextSplit text="Clinical Studies" /><br />
              <TextSplit text="in Progress" />
            </h2>
            <p className="reveal-up opacity-0 text-16-regular-caps text-[#2e3a1f]/60 max-w-[20em]">
              Testing across 4 continents to prove consistent metabolic efficacy across diverse genetic profiles, lifestyles, and climates.
            </p>
          </div>
          <div className="reveal-up opacity-0 text-left md:text-right">
            <p className="text-80-regular text-[#2e3a1f] leading-none mb-[0.5em]">150+</p>
            <p className="text-14-caps text-[#2e3a1f]/50">cohort studies completed & ongoing</p>
          </div>
        </div>
 
        {/* Map visualization */}
        <div ref={mapRef} className="relative aspect-[16/9] w-full bg-[#E5DDD4] rounded-[0.25em] overflow-hidden mb-[3em]">
          {/* Stylized Map Background */}
          <div className="absolute inset-0 pointer-events-none">
             <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                {/* North America */}
                <path d="M100,100 L250,100 L280,250 L150,300 L80,200 Z" fill="#2e3a1f" opacity="0.15" />
                {/* South America */}
                <path d="M250,300 L350,320 L320,450 L220,400 Z" fill="#2e3a1f" opacity="0.15" />
                {/* Africa */}
                <path d="M480,250 L580,250 L600,400 L500,420 L450,350 Z" fill="#2e3a1f" opacity="0.15" />
                {/* Europe/Asia */}
                <path d="M480,100 L800,80 L900,250 L750,350 L500,300 Z" fill="#2e3a1f" opacity="0.15" />
                {/* Australia */}
                <path d="M800,380 L900,380 L880,450 L780,450 Z" fill="#2e3a1f" opacity="0.15" />
             </svg>
          </div>
 
          {/* Markers */}
          {trialLocations.map((loc, i) => (
            <div
              key={i}
              className="map-marker absolute group cursor-pointer"
              style={{ left: loc.x, top: loc.y }}
            >
              <div className="w-[1em] h-[1em] bg-[#2e3a1f] rounded-full flex items-center justify-center transform group-hover:scale-125 transition-transform">
                 <div className="w-[0.375em] h-[0.375em] bg-[#8aab5a] rounded-full" />
              </div>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[0.5em] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-[#2e3a1f] text-[#F4EDE6] px-[0.75em] py-[0.375em] rounded-[0.25em] text-xs">
                 <p className="font-medium">{loc.country}</p>
                 <p className="opacity-60">{loc.focus}</p>
              </div>
            </div>
          ))}
        </div>
 
        <div className="reveal-up flex flex-wrap gap-[1em] text-14-caps text-[#2e3a1f]/40 px-[1em] lg:px-[3.75em]">
           <span>US</span> <span>•</span> <span>Ireland</span> <span>•</span> <span>UK</span> <span>•</span> <span>Bolivia</span> <span>•</span> <span>DRC</span> <span>•</span> <span>Serbia</span> <span>•</span> <span>Spain</span> <span>•</span> <span>Vietnam</span> <span>•</span> <span>Israel</span> <span>•</span> <span>Singapore</span> <span>•</span> <span>Uzbekistan</span> <span>•</span> <span>and more.</span>
        </div>
      </div>
    </section>
  );
}
