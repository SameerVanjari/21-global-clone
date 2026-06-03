"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const steps = [
  {
    number: "01",
    title: "Source",
    description:
      "Origination from vetted producers and strategic partners across key supply regions. Due diligence, quality assurance, and contractual framework established before market entry.",
  },
  {
    number: "02",
    title: "Finance",
    description:
      "Structured trade finance instruments deployed. Letters of credit, supply chain finance, and hedging strategies aligned to each transaction's risk profile.",
  },
  {
    number: "03",
    title: "Qualify",
    description:
      "Third-party inspection, certification, and compliance verification. Every shipment meets ISO 9001 standards and jurisdictional regulatory requirements.",
  },
  {
    number: "04",
    title: "Logistics",
    description:
      "End-to-end freight management. Chartering, warehousing, customs clearance, and insurance coordinated across multi-modal supply chains.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "Final delivery and settlement. Documentation closure, payment reconciliation, and post-transaction analysis feeding back into the methodology.",
  },
];

const INTERVAL_MS = 4000;
const HOVER_PAUSE_MS = 6000;

export function Process() {
  const [active, setActive] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    function schedule() {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        const now = Date.now();
        if (now < pausedUntil) return;
        advance();
      }, INTERVAL_MS);
    }

    schedule();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [pausedUntil, advance]);

  const handleMouseEnter = () => {
    setPausedUntil(Date.now() + HOVER_PAUSE_MS);
  };

  return (
    <section id="process" className="bg-white">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="precision-label mb-6">How we work</p>
            <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[600px] max-md:text-[1.75rem]">
              Five steps. One methodology
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div
              className="mt-20 max-md:mt-12"
              onMouseEnter={handleMouseEnter}
              onFocus={handleMouseEnter}
            >
              <div className="flex items-center justify-between max-w-[800px]">
                {steps.map((step, i) => (
                  <button
                    key={step.number}
                    onClick={() => setActive(i)}
                    className="relative flex flex-col items-center gap-4 group"
                    style={{ width: "60px" }}
                    aria-label={`Step ${step.number}: ${step.title}`}
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border:
                          i === active
                            ? "1px solid #e63946"
                            : i < active
                              ? "1px solid #cccccc"
                              : "1px solid #111111",
                        backgroundColor:
                          i === active
                            ? "#e63946"
                            : i < active
                              ? "#f5f5f5"
                              : "transparent",
                        transition: "background-color 400ms linear, border-color 400ms linear",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          fontFamily: "var(--font-inter), Inter, sans-serif",
                          color:
                            i === active
                              ? "#ffffff"
                              : i < active
                                ? "#767676"
                                : "#111111",
                          transition: "color 400ms linear",
                        }}
                      >
                        {step.number}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: i === active ? "#111111" : "#767676",
                        transition: "color 400ms linear",
                      }}
                    >
                      {step.title}
                    </span>
                  </button>
                ))}
              </div>

              <div
                className="mt-1"
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  height: "1px",
                  backgroundColor: "#e5e5e5",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "1px",
                    backgroundColor: "#111111",
                    transition: "width 400ms linear",
                    width: `${(active === 0 ? 0 : (active / (steps.length - 1)) * 100)}%`,
                  }}
                />
              </div>

              <div className="mt-16 min-h-[120px] max-md:mt-12">
                <div
                  key={active}
                  style={{
                    opacity: 1,
                    animation: "processSlideIn 500ms linear",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="mt-1.5 flex-shrink-0"
                      style={{
                        width: "24px",
                        height: "2px",
                        backgroundColor: "#e63946",
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-medium text-foreground max-md:text-lg">
                        {steps[active].title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted mt-3 max-w-[560px]">
                        {steps[active].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style jsx>{`
        @keyframes processSlideIn {
          from {
            opacity: 0;
            transform: translateX(-32px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
