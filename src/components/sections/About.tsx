"use client";

import { useEffect, useRef } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(0, 240, 255, 0.5)";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

const STATS = [
  { value: "14", label: "Years Trading", suffix: "Y" },
  { value: "3", label: "Global Hubs", suffix: "" },
  { value: "120", label: "Team Members", suffix: "+" },
  { value: "50", label: "Markets", suffix: "+" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-[#0d0d1a] overflow-hidden section-angled-reverse"
    >
      <div className="absolute inset-0 grid-overlay-heavy pointer-events-none" />
      <Particles />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal variant="holo-fade">
            <div>
              <div
                className="inline-block glass px-4 py-1.5 text-xs tracking-[0.3em] uppercase mb-6"
                style={{
                  color: "#ffaa00",
                  textShadow: "0 0 8px rgba(255, 170, 0, 0.5)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                Module 03 // Origin
              </div>

              <h2
                className="text-4xl sm:text-5xl font-light tracking-wider mb-6 leading-tight"
                style={{ color: "#e0e8ff" }}
              >
                Engineered for the{" "}
                <span style={{ color: "#ffaa00" }}>Next Century</span> of
                Commodities
              </h2>

              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "#667799" }}
              >
                Twenty1Global was forged at the intersection of traditional commodity
                trading and frontier technology. Our hybrid model combines decades of
                physical trading expertise with proprietary AI-driven execution
                systems.
              </p>

              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: "#667799" }}
              >
                From crude oil cargoes in the Gulf to precious metals vaults in
                Zurich, we operate a seamless global infrastructure that anticipates
                market shifts before they happen.
              </p>

              <div className="glass p-6" style={{ borderRadius: "2px" }}>
                <div
                  className="text-xs tracking-[0.2em] uppercase mb-3"
                  style={{
                    color: "#00f0ff",
                    fontFamily: "var(--font-mono)",
                    textShadow: "0 0 6px rgba(0, 240, 255, 0.3)",
                  }}
                >
                  System Credentials
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["License", "UAE · SG · CH"],
                    ["Type", "Physical & Financial"],
                    ["Assets", "Energy · Metals · Agri"],
                    ["Status", "Active // Verified"],
                  ].map(([key, val]) => (
                    <div key={key}>
                      <div
                        className="text-[10px] tracking-wider uppercase mb-0.5"
                        style={{ color: "#667799" }}
                      >
                        {key}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{ color: "#e0e8ff" }}
                      >
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale-in" delay={200}>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="glass holo-shimmer p-8 text-center transition-all duration-300 hover:border-glow-cyan"
                  style={{ borderRadius: "2px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.15)";
                  }}
                >
                  <div
                    className="text-4xl font-light tracking-tight mb-2"
                    style={{
                      color: "#00f0ff",
                      textShadow: "0 0 15px rgba(0, 240, 255, 0.3)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {stat.value}
                    <span style={{ color: "rgba(0, 240, 255, 0.4)" }}>
                      {stat.suffix}
                    </span>
                  </div>
                  <div
                    className="text-xs tracking-[0.15em] uppercase"
                    style={{ color: "#667799" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
