"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextSplit from "./TextSplit";
import UtopiaButton from "./UtopiaButton";

gsap.registerPlugin(ScrollTrigger);

const meetSteps = [
  {
    id: "step-1",
    num: "01",
    sub: "BIOMETRIC SEQUENCE",
    title: "Intake Diagnostics",
    description: "Complete clinical metabolic panels and gut microbiome sequencing shipped directly to your location to establish your biological blueprint.",
    features: [
      "Clinical Blood Biomarker Kit",
      "Gut Genotyping Sequencer",
      "Metabolic Baseline Capture"
    ]
  },
  {
    id: "step-2",
    num: "02",
    sub: "CELLULAR MAPPING",
    title: "Consortium Meeting",
    description: "Our supporting biochemists translate your biomarker telemetry into a cellular roadmap, outlining internal dietary bottlenecks.",
    features: [
      "Biochemist Data Review",
      "Endocrine Hormone Audit",
      "Pathway Blockade Synthesis"
    ]
  },
  {
    id: "step-3",
    num: "03",
    sub: "BESPOKE SYNERGY",
    title: "Protocol Synthesis",
    description: "Your Lead Nutritionist designs and delivers your bespoke weekly nutritional blueprint, adaptogens, and cognitive recovery cycles.",
    features: [
      "Nutritionist Custom Formula",
      "Active Herbal Adaptogens",
      "Weekly Activity Calibration"
    ]
  },
  {
    id: "step-4",
    num: "04",
    sub: "METABOLIC PROGRESS",
    title: "Concierge Tuning",
    description: "Daily text adjustments, weekly check-in consultations, and 90-day clinical re-testing to mathematically prove your metabolic progress.",
    features: [
      "Daily SMS Diet Calibration",
      "Weekly Consultation Audits",
      "90-Day Clinical Re-Testing"
    ]
  },
];

