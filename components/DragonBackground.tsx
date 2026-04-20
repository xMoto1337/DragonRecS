"use client";

import { useEffect, useRef } from "react";

// Sharp pointed dragon scales — like overlapping roof tiles with a dagger tip
// Tile: 48x28. Row A scale centered at (24,0), Row B partial scales at edges (offset by 24px, y+14)
const SCALE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='28'>
  <path d='M-24,14 Q0,8 24,14 L0,38 Z' fill='%230e0303' stroke='%23901f12' stroke-width='0.65' stroke-linejoin='miter' opacity='0.16'/>
  <path d='M24,14 Q48,8 72,14 L48,38 Z' fill='%230e0303' stroke='%23901f12' stroke-width='0.65' stroke-linejoin='miter' opacity='0.16'/>
  <path d='M0,0 Q24,-6 48,0 L24,26 Z' fill='%23130404' stroke='%23c0392b' stroke-width='1.0' stroke-linejoin='miter' opacity='0.24'/>
  <line x1='24' y1='1' x2='24' y2='24' stroke='%23c0392b' stroke-width='0.35' opacity='0.1'/>
</svg>`;
const SCALE_URL = `url("data:image/svg+xml,${SCALE_SVG.replace(/\n\s*/g, " ")}")`;

export default function DragonBackground() {
  const glow1 = useRef<HTMLDivElement>(null);
  const glow2 = useRef<HTMLDivElement>(null);
  const glow3 = useRef<HTMLDivElement>(null);
  const glow4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (glow1.current) glow1.current.style.transform = `translateY(${y * 0.18}px)`;
        if (glow2.current) glow2.current.style.transform = `translateY(${y * 0.3}px)`;
        if (glow3.current) glow3.current.style.transform = `translateY(${y * 0.12}px)`;
        if (glow4.current) glow4.current.style.transform = `translateY(${y * 0.22}px)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0,
      pointerEvents: "none", overflow: "hidden",
      background: "#080505",
    }}>
      {/* Pointed dragon scale texture */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: SCALE_URL,
        backgroundRepeat: "repeat",
        backgroundSize: "48px 28px",
      }} />

      {/* Warm red tint toward center */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(130,22,10,0.2) 0%, transparent 70%)",
      }} />

      {/* Smoky vignette edges */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.78) 100%)",
      }} />

      {/* Glow 1 — vivid red ember, top-left */}
      <div ref={glow1} style={{
        position: "absolute",
        top: "-15%", left: "-10%",
        width: 750, height: 750,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(210,55,25,0.28) 0%, rgba(170,40,15,0.1) 38%, transparent 62%)",
        filter: "blur(50px)",
        animation: "dragonPulse1 6s ease-in-out infinite",
      }} />

      {/* Glow 2 — hot orange-gold, bottom-right */}
      <div ref={glow2} style={{
        position: "absolute",
        bottom: "-20%", right: "-12%",
        width: 650, height: 650,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(230,95,0,0.24) 0%, rgba(200,60,0,0.08) 42%, transparent 62%)",
        filter: "blur(45px)",
        animation: "dragonPulse2 8s ease-in-out infinite",
      }} />

      {/* Glow 3 — deep red, mid-right */}
      <div ref={glow3} style={{
        position: "absolute",
        top: "30%", right: "-8%",
        width: 480, height: 480,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(185,30,10,0.2) 0%, transparent 58%)",
        filter: "blur(42px)",
        animation: "dragonPulse1 10s ease-in-out infinite reverse",
      }} />

      {/* Glow 4 — amber, mid-left */}
      <div ref={glow4} style={{
        position: "absolute",
        top: "50%", left: "-8%",
        width: 420, height: 420,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(215,88,0,0.18) 0%, transparent 58%)",
        filter: "blur(42px)",
        animation: "dragonPulse2 7s ease-in-out infinite",
      }} />

      {/* Ember particles */}
      {[...Array(16)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${5 + (i * 6.2) % 90}%`,
          bottom: `${(i * 13) % 80}%`,
          width: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
          height: i % 4 === 0 ? 4 : i % 3 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: i % 3 === 0 ? "rgba(255,150,0,0.9)" : i % 2 === 0 ? "rgba(230,65,0,0.95)" : "rgba(200,45,20,0.85)",
          filter: "blur(0.5px)",
          boxShadow: i % 3 === 0 ? "0 0 5px rgba(255,150,0,0.7)" : "0 0 4px rgba(220,60,0,0.6)",
          animation: `emberRise ${3.5 + (i % 5)}s ${i * 0.4}s ease-in infinite`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}
