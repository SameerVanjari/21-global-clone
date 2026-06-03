import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";

const Globe = dynamic(() => import("@/components/effects/Globe"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full"
      style={{ backgroundColor: "#f5f2ed" }}
    />
  ),
});

const LOCATIONS = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East & Africa",
    desc: "Our global headquarters sit at the crossroads of East and West. From DIFC, we orchestrate flows across the Middle East, Africa, and South Asia.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    desc: "The gateway to Asian markets. Our Singapore desk drives trading across energy, metals, and agricultural commodities throughout the Pacific Rim.",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    region: "Europe & Americas",
    desc: "Our European nexus. From Switzerland's historic trading corridors, we connect producers and consumers across Europe and the Americas.",
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="relative overflow-hidden"
      style={{ backgroundColor: "#f5f2ed" }}
    >
      {/* Section header — monumental, ultra-thin */}
      <div className="relative z-10 pt-32 md:pt-40 pb-12 md:pb-16 px-8 md:px-16">
        <p className="font-manrope text-[clamp(2.5rem,6vw,5rem)] font-extralight tracking-[-0.02em] leading-[0.95] text-[#1a1a1a]">
          Global
          <br />
          Presence
        </p>
        <p className="mt-6 text-sm font-light tracking-[0.15em] uppercase text-[#1a1a1a]/30 max-w-md">
          Three desks. One unbroken chain of trust.
        </p>
      </div>

      {/* Globe container — tall, imposing, with gradient masks */}
      <div
        className="relative w-full h-[550px] md:h-[700px]"
        style={{
          boxShadow: "0 60px 120px -30px rgba(0,0,0,0.25)",
        }}
      >
        {/* Top gradient mask — limestone to transparent */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none h-40"
          style={{
            background:
              "linear-gradient(to bottom, #f5f2ed 0%, rgba(245,242,237,0.8) 30%, transparent 100%)",
          }}
        />

        {/* Bottom gradient mask — transparent to limestone */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none h-40"
          style={{
            background:
              "linear-gradient(to top, #f5f2ed 0%, rgba(245,242,237,0.8) 30%, transparent 100%)",
          }}
        />

        <Globe />
      </div>

      {/* City cards — stone/concrete block feel */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 md:px-16 pt-16 md:pt-24 pb-24 md:pb-32">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{
            boxShadow:
              "0 40px 80px -20px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(0,0,0,0.06)",
          }}
        >
          {LOCATIONS.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 200}>
              <div
                className="py-14 md:py-20 px-8 md:px-12 h-full"
                style={{
                  backgroundColor: "#f5f2ed",
                  boxShadow:
                    i !== LOCATIONS.length - 1
                      ? "inset -1px 0 0 0 rgba(26,26,26,0.07)"
                      : "none",
                }}
              >
                <p className="text-xs font-light tracking-[0.3em] uppercase text-[#1a1a1a]/35 mb-4">
                  {loc.region}
                </p>
                <h3 className="text-xl md:text-2xl font-light tracking-[0.12em] uppercase text-[#1a1a1a] mb-1">
                  {loc.city}
                </h3>
                <p className="text-xs font-light tracking-[0.18em] uppercase text-[#1a1a1a]/25 mb-7">
                  {loc.country}
                </p>
                <div className="w-8 h-px mb-7" style={{ backgroundColor: "rgba(26,26,26,0.1)" }} />
                <p className="text-sm font-light leading-relaxed text-[#1a1a1a]/45 max-w-xs">
                  {loc.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
