import ScrollReveal from "@/components/effects/ScrollReveal";

const LOCATIONS = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East & Africa",
    desc: "Our global headquarters sit at the crossroads of East and West. From DIFC, we orchestrate flows across the Middle East, Africa, and South Asia.",
    aspect: "aspect-[16/9]",
  },
  {
    city: "Singapore",
    country: "Singapore",
    region: "Asia Pacific",
    desc: "The gateway to Asian markets. Our Singapore desk drives trading across energy, metals, and agricultural commodities throughout the Pacific Rim.",
    aspect: "aspect-[2/1]",
  },
  {
    city: "Zug",
    country: "Switzerland",
    region: "Europe & Americas",
    desc: "Our European nexus. From Switzerland's historic trading corridors, we connect producers and consumers across Europe and the Americas.",
    aspect: "aspect-[16/9]",
  },
];

export default function Locations() {
  return (
    <section
      id="locations"
      className="min-h-screen px-8 md:px-16 py-24 md:py-32 flex flex-col justify-center"
      style={{ backgroundColor: "#f5f2ed" }}
    >
      <div className="max-w-[1600px] mx-auto w-full">
        <ScrollReveal>
          <p className="text-xs font-light tracking-[0.4em] uppercase text-[#1a1a1a]/30 mb-20">
            Global Presence
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0">
          {LOCATIONS.map((loc, i) => (
            <ScrollReveal key={loc.city} delay={i * 200}>
              <div className="py-12 md:py-0 md:pr-12">
                <div
                  className={`w-full ${loc.aspect} mb-10 shadow-architectural`}
                  style={{ backgroundColor: "#d6d3cc" }}
                />
                <p className="text-xs font-light tracking-[0.25em] uppercase text-[#1a1a1a]/40 mb-3">
                  {loc.region}
                </p>
                <h3 className="text-xl md:text-2xl font-extralight tracking-[0.1em] uppercase text-[#1a1a1a] mb-1">
                  {loc.city}
                </h3>
                <p className="text-xs font-light tracking-[0.15em] uppercase text-[#1a1a1a]/30 mb-6">
                  {loc.country}
                </p>
                <p className="text-sm font-light leading-relaxed text-[#1a1a1a]/50 max-w-xs">
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
