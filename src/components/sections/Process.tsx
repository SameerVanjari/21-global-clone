"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";

const STEPS = [
  {
    num: "01",
    title: "Source",
    detail:
      "We identify and qualify producers across energy, metals, and agricultural markets. Our global network ensures direct access to supply at origin — no intermediaries, no friction.",
  },
  {
    num: "02",
    title: "Finance",
    detail:
      "Structured trade finance tailored to each transaction. Letters of credit, supply chain facilities, and pre-export financing engineered for speed and security.",
  },
  {
    num: "03",
    title: "Qualify",
    detail:
      "Rigorous due diligence on every counterparty and cargo. Independent inspection, quality certification, and compliance verification before any commitment is made.",
  },
  {
    num: "04",
    title: "Logistics",
    detail:
      "End-to-end physical delivery orchestration. Chartering, freight forwarding, customs clearance, and storage — managed with military precision across every time zone.",
  },
  {
    num: "05",
    title: "Deliver",
    detail:
      "Final settlement and delivery confirmation. Every transaction closes with documentation integrity, timely payment, and a foundation for the next trade.",
  },
];

export default function Process() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  const scheduleNext = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 5000);
  }, []);

  const clearTimers = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (pauseTimeoutRef.current !== null) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true;
    clearTimers();
  }, [clearTimers]);

  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false;
    clearTimers();
    pauseTimeoutRef.current = setTimeout(() => {
      if (!pausedRef.current) {
        scheduleNext();
      }
    }, 8000);
  }, [clearTimers, scheduleNext]);

  useEffect(() => {
    scheduleNext();
    return () => clearTimers();
  }, [scheduleNext, clearTimers]);

  return (
    <section
      id="process"
      className="section-dark min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 md:py-32"
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#f5f2ed]/30 mb-20">
            How We Operate
          </p>
        </ScrollReveal>

        {/* Monumental numerals — 5-column horizontal */}
        <div
          className="grid grid-cols-5 gap-0 mb-16 md:mb-24"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {STEPS.map((step, i) => (
            <div key={step.num} className="relative flex flex-col items-center">
              {/* Shadow divider between columns */}
              {i > 0 && (
                <div
                  className="absolute left-0 top-0 bottom-0"
                  style={{
                    width: "1px",
                    background:
                      "linear-gradient(to bottom, transparent 20%, rgba(245,242,237,0.06) 50%, transparent 80%)",
                  }}
                />
              )}
              <span
                className="block select-none leading-none tracking-[-0.06em] transition-all"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontWeight: 200,
                  fontSize: "clamp(3rem, 6vw, 8rem)",
                  color: "#f5f2ed",
                  opacity: active === i ? 1 : 0.08,
                  transform: active === i ? "scale(1.02)" : "scale(0.98)",
                  transition:
                    "opacity 2s cubic-bezier(0.3, 0, 0.1, 1), transform 2s cubic-bezier(0.3, 0, 0.1, 1)",
                }}
              >
                {step.num}
              </span>
              <span
                className="block mt-3 text-xs md:text-sm font-light tracking-[0.2em] uppercase select-none transition-all"
                style={{
                  color: "#f5f2ed",
                  opacity: active === i ? 0.6 : 0.12,
                  transition: "opacity 2s cubic-bezier(0.3, 0, 0.1, 1)",
                }}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Detail card */}
        <div className="max-w-2xl mx-auto">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="shadow-architectural-deep p-10 md:p-14 transition-all"
              style={{
                backgroundColor: "#2c2c2e",
                display: active === i ? "block" : "none",
                transform: active === i ? "scale(1)" : "scale(0.97)",
                filter: active === i ? "brightness(1)" : "brightness(0.4)",
                transition:
                  "transform 2s cubic-bezier(0.3, 0, 0.1, 1), filter 2s cubic-bezier(0.3, 0, 0.1, 1)",
              }}
            >
              <p className="text-xs font-light tracking-[0.3em] uppercase text-[#f5f2ed]/40 mb-4">
                Step {step.num}
              </p>
              <p className="text-sm font-light leading-relaxed text-[#f5f2ed]/50">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
