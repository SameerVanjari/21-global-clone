import ScrollReveal from "@/components/effects/ScrollReveal";
import { cn } from "@/lib/utils";

const locations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    description:
      "Our headquarters at the crossroads of global trade. Dubai's strategic position connects Eastern and Western markets with unmatched efficiency.",
    accent: "bg-terracotta",
    accentLight: "bg-terracotta-light/30",
    accentText: "text-terracotta",
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific",
    description:
      "The gateway to Asia's dynamic commodity markets. Our Singapore office brings deep regional expertise and access to the fastest-growing trade corridors.",
    accent: "bg-sage",
    accentLight: "bg-sage/30",
    accentText: "text-sage-dark",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    region: "Europe",
    description:
      "At the heart of European commodities finance. Geneva connects us to the world's most sophisticated trading networks and financial infrastructure.",
    accent: "bg-clay",
    accentLight: "bg-clay/20",
    accentText: "text-clay",
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative overflow-hidden bg-surface py-24 lg:py-32 wave-diagonal-down"
    >
      <div className="absolute inset-0 leaf-vein-terracotta" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <ScrollReveal>
          <p className="mb-3 font-[family-name:var(--font-body)] text-sm font-medium tracking-widest text-terracotta uppercase">
            Global Presence
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-light italic text-bark sm:text-5xl lg:text-6xl">
            Three hubs.{" "}
            <span className="font-medium text-sage-dark not-italic">
              One world.
            </span>
          </h2>
          <p className="mt-4 max-w-2xl font-[family-name:var(--font-body)] text-lg text-clay">
            Strategically positioned across three continents, our offices form a
            continuous ring of expertise that never sleeps.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 150}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand/50 bg-cream p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-terracotta/5"
                style={{
                  borderRadius: "36px 22px 36px 22px / 28px 36px 22px 36px",
                }}
              >
                {/* Circular image placeholder */}
                <div className="mx-auto mb-6">
                  <div
                    className={cn(
                      "organic-oval h-28 w-28 flex items-center justify-center",
                      loc.accentLight
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-16 w-16 items-center justify-center rounded-full",
                        loc.accent,
                        "text-cream"
                      )}
                      style={{
                        borderRadius: "52% 48% 48% 52% / 50% 52% 48% 50%",
                      }}
                    >
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="mb-1 text-center font-[family-name:var(--font-body)] text-xs font-medium tracking-widest text-clay/60 uppercase">
                  {loc.region}
                </p>
                <h3 className="text-center font-[family-name:var(--font-display)] text-2xl font-medium text-bark">
                  {loc.city}
                </h3>
                <p className="mb-4 text-center font-[family-name:var(--font-body)] text-sm text-clay/70">
                  {loc.country}
                </p>

                <div className={cn("mx-auto mb-6 h-px w-16", loc.accent.replace("bg-", "bg-") + "/30")}
                  style={{
                    background:
                      i === 0
                        ? "var(--terracotta)"
                        : i === 1
                          ? "var(--sage)"
                          : "var(--clay)",
                    opacity: 0.3,
                    height: 1,
                  }}
                />

                <p className="flex-1 text-center font-[family-name:var(--font-body)] text-sm leading-relaxed text-clay">
                  {loc.description}
                </p>

                <div
                  className={cn(
                    "mt-6 rounded-full px-2 py-0.5 text-center text-xs font-medium",
                    loc.accentLight,
                    loc.accentText
                  )}
                  style={{
                    borderRadius: "16px 10px 16px 10px / 10px 16px 10px 16px",
                  }}
                >
                  {loc.city} Office
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