export default function OnboardingRoadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const [rotation, setRotation] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useGSAP(
    () => {
      // 1. Character-staggered headline entrance
      const headline = sectionRef.current?.querySelector(".reveal-head");
      if (headline) {
        const chars = headline.querySelectorAll(".split-char");
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
              trigger: headline,
              start: "top 85%",
            }
          }
        );
      }

      // 2. DNA Rotation and Synchronization ScrollTrigger
      if (triggerRef.current) {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Smooth slow-spinning twist parameters (0 to 12.8 radians)
            setRotation(progress * 12.8);
            
            // Mathematically sync active card index directly based on scroll progress (0 to 3)
            const index = Math.min(
              Math.floor(progress * 4),
              3
            );
            setActiveStepIndex(index);
          }
        });
      }
    },
    { scope: sectionRef }
  );

  // 3. Mathematical DNA configuration (Calculated for ultra-fine high-density molecular telemetry)
  const N = 46; // Higher density for highly delicate clinical base pairs
  const basePairs = Array.from({ length: N }).map((_, i) => {
    const y = Number(((i / (N - 1)) * 100).toFixed(4)); // Vertical position in percent (0 to 100)
    
    // Twist calculation: angle based on scroll rotation + spatial pitch (i * 0.35)
    const theta = rotation + (i * 0.35);
    const sinVal = Math.sin(theta);
    const cosVal = Math.cos(theta);
    
    // Horizontal positions (Centered at 50% width, radius of 30% for high-resolution refinement)
    const xLeft = Number((50 - (30 * sinVal)).toFixed(4));
    const xRight = Number((50 + (30 * sinVal)).toFixed(4));
    
    // 3D Depth Layering calculations (Using cosine value)
    const zDepth = Number(cosVal.toFixed(4)); // depth coordinate from -1 to 1
    const opacity = Number((0.15 + (0.65 * (zDepth + 1) / 2)).toFixed(4)); // Delicate peak opacity of 0.8
    const strokeWidth = Number((0.4 + (0.8 * (zDepth + 1) / 2)).toFixed(4)); // Fine stroke width (0.4px to 1.2px)
    const nodeRadius = Number((1.0 + (1.5 * (zDepth + 1) / 2)).toFixed(4)); // Small precise nucleotide spheres
    
    // Determine color based on active scroll section (divided into 4 segments)
    const activeStepPos = Math.floor(y / 25);
    const isActiveRegion = activeStepPos === activeStepIndex;
    
    return {
      y,
      xLeft,
      xRight,
      opacity,
      strokeWidth,
      nodeRadius,
      isActiveRegion,
      zDepth
    };
  });

  return (
    <section ref={sectionRef} id="onboarding-roadmap" className="relative z-10 bg-[#0D1508] w-full py-[6em] lg:py-[8em] overflow-hidden">
      <div className="max-w-[85em] mx-auto px-[var(--padding-web)]">
        
        {/* Onboarding Header */}
        <div className="max-w-[36em] mb-[1em] mt-[0.5em]">
          <span className="text-[#8aab5a] text-14-caps font-bold tracking-widest block mb-[1.2em]">
            YOUR CLINICAL TIMELINE
          </span>
          <h2 className="reveal-head text-60-regular text-[#F4EDE6] leading-tight">
            <TextSplit text="The onboarding journey to cellular peak performance." />
          </h2>
          <div className="w-[6em] h-[2px] bg-[#F4EDE6]/10 mt-[2em]" />
        </div>

        {/* ========================================================================= */}
        {/* 💻 DESKTOP 3D ROTATING DNA ALTERNATING TIMELINE (hidden md:grid)        */}
        {/* ========================================================================= */}
        {/* Mathematically precise 4-row grid ensures cards line up 100% with DNA segments */}
        <div 
          ref={triggerRef} 
          className="hidden md:grid grid-cols-[1fr_120px_1fr] grid-rows-4 relative gap-y-[4em] gap-x-[2em] mt-[1.5em]"
        >
          
          {/* Central Twisting Genomic SVG DNA Helix Column (Spans all 4 rows) */}
          <div className="col-start-2 row-start-1 row-end-5 relative w-full h-full flex justify-center pointer-events-none select-none z-0">
            {/* Real-time Math-simulated 3D DNA Helix SVG */}
            <svg className="absolute top-0 bottom-0 left-0 right-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              
              {/* Central Spine vertical guide line */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(244, 237, 230, 0.02)" strokeWidth="0.5" strokeDasharray="3 5" />
              
              {/* 1. Continuous Winding Sugar-Phosphate Backbone Strands (Faceted segment-based 3D depth) */}
              {basePairs.map((bp, i) => {
                if (i === N - 1) return null;
                const nextBp = basePairs[i + 1];
                
                // Average z-depth of the segment for 3D opacity and thickness shading
                const avgZLeft = (bp.zDepth + nextBp.zDepth) / 2;
                const avgZRight = (-bp.zDepth - nextBp.zDepth) / 2; // Right strand is opposite phase

                const opacityLeft = Number((0.12 + (0.68 * (avgZLeft + 1) / 2)).toFixed(4));
                const strokeWidthLeft = Number((0.5 + (1.2 * (avgZLeft + 1) / 2)).toFixed(4)); // Highly delicate strand (0.5px to 1.7px)
                
                const opacityRight = Number((0.12 + (0.68 * (avgZRight + 1) / 2)).toFixed(4));
                const strokeWidthRight = Number((0.5 + (1.2 * (avgZRight + 1) / 2)).toFixed(4));

                return (
                  <g key={`backbone-${i}`} className="transition-all duration-300">
                    {/* Left Strand segment (Rounded linecaps fuse adjacent segments into seamless organic curves) */}
                    <line
                      x1={bp.xLeft}
                      y1={bp.y}
                      x2={nextBp.xLeft}
                      y2={nextBp.y}
                      stroke={bp.isActiveRegion ? "#22C55E" : "rgba(138, 171, 90, 0.3)"}
                      strokeWidth={strokeWidthLeft}
                      strokeLinecap="round"
                      style={{ opacity: opacityLeft }}
                    />
                    {/* Right Strand segment */}
                    <line
                      x1={bp.xRight}
                      y1={bp.y}
                      x2={nextBp.xRight}
                      y2={nextBp.y}
                      stroke={bp.isActiveRegion ? "#22C55E" : "rgba(138, 171, 90, 0.3)"}
                      strokeWidth={strokeWidthRight}
                      strokeLinecap="round"
                      style={{ opacity: opacityRight }}
                    />
                  </g>
                );
              })}
              
              {/* 2. Base Pair Rungs & Glowing Nucleotide Nodes */}
              {basePairs.map((bp, i) => (
                <g key={`rung-${i}`} style={{ opacity: bp.opacity }} className="transition-all duration-300">
                  
                  {/* Winding Connection Rung (Base Pair Link) with Glowing Energy Overlay */}
                  {/* Background wider glow stroke */}
                  <line 
                    x1={bp.xLeft} 
                    y1={bp.y} 
                    x2={bp.xRight} 
                    y2={bp.y} 
                    stroke={bp.isActiveRegion ? "#22C55E" : "rgba(138, 171, 90, 0.2)"} 
                    strokeWidth={Number((bp.strokeWidth * 1.6).toFixed(4))}
                    className="opacity-25 transition-colors duration-300"
                  />
                  {/* Core bright stroke (Fine wire core) */}
                  <line 
                    x1={bp.xLeft} 
                    y1={bp.y} 
                    x2={bp.xRight} 
                    y2={bp.y} 
                    stroke={bp.isActiveRegion ? "#22C55E" : "rgba(244, 237, 230, 0.45)"} 
                    strokeWidth={Number((bp.strokeWidth * 0.55).toFixed(4))}
                    className="transition-colors duration-300"
                  />

                  {/* LEFT Nucleotide Node - Volumetric double sphere */}
                  {/* Outer glowing aura */}
                  <circle 
                    cx={bp.xLeft} 
                    cy={bp.y} 
                    r={Number((bp.nodeRadius * 1.5).toFixed(4))} 
                    fill={bp.isActiveRegion ? "#22C55E" : "#8aab5a"} 
                    className="opacity-10 transition-colors duration-300"
                  />
                  {/* Inner bright core (Sleek molecular dot) */}
                  <circle 
                    cx={bp.xLeft} 
                    cy={bp.y} 
                    r={Number((bp.nodeRadius * 0.5).toFixed(4))} 
                    fill={bp.isActiveRegion ? "#22C55E" : "#F4EDE6"} 
                    className="transition-colors duration-300"
                  />

                  {/* RIGHT Nucleotide Node - Volumetric double sphere */}
                  {/* Outer glowing aura */}
                  <circle 
                    cx={bp.xRight} 
                    cy={bp.y} 
                    r={Number((bp.nodeRadius * 1.5).toFixed(4))} 
                    fill={bp.isActiveRegion ? "#22C55E" : "#8aab5a"} 
                    className="opacity-10 transition-colors duration-300"
                  />
                  {/* Inner bright core */}
                  <circle 
                    cx={bp.xRight} 
                    cy={bp.y} 
                    r={Number((bp.nodeRadius * 0.5).toFixed(4))} 
                    fill={bp.isActiveRegion ? "#22C55E" : "#F4EDE6"} 
                    className="transition-colors duration-300"
                  />
                </g>
              ))}

            </svg>
          </div>

          {/* ========================================================================= */}
          {/* ROW 1: Step 01 (Left Column)                                            */}
          {/* ========================================================================= */}
          <div className="col-start-1 row-start-1 flex justify-end items-center pr-[1em]">
            <div
              className={`roadmap-step-card w-full max-w-[28em] bg-[#2e3a1f]/10 backdrop-blur-md border p-[2.5em] rounded-[24px] flex flex-col justify-between transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                activeStepIndex === 0 
                  ? "opacity-100 scale-100 border-[rgba(34,197,94,0.4)] shadow-[0_20px_50px_rgba(34,197,94,0.06)]" 
                  : "opacity-25 scale-95 border-[#F4EDE6]/10"
              }`}
            >
              <div className="flex justify-between items-start mb-[1.2em]">
                <div className="flex items-center">
                  <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                  <span className="text-[0.7rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">
                    {meetSteps[0].sub}
                  </span>
                </div>
                <span className="text-[2rem] font-light leading-none select-none text-[#F4EDE6]/10 font-mono tracking-tighter">
                  {meetSteps[0].num}
                </span>
              </div>
              <div>
                <h3 className="text-[1.7em] font-light text-[#F4EDE6] mb-[0.6em] leading-tight">
                  {meetSteps[0].title}
                </h3>
                <p className="text-[0.95em] text-[#F4EDE6]/60 leading-relaxed font-light mb-[1.8em]">
                  {meetSteps[0].description}
                </p>
              </div>
              <div className="border-t border-[#F4EDE6]/10 pt-[1.2em]">
                <p className="text-[0.6rem] text-[#F4EDE6]/40 tracking-[0.2em] font-bold mb-[0.8em]">
                  CLINICAL PROTOCOLS
                </p>
                <ul className="flex flex-col gap-[0.4em]">
                  {meetSteps[0].features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[0.78rem] text-[#F4EDE6]/80 font-medium">
                      <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-start-3 row-start-1" />

          {/* ========================================================================= */}
          {/* ROW 2: Step 02 (Right Column)                                           */}
          {/* ========================================================================= */}
          <div className="col-start-1 row-start-2" />
          <div className="col-start-3 row-start-2 flex justify-start items-center pl-[1em]">
            <div
              className={`roadmap-step-card w-full max-w-[28em] bg-[#2e3a1f]/10 backdrop-blur-md border p-[2.5em] rounded-[24px] flex flex-col justify-between transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                activeStepIndex === 1 
                  ? "opacity-100 scale-100 border-[rgba(34,197,94,0.4)] shadow-[0_20px_50px_rgba(34,197,94,0.06)]" 
                  : "opacity-25 scale-95 border-[#F4EDE6]/10"
              }`}
            >
              <div className="flex justify-between items-start mb-[1.2em]">
                <div className="flex items-center">
                  <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                  <span className="text-[0.7rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">
                    {meetSteps[1].sub}
                  </span>
                </div>
                <span className="text-[2rem] font-light leading-none select-none text-[#F4EDE6]/10 font-mono tracking-tighter">
                  {meetSteps[1].num}
                </span>
              </div>
              <div>
                <h3 className="text-[1.7em] font-light text-[#F4EDE6] mb-[0.6em] leading-tight">
                  {meetSteps[1].title}
                </h3>
                <p className="text-[0.95em] text-[#F4EDE6]/60 leading-relaxed font-light mb-[1.8em]">
                  {meetSteps[1].description}
                </p>
              </div>
              <div className="border-t border-[#F4EDE6]/10 pt-[1.2em]">
                <p className="text-[0.6rem] text-[#F4EDE6]/40 tracking-[0.2em] font-bold mb-[0.8em]">
                  CLINICAL PROTOCOLS
                </p>
                <ul className="flex flex-col gap-[0.4em]">
                  {meetSteps[1].features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[0.78rem] text-[#F4EDE6]/80 font-medium">
                      <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ROW 3: Step 03 (Left Column)                                            */}
          {/* ========================================================================= */}
          <div className="col-start-1 row-start-3 flex justify-end items-center pr-[1em]">
            <div
              className={`roadmap-step-card w-full max-w-[28em] bg-[#2e3a1f]/10 backdrop-blur-md border p-[2.5em] rounded-[24px] flex flex-col justify-between transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                activeStepIndex === 2 
                  ? "opacity-100 scale-100 border-[rgba(34,197,94,0.4)] shadow-[0_20px_50px_rgba(34,197,94,0.06)]" 
                  : "opacity-25 scale-95 border-[#F4EDE6]/10"
              }`}
            >
              <div className="flex justify-between items-start mb-[1.2em]">
                <div className="flex items-center">
                  <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                  <span className="text-[0.7rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">
                    {meetSteps[2].sub}
                  </span>
                </div>
                <span className="text-[2rem] font-light leading-none select-none text-[#F4EDE6]/10 font-mono tracking-tighter">
                  {meetSteps[2].num}
                </span>
              </div>
              <div>
                <h3 className="text-[1.7em] font-light text-[#F4EDE6] mb-[0.6em] leading-tight">
                  {meetSteps[2].title}
                </h3>
                <p className="text-[0.95em] text-[#F4EDE6]/60 leading-relaxed font-light mb-[1.8em]">
                  {meetSteps[2].description}
                </p>
              </div>
              <div className="border-t border-[#F4EDE6]/10 pt-[1.2em]">
                <p className="text-[0.6rem] text-[#F4EDE6]/40 tracking-[0.2em] font-bold mb-[0.8em]">
                  CLINICAL PROTOCOLS
                </p>
                <ul className="flex flex-col gap-[0.4em]">
                  {meetSteps[2].features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[0.78rem] text-[#F4EDE6]/80 font-medium">
                      <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-start-3 row-start-3" />

          {/* ========================================================================= */}
          {/* ROW 4: Step 04 (Right Column)                                           */}
          {/* ========================================================================= */}
          <div className="col-start-1 row-start-4" />
          <div className="col-start-3 row-start-4 flex justify-start items-center pl-[1em]">
            <div
              className={`roadmap-step-card w-full max-w-[28em] bg-[#2e3a1f]/10 backdrop-blur-md border p-[2.5em] rounded-[24px] flex flex-col justify-between transition-all duration-500 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.15)] ${
                activeStepIndex === 3 
                  ? "opacity-100 scale-100 border-[rgba(34,197,94,0.4)] shadow-[0_20px_50px_rgba(34,197,94,0.06)]" 
                  : "opacity-25 scale-95 border-[#F4EDE6]/10"
              }`}
            >
              <div className="flex justify-between items-start mb-[1.2em]">
                <div className="flex items-center">
                  <span className="w-[0.5em] h-[0.5em] rounded-full bg-[#22C55E] mr-[0.5em] animate-pulse" />
                  <span className="text-[0.7rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">
                    {meetSteps[3].sub}
                  </span>
                </div>
                <span className="text-[2rem] font-light leading-none select-none text-[#F4EDE6]/10 font-mono tracking-tighter">
                  {meetSteps[3].num}
                </span>
              </div>
              <div>
                <h3 className="text-[1.7em] font-light text-[#F4EDE6] mb-[0.6em] leading-tight">
                  {meetSteps[3].title}
                </h3>
                <p className="text-[0.95em] text-[#F4EDE6]/60 leading-relaxed font-light mb-[1.8em]">
                  {meetSteps[3].description}
                </p>
              </div>
              <div className="border-t border-[#F4EDE6]/10 pt-[1.2em]">
                <p className="text-[0.6rem] text-[#F4EDE6]/40 tracking-[0.2em] font-bold mb-[0.8em]">
                  CLINICAL PROTOCOLS
                </p>
                <ul className="flex flex-col gap-[0.4em]">
                  {meetSteps[3].features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[0.78rem] text-[#F4EDE6]/80 font-medium">
                      <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 📱 MOBILE RESPONSIVE EDITORIAL FLOW (block md:hidden)                   */}
        {/* ========================================================================= */}
        <div className="block md:hidden w-full mt-[3em]">
          {/* Natural Vertical List of Cards */}
          <div className="flex flex-col gap-[2.5em]">
            {meetSteps.map((step) => (
              <div
                key={step.id}
                className="bg-[#2e3a1f]/15 border border-[#F4EDE6]/10 p-[2.2em] rounded-[20px] flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
              >
                <div className="flex justify-between items-start mb-[1.2em]">
                  <div className="flex items-center">
                    <span className="w-[0.4em] h-[0.4em] rounded-full bg-[#22C55E] mr-[0.4em] animate-pulse" />
                    <span className="text-[0.65rem] text-[#8aab5a] tracking-[0.15em] font-bold font-mono">
                      {step.sub}
                    </span>
                  </div>
                  <span className="text-[1.8rem] font-light leading-none select-none text-[#F4EDE6]/10 font-mono">
                    {step.num}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-[1.6rem] font-light text-[#F4EDE6] mb-[0.6em] leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] text-[#F4EDE6]/60 leading-relaxed font-light mb-[1.8em]">
                    {step.description}
                  </p>
                </div>

                <div className="border-t border-[#F4EDE6]/10 pt-[1.2em] mt-auto">
                  <p className="text-[0.6rem] text-[#F4EDE6]/40 tracking-[0.2em] font-bold mb-[0.8em]">
                    CLINICAL PROTOCOLS
                  </p>
                  <ul className="flex flex-col gap-[0.4em]">
                    {step.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-[0.78rem] text-[#F4EDE6]/80 font-medium">
                        <span className="text-[#22C55E] mr-[0.6em] font-mono text-[0.6rem]">✦</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 🚀 CLINICAL CALL-TO-ACTION (Shared Desktop & Mobile)                     */}
        {/* ========================================================================= */}
        <div className="flex justify-center mt-[4em] lg:mt-[5.5em] relative z-10">
          <UtopiaButton 
            href="#final-cta" 
            text="APPLY FOR ASSESSMENT" 
            spinningText="CELLULAR BLUEPRINT • CLINICAL SCAN • " 
            theme="dark"
          />
        </div>

      </div>
    </section>
  );
}
