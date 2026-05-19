"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface UtopiaButtonProps {
  href: string;
  text: string;
  spinningText?: string;
  className?: string;
  theme?: "dark" | "light"; // dark = green button, light = beige button
}

export default function UtopiaButton({ 
  href, 
  text, 
  spinningText = "CLINICAL PROTOCOL • INTAKE SCAN • ", 
  className = "",
  theme = "dark"
}: UtopiaButtonProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  
  // A GSAP proxy object to securely animate the CSS custom property and SVG scale
  const maskObj = useRef({ spread: 0, waveScale: 15 });

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = containerRef.current;
    const border = borderRef.current;
    const displacement = displacementRef.current;
    if (!btn || !border || !displacement) return;

    // 1. Calculate the exact point of mouse entry
    const rect = btn.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    
    // 2. Convert to angle
    let angleDeg = (Math.atan2(my, mx) * 180 / Math.PI) + 90;
    if (angleDeg < 0) angleDeg += 360;

    border.style.setProperty('--angle', `${angleDeg}deg`);
    
    // 3. Reset physics
    gsap.killTweensOf(maskObj.current);
    maskObj.current.spread = 0;
    maskObj.current.waveScale = 15; // Start with a very visible wave distortion
    displacement.setAttribute('scale', '15');
    
    // 4. Animate the two waves growing outward (Slower as requested)
    gsap.to(maskObj.current, {
      spread: 180, 
      duration: 1.5, // Slowed down
      ease: "power2.out",
      onUpdate: () => {
        border.style.setProperty('--spread', `${maskObj.current.spread}deg`);
      }
    });

    // 5. Smoothly reduce the waviness to 0 so the final border is perfectly smooth
    gsap.to(maskObj.current, {
      waveScale: 0,
      duration: 1.5,
      ease: "power2.in", // Stays wavy for a while, then quickly smooths out at the end
      onUpdate: () => {
        displacement.setAttribute('scale', maskObj.current.waveScale.toString());
      }
    });
  };

  const handleMouseLeave = () => {
    const border = borderRef.current;
    const displacement = displacementRef.current;
    if (!border) return;

    // Fast reverse to 0 spread without making it wavy again
    gsap.to(maskObj.current, {
      spread: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        border.style.setProperty('--spread', `${maskObj.current.spread}deg`);
      }
    });
  };

  // Theme styles
  const mainBg = theme === "dark" ? "bg-[#0D1508]" : "bg-[#F4EDE6]";
  const borderWaveColor = theme === "dark" ? "border-[#22C55E]" : "border-[#8aab5a]";
  const textColor = theme === "dark" ? "text-[#F4EDE6]" : "text-[#2e3a1f]";
  const badgeBg = theme === "dark" ? "bg-[#F4EDE6]" : "bg-[#2e3a1f]";
  const badgeText = theme === "dark" ? "text-[#0D1508]" : "text-[#F4EDE6]";
  
  const hoverBadgeBg = theme === "dark" ? "group-hover:bg-[#22C55E]" : "group-hover:bg-[#8aab5a]";
  const hoverBadgeText = theme === "dark" ? "group-hover:text-[#0D1508]" : "group-hover:text-[#F4EDE6]";

  const pathId = `circlePath-${text.replace(/\s+/g, '')}`;

  return (
    <>
      {/* Invisible SVG Filter for the "Liquid Tips" & "Wavy Path" Effect */}
      <svg className="absolute w-0 h-0 pointer-events-none hidden" aria-hidden="true">
        <defs>
          <filter id="liquid-tips">
            {/* 1. Create a noise pattern to distort the straight line into a wavy path */}
            <feTurbulence type="fractalNoise" baseFrequency="0.03 0.03" numOctaves="1" result="noise" />
            {/* 2. Displace the border using the noise to make it physically wave up and down */}
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            
            {/* 3. Blur and alpha-crush to maintain the thick, liquid rounded tips while it waves */}
            <feGaussianBlur in="displaced" stdDeviation="3" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
          </filter>
        </defs>
      </svg>

      <Link
        ref={containerRef}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative inline-flex items-center justify-center gap-[1.5em] px-[0.5em] py-[0.5em] pr-[2.5em] font-bold tracking-widest transition-all duration-500 ease-out hover:scale-[1.02] active:scale-95 group overflow-visible outline-none ${className}`}
      >
        
        {/* Layer 0: The Base Dark Button */}
        <div className={`absolute top-0 bottom-0 left-0 right-0 ${mainBg} rounded-full z-0 transition-shadow duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_50px_rgba(34,197,94,0.3)]`} />

        {/* Layer 1: The Liquid Wave Border Element */}
        <div 
          className="absolute -inset-[0.5em] pointer-events-none z-10"
          style={{ filter: "url(#liquid-tips)" }}
        >
          {/* 
            This div uses the magic GSAP conic-gradient mask.
            The solid border is slowly revealed starting from the exact angle of mouse entry,
            splitting into two waves that travel around the perimeter and crash into each other!
          */}
          <div 
            ref={borderRef}
            className={`absolute top-[0.5em] bottom-[0.5em] left-[0.5em] right-[0.5em] border-[0.25em] ${borderWaveColor} rounded-full`}
            style={{
              maskImage: "conic-gradient(from calc(var(--angle) - var(--spread)) at 50% 50%, black calc(var(--spread) * 2), transparent 0)",
              WebkitMaskImage: "conic-gradient(from calc(var(--angle) - var(--spread)) at 50% 50%, black calc(var(--spread) * 2), transparent 0)",
              '--angle': '0deg',
              '--spread': '0deg'
            } as React.CSSProperties}
          />
        </div>
        
        {/* Layer 2: Spinning Circular Text Badge */}
        <div className={`relative z-20 flex-shrink-0 w-[3.5em] h-[3.5em] ${badgeBg} ${badgeText} rounded-full flex items-center justify-center transition-colors duration-500 ${hoverBadgeBg} ${hoverBadgeText}`}>
          <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path id={pathId} d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" fill="none" />
              <text className="text-[10px] font-sans tracking-[0.2em] font-medium uppercase fill-current">
                <textPath href={`#${pathId}`} startOffset="0%">
                  {spinningText}
                </textPath>
              </text>
            </svg>
          </div>
          <div className="w-[0.4em] h-[0.4em] rounded-full bg-current absolute" />
        </div>
        
        {/* Layer 3: Center CTA Text */}
        <span className={`relative z-20 text-14-caps transition-colors duration-300 translate-y-[1px] ${textColor}`}>
          {text}
        </span>
        
        {/* Layer 4: Sliding Arrow Vector */}
        <svg 
          viewBox="0 0 10 10" 
          className={`relative z-20 w-[0.8em] h-[0.8em] fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5 ${textColor}`} 
          aria-hidden="true"
        >
          <path d="M1 5h8M5 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </>
  );
}
