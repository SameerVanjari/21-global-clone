"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const STEPS = [
  {
    title: "Source",
    description:
      "We identify and vet premium commodity producers across global markets — applying rigorous due diligence and market intelligence to select only the most reliable origination partners.",
  },
  {
    title: "Finance",
    description:
      "Structured trade finance solutions tailored to each transaction. From letters of credit to supply chain financing, we engineer capital structures that de-risk and accelerate trade flows.",
  },
  {
    title: "Qualify",
    description:
      "Rigorous inspection and certification at origin, in transit, and at destination. Our quality assurance protocols exceed industry standards, ensuring every shipment meets exact specifications.",
  },
  {
    title: "Logistics",
    description:
      "End-to-end freight orchestration across sea, air, and land corridors. We manage multimodal transport with precision timing — from port operations and customs clearance to warehousing and final mile.",
  },
  {
    title: "Deliver",
    description:
      "Just-in-time delivery with real-time tracking and complete documentation. Our delivery guarantee is backed by bonded warehousing, insurance coverage, and a dedicated operations desk.",
  },
];

const AUTO_INTERVAL = 4000;
const PAUSE_DURATION = 6000;
const TRANSITION_DURATION = 600;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prevIndex, setPrevIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const startAutoRotation = useCallback(() => {
    clearTimers();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STEPS.length);
    }, AUTO_INTERVAL);
  }, [clearTimers]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry.isIntersecting);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startAutoRotation();
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, startAutoRotation]);

  useEffect(() => {
    return () => {
      clearTimers();
    };
  }, [clearTimers]);

  const selectStep = (index: number) => {
    if (index === activeIndex) return;
    setPrevIndex(activeIndex);
    setTransitioning(true);
    setActiveIndex(index);
    setIsPaused(true);

    clearTimers();

    pauseTimerRef.current = setTimeout(() => {
      setTransitioning(false);
      setIsPaused(false);
    }, PAUSE_DURATION);

    setTimeout(() => {
      setTransitioning(false);
    }, TRANSITION_DURATION);
  };

  const handleMouseEnter = (index: number) => {
    if (index !== activeIndex) {
      selectStep(index);
    }
  };

  const handleClick = (index: number) => {
    selectStep(index);
  };

  return (
    <section id="process" ref={sectionRef} className="section-padding bg-[var(--color-paper)]">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
          <div className="lg:col-span-4">
            <span className="block text-eyebrow text-[var(--color-gold)] mb-6">
              Our Method
            </span>
            <h2 className="text-heading text-[var(--color-ink)]">
              How we
              <br />
              deliver
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9]">
              Five disciplined stages that transform raw market opportunity into
              flawless execution. Every step is engineered for precision —
              because in global trade, the margin between success and failure is
              measured in detail.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="rule mb-16 lg:mb-20" />
      </ScrollReveal>

      <ScrollReveal delay={200}>
        {/* Step flow — horizontal row */}
        <div className="flex items-start justify-between mb-14 lg:mb-20 overflow-x-auto pb-4 md:pb-0 px-1 md:px-2 pt-6 md:pt-8">
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex;
            const isCompleted = i < activeIndex;

            return (
              <div key={step.title} className="flex items-center flex-1 min-w-0 last:flex-none">
                {/* Step circle + label */}
                <button
                  type="button"
                  className="flex flex-col items-center gap-3 flex-shrink-0 cursor-pointer group"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onClick={() => handleClick(i)}
                  aria-label={`Step ${i + 1}: ${step.title}`}
                >
                  <div
                    className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? "bg-[var(--color-gold)] border-[var(--color-gold)] scale-110"
                        : isCompleted
                          ? "bg-[var(--color-ink)]/5 border-[var(--color-divider-strong)]"
                          : "bg-transparent border-[var(--color-divider)] group-hover:border-[var(--color-ink)]/20"
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <path
                          d="M3 8l3.5 3.5L13 5"
                          stroke={isActive ? "#fbf8f4" : "var(--color-ink)"}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`${isActive ? "opacity-0" : "opacity-40"}`}
                        />
                      </svg>
                    ) : (
                      <span
                        className={`font-[family-name:var(--font-dm-sans)] text-sm md:text-base font-medium leading-none transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? "text-[var(--color-cream)]"
                            : "text-[var(--color-ink-muted)]"
                        }`}
                      >
                        {i + 1}
                      </span>
                    )}
                  </div>

                  <span
                    className={`font-[family-name:var(--font-dm-sans)] text-[0.65rem] md:text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap ${
                      isActive
                        ? "text-[var(--color-gold)]"
                        : isCompleted
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-ink-muted)]/50"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>

                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div
                    className="flex-1 mx-2 md:mx-4 h-[1px] mt-6 relative"
                    style={{ background: "var(--color-divider)" }}
                  >
                    <div
                      className="absolute inset-y-0 left-0 bg-[var(--color-gold)] h-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        width: i < activeIndex ? "100%" : i === activeIndex ? "0%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={300}>
        {/* Detail card */}
        <div className="relative overflow-hidden border border-[var(--color-divider)] bg-[var(--color-cream)] p-8 md:p-12 lg:p-14 min-h-[220px] md:min-h-[200px]">
          {STEPS.map((step, i) => {
            const isActive = i === activeIndex;
            const wasActive = i === prevIndex && transitioning;

            return (
              <div
                key={step.title}
                className={`transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive
                    ? "relative opacity-100 translate-y-0"
                    : "absolute inset-0 p-8 md:p-12 lg:p-14 opacity-0 translate-y-6 pointer-events-none"
                }`}
                style={{
                  transitionProperty: "opacity, transform",
                }}
              >
                <div className="flex items-baseline gap-4 mb-4">
                  <span
                    className={`font-[family-name:var(--font-dm-sans)] text-[3rem] md:text-[4rem] font-thin leading-none tracking-[-0.03em] ${
                      isActive
                        ? "text-[var(--color-ink)]/15"
                        : "text-[var(--color-ink)]/0"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-subhead text-[var(--color-ink)]">
                    {step.title}
                  </h3>
                </div>

                <p className="font-[family-name:var(--font-lora)] text-[1.0625rem] leading-[1.85] text-[var(--color-ink-muted)] max-w-[680px]">
                  {step.description}
                </p>
              </div>
            );
          })}

          {/* Active indicator dots */}
          <div className="flex gap-2 mt-8">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectStep(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === activeIndex
                    ? "bg-[var(--color-gold)] w-6"
                    : "bg-[var(--color-divider-strong)] hover:bg-[var(--color-ink)]/20"
                }`}
              />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
