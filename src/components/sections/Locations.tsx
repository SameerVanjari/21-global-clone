import ScrollReveal from "@/components/effects/ScrollReveal";

const LOCATIONS = [
  {
    city: "Dubai",
    region: "United Arab Emirates",
    role: "Global Headquarters",
    description:
      "The commercial nexus connecting East and West. Our Dubai office anchors all strategic operations, capital allocation, and senior leadership — positioned at the centre of global trade flows.",
    offset: "",
  },
  {
    city: "Singapore",
    region: "Republic of Singapore",
    role: "Asia-Pacific Hub",
    description:
      "Our gateway to the fastest-growing markets on earth. Singapore drives our Asian sourcing, distribution, and financial operations with the precision the city-state is renowned for.",
    offset: "md:mt-20",
  },
  {
    city: "Geneva",
    region: "Switzerland",
    role: "European Operations",
    description:
      "The historic heart of global commodity trading. Our Geneva presence ensures access to European markets, trade finance networks, and the rigorous standards Swiss commerce demands.",
    offset: "md:mt-40",
  },
];

export default function Locations() {
  return (
    <section id="locations" className="section-padding">
      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-24">
        <div className="lg:col-span-4">
          <ScrollReveal>
            <span className="block text-eyebrow text-[var(--color-gold)] mb-6">
              Global Presence
            </span>
            <h2 className="text-heading text-[var(--color-ink)]">
              Where we
              <br />
              operate
            </h2>
          </ScrollReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <ScrollReveal delay={150}>
            <p className="text-body text-[var(--color-ink-muted)] leading-[1.9]">
              Three strategic hubs. One seamless operation. Our offices are
              positioned to provide continuous market coverage across every
              major time zone, ensuring that someone is always watching the
              markets.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="rule mb-16 lg:mb-24" />

      {/* Location cards — cascading/offset layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {LOCATIONS.map((loc, i) => (
          <ScrollReveal key={loc.city} delay={i * 150}>
            <div
              className={`group p-8 md:p-10 border border-transparent hover:bg-[var(--color-gold-pale)]/20 transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-[var(--color-divider)] ${
                i < LOCATIONS.length - 1 ? "border-r-0 md:border-r" : ""
              } ${loc.offset}`}
            >
              {/* Large city name */}
              <h3 className="font-[family-name:var(--font-dm-sans)] text-[clamp(2.5rem,4vw,3.5rem)] font-extralight tracking-[-0.02em] text-[var(--color-ink)] mb-2 leading-none">
                {loc.city}
              </h3>

              <p className="text-caption text-[var(--color-ink-muted)] mb-1">
                {loc.role}
              </p>
              <p className="text-caption text-[var(--color-ink-muted)]/60 mb-6">
                {loc.region}
              </p>

              <div className="rule-short mb-6" />

              <p className="font-[family-name:var(--font-lora)] text-[0.9rem] leading-[1.8] text-[var(--color-ink-muted)]">
                {loc.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
