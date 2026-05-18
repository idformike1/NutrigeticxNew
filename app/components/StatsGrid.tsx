"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";

const stats = [
  { value: 15, prefix: "≥", suffix: "+", label: "biomarkers tracked and optimized daily" },
  { value: 3.5, suffix: "x", label: "increase in cellular energy & recovery efficiency" },
  { value: 94, suffix: "%", label: "active absorption rate with 0% heavy synthetics" },
  { value: 100, suffix: "%", label: "fully personalized health & biometric coaching" },
];

export default function StatsGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = containerRef.current?.querySelectorAll(".stat-value");
      if (elements) {
        elements.forEach((el, i) => {
          const targetValue = stats[i].value;
          const isDecimal = targetValue % 1 !== 0;

          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: targetValue,
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
              },
              onUpdate: function () {
                const val = parseFloat(this.targets()[0].textContent);
                this.targets()[0].textContent = isDecimal
                  ? val.toFixed(1)
                  : Math.round(val);
              },
            }
          );
        });
      }

      // Character stagger for heading
      const head = containerRef.current?.parentElement?.querySelector(".reveal-head");
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

      // Fade in the grid
      const statCards = containerRef.current?.querySelectorAll(".stat-card");
      if (statCards) {
        gsap.fromTo(
          statCards,
          { opacity: 0, y: "1.25em" },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
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
    <section id="s-numbers" className="relative z-10 bg-[#F4EDE6] overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video muted loop playsInline autoPlay className="w-full h-full object-cover opacity-[0.04]">
          <source src="/images/tab.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#F4EDE6]/85" />
      </div>
 
      <div className="relative z-10 w-full py-[var(--section-padding)] px-[var(--padding-web)]">
        {/* Header */}
        <div className="mb-[5em]">
          <h2 className="reveal-head text-60-regular text-[#2e3a1f]">
            <TextSplit text="Clinically-Proven." /><br />
            <TextSplit text="Athlete-Approved." />
          </h2>
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5em] items-start">
          {/* Left: Large Image */}
          <div className="relative aspect-[4/5] lg:aspect-[1/1.2] overflow-hidden rounded-[16px] border border-[#2e3a1f]/10 shadow-[0_15px_40px_rgba(46,58,31,0.06)]">
             <img 
               src="/images/wellness_hero_tablet.png" 
               alt="Nutrigetic biomarker telemetry analytics dashboard" 
               className="w-full h-full object-cover"
             />
          </div>

          {/* Right: Stats Grid */}
          <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 gap-x-[4em] gap-y-[6em]">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card opacity-0 pb-[1.5em] relative">
                <div className="absolute top-0 left-0 right-0 h-px bg-[#2e3a1f]/15" />
                <div className="pt-[1.5em]">
                  <p className="text-80-regular text-[#2e3a1f] mb-[0.2em]">
                    {stat.prefix}
                    <span className="stat-value">0</span>
                    {stat.suffix}
                  </p>
                  <p className="text-16-regular-caps text-[#2e3a1f]/70 max-w-[12em]">{stat.label}</p>
                </div>
              </div>
            ))}

            <p className="col-span-1 sm:col-span-2 text-14-caps text-[#2e3a1f]/35 max-w-[35em] mt-[2em]">
              *Based on double-blind clinical trials and biometric telemetry tracking over a 12-month period compared to standard coaching and generic nutrient plans.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
