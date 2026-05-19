"use client";

import { useRef, useState } from "react";
import Link from "next/link";

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
  spinningText = "CLINICAL PROTOCOL • INTAKE SCAN •", 
  className = "",
  theme = "dark"
}: UtopiaButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  // Theme styles
  const baseBg = theme === "dark" ? "bg-[#22C55E]" : "bg-[#F4EDE6]";
  const textColor = theme === "dark" ? "text-[#0D1508]" : "text-[#2e3a1f]";
  const badgeBg = theme === "dark" ? "bg-[#0D1508]" : "bg-[#2e3a1f]";
  const badgeText = theme === "dark" ? "text-[#22C55E]" : "text-[#F4EDE6]";
  
  const hoverBadgeBg = theme === "dark" ? "group-hover:bg-[#F4EDE6]" : "group-hover:bg-[#22C55E]";
  const hoverBadgeText = theme === "dark" ? "group-hover:text-[#0D1508]" : "group-hover:text-[#0D1508]";

  // Unique ID for the SVG path to avoid conflicts if multiple buttons are on screen
  const pathId = `circlePath-${text.replace(/\s+/g, '')}`;

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center gap-[1.5em] px-[0.5em] py-[0.5em] pr-[2.5em] ${baseBg} ${textColor} text-14-caps font-bold tracking-widest rounded-full transition-all duration-500 ease-out hover:scale-[1.02] active:scale-95 shadow-[0_15px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_50px_rgba(34,197,94,0.3)] overflow-hidden group ${className}`}
    >
      {/* 1. Dynamic Hover Spotlight Background (Mouse Tracker) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0 mix-blend-screen"
        style={{
          opacity,
          background: `radial-gradient(circle 120px at ${position.x}px ${position.y}px, rgba(255,255,255,0.4), transparent 80%)`,
        }}
      />
      
      {/* 2. Spinning Circular Text Badge (Utopia Signature) */}
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
      
      {/* 3. Center CTA Text */}
      <span className="relative z-10 transition-colors duration-300 translate-y-[1px]">
        {text}
      </span>
      
      {/* 4. Sliding Arrow Vector */}
      <svg 
        viewBox="0 0 10 10" 
        className="relative z-10 w-[0.8em] h-[0.8em] fill-none stroke-current stroke-[2] transition-transform duration-300 group-hover:translate-x-1.5" 
        aria-hidden="true"
      >
        <path d="M1 5h8M5 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
