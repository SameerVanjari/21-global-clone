"use client";

const DOTS = [
  { label: "Opening", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Global", href: "#locations" },
  { label: "Contact", href: "#contact" },
];

export default function DotNav() {
  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden lg:flex fixed right-10 top-1/2 -translate-y-1/2 z-[900] flex-col gap-6">
      {DOTS.map((dot) => (
        <a
          key={dot.href}
          href={dot.href}
          onClick={(e) => handleClick(e, dot.href)}
          className="group relative flex items-center"
        >
          <span className="block w-[5px] h-[5px] rounded-full bg-[var(--color-ink)]/15 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[var(--color-ink)] group-hover:scale-150" />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 pointer-events-none whitespace-nowrap font-[family-name:var(--font-dm-sans)] text-[0.6rem] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
            {dot.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
