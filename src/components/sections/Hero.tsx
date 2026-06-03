"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: 4 + Math.random() * 8,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 8 + Math.random() * 16,
  delay: Math.random() * 10,
  opacity: 0.15 + Math.random() * 0.25,
  type: Math.random() > 0.5 ? "particle" : "diagonal",
}));

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-cream"
    >
      {/* Blob backgrounds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-blob-drift blob-gradient-terracotta absolute -left-32 -top-20 h-[500px] w-[500px]"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="animate-blob-drift-slow blob-gradient-sage absolute -bottom-32 -right-20 h-[400px] w-[400px]"
          style={{ borderRadius: "40% 60% 70% 30% / 30% 60% 40% 70%" }}
        />
        <div
          className="animate-blob-drift blob-gradient-warm absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2"
          style={{ borderRadius: "50% 50% 40% 60% / 60% 40% 50% 50%" }}
        />
      </div>

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className={
              p.type === "particle"
                ? "animate-float-particle absolute rounded-full bg-terracotta"
                : "animate-float-diagonal absolute rounded-full bg-sage"
            }
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              top: p.top,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: p.opacity,
              borderRadius:
                p.size > 6 ? "50% 50% 45% 55% / 48% 52% 50% 50%" : "50%",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 pt-32 pb-16 lg:px-12">
        <div className="max-w-4xl">
          <ScrollReveal variant="bloom-up">
            <p className="mb-4 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-terracotta uppercase">
              Global Commodities Trading
            </p>
          </ScrollReveal>

          <ScrollReveal variant="bloom-up" delay={100}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl font-light leading-tight text-bark tracking-tight italic sm:text-6xl lg:text-7xl xl:text-8xl">
              Rooted in trust.
              <br />
              <span className="font-normal text-terracotta not-italic">
                Growing
              </span>{" "}
              worldwide.
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="bloom-up" delay={250}>
            <p className="mt-8 max-w-2xl font-[family-name:var(--font-body)] text-lg leading-relaxed text-clay lg:text-xl">
              Twenty1Global connects commodities markets across UAE, Singapore,
              and Switzerland. We trade with integrity, built on relationships
              as deep as the earth beneath us.
            </p>
          </ScrollReveal>

          <ScrollReveal variant="bloom-up" delay={400}>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-2 rounded-full bg-terracotta px-8 py-3.5 font-[family-name:var(--font-body)] text-base font-medium text-cream transition-all duration-500 hover:bg-terracotta-light hover:shadow-xl hover:shadow-terracotta/25"
              >
                Explore Our Services
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center rounded-full border-2 border-sand px-8 py-3.5 font-[family-name:var(--font-body)] text-base font-medium text-clay transition-all duration-500 hover:border-terracotta-light hover:text-terracotta"
              >
                About Us
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex animate-bounce flex-col items-center gap-1 text-sand/60">
          <span className="font-[family-name:var(--font-body)] text-[10px] tracking-widest uppercase">
            Scroll
          </span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
