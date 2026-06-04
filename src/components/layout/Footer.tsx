export default function Footer() {
  return (
    <footer className="section-padding pb-12 pt-0">
      <div className="rule mb-12" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">
        <div className="md:col-span-4">
          <p className="font-[family-name:var(--font-dm-sans)] text-[0.95rem] font-light tracking-[0.15em] uppercase text-[var(--color-ink)] mb-4">
            Twenty<span className="font-extralight opacity-50">1</span>Global
          </p>
          <p className="text-caption text-[var(--color-ink-muted)] max-w-[280px]">
            A dynamic international trading company operating across the UAE,
            Singapore, and Switzerland.
          </p>
        </div>

        <div className="md:col-span-2">
          <p className="text-caption text-[var(--color-ink)] mb-4">Sectors</p>
          <ul className="space-y-2">
            {["Commodities", "FMCG", "Downstream Oil", "Logistics"].map(
              (item) => (
                <li key={item}>
                  <span className="text-body-sm text-[var(--color-ink-muted)] font-[family-name:var(--font-lora)]">
                    {item}
                  </span>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="text-caption text-[var(--color-ink)] mb-4">Offices</p>
          <ul className="space-y-2">
            {["Dubai, UAE", "Singapore", "Geneva, CH"].map((item) => (
              <li key={item}>
                <span className="text-body-sm text-[var(--color-ink-muted)] font-[family-name:var(--font-lora)]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-caption text-[var(--color-ink)] mb-4">
            Correspondence
          </p>
          <p className="text-body-sm text-[var(--color-ink-muted)] font-[family-name:var(--font-lora)] leading-relaxed mb-1">
            enquiries@twenty1global.com
          </p>
          <p className="text-body-sm text-[var(--color-ink-muted)] font-[family-name:var(--font-lora)] leading-relaxed">
            +971 4 123 4567
          </p>
        </div>
      </div>

      <div className="rule mt-12 mb-6" />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-caption text-[var(--color-ink-muted)]/60">
          &copy; {new Date().getFullYear()} Twenty1Global Trading LLC. All
          rights reserved.
        </p>
        <p className="text-caption text-[var(--color-ink-muted)]/60">
          Dubai &middot; Singapore &middot; Geneva
        </p>
      </div>
    </footer>
  );
}
