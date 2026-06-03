"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "source",
    number: "01",
    title: "Source",
    description:
      "We identify and secure premium commodities from trusted producers across the globe. Our deep-rooted relationships ensure quality at origin.",
  },
  {
    id: "finance",
    number: "02",
    title: "Finance",
    description:
      "Structured trade finance solutions that bridge the gap between production and delivery. We orchestrate capital flows with precision and integrity.",
  },
  {
    id: "qualify",
    number: "03",
    title: "Qualify",
    description:
      "Rigorous quality assurance and compliance verification. Every shipment meets international standards before it moves.",
  },
  {
    id: "logistics",
    number: "04",
    title: "Logistics",
    description:
      "End-to-end supply chain orchestration. From warehousing to shipping, we ensure seamless movement across continents and borders.",
  },
  {
    id: "deliver",
    number: "05",
    title: "Deliver",
    description:
      "Timely delivery to destination with full traceability. We close every transaction with the same care it began with.",
  },
];

function VinePath({
  fromX,
  fromY,
  toX,
  toY,
  progress,
  index,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  progress: number;
  index: number;
}) {
  const midX = (fromX + toX) / 2;
  const swellY = -20 - Math.abs(index - 2) * 6;
  const d = `M ${fromX} ${fromY} C ${midX} ${fromY + swellY}, ${midX} ${toY + swellY}, ${toX} ${toY}`;

  const length = estimateCurveLength(fromX, fromY, midX, fromY + swellY, midX, toY + swellY, toX, toY);

  return (
    <path
      d={d}
      fill="none"
      stroke="var(--sage)"
      strokeWidth={1.5}
      strokeLinecap="round"
      opacity={0.35}
      strokeDasharray={length}
      strokeDashoffset={length * (1 - progress)}
      style={{ transition: "stroke-dashoffset 800ms ease-out" }}
    />
  );
}

function estimateCurveLength(
  x0: number, y0: number, x1: number, y1: number,
  x2: number, y2: number, x3: number, y3: number
): number {
  let length = 0;
  let px = x0, py = y0;
  for (let t = 0; t <= 1; t += 0.05) {
    const mt = 1 - t;
    const cx = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    const cy = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    length += Math.sqrt((cx - px) ** 2 + (cy - py) ** 2);
    px = cx;
    py = cy;
  }
  return length;
}

