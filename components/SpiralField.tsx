"use client";

import { useState } from "react";

// Deterministic geometry: rendered once, animated with CSS transforms only.
const curves = Array.from({ length: 44 }, (_, arm) => {
  const points = Array.from({ length: 150 }, (_, i) => {
    const t = i / 149;
    const radius = 26 + t * 292;
    const angle = (arm / 44) * Math.PI * 2 + t * Math.PI * 1.65;
    return `${i === 0 ? "M" : "L"}${(340 + Math.cos(angle) * radius).toFixed(2)},${(340 + Math.sin(angle) * radius).toFixed(2)}`;
  });
  return points.join(" ");
});

export default function SpiralField() {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`spiral-field${paused ? " is-paused" : ""}`}>
      <div className="spiral-coordinate" aria-hidden="true">FIG. 001 / THE CREATIVE CONTINUUM</div>
      <svg viewBox="0 0 680 680" fill="none" aria-hidden="true">
        <circle className="spiral-guide" cx="340" cy="340" r="319" />
        <path className="spiral-guide" d="M340 0V680M0 340H680" />
        <g className="spiral-rotation">{curves.map((d, i) => <path key={i} d={d} stroke="currentColor" strokeWidth={i % 4 === 0 ? "1" : ".55"} opacity={i % 4 === 0 ? ".8" : ".4"} />)}</g>
        <circle cx="340" cy="340" r="4" fill="currentColor" />
      </svg>
      <div className="spiral-caption"><span>INTENTION → ITERATION → EXPRESSION</span><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Resume motion" : "Pause motion"}</button></div>
    </div>
  );
}
