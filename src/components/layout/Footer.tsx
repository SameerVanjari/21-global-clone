"use client";

import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Markets",
    links: [
      { label: "Crude Oil", href: "#" },
      { label: "Natural Gas", href: "#" },
      { label: "Precious Metals", href: "#" },
      { label: "Agriculture", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Services", href: "#services" },
      { label: "Global Offices", href: "#locations" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Trade", href: "#" },
      { label: "Compliance", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Risk Disclosure", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#06060b] border-t overflow-hidden" style={{ borderColor: "rgba(0, 240, 255, 0.1)" }}>
      <div className="absolute inset-0 grid-overlay pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1">
            <Link
              href="#hero"
              className="text-lg tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
            >
              <span className="text-[#00f0ff]">Twenty1</span>
              <span className="text-[#e0e8ff]">Global</span>
            </Link>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
            >
              Elite commodities trading for the next century. UAE · Singapore · Switzerland.
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ color: "#00f0ff", textShadow: "0 0 8px rgba(0, 240, 255, 0.3)" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-[#00f0ff]"
                      style={{ color: "#667799" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="hr-glow mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs tracking-wider"
            style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
          >
            SYS.TWENTY1GLOBAL_V3.7 // UPTIME:{" "}
            <span style={{ color: "#00f0ff" }}>99.997%</span>
          </p>
          <p
            className="text-xs tracking-wider"
            style={{ color: "#667799", fontFamily: "var(--font-mono)" }}
          >
            &copy; {new Date().getFullYear()} Twenty1Global Trading LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