export default function Process() {
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHovered = useRef(false);

  const animateTo = useCallback((target: number) => {
    setPrevActive(active);
    setActive(target);
    setProgress(0);
  }, [active]);

  const nextStep = useCallback(() => {
    if (!isHovered.current) {
      setPrevActive(active);
      setActive((prev) => (prev + 1) % 5);
      setProgress(0);
    }
  }, [active]);

  useEffect(() => {
    autoTimer.current = setInterval(nextStep, 5000);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [nextStep]);

  useEffect(() => {
    const t = setTimeout(() => setProgress(1), 50);
    return () => clearTimeout(t);
  }, [active]);

  const handleHover = (index: number) => {
    isHovered.current = true;
    if (autoTimer.current) clearInterval(autoTimer.current);
    animateTo(index);
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      isHovered.current = false;
      autoTimer.current = setInterval(nextStep, 5000);
    }, 8000);
  };

  const step = STEPS[active];
  const isForward = active >= prevActive || (prevActive === 4 && active === 0);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-surface py-24 lg:py-32 wave-up"
    >
      <div className="absolute inset-0 leaf-vein" />
      <div className="pointer-events-none absolute inset-0 blob-gradient-sage" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-terracotta uppercase">
            Our Process
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
            From<span className="font-medium text-sage-dark not-italic"> source </span>
            to delivery
          </h2>
          <p className="mt-4 max-w-xl font-[family-name:var(--font-body)] text-lg text-clay">
            Every commodity we trade flows through a carefully tended process — nurtured from origin to destination.
          </p>
        </ScrollReveal>

        <div className="mt-16">
          {/* Vine path — desktop SVG */}
          <div className="relative mx-auto hidden max-w-4xl lg:block">
            <svg
              className="h-32 w-full"
              viewBox="0 0 800 120"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="vine-glow">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {STEPS.slice(0, -1).map((_, i) => {
                const xGap = 800 / 4;
                const fromX = i * xGap + 55;
                const fromY = 60;
                const toX = (i + 1) * xGap + 35;
                const toY = 60;
                const p = i < active ? 1 : i === active ? progress : 0;
                return (
                  <VinePath
                    key={i}
                    fromX={fromX}
                    fromY={fromY}
                    toX={toX}
                    toY={toY}
                    progress={p}
                    index={i}
                  />
                );
              })}
            </svg>

            {/* Nodes placed over the SVG */}
            <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-[50px]">
              {STEPS.map((s, i) => {
                const isComplete = i < active;
                const isCurrent = i === active;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleHover(i)}
                    className="group relative flex flex-col items-center"
                    aria-label={`Step ${s.number}: ${s.title}`}
                  >
                    <div
                      className={cn(
                        "relative z-10 flex items-center justify-center transition-all duration-800 ease-out",
                        isComplete
                          ? "rounded-full bg-sage text-cream"
                          : isCurrent
                            ? "rounded-full bg-terracotta text-cream"
                            : "rounded-full bg-cream border border-sand/60 text-clay hover:border-terracotta/30"
                      )}
                      style={{
                        width: isCurrent ? 72 : 56,
                        height: isCurrent ? 72 : 56,
                        borderRadius: isCurrent
                          ? "55% 45% 50% 50% / 48% 55% 45% 52%"
                          : "52% 48% 48% 52% / 50% 52% 48% 50%",
                        transition: "all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        transform: isCurrent ? "scale(1.15)" : "scale(1)",
                      }}
                    >
                      <span
                        className={cn(
                          "font-[family-name:var(--font-body)] text-sm font-medium transition-all duration-800",
                          isCurrent && "text-base"
                        )}
                      >
                        {s.number}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "mt-2 font-[family-name:var(--font-body)] text-xs tracking-wider uppercase transition-all duration-800",
                        isCurrent ? "text-terracotta font-semibold" : isComplete ? "text-sage-dark" : "text-clay/50"
                      )}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile: vertical chain */}
          <div className="flex flex-col items-center gap-6 lg:hidden">
            {STEPS.map((s, i) => {
              const isComplete = i < active;
              const isCurrent = i === active;

              return (
                <button
                  key={s.id}
                  onClick={() => handleHover(i)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-6 py-3 transition-all duration-800",
                    isCurrent
                      ? "bg-terracotta/10 border border-terracotta/30"
                      : isComplete
                        ? "bg-sage/5 border border-sage/20"
                        : "bg-cream border border-sand/40"
                  )}
                  style={{
                    borderRadius: "20px 14px 20px 14px / 14px 20px 14px 20px",
                  }}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-800",
                      isComplete
                        ? "bg-sage text-cream"
                        : isCurrent
                          ? "bg-terracotta text-cream"
                          : "bg-sand/30 text-clay"
                    )}
                    style={{
                      borderRadius: "52% 48% 48% 52% / 50% 52% 48% 50%",
                      transform: isCurrent ? "scale(1.1)" : "scale(1)",
                    }}
                  >
                    {s.number}
                  </div>
                  <span
                    className={cn(
                      "font-[family-name:var(--font-body)] text-xs tracking-wider uppercase",
                      isCurrent ? "text-terracotta font-semibold" : isComplete ? "text-sage-dark" : "text-clay/50"
                    )}
                  >
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail card */}
        <div className="mt-12 flex justify-center">
          <div
            key={active}
            className="relative mx-auto max-w-xl"
            style={{
              animation: isForward ? "bloom-up 800ms ease-out" : "bloom 800ms ease-out",
            }}
          >
            <div
              className="relative overflow-hidden rounded-3xl border border-sand/60 bg-cream p-8 shadow-sm sm:p-10"
              style={{
                borderRadius: "44px 24px 44px 24px / 30px 44px 24px 44px",
              }}
            >
              <div className="absolute left-0 top-0 h-full w-1.5 bg-sage/25" />

              <div className="mb-4 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta text-cream"
                  style={{
                    borderRadius: "55% 45% 50% 50% / 48% 55% 45% 52%",
                  }}
                >
                  <span className="font-[family-name:var(--font-body)] text-lg font-bold">
                    {step.number}
                  </span>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-body)] text-xs font-medium tracking-widest text-clay/60 uppercase">
                    Step {step.number}
                  </p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-medium text-bark">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="font-[family-name:var(--font-body)] text-base leading-relaxed text-clay">
                {step.description}
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        i === active
                          ? "w-6 bg-terracotta"
                          : i < active
                            ? "w-3 bg-sage/50"
                            : "w-1.5 bg-sand"
                      )}
                    />
                  ))}
                </div>
                <span className="font-[family-name:var(--font-body)] text-xs text-clay/50">
                  {active + 1} of 5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bloom-up {
          from {
            transform: translateY(24px) scale(0.95);
            opacity: 0;
            filter: blur(4px);
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
        @keyframes bloom {
          from {
            transform: scale(0.95);
            opacity: 0;
            filter: blur(4px);
          }
          to {
            transform: scale(1);
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </section>
  );
}
