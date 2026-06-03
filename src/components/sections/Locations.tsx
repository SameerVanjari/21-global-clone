import { ScrollReveal } from "@/components/effects/ScrollReveal";

const locations = [
  {
    city: "Dubai",
    country: "United Arab Emirates",
    address: "Almas Tower, Level 23",
    district: "DMCC Free Zone",
    coordinates: "25°04'N 55°08'E",
    timezone: "GST (UTC+4)",
    description:
      "Our Middle East headquarters, positioned in the world's most dynamic commodities hub. Direct access to Gulf energy markets and Asian demand centres.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "One Raffles Place, Level 42",
    district: "Central Business District",
    coordinates: "1°17'N 103°51'E",
    timezone: "SGT (UTC+8)",
    description:
      "Gateway to APAC markets. LNG, metals, and agricultural flows through Southeast Asia's premier trading and financial centre.",
  },
  {
    city: "Zug",
    country: "Switzerland",
    address: "Baarerstrasse 78",
    district: "Canton Zug",
    coordinates: "47°10'N 8°31'E",
    timezone: "CET (UTC+1)",
    description:
      "Our global headquarters. The home of Swiss precision — risk management, structured finance, and corporate strategy driven from the heart of Europe.",
  },
];

export function Locations() {
  return (
    <section id="locations" className="bg-paper">
      <div className="section-divider" />
      <div className="section-swiss">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <p className="precision-label mb-6">Global presence</p>
            <h2 className="text-[2.25rem] font-light tracking-[-0.02em] text-foreground max-w-[600px] max-md:text-[1.75rem]">
              Three offices. One methodology
              <span className="text-accent">.</span>
            </h2>
          </ScrollReveal>

          <div className="grid-swiss mt-20 max-md:mt-12">
            {locations.map((location, index) => (
              <ScrollReveal
                key={location.city}
                delay={index * 100}
                className="col-span-4 max-md:col-span-4"
              >
                <div className="border-t border-border pt-8 max-md:pt-6">
                  <div className="circle-image mb-8 flex items-center justify-center max-md:mb-6">
                    <div className="text-muted text-xs font-medium tracking-[0.1em] uppercase text-center leading-tight">
                      {location.city
                        .split("")
                        .map((c) => (c === c.toUpperCase() && c !== " " ? c : ""))
                        .join("")
                        .slice(0, 3)}
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-foreground">
                    {location.city}
                    <span className="text-accent">.</span>
                  </h3>
                  <p className="text-xs text-muted mt-1 tracking-[0.06em] uppercase">
                    {location.country}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Address
                      </span>
                      <span className="text-xs text-foreground leading-relaxed">
                        {location.address}
                        <br />
                        {location.district}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Geo
                      </span>
                      <span className="text-xs text-foreground">
                        {location.coordinates}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] text-muted mt-0.5 shrink-0 w-14 tracking-[0.06em] uppercase">
                        Time
                      </span>
                      <span className="text-xs text-foreground">
                        {location.timezone}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted mt-6 max-w-[320px]">
                    {location.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
