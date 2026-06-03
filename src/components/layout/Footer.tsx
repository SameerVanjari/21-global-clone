export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="section-divider" />

      <div className="max-w-[1440px] mx-auto px-16 py-20 max-md:px-6 max-md:py-12">
        <div className="grid-swiss">
          <div className="col-span-4 max-md:col-span-4">
            <p className="text-sm font-medium tracking-[0.15em] uppercase text-foreground mb-6">
              Twenty1Global
            </p>
            <p className="text-xs leading-relaxed text-muted max-w-[280px]">
              Global commodities trading with mathematical precision. Operating
              across UAE, Singapore, and Switzerland.
            </p>
          </div>

          <div className="col-span-2 max-md:col-span-2">
            <p className="precision-label mb-5">Offices</p>
            <ul className="space-y-3">
              <li className="text-xs leading-relaxed text-muted">
                <span className="block text-foreground font-medium">Dubai</span>
                DMCC, Almas Tower
              </li>
              <li className="text-xs leading-relaxed text-muted">
                <span className="block text-foreground font-medium">
                  Singapore
                </span>
                Raffles Place
              </li>
              <li className="text-xs leading-relaxed text-muted">
                <span className="block text-foreground font-medium">Zug</span>
                Baarerstrasse
              </li>
            </ul>
          </div>

          <div className="col-span-2 max-md:col-span-2">
            <p className="precision-label mb-5">Trading</p>
            <ul className="space-y-3">
              <li className="text-xs text-muted">Crude Oil</li>
              <li className="text-xs text-muted">LNG</li>
              <li className="text-xs text-muted">Metals</li>
              <li className="text-xs text-muted">Agri-Commodities</li>
            </ul>
          </div>

          <div className="col-span-2 max-md:col-span-2">
            <p className="precision-label mb-5">Legal</p>
            <ul className="space-y-3">
              <li className="text-xs text-muted">
                © {new Date().getFullYear()}
              </li>
              <li className="text-xs text-muted">Privacy Policy</li>
              <li className="text-xs text-muted">Terms of Trade</li>
            </ul>
          </div>

          <div className="col-span-2 max-md:col-span-2">
            <p className="precision-label mb-5">Connect</p>
            <ul className="space-y-3">
              <li className="text-xs text-muted">info@twenty1global.com</li>
              <li className="text-xs text-muted">+41 41 500 00 00</li>
            </ul>
          </div>
        </div>

        <div className="hr-swiss mt-20 max-md:mt-12" />

        <div className="mt-8 flex justify-between items-center">
          <p className="text-[10px] tracking-[0.12em] uppercase text-muted">
            Swiss precision. Global reach.
          </p>
          <p className="text-[10px] tracking-[0.12em] uppercase text-muted">
            Twenty1Global Trading LLC
          </p>
        </div>
      </div>
    </footer>
  );
}
