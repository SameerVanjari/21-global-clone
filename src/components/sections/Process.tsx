"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const STEPS = [
  {
    id: "NODE_01",
    label: "SOURCE",
    title: "Source & Originate",
    description:
      "Identify supply origins through satellite intelligence and proprietary market scanners. Direct engagement with producers and miners at source.",
    tags: ["Producers", "Mines", "Refineries", "Origin KYC"],
    color: "#00f0ff",
  },
  {
    id: "NODE_02",
    label: "FINANCE",
    title: "Structure Finance",
    description:
      "Deploy structured trade finance, prepayment facilities, and inventory monetization. Multi-jurisdictional instruments with full regulatory compliance.",
    tags: ["LC", "Prepay", "Inventory", "Syndication"],
    color: "#ff00e5",
  },
  {
    id: "NODE_03",
    label: "QUALIFY",
    title: "Quality & Certify",
    description:
      "Independent inspection, assay, and certification at load port and discharge. Blockchain-verified chain of custody with real-time lab integration.",
    tags: ["Assay", "SGS", "Blockchain", "Certification"],
    color: "#00f0ff",
  },
  {
    id: "NODE_04",
    label: "LOGISTICS",
    title: "Move & Track",
    description:
      "End-to-end logistics orchestration with live vessel tracking, port optimization, and predictive routing across all major global trade corridors.",
    tags: ["Shipping", "Port Ops", "Tracking", "Routing"],
    color: "#ffaa00",
  },
  {
    id: "NODE_05",
    label: "DELIVER",
    title: "Deliver & Settle",
    description:
      "Final delivery at discharge port with automated title transfer, customs clearance, and instant settlement via our proprietary cyber-trade terminal.",
    tags: ["Delivery", "Customs", "Settlement", "Title"],
    color: "#00f0ff",
  },
];

