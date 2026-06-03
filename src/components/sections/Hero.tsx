"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

function DataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01".split("");
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(6, 6, 11, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 240, 255, 0.15)";
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

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

function HolographicGlobe() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] lg:w-[700px] lg:h-[700px] pointer-events-none select-none">
      <div
        className="globe-ring absolute inset-0"
        style={{
          background:
            "radial-gradient(circle, transparent 60%, rgba(0, 240, 255, 0.06) 100%)",
        }}
      />
      <div className="globe-ring absolute" style={{ left: "7.5%", top: "7.5%" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(0, 240, 255, 0.08)",
            background:
              "radial-gradient(circle, transparent 55%, rgba(0, 240, 255, 0.04) 100%)",
          }}
        />
      </div>
      <div className="globe-ring absolute" style={{ left: "15%", top: "15%" }}>
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px solid rgba(255, 0, 229, 0.06)",
            background:
              "radial-gradient(circle, transparent 55%, rgba(255, 0, 229, 0.03) 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(0, 240, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(255, 0, 229, 0.05) 0%, transparent 50%)",
        }}
      />

      <div
        className="absolute rounded-full"
        style={{
          width: "4px",
          height: "4px",
          background: "#00f0ff",
          boxShadow: "0 0 10px rgba(0, 240, 255, 0.8)",
          top: "38%",
          left: "55%",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "3px",
          height: "3px",
          background: "#ff00e5",
          boxShadow: "0 0 8px rgba(255, 0, 229, 0.6)",
          top: "45%",
          left: "35%",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "5px",
          height: "5px",
          background: "#ffaa00",
          boxShadow: "0 0 10px rgba(255, 170, 0, 0.6)",
          top: "55%",
          left: "70%",
        }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#06060b]"
    >
      <div className="absolute inset-0 grid-overlay pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0, 240, 255, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(255, 0, 229, 0.04) 0%, transparent 60%)",
        }}
      />

      <DataRain />
      <HolographicGlobe />

      <div className="absolute top-0 left-0 right-0 scan-line" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 w-full">
        <div className="max-w-3xl">
          <div
            className="mb-6 inline-block glass px-4 py-1.5 text-xs tracking-[0.3em] uppercase"
            style={{
              color: "#00f0ff",
              textShadow: "0 0 8px rgba(0, 240, 255, 0.5)",
              fontFamily: "var(--font-mono)",
            }}
          >
            System Active // Twenty1Global v3.7
          </div>

          <h1
            className="glitch-text text-5xl sm:text-6xl lg:text-7xl font-light tracking-[0.02em] leading-tight mb-6"
            data-text="THE FUTURE OF GLOBAL TRADE"
            style={{
              color: "#e0e8ff",
              textShadow: "0 0 40px rgba(0, 240, 255, 0.1)",
            }}
          >
            THE FUTURE OF
            <br />
            <span
              style={{
                color: "#00f0ff",
                textShadow:
                  "0 0 20px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)",
              }}
            >
              GLOBAL TRADE
            </span>
          </h1>

          <p
            className="text-lg mb-10 max-w-xl leading-relaxed"
            style={{ color: "#667799" }}
          >
            Elite commodities trading across three continents. Real-time execution,
            predictive analytics, and logistics orchestration for the next
            generation of global commerce.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="#services"
              className="relative overflow-hidden px-8 py-3 font-medium tracking-[0.15em] uppercase text-sm transition-all duration-300"
              style={{
                color: "#06060b",
                background: "linear-gradient(135deg, #00f0ff 0%, #00c8d4 100%)",
                boxShadow:
                  "0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 50px rgba(0, 240, 255, 0.5), 0 0 90px rgba(0, 240, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(0, 240, 255, 0.3), 0 0 60px rgba(0, 240, 255, 0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Explore Services
            </Link>

            <Link
              href="#contact"
              className="relative overflow-hidden px-8 py-3 font-medium tracking-[0.15em] uppercase text-sm transition-all duration-300"
              style={{
                color: "#00f0ff",
                background: "rgba(0, 240, 255, 0.05)",
                border: "1px solid rgba(0, 240, 255, 0.3)",
                borderRadius: "2px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0, 240, 255, 0.12)";
                e.currentTarget.style.boxShadow =
                  "0 0 25px rgba(0, 240, 255, 0.2)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0, 240, 255, 0.05)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Initiate Contact
            </Link>
          </div>

          <div className="flex gap-10 mt-16">
            {[
              { value: "50+", label: "Countries", color: "#00f0ff" },
              { value: "$12B+", label: "Annual Volume", color: "#ff00e5" },
              { value: "99.9%", label: "Uptime", color: "#ffaa00" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-2xl font-light tracking-wider mb-1"
                  style={{ color: stat.color, fontFamily: "var(--font-mono)" }}
                >
                  {stat.value}
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
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="w-6 h-10 rounded-full flex items-start justify-center"
          style={{ border: "1px solid rgba(0, 240, 255, 0.2)" }}
        >
          <div
            className="w-1 h-2 rounded-full mt-2 animate-bounce"
            style={{
              background: "#00f0ff",
              boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
