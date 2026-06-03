const FOOTER_COLUMNS = [
  {
    title: "TRADING DESK",
    lines: [
      "Commodities Execution",
      "Risk Management",
      "Market Intelligence",
      "Trade Finance",
    ],
  },
  {
    title: "GLOBAL NODES",
    lines: [
      "UAE — Dubai DMCC",
      "Singapore — Raffles Place",
      "Switzerland — Zug",
    ],
  },
  {
    title: "CONTACT",
    lines: [
      "enquiries@twenty1global.com",
      "+971 4 123 4567",
      "+65 6 123 4567",
      "+41 41 123 4567",
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-background border-brutal-thick-t">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {FOOTER_COLUMNS.map((col, ci) => (
            <div
              key={col.title}
              className={`border-brutal p-6 ${
                ci < FOOTER_COLUMNS.length - 1 ? "md:border-brutal-r" : ""
              }`}
            >
              <h4 className="text-eyebrow text-amber mb-6">{`[${col.title}]`}</h4>
              <div className="flex flex-col gap-2">
                {col.lines.map((line, li) => (
                  <span key={li} className="text-caption text-foreground">
                    {line}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="section-divider mt-12 mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-caption text-muted-foreground">
            TWENTY1GLOBAL TRADING LLC &copy; {new Date().getFullYear()}
          </span>
          <span className="text-caption text-muted-foreground">
            <span className="text-amber">[</span>
            SYSTEM STATUS: OPERATIONAL
            <span className="text-amber">]</span>
          </span>
          <span className="text-caption text-muted-foreground">
            <span className="text-amber">//</span> ALL RIGHTS RESERVED
          </span>
        </div>
      </div>
    </footer>
  );
}
