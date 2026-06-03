"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "SOURCE",
    subtitle: "Global Sourcing",
    description:
      "We identify and secure premium commodity sources across six continents. Our network of vetted producers ensures quality, reliability, and competitive pricing at origin.",
  },
  {
    num: "02",
    title: "FINANCE",
    subtitle: "Trade Finance",
    description:
      "Structured trade finance solutions including letters of credit, supply chain financing, and risk-mitigated payment instruments. Capital deployed with geometric precision.",
  },
  {
    num: "03",
    title: "QUALIFY",
    subtitle: "Quality Assurance",
    description:
      "Rigorous inspection protocols, independent assay verification, and compliance with international standards. Every shipment meets our exacting specifications before dispatch.",
  },
  {
    num: "04",
    title: "LOGISTICS",
    subtitle: "Maritime & Land Logistics",
    description:
      "End-to-end orchestration of shipping, warehousing, customs clearance, and last-mile delivery. Optimized routing across all major global trade corridors.",
  },
  {
    num: "05",
    title: "DELIVER",
    subtitle: "Execution & Settlement",
    description:
      "Flawless delivery with real-time tracking, documentation, and settlement. Every transaction closes with the precision of a Swiss timepiece.",
  },
];

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPaused = useRef(false);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  }, []);

  const resumeRotation = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % STEPS.length);
    }, 4000);
  }, []);

  useEffect(() => {
    resumeRotation();
    return clearTimers;
  }, [resumeRotation, clearTimers]);

  const handleMouseEnter = () => {
    isPaused.current = true;
    clearTimers();
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
      resumeRotation();
    }, 6000);
  };

  const handleMouseLeave = () => {
    if (!isPaused.current) return;
  };

  const handleStepClick = (idx: number) => {
    setActiveIdx(idx);
    clearTimers();
    pauseTimeoutRef.current = setTimeout(() => {
      isPaused.current = false;
      resumeRotation();
    }, 6000);
  };

  return (
    <section id="process" className="relative py-24 lg:py-32 scroll-section overflow-hidden">
      <div className="absolute inset-0 bg-deep geometric-sunburst" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-gold-300/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal sparkle>
            <p className="text-gold-300/60 text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Our Process
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.03em] mb-6">
              Precision in <span className="italic gold-text-gradient">Motion</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/40" />
              <span className="diamond-marker w-[5px] h-[5px]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/40" />
            </div>
          </ScrollReveal>
        </div>

        {/* Process flow */}
        <ScrollReveal delay={0.35}>
          <div
            className="relative max-w-4xl mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Step markers and connectors */}
            <div className="relative flex items-center justify-center gap-0 mb-14 px-4 sm:px-8">
              {STEPS.map((step, i) => (
                <div key={step.num} className="relative flex items-center flex-1 last:flex-none">
                  {/* Step marker */}
                  <button
                    onClick={() => handleStepClick(i)}
                    className="relative z-10 flex-shrink-0 flex flex-col items-center group"
                  >
                    {/* Diamond frame */}
                    <div
                      className={`relative w-14 h-14 flex items-center justify-center transform rotate-45 transition-all duration-600 ease-out`}
                      style={{
                        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                        backgroundColor:
                          i === activeIdx
                            ? "#d4a853"
                            : i < activeIdx
                              ? "rgba(212, 168, 83, 0.15)"
                              : "transparent",
                        border: `1.5px solid ${
                          i === activeIdx
                            ? "#e8c97a"
                            : i < activeIdx
                              ? "rgba(212, 168, 83, 0.4)"
                              : "rgba(212, 168, 83, 0.2)"
                        }`,
                        transform: `rotate(45deg) scale(${i === activeIdx ? 1.1 : 1})`,
                        boxShadow:
                          i === activeIdx
                            ? "0 0 20px rgba(212, 168, 83, 0.5), 0 0 40px rgba(212, 168, 83, 0.2)"
                            : "none",
                      }}
                    >
                      {/* Number inside (counter-rotated) */}
                      <span
                        className={`transform -rotate-45 font-display text-lg ${
                          i === activeIdx
                            ? "text-deep"
                            : i < activeIdx
                              ? "text-gold-300"
                              : "text-gold-300/40"
                        } transition-colors duration-600`}
                        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                      >
                        {i + 1}
                      </span>

                      {/* Gold shimmer on active */}
                      {i === activeIdx && (
                        <div
                          className="absolute inset-0 -rotate-45"
                          style={{
                            background:
                              "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                            animation: "gold-shimmer 2s linear infinite",
                          }}
                        />
                      )}
                    </div>

                    {/* Step title below diamond */}
                    <span
                      className={`mt-4 font-display text-[10px] tracking-[0.25em] uppercase transition-all duration-600 ${
                        i === activeIdx
                          ? "text-gold-300"
                          : i < activeIdx
                            ? "text-gold-300/50"
                            : "text-champagne/30"
                      }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      {step.title}
                    </span>
                  </button>

                  {/* Connector line and diamond lozenge */}
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 flex items-center justify-center mx-1 sm:mx-2 min-w-[30px]">
                      <div className="relative w-full flex items-center">
                        {/* Line background */}
                        <div className="h-px w-full bg-gold-300/10" />
                        {/* Active/filled line segment */}
                        <div
                          className="absolute left-0 h-px transition-all duration-600"
                          style={{
                            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                            width: i < activeIdx ? "100%" : i === activeIdx ? "0%" : "0%",
                            background:
                              i === activeIdx
                                ? "linear-gradient(90deg, #d4a853, #e8c97a, #d4a853)"
                                : "linear-gradient(90deg, rgba(212,168,83,0.4), rgba(212,168,83,0.2))",
                          }}
                        />
                        {/* Active shimmer */}
                        {i === activeIdx && (
                          <div
                            className="absolute left-0 h-px w-full"
                            style={{
                              background:
                                "linear-gradient(90deg, transparent 0%, #e8c97a 50%, transparent 100%)",
                              backgroundSize: "200% 100%",
                              animation: "gold-shimmer 1.5s linear infinite",
                            }}
                          />
                        )}
                        {/* Diamond lozenge at midpoint */}
                        <div className="absolute left-1/2 -translate-x-1/2 z-10">
                          <span
                            className={`block w-2 h-2 transform rotate-45 transition-all duration-600 ${
                              i < activeIdx
                                ? "bg-gold-300"
                                : "bg-gold-300/20"
                            }`}
                            style={{
                              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                              boxShadow:
                                i < activeIdx
                                  ? "0 0 4px rgba(212, 168, 83, 0.5)"
                                  : "none",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Detail card */}
            <div className="relative max-w-2xl mx-auto">
              {/* Card top: gold border + step number */}
              <div className="relative px-8 pt-8 pb-8 bg-surface border border-gold-300/10 overflow-hidden transition-all duration-600"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}>
                {/* Gold left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold-300/80 via-gold-300/40 to-transparent" />

                {/* Shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(110deg, transparent 40%, rgba(212,168,83,0.04) 50%, transparent 60%)",
                    backgroundSize: "200% 100%",
                    animation: "gold-shimmer 3s linear infinite",
                  }}
                />

                {/* Content with crossfade */}
                <div className="relative">
                  {STEPS.map((step, i) => (
                    <div
                      key={step.num}
                      className={`transition-all duration-600 ${
                        i === activeIdx
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 absolute inset-0 pointer-events-none"
                      }`}
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      {/* Step number */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-display text-4xl text-gold-300/20">
                          {step.num}
                        </span>
                        <div>
                          <h3 className="font-display text-xl text-gold-300 tracking-[0.08em]">
                            {step.title}
                          </h3>
                          <p className="text-champagne/40 text-xs tracking-[0.2em] uppercase font-light mt-1">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-champagne/50 text-sm leading-relaxed tracking-wider font-light ml-16">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diamond accent below card */}
              <div className="flex justify-center mt-4">
                <span className="diamond-marker w-[4px] h-[4px] opacity-40" />
              </div>
            </div>

            {/* Step indicator dots */}
            <div className="flex items-center justify-center gap-3 mt-10">
              {STEPS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className={`transition-all duration-600 ${
                    i === activeIdx
                      ? "w-6 h-2 bg-gold-300"
                      : i < activeIdx
                        ? "w-2 h-2 bg-gold-300/40 rotate-0"
                        : "w-2 h-2 bg-gold-300/10 rotate-0"
                  }`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                    clipPath:
                      i === activeIdx
                        ? "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)"
                        : "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                  }}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