function DataStream({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let offset = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      offset = (offset + 0.8) % 16;

      const dashLen = 6;
      const gapLen = 4;
      const totalDash = dashLen + gapLen;

      ctx.strokeStyle = active ? "rgba(0, 240, 255, 0.7)" : "rgba(0, 240, 255, 0.15)";
      ctx.lineWidth = 1;

      for (let x = -totalDash + (offset % totalDash); x < width; x += totalDash) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(Math.min(x + dashLen, width), 0);
        ctx.stroke();
      }

      ctx.shadowColor = active ? "rgba(0, 240, 255, 0.6)" : "transparent";
      ctx.shadowBlur = active ? 6 : 0;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.strokeStyle = active ? "rgba(0, 240, 255, 0.3)" : "rgba(0, 240, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [scanPos, setScanPos] = useState(-5);
  const [glitch, setGlitch] = useState(false);

  const advance = useCallback(() => {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 80);
    setActiveStep((prev) => (prev + 1) % STEPS.length);
  }, []);

  useEffect(() => {
    let speed = 3500;
    const startInterval = () => {
      intervalRef.current = setInterval(advance, speed);
    };
    startInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance]);

  useEffect(() => {
    const scanInterval = setInterval(() => {
      setScanPos(-5);
      const anim = () => {
        setScanPos((prev) => {
          if (prev >= 105) return 105;
          return prev + 1.5;
        });
      };
      const scanAnimation = setInterval(anim, 20);
      setTimeout(() => clearInterval(scanAnimation), 2500);
    }, 6000);
    return () => clearInterval(scanInterval);
  }, []);

  const handleMouseEnter = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    setActiveStep(index);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 80);
  };

  const handleMouseLeave = () => {
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      const id = setInterval(advance, 3500);
      intervalRef.current = id;
    }, 5000);
  };

  const current = STEPS[activeStep];

  return (
    <section
      id="process"
      className="relative py-24 bg-[#0d0d1a] overflow-hidden section-angled"
    >
      <div className="absolute inset-0 grid-overlay-heavy pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(0, 240, 255, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(255, 0, 229, 0.03) 0%, transparent 60%)",
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute left-0 w-full h-[2px] pointer-events-none z-5"
        style={{
          top: `${scanPos}%`,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.15) 10%, rgba(0, 240, 255, 0.5) 50%, rgba(0, 240, 255, 0.15) 90%, transparent 100%)",
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.3)",
        }}
      />

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
              Module 05 // Execution Pipeline
            </div>
            <h2
              className="text-4xl sm:text-5xl font-light tracking-wider mb-4"
              style={{ color: "#e0e8ff" }}
            >
              Trade <span style={{ color: "#00f0ff" }}>Data Flow</span>
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: "#667799" }}>
              End-to-end commodity execution pipeline with real-time data
              streaming across our tri-continental infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* Process pipeline */}
        <ScrollReveal variant="holo-fade" delay={100}>
          <div
            className="relative flex items-center justify-center mb-16"
            style={{ transform: glitch ? "translateX(2px)" : "translateX(0)", transition: "transform 0.08s ease" }}
          >
            <div className="flex items-center flex-wrap justify-center gap-0 relative px-4">
              {STEPS.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;

                return (
                  <div key={step.id} className="flex items-center">
                    {/* Connector line (before node) */}
                    {index > 0 && (
                      <div
                        className="relative w-12 sm:w-16 h-[20px] flex items-center mx-1"
                        onMouseEnter={() => handleMouseEnter(index)}
                      >
                        <DataStream active={index <= activeStep} />
                      </div>
                    )}

                    {/* Node */}
                    <div
                      className="relative cursor-pointer group"
                      onMouseEnter={() => handleMouseEnter(index)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {/* Hexagonal-like glass card */}
                      <div
                        className="relative px-4 sm:px-6 py-4 transition-all duration-500"
                        style={{
                          background: isActive
                            ? "rgba(0, 240, 255, 0.08)"
                            : isPast
                              ? "rgba(0, 240, 255, 0.03)"
                              : "rgba(255, 255, 255, 0.02)",
                          backdropFilter: "blur(16px)",
                          WebkitBackdropFilter: "blur(16px)",
                          border: isActive
                            ? "1px solid rgba(0, 240, 255, 0.5)"
                            : "1px solid rgba(0, 240, 255, 0.12)",
                          borderRadius: "2px",
                          boxShadow: isActive
                            ? "0 0 30px rgba(0, 240, 255, 0.15), 0 0 60px rgba(0, 240, 255, 0.05), inset 0 0 20px rgba(0, 240, 255, 0.04)"
                            : "0 0 15px rgba(0, 240, 255, 0.03)",
                          clipPath:
                            "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)",
                          minWidth: "100px",
                        }}
                      >
                        {/* Active pulse border */}
                        {isActive && (
                          <div
                            className="absolute inset-0"
                            style={{
                              border: "1px solid rgba(0, 240, 255, 0.4)",
                              borderRadius: "2px",
                              clipPath:
                                "polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0 50%)",
                              animation: "neon-pulse 2s ease-in-out infinite",
                            }}
                          />
                        )}

                        <div className="relative z-10">
                          <div
                            className="text-[9px] tracking-[0.15em] uppercase mb-1 text-center"
                            style={{
                              color: isActive ? "#00f0ff" : "#667799",
                              fontFamily: "var(--font-mono)",
                              textShadow: isActive
                                ? "0 0 6px rgba(0, 240, 255, 0.4)"
                                : "none",
                            }}
                          >
                            [{step.id}]
                          </div>
                          <div
                            className="text-xs sm:text-sm font-medium tracking-[0.08em] text-center whitespace-nowrap"
                            style={{
                              color: isActive
                                ? "#e0e8ff"
                                : isPast
                                  ? "#8899aa"
                                  : "#667799",
                              textShadow: isActive
                                ? "0 0 8px rgba(0, 240, 255, 0.3)"
                                : "none",
                            }}
                          >
                            {step.label}
                          </div>
                        </div>

                        {/* Active glow corners */}
                        {isActive && (
                          <>
                            <div
                              className="absolute top-0 left-[8px] w-3 h-[1px]"
                              style={{
                                background:
                                  "linear-gradient(90deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute top-0 right-[8px] w-3 h-[1px]"
                              style={{
                                background:
                                  "linear-gradient(270deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute bottom-0 left-[8px] w-3 h-[1px]"
                              style={{
                                background:
                                  "linear-gradient(90deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute bottom-0 right-[8px] w-3 h-[1px]"
                              style={{
                                background:
                                  "linear-gradient(270deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute top-0 left-0 h-3 w-[1px]"
                              style={{
                                background:
                                  "linear-gradient(180deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute top-0 right-0 h-3 w-[1px]"
                              style={{
                                background:
                                  "linear-gradient(180deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute bottom-0 left-0 h-3 w-[1px]"
                              style={{
                                background:
                                  "linear-gradient(0deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                            <div
                              className="absolute bottom-0 right-0 h-3 w-[1px]"
                              style={{
                                background:
                                  "linear-gradient(0deg, #00f0ff, transparent)",
                                boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Detail panel */}
        <ScrollReveal
          key={activeStep}
          variant="holo-fade"
          delay={50}
        >
          <div
            className="max-w-2xl mx-auto"
            style={{
              transform: glitch ? "translateX(-2px)" : "translateX(0)",
              transition: "transform 0.08s ease",
            }}
          >
            <div
              className="glass holo-shimmer p-8 relative overflow-hidden"
              style={{ borderRadius: "2px" }}
            >
              {/* Holographic shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 0%, rgba(0, 240, 255, 0.04) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "holographic-shimmer 8s ease-in-out infinite",
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{
                      background: "#00f0ff",
                      boxShadow: "0 0 12px rgba(0, 240, 255, 0.6)",
                    }}
                  />
                  <div
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{
                      color: "#00f0ff",
                      fontFamily: "var(--font-mono)",
                      textShadow: "0 0 6px rgba(0, 240, 255, 0.3)",
                    }}
                  >
                    [{current.id}] // Active Node
                  </div>
                </div>

                <h3
                  className="text-2xl font-light tracking-wide mb-3"
                  style={{ color: "#e0e8ff" }}
                >
                  {current.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "#667799" }}
                >
                  {current.description}
                </p>

                {/* Progress bar */}
                <div className="mb-6">
                  <div
                    className="text-[10px] tracking-[0.15em] uppercase mb-2"
                    style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
                  >
                    Pipeline Progress // {activeStep + 1} of {STEPS.length}
                  </div>
                  <div
                    className="h-[2px] rounded-full relative overflow-hidden"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div
                      className="h-full absolute left-0 top-0 transition-all duration-500 ease-out"
                      style={{
                        width: `${((activeStep + 1) / STEPS.length) * 100}%`,
                        background:
                          "linear-gradient(90deg, #00f0ff, #ff00e5)",
                        boxShadow: "0 0 10px rgba(0, 240, 255, 0.4)",
                      }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {current.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] tracking-wider uppercase"
                      style={{
                        color: "#00f0ff",
                        background: "rgba(0, 240, 255, 0.06)",
                        border: "1px solid rgba(0, 240, 255, 0.1)",
                        borderRadius: "1px",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* HUD brackets */}
              <div className="hud-bracket relative" />
            </div>

            {/* Step indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {STEPS.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => {
                    handleMouseEnter(index);
                    handleMouseLeave();
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background:
                      index === activeStep
                        ? "#00f0ff"
                        : index < activeStep
                          ? "rgba(0, 240, 255, 0.3)"
                          : "rgba(0, 240, 255, 0.1)",
                    boxShadow:
                      index === activeStep
                        ? "0 0 8px rgba(0, 240, 255, 0.6)"
                        : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
