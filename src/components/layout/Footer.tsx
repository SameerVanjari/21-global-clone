import Link from "next/link";
import { cn } from "@/lib/utils";

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Services", href: "#services" },
      { label: "Global Reach", href: "#locations" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Dubai, UAE", href: "#locations" },
      { label: "Singapore", href: "#locations" },
      { label: "Geneva, Switzerland", href: "#locations" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bark text-cream">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sage"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-terracotta"
          style={{ borderRadius: "40% 60% 70% 30% / 30% 60% 40% 70%" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-light/20">
                <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-terracotta-light">
                  21
                </span>
              </span>
              <span className="font-[family-name:var(--font-display)] text-xl font-medium text-cream">
                Twenty1Global
              </span>
            </div>
            <p className="max-w-xs font-[family-name:var(--font-body)] text-sm leading-relaxed text-sand">
              Connecting markets across continents. Rooted in trust. Growing
              worldwide.
            </p>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 font-[family-name:var(--font-display)] text-base font-medium text-cream">
                {section.title}
              </h4>
              <div className="mb-3 h-px w-10 bg-sage/40" />
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-[family-name:var(--font-body)] text-sm text-sand transition-colors duration-300 hover:text-terracotta-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-clay/30 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="font-[family-name:var(--font-body)] text-xs text-sand/60">
              &copy; {new Date().getFullYear()} Twenty1Global Trading LLC. All
              rights reserved.
            </p>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-3 w-3 rounded-full",
                    i === 0 && "bg-terracotta/60",
                    i === 1 && "bg-sage/60",
                    i === 2 && "bg-sand/40"
                  )}
                  style={{
                    borderRadius:
                      i === 0
                        ? "50% 50% 45% 55% / 48% 52% 50% 50%"
                        : i === 1
                          ? "55% 45% 50% 50% / 50% 50% 48% 52%"
                          : "48% 52% 55% 45% / 52% 48% 50% 50%",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
