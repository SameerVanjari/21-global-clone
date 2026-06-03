"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";

const Globe = dynamic(() => import("@/components/effects/Globe"), {
  ssr: false,
});

const LOCATIONS = [
  {
    city: "Dubai",
    hub: "Middle East Hub",
    coords: "25.2048° N, 55.2708° E",
    timezone: "GST (UTC+4)",
    description:
      "Strategic headquarters in the Dubai International Financial Centre. Primary trading desk for Middle Eastern crude, gas, and petrochemical markets.",
    color: "#00f0ff",
    status: "PRIMARY",
  },
  {
    city: "Singapore",
    hub: "Asia-Pacific Hub",
    coords: "1.3521° N, 103.8198° E",
    timezone: "SGT (UTC+8)",
    description:
      "Regional powerhouse at Marina Bay Financial Centre. Coverage across ASEAN commodities, LNG trading, and Asian metal markets.",
    color: "#ff00e5",
    status: "ACTIVE",
  },
  {
    city: "Geneva",
    hub: "European Hub",
    coords: "46.2044° N, 6.1432° E",
    timezone: "CET (UTC+1)",
    description:
      "Swiss precision operations on Rue du Rhône. Precious metals vaulting, European energy trading, and structured finance center.",
    color: "#ffaa00",
    status: "ACTIVE",
  },
];

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.05,
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
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0, 240, 255, 0.3)";
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
      style={{ opacity: 0.5 }}
    />
  );
}

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative py-24 bg-[#06060b] overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0, 240, 255, 0.04) 0%, transparent 60%)",
        }}
      />

      {/* Globe section */}
      <div className="relative h-[500px] md:h-[650px] flex items-center justify-center overflow-hidden">
        <ParticleField />

        {/* Top gradient mask */}
        <div
          className="absolute top-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, #06060b 0%, rgba(6, 6, 11, 0.8) 30%, transparent 100%)",
          }}
        />

        {/* Radial glow behind globe */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 240, 255, 0.06) 0%, transparent 70%)",
          }}
        />

        <Globe />

        {/* Bottom gradient mask */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, #06060b 0%, rgba(6, 6, 11, 0.8) 30%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal variant="holo-fade">
          <div className="text-center mb-16">
            <div
              className="inline-block glass px-4 py-1.5 text-xs tracking-[0.3em] uppercase mb-6"
              style={{
                color: "#00f0ff",
                textShadow: "0 0 8px rgba(0, 240, 255, 0.5)",
                fontFamily: "var(--font-mono)",
              }}
            >
              Module 04 // Global Nodes
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light tracking-wider mb-4"
              style={{ color: "#e0e8ff" }}
            >
              Tri-Continental{" "}
              <span style={{ color: "#00f0ff" }}>Network</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#667799" }}>
              Strategic operations centers positioned across the world&apos;s
              most critical trade corridors.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {LOCATIONS.map((loc, index) => (
            <ScrollReveal
              key={loc.city}
              variant="scale-in"
              delay={index * 150}
            >
              <div
                className="glass holo-shimmer p-8 h-full transition-all duration-500 group relative"
                style={{ borderRadius: "2px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${loc.color}66`;
                  e.currentTarget.style.boxShadow = `0 0 40px ${loc.color}14, inset 0 0 40px ${loc.color}08`;
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(0, 240, 255, 0.15)";
                  e.currentTarget.style.boxShadow =
                    "0 0 30px rgba(0, 240, 255, 0.05), inset 0 0 30px rgba(0, 240, 255, 0.02)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div className="hud-bracket relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{
                        background: loc.color,
                        boxShadow: `0 0 8px ${loc.color}`,
                      }}
                    />
                    <div
                      className="text-xs tracking-[0.2em] uppercase"
                      style={{
                        color: loc.color,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {loc.status}
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-light tracking-wide mb-1"
                    style={{ color: "#e0e8ff" }}
                  >
                    {loc.city}
                  </h3>
                  <p
                    className="text-xs tracking-[0.15em] uppercase mb-4"
                    style={{
                      color: loc.color,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {loc.hub}
                  </p>

                  <div
                    className="p-3 mb-5 rounded-sm"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      className="text-[11px] tracking-wider mb-1"
                      style={{
                        color: "#667799",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      COORDS // {loc.coords}
                    </div>
                    <div
                      className="text-[11px] tracking-wider"
                      style={{
                        color: "#667799",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      TIME // {loc.timezone}
                    </div>
                  </div>

                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#667799" }}
                  >
                    {loc.description}
                  </p>

                  <div
                    className="absolute -left-0.5 top-0 bottom-0 w-[1px] transition-all duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(180deg, ${loc.color}00, ${loc.color}, ${loc.color}00)`,
                    }}
                  />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
