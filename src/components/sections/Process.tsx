"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const STEPS = [
  {
    id: "01",
    title: "SOURCE",
    description: "// Identify and vet commodity suppliers across 54+ jurisdictions. Multi-factor due diligence including financial health, operational capacity, and regulatory compliance. Supplier network spans energy, metals, and agricultural sectors.",
  },
  {
    id: "02",
    title: "FINANCE",
    description: "// Structure trade finance facilities with access to $2.5B+ in credit lines. Leverage relationships with multilateral institutions, export credit agencies, and private capital. Optimize working capital across the transaction lifecycle.",
  },
  {
    id: "03",
    title: "QUALIFY",
    description: "// Comprehensive quality assurance protocols including independent inspection, laboratory testing, and documentary verification. Ensure all cargoes meet contractual specifications before vessel nomination.",
  },
  {
    id: "04",
    title: "LOGISTICS",
    description: "// Orchestrate end-to-end logistics across 340+ routes. Charter vessels, manage warehousing, coordinate customs clearance, and monitor shipments in real-time via satellite tracking and port agent networks.",
  },
  {
    id: "05",
    title: "DELIVER",
    description: "// Execute final delivery with precision. Title transfer, payment settlement, and post-transaction reconciliation. Average settlement time: T+2. Default rate: 0.02%. Every transaction tracked in immutable ledger.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [displayedChars, setDisplayedChars] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const startTypewriter = useCallback((text: string) => {
    setDisplayedChars(0);
    if (typewriterRef.current) clearInterval(typewriterRef.current);

    let idx = 0;
    typewriterRef.current = setInterval(() => {
      idx++;
      setDisplayedChars(idx);
      if (idx >= text.length) {
        if (typewriterRef.current) clearInterval(typewriterRef.current);
      }
    }, 18);
  }, []);

  const advanceStep = useCallback(() => {
    setActiveStep((prev) => {
      const next = (prev + 1) % STEPS.length;
      startTypewriter(STEPS[next].description);
      return next;
    });
  }, [startTypewriter]);

  useEffect(() => {
    if (!isVisible) return;

    startTypewriter(STEPS[0].description);

    const startTimer = () => {
      timerRef.current = setInterval(() => {
        advanceStep();
      }, 4000);
    };

    startTimer();

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
      if (typewriterRef.current) clearInterval(typewriterRef.current);
      clearInterval(cursorInterval);
    };
  }, [isVisible, advanceStep, startTypewriter]);

  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);

    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false);
      advanceStep();
      timerRef.current = setInterval(() => {
        advanceStep();
      }, 4000);
    }, 6000);
  }, [advanceStep]);

  const handleMouseLeave = useCallback(() => {
    if (isPaused) return;
  }, [isPaused]);

  const active = STEPS[activeStep];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="bg-background border-brutal-thick-t border-brutal-thick-b py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <span className="text-eyebrow text-amber block mb-4">
            <span className="text-amber">{">"}</span> EXECUTION PIPELINE
          </span>
          <h2 className="text-subheading">
            COMMAND<span className="text-amber">_</span>CHAIN
          </h2>
          <div className="section-divider mt-8" />
        </div>

        <div
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {STEPS.map((step, i) => {
            const isActive = i === activeStep;
            const isCompleted = i < activeStep;

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`
                    border-brutal px-4 py-3 min-w-[100px] text-center transition-all duration-500
                    ${isActive ? "bg-amber text-background border-amber" : "border-border"}
                    ${isCompleted ? "border-green-700" : ""}
                  `}
                  style={{
                    animation: isActive ? "pulse-amber 2s ease-in-out infinite" : "none",
                  }}
                >
                  <div className="text-eyebrow mb-1">
                    {isCompleted ? (
                      <span className="text-green-600">[OK]</span>
                    ) : (
                      <span className={isActive ? "text-background" : "text-amber"}>
                        [{step.id}]
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-nav ${
                      isActive
                        ? "text-background"
                        : isCompleted
                          ? "text-muted-foreground"
                          : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <span
                    className="text-caption text-amber px-2 select-none"
                    style={{
                      opacity: isActive && i === activeStep ? 1 : 0.3,
                      transition: "opacity 1s ease-in-out",
                      animation:
                        isActive && i === activeStep
                          ? "pulse-opacity 1s ease-in-out infinite"
                          : "none",
                    }}
                  >
                    ===
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-brutal border-amber-l bg-surface p-8 relative">
          <div className="flex items-center justify-between mb-4">
            <span className="text-eyebrow text-amber">
              [{active.id}] {active.title} — TERMINAL OUTPUT
            </span>
            {isPaused && (
              <span className="text-caption text-amber animate-pulse">
                [PAUSED]
              </span>
            )}
          </div>

          <div className="section-divider mb-6" />

          <div className="bg-background border-brutal p-6">
            <p className="text-terminal text-foreground font-mono">
              <span
                className={
                  cursorVisible ? "opacity-100" : "opacity-0"
                }
                style={{ color: "#f59e0b", fontWeight: 700 }}
              >
                _
              </span>
              <span>{active.description.slice(0, displayedChars)}</span>
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2 text-caption text-muted-foreground">
            <span className="text-amber">[</span>
            <span>PIPELINE DEPTH: 5 STAGES</span>
            <span className="text-amber">|</span>
            <span>MODE: {isPaused ? "HOVER-PAUSE" : "AUTO-ROTATE"}</span>
            <span className="text-amber">|</span>
            <span>INTERVAL: 4.0s</span>
            <span className="text-amber">]</span>
          </div>
        </div>

        <div className="mt-12 border-brutal p-4 text-caption text-muted-foreground">
          <span className="text-amber">{">"}</span> PIPELINE STATUS: NOMINAL &nbsp;
          <span className="text-amber">//</span> ALL STAGES OPERATIONAL &nbsp;
          <span className="text-amber">//</span> THROUGHPUT: 340+ ROUTES
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-amber {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0);
          }
        }
        @keyframes pulse-opacity {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
