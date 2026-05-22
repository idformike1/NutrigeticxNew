"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface OrganicPhysicsButtonProps {
  href: string;
  text?: string;
  className?: string;
  variant?: "dark" | "light" | "olive";
}

export default function OrganicPhysicsButton({
  href,
  text = "VIEW MORE →",
  className = "",
  variant = "dark",
}: OrganicPhysicsButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const greenPathRef = useRef<SVGPathElement>(null);
  const tealPathRef = useRef<SVGPathElement>(null);
  const activeTealTimeline = useRef<gsap.core.Timeline | null>(null);
  const activeGreenTimeline = useRef<gsap.core.Timeline | null>(null);

  const [dimensions, setDimensions] = useState({ width: 200, height: 52 });

  // ResizeObserver to detect layout reflows and keep coordinates aligned
  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      setDimensions({
        width: el.offsetWidth,
        height: el.offsetHeight,
      });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const W = dimensions.width;
  const H = dimensions.height;
  const R = H / 2;

  // 1. High-Density Perimeter Subdivision (60 distinct vertices)
  const N = 60; 
  const sigma = 45; // Gaussian falloff standard deviation (width of bulge)

  // Array to cache default coordinates and normal vectors
  const defaultPoints = useRef<{ x: number; y: number; nx: number; ny: number }[]>([]);

  // GSAP-animated wave states (lerp progress and scale amplitude decay separately)
  const animState = useRef({
    tealProgress: 0,
    tealAmp: 0,
    greenProgress: 0,
    greenAmp: 0,
  });

  // Track coordinates of entry and exit destination
  const entryPoint = useRef({ x: 0, y: 0 });
  const destinationPoint = useRef({ x: 0, y: 0 });

  // 2. Dynamic Path Redrawing (The Math Engine)
  const getPathData = (
    amp: number, // Goes 1 -> 0
    progress: number, // Goes 0 -> 1
    maxStretch: number, // Target maximum stretch amplitude
    offsetsType: "t" | "g"
  ) => {
    const pts = defaultPoints.current;
    if (pts.length === 0) return "";

    const startX = entryPoint.current.x;
    const startY = entryPoint.current.y;
    const endX = destinationPoint.current.x;
    const endY = destinationPoint.current.y;

    // Linear interpolation (Lerp) to compute traveling focal point
    const curX = startX + (endX - startX) * progress;
    const curY = startY + (endY - startY) * progress;

    // Traveling Sine Wave Parameters
    const k = 0.05; // Wave frequency (defines ripple density)
    const omega = 15; // Wave velocity (defines speed ripples roll forward)

    const pathParts = [];
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i];
      
      // Calculate horizontal distance from the entry point
      const dx = Math.abs(pt.x - startX);

      // Compute Euclidean distance from the moving focal point to this vertex
      const dist = Math.hypot(pt.x - curX, pt.y - curY);

      // Gaussian bell-curve falloff around moving focal point
      const gaussian = Math.exp(-(dist * dist) / (2 * sigma * sigma));

      // Sine wave component shifting forward based on progress
      const sine = Math.sin(k * dx - omega * progress);

      // Combined formula: MaxStretch * Amplitude * Sine * Gaussian
      const disp = maxStretch * amp * sine * gaussian;

      // Displace along normal vector
      const px = pt.x + pt.nx * disp;
      const py = pt.y + pt.ny * disp;

      pathParts.push(`${px.toFixed(1)} ${py.toFixed(1)}`);
    }

    return `M ${pathParts.join(" L ")} Z`;
  };

  const updatePaths = () => {
    if (tealPathRef.current) {
      const d = getPathData(animState.current.tealAmp, animState.current.tealProgress, 5.4, "t");
      tealPathRef.current.setAttribute("d", d);
    }
  };

  // Re-generate default coordinates when dimensions change
  useEffect(() => {
    const pts = [];
    const L_top = W - 2 * R;
    const L_arc = Math.PI * R;
    const L_total = 2 * L_top + 2 * L_arc;

    for (let i = 0; i < N; i++) {
      const s = (i / N) * L_total;
      let x = 0, y = 0, nx = 0, ny = 0;

      if (s < L_top) {
        x = R + s;
        y = 0;
        nx = 0;
        ny = -1;
      } else if (s < L_top + L_arc) {
        const s_arc = s - L_top;
        const theta = s_arc / R - Math.PI / 2;
        x = W - R + R * Math.cos(theta);
        y = R + R * Math.sin(theta);
        nx = Math.cos(theta);
        ny = Math.sin(theta);
      } else if (s < 2 * L_top + L_arc) {
        const s_bottom = s - L_top - L_arc;
        x = W - R - s_bottom;
        y = H;
        nx = 0;
        ny = 1;
      } else {
        const s_arc2 = s - 2 * L_top - L_arc;
        const theta = s_arc2 / R + Math.PI / 2;
        x = R + R * Math.cos(theta);
        y = R + R * Math.sin(theta);
        nx = Math.cos(theta);
        ny = Math.sin(theta);
      }

      pts.push({ x, y, nx, ny });
    }

    defaultPoints.current = pts;
    
    // Initialize both paths (green underlay remains static at default shape)
    if (tealPathRef.current) {
      tealPathRef.current.setAttribute("d", getPathData(0, 0, 5.4, "t"));
    }
    if (greenPathRef.current) {
      greenPathRef.current.setAttribute("d", getPathData(0, 0, 15, "g"));
    }
  }, [W, H, R]);

  useEffect(() => {
    return () => {
      if (activeTealTimeline.current) activeTealTimeline.current.kill();
    };
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const xIn = e.clientX - rect.left;
    const yIn = e.clientY - rect.top;

    entryPoint.current = { x: xIn, y: yIn };

    // Calculate opposite side destination point
    let xOut = 0;
    if (xIn < W / 2) {
      xOut = W + 40; // Travel left-to-right
    } else {
      xOut = -40; // Travel right-to-left
    }
    destinationPoint.current = { x: xOut, y: yIn };

    // Kill any active timelines
    if (activeTealTimeline.current) activeTealTimeline.current.kill();

    // Reset starting state (amp starts at 1, progress starts at 0)
    animState.current.tealProgress = 0;
    animState.current.tealAmp = 1;

    // 3. Decoupled GSAP Eases (The Travel vs The Decay) - Slowed down to 3.05s
    
    // Teal layer timeline: progress goes 0 to 1, amplitude decays 1 to 0
    const tlTeal = gsap.timeline({ onUpdate: updatePaths });
    tlTeal.to(animState.current, {
      tealProgress: 1,
      duration: 3.05,
      ease: "power2.out", // Smooth, steady panning
    }, 0)
    .to(animState.current, {
      tealAmp: 0,
      duration: 3.05,
      ease: "power2.inOut", // Smooth energy dissipation
    }, 0);
    activeTealTimeline.current = tlTeal;
  };

  const styles = {
    dark: {
      foreground: "#053c3d",
      underlay: "#F4EDE6",
      text: "text-white",
    },
    light: {
      foreground: "#F4EDE6",
      underlay: "#2e3a1f",
      text: "text-[#053c3d]",
    },
    olive: {
      foreground: "#8aab5a",
      underlay: "#053c3d",
      text: "text-white",
    },
  };
  const currentStyle = styles[variant] || styles.dark;

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      className={`relative inline-flex items-center justify-center bg-transparent rounded-full overflow-visible group cursor-pointer select-none transition-transform duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] ${className} px-14`}
      style={{ minWidth: "150px", height: "52px" }}
    >
      {/* Invisible dummy text to determine the button's natural width in the flow */}
      <span className="invisible pointer-events-none select-none font-semibold uppercase text-[12px] tracking-[0.1em] whitespace-nowrap">
        {text}
      </span>

      {/* Layer 1 (Bottom): SVG underlay path */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <path ref={greenPathRef} fill={currentStyle.underlay} />
      </svg>

      {/* Layer 2 (Middle): Dark Teal SVG foreground path */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ zIndex: 2 }}
      >
        <path ref={tealPathRef} fill={currentStyle.foreground} />
      </svg>

      {/* Layer 3 (Top): Perfectly centered vertical text carousel */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-full"
        style={{ zIndex: 3 }}
      >
        <div className="h-[200%] flex flex-col transition-transform duration-850 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
          {/* Slide 1: Default Text */}
          <div className={`h-1/2 flex items-center justify-center font-semibold uppercase text-[12px] tracking-[0.1em] whitespace-nowrap ${currentStyle.text}`}>
            {text}
          </div>
          {/* Slide 2: Hovered Text */}
          <div className={`h-1/2 flex items-center justify-center font-semibold uppercase text-[12px] tracking-[0.1em] whitespace-nowrap ${currentStyle.text}`}>
            {text}
          </div>
        </div>
      </div>
    </Link>
  );
}
