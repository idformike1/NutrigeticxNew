"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

interface PhysicsButtonProps {
  href: string;
  text?: string;
  className?: string;
  variant?: "dark" | "light" | "olive";
}

export default function PhysicsButton({
  href,
  text = "View more",
  className = "",
  variant = "dark",
}: PhysicsButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const greenPathRef = useRef<SVGPathElement>(null);
  const tealPathRef = useRef<SVGPathElement>(null);
  const activeTealTimeline = useRef<gsap.core.Timeline | null>(null);
  const activeGreenTimeline = useRef<gsap.core.Timeline | null>(null);

  const [dimensions, setDimensions] = useState({ width: 190, height: 52 });

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

  // Configuration settings for high-density subdivisions & Gaussian falloff
  const N = 60; // 60-point high-resolution perimeter subdivision
  const sigma = 35; // Gaussian falloff width in pixels

  // Reference to hold default coordinates and normals
  const defaultPoints = useRef<{ x: number; y: number; nx: number; ny: number }[]>([]);

  // Wave states (Wave positions and amplitudes for decoupled layers)
  const animState = useRef({
    tealWaveX: -30,
    greenWaveX: -30,
    tealAmp: 0,
    greenAmp: 0,
  });

  const getPathData = (amp: number, waveX: number, offsetsType: "t" | "g") => {
    const pts = defaultPoints.current;
    if (pts.length === 0) return "";

    const pathParts = [];
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i];
      // Distance along the X dimension (width of button) to the wave front
      const dx = pt.x - waveX;

      // Apply Gaussian falloff to smooth out the wave bulge
      const factor = Math.exp(-(dx * dx) / (2 * sigma * sigma));
      const disp = amp * factor;

      // Displace along normal
      const px = pt.x + pt.nx * disp;
      const py = pt.y + pt.ny * disp;

      pathParts.push(`${px.toFixed(1)} ${py.toFixed(1)}`);
    }

    return `M ${pathParts.join(" L ")} Z`;
  };

  const updatePaths = () => {
    if (tealPathRef.current) {
      const d = getPathData(animState.current.tealAmp, animState.current.tealWaveX, "t");
      tealPathRef.current.setAttribute("d", d);
    }
  };

  // Re-calculate coordinates whenever dimensions update
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
      tealPathRef.current.setAttribute("d", getPathData(0, 0, "t"));
    }
    if (greenPathRef.current) {
      greenPathRef.current.setAttribute("d", getPathData(0, 0, "g"));
    }
  }, [W, H, R]);

  useEffect(() => {
    return () => {
      if (activeTealTimeline.current) activeTealTimeline.current.kill();
    };
  }, []);

  const handleMouseEnter = () => {
    // Kill any running animations to start fresh wave sweep
    if (activeTealTimeline.current) activeTealTimeline.current.kill();

    // Reset initial states
    animState.current.tealWaveX = -30;
    animState.current.tealAmp = 0;

    // 1. Teal Surface Wave: Sweeps from left to right, wobbles/recoils on passing (Slowed down to 3.05s)
    const tlTeal = gsap.timeline({ onUpdate: updatePaths });
    tlTeal.to(animState.current, {
      tealWaveX: W + 30,
      duration: 3.05,
      ease: "power1.inOut",
    }, 0)
    .to(animState.current, {
      tealAmp: 4.8,
      duration: 0.38125,
      ease: "power2.out",
    }, 0)
    .to(animState.current, {
      tealAmp: 0,
      duration: 2.66875,
      ease: "elastic.out(1.2, 0.45)",
    }, 0.38125);
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
      className={`relative inline-flex items-center justify-center px-14 py-3.5 bg-transparent rounded-full overflow-visible group cursor-pointer select-none transition-transform duration-500 ease-out hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{ minWidth: "150px", height: "52px" }}
    >
      {/* Invisible dummy text to determine the button's natural width in the flow */}
      <span className="invisible pointer-events-none select-none font-medium uppercase text-[12.5px] tracking-[0.08em] gap-1.5 whitespace-nowrap">
        <span>{text}</span>
        <span className="text-[16px] leading-none">→</span>
      </span>

      {/* Background SVG paths representing shape warping */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        style={{ zIndex: 0 }}
      >
        {/* Underlay Layer */}
        <path ref={greenPathRef} fill={currentStyle.underlay} />
        {/* Main Dark Teal Surface Layer */}
        <path ref={tealPathRef} fill={currentStyle.foreground} />
      </svg>

      {/* Vertical Text Carousel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none rounded-full" style={{ zIndex: 20 }}>
        <div className="h-[200%] flex flex-col transition-transform duration-850 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
          {/* Slide 1 */}
          <div className={`h-1/2 flex items-center justify-center font-medium uppercase text-[12.5px] tracking-[0.08em] gap-1.5 whitespace-nowrap ${currentStyle.text}`}>
            <span>{text}</span>
            <span className="text-[16px] leading-none transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
          {/* Slide 2 */}
          <div className={`h-1/2 flex items-center justify-center font-medium uppercase text-[12.5px] tracking-[0.08em] gap-1.5 whitespace-nowrap ${currentStyle.text}`}>
            <span>{text}</span>
            <span className="text-[16px] leading-none transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
