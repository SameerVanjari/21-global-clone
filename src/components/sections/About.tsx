import ScrollReveal from "@/components/effects/ScrollReveal";

const stats = [
  { value: "15+", label: "Years of Trade" },
  { value: "3", label: "Global Hubs" },
  { value: "50+", label: "Countries Served" },
  { value: "$2B+", label: "Annual Volume" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Visual column */}
          <ScrollReveal>
            <div className="relative">
              <div
                className="organic-oval blob-gradient-warm relative mx-auto aspect-[4/5] max-w-md overflow-hidden"
              >
                {/* Placeholder organic photograph */}
                <div className="flex h-full w-full items-center justify-center bg-sand/30">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-terracotta/15">
                      <svg
                        className="h-12 w-12 text-terracotta"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="font-[family-name:var(--font-body)] text-sm text-clay/60">
                      Global Reach
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="organic-oval-alt absolute -bottom-8 -right-4 h-40 w-40 overflow-hidden border-4 border-cream shadow-lg"
              >
                <div className="flex h-full w-full items-center justify-center bg-terracotta/20">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-terracotta">
                    21
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Content column */}
          <div>
            <ScrollReveal>
              <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-terracotta uppercase">
                Who We Are
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
                The earth beneath{" "}
                <span className="font-medium text-sage-dark not-italic">
                  global trade
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <p className="mt-8 font-[family-name:var(--font-body)] text-lg leading-relaxed text-clay">
                Twenty1Global was founded on a simple belief: that the world&apos;s
                commodities markets deserve a trading partner as grounded as the
                resources they move. We bring together deep regional knowledge
                from the Middle East, Asia-Pacific, and Europe — united by a
                shared commitment to integrity and long-term partnership.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <blockquote className="mt-8 border-l-4 border-terracotta-light pl-6">
                <p className="font-[family-name:var(--font-display)] text-xl font-light italic leading-relaxed text-bark">
                  &ldquo;Trade is not just transaction. It is the flow of trust
                  across borders — as natural and essential as water finding its
                  path to the sea.&rdquo;
                </p>
                <footer className="mt-3 font-[family-name:var(--font-body)] text-sm text-clay">
                  — Founding Principle, Twenty1Global
                </footer>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div
                className="group rounded-3xl border border-sand/60 bg-surface p-8 text-center transition-all duration-500 hover:border-terracotta/30 hover:shadow-lg hover:shadow-terracotta/5"
                style={{
                  borderRadius: "30px 24px 30px 24px / 24px 30px 24px 30px",
                }}
              >
                <span className="block font-[family-name:var(--font-display)] text-4xl font-semibold text-terracotta transition-colors group-hover:text-terracotta-light lg:text-5xl">
                  {stat.value}
                </span>
                <span className="mt-2 block font-[family-name:var(--font-body)] text-sm text-clay">
                  {stat.label}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
