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
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    const btn = containerRef.current;
    const follower = followerRef.current;
    if (!btn || !follower) return;

    // We use GSAP quickTo for highly performant, fluid mouse tracking without React state lag
    const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      // Calculate mouse position relative to the exact center of the button
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      xTo(x);
      yTo(y);
    };

    btn.addEventListener("mousemove", handleMouseMove);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
    };
  }, { scope: containerRef });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly snap the follower back to the center of the button when the mouse leaves
    if (followerRef.current) {
      gsap.to(followerRef.current, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  };

  // Theme styles
  const mainBg = theme === "dark" ? "bg-[#0D1508]" : "bg-[#F4EDE6]";
  const followerBg = theme === "dark" ? "bg-[#22C55E]" : "bg-[#8aab5a]";
  const textColor = theme === "dark" ? "text-[#F4EDE6]" : "text-[#2e3a1f]";
  const badgeBg = theme === "dark" ? "bg-[#F4EDE6]" : "bg-[#2e3a1f]";
  const badgeText = theme === "dark" ? "text-[#0D1508]" : "text-[#F4EDE6]";
  
  const hoverBadgeBg = theme === "dark" ? "group-hover:bg-[#22C55E]" : "group-hover:bg-[#8aab5a]";
  const hoverBadgeText = theme === "dark" ? "group-hover:text-[#0D1508]" : "group-hover:text-[#F4EDE6]";

  // Unique ID for the SVG path to avoid conflicts
  const pathId = `circlePath-${text.replace(/\s+/g, '')}`;

  return (
    <>
      {/* Invisible SVG Filter definition injected globally once per button */}
      <svg className="absolute w-0 h-0 pointer-events-none hidden" aria-hidden="true">
        <defs>
          <filter id="gooey-effect">
            {/* Blur everything inside the container heavily */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            {/* Sharpen the alpha channel back up, merging intersecting blurred shapes into a solid single shape! */}
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
            {/* Blend the original sharp layers over the gooey background just in case, though usually not needed if text is outside */}
            <feBlend in="SourceGraphic" in2="gooey" />
          </filter>
        </defs>
      </svg>

      <Link
        ref={containerRef}
        href={href}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // overflow-visible is CRITICAL so the gooey bulge can extend outside the bounding box
        className={`relative inline-flex items-center justify-center gap-[1.5em] px-[0.5em] py-[0.5em] pr-[2.5em] font-bold tracking-widest transition-all duration-500 ease-out hover:scale-[1.02] active:scale-95 group overflow-visible outline-none ${className}`}
      >
        
        {/* Layer 0: Gooey Filter Background Container */}
        {/* We expand the boundaries using -inset to give the SVG filter room to bulge outwards without being cropped */}
        <div 
          className="absolute -inset-[2.5em] pointer-events-none z-0" 
          style={{ filter: "url(#gooey-effect)" }}
        >
          {/* Main Pill Shape (Stays centered and fixed) */}
          <div className={`absolute top-[2.5em] bottom-[2.5em] left-[2.5em] right-[2.5em] ${mainBg} rounded-full transition-shadow duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.15)] group-hover:shadow-[0_20px_50px_rgba(34,197,94,0.3)]`} />
          
          {/* The Wavy Bulge Follower */}
          {/* - Uses GSAP quickTo to stick to the exact mouse coordinates */}
          {/* - Uses animate-spin + irregular border-radius to create the "wavy" effect */}
          {/* - Opacity fades in on hover so it smoothly "clings" to the edge */}
          <div 
            ref={followerRef}
            className={`absolute top-1/2 left-1/2 w-[4em] h-[4em] ${followerBg} -mt-[2em] -ml-[2em] transition-opacity duration-500 animate-[spin_4s_linear_infinite] ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
          />
        </div>
        
        {/* Layer 1: Spinning Circular Text Badge (Outside the gooey filter) */}
        <div className={`relative z-10 flex-shrink-0 w-[3.5em] h-[3.5em] ${badgeBg} ${badgeText} rounded-full flex items-center justify-center transition-colors duration-500 ${hoverBadgeBg} ${hoverBadgeText}`}>
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
          {/* Inner core dot */}
          <div className="w-[0.4em] h-[0.4em] rounded-full bg-current absolute" />
        </div>
        
        {/* Layer 2: Center CTA Text (Outside the gooey filter so it stays perfectly sharp) */}
        <span className={`relative z-10 text-14-caps transition-colors duration-300 translate-y-[1px] ${textColor}`}>
          {text}
        </span>
        
        {/* Layer 3: Sliding Arrow Vector */}
        <svg 
          viewBox="0 0 10 10" 
          className={`relative z-10 w-[0.8em] h-[0.8em] fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5 ${textColor}`} 
          aria-hidden="true"
        >
          <path d="M1 5h8M5 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </>
  );
}
