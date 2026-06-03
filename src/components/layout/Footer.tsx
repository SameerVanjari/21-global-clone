import ScrollReveal from "@/components/effects/ScrollReveal";

const OFFICES = [
  {
    city: "Dubai",
    country: "UAE",
    address: "Level 14, Burj Daman\nDIFC, Dubai",
  },
  {
    city: "Singapore",
    country: "Singapore",
    address: "8 Marina Boulevard\nMarina Bay Financial Centre",
  },
  {
    city: "Zug",
    country: "Switzerland",
    address: "Bahnhofstrasse 21\n6300 Zug",
  },
];

export default function Footer() {
  return (
    <footer className="section-dark py-24 md:py-32 px-8 md:px-16" id="footer">
      <div className="max-w-[1600px] mx-auto">
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 md:gap-32">
            <div>
              <h2 className="text-lg font-light tracking-[0.4em] uppercase text-[#f5f2ed]/80 mb-8">
                Twenty1Global
              </h2>
              <p className="text-sm font-light leading-relaxed text-[#f5f2ed]/50 max-w-sm">
                A global commodities trading company built on trust and executed
                with precision. Operating across three continents from our
                offices in Dubai, Singapore, and Switzerland.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-light tracking-[0.3em] uppercase text-[#f5f2ed]/50 mb-8">
                Offices
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {OFFICES.map((office) => (
                  <div key={office.city}>
                    <p className="text-sm font-light tracking-[0.15em] uppercase text-[#f5f2ed]/70 mb-2">
                      {office.city}
                    </p>
                    <p className="text-xs font-extralight tracking-[0.1em] uppercase text-[#f5f2ed]/40 mb-1">
                      {office.country}
                    </p>
                    <p className="text-xs font-extralight leading-relaxed text-[#f5f2ed]/30 whitespace-pre-line">
                      {office.address}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mt-24 md:mt-32 pt-8">
            <p className="text-[10px] font-extralight tracking-[0.3em] uppercase text-[#f5f2ed]/20">
              &copy; {new Date().getFullYear()} Twenty1Global Trading LLC. All
              rights reserved.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
