"use client";

import ScrollReveal from "@/components/effects/ScrollReveal";
import { BarChart3, Coins, Wheat, Ship, Scale, Globe } from "lucide-react";

const services = [
  {
    num: "01",
    title: "Energy Commodities",
    description:
      "Strategic trading in crude oil, LNG, and refined petroleum products across global markets with precision timing and deep market intelligence.",
    icon: BarChart3,
  },
  {
    num: "02",
    title: "Metals & Mining",
    description:
      "Precious and industrial metals trading including gold, copper, aluminum, and rare earth elements sourced from premier global suppliers.",
    icon: Coins,
  },
  {
    num: "03",
    title: "Agricultural Products",
    description:
      "Global trade in grains, oilseeds, sugar, and soft commodities connecting producers with premium markets across continents.",
    icon: Wheat,
  },
  {
    num: "04",
    title: "Maritime Logistics",
    description:
      "End-to-end shipping and freight solutions. Chartering, vessel operations, and supply chain orchestration across major trade routes.",
    icon: Ship,
  },
  {
    num: "05",
    title: "Risk Management",
    description:
      "Sophisticated hedging strategies, derivatives trading, and market risk analytics to protect and optimize commodity positions.",
    icon: Scale,
  },
  {
    num: "06",
    title: "Global Market Access",
    description:
      "Gateway to emerging and established markets across the Middle East, Asia-Pacific, and European trading corridors.",
    icon: Globe,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32 scroll-section">
      {/* Background */}
      <div className="absolute inset-0 bg-surface" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <ScrollReveal sparkle>
            <p className="text-gold-300/60 text-xs tracking-[0.4em] uppercase mb-4 font-light">
              Our Expertise
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream tracking-[0.03em] mb-6">
              Trading <span className="italic gold-text-gradient">Mastery</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold-300/40" />
              <span className="diamond-marker w-[5px] h-[5px]" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold-300/40" />
            </div>
          </ScrollReveal>
        </div>

        {/* Stepped/ziggurat card layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold-300/10">
          {services.map((service, i) => (
            <ScrollReveal
              key={service.num}
              delay={0.1 * i}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div className="group relative bg-surface p-8 lg:p-10 transition-all duration-700 hover:bg-navy-50/50">
                {/* Gold left border accent */}
                <div className="absolute left-0 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-gold-300/40 to-transparent group-hover:via-gold-300 transition-all duration-500" />

                {/* Numeral */}
                <div className="absolute top-6 right-6 font-display text-6xl text-gold-300/5 group-hover:text-gold-300/10 transition-all duration-500 select-none">
                  {service.num}
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <service.icon
                    size={28}
                    className="text-gold-300/60 group-hover:text-gold-300 transition-colors duration-500"
                    strokeWidth={1}
                  />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg text-cream tracking-[0.05em] mb-3 group-hover:text-gold-300 transition-colors duration-500">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-champagne/50 text-sm leading-relaxed tracking-wider font-light">
                  {service.description}
                </p>

                {/* Bottom gold accent */}
                <div className="mt-6 h-px w-0 bg-gradient-to-r from-gold-300 to-transparent group-hover:w-full transition-all duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
