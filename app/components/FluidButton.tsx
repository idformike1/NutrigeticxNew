"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";

interface FluidButtonProps {
  href: string;
  text: string;
  className?: string;
}

export default function FluidButton({ href, text, className = "" }: FluidButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let frameCounter = 0;
    
    // Continuous Organic Wave Animation Loop
    const renderFluidRipple = () => {
      frameCounter += 0.25;
      if (turbulenceRef.current) {
        // Incrementing the seed forces the SVG filter to organically shimmer/warp
        turbulenceRef.current.setAttribute('seed', Math.floor(frameCounter).toString());
      }
      rafRef.current = requestAnimationFrame(renderFluidRipple);
    };

    rafRef.current = requestAnimationFrame(renderFluidRipple);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    
    // Calculate relative cursor position inside the oversized wrapper window
    const x = e.clientX - rect.left + 12;
    const y = e.clientY - rect.top + 12;
    
    wrapperRef.current.style.setProperty('--mouse-x', `${x}px`);
    wrapperRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  // Generate a unique ID for the SVG filter
  const filterId = `liquid-magnetic-wave-${text.replace(/\s+/g, '')}`;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence ref={turbulenceRef} type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Container to sync button and background calculations */}
      <div 
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        className={`relative inline-flex items-center justify-center group ${className}`}
      >
        
        {/* Main Button Elements */}
        <Link
          href={href}
          className="relative z-10 bg-[#0D1508] text-[#F4EDE6] border border-[#F4EDE6]/20 px-[2.5em] py-[1.2em] text-14-caps font-bold tracking-widest rounded-full cursor-pointer inline-flex items-center gap-[12px] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:bg-[#121c14] active:scale-97"
        >
          {text}
          <span className="text-[1.2em] transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">↗</span>
        </Link>
        
        {/* Wavy Border Light Tracking Layer */}
        <div 
          className="absolute -top-[12px] -left-[12px] -right-[12px] -bottom-[12px] rounded-[60px] z-0 pointer-events-none opacity-0 transition-opacity duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 55px at var(--mouse-x, 0px) var(--mouse-y, 0px), #52a363 0%, rgba(82, 163, 99, 0.4) 50%, transparent 100%)`,
            filter: `url(#${filterId})`
          }}
        />
      </div>
    </>
  );
}
