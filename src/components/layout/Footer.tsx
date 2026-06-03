export default function Footer() {
  return (
    <footer className="bg-deep border-t border-gold-300/10">
      {/* Top ornate divider */}
      <div className="max-w-3xl mx-auto px-6 pt-16">
        <div className="ornate-divider" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Symmetrical layout */}
        <div className="flex flex-col items-center text-center">
          {/* Central logo */}
          <div className="mb-10">
            <div className="font-display text-2xl tracking-[0.25em] text-gold-300">
              TWENTY<span className="text-xl text-champagne/80 font-light">1</span>GLOBAL
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold-300/30" />
              <span className="text-gold-300/50 text-xs tracking-[0.3em] uppercase font-light">
                Trading LLC
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold-300/30" />
            </div>
          </div>

          {/* Three-column info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl mb-12">
            {/* UAE */}
            <div className="text-center">
              <div className="diamond-marker mx-auto mb-4" />
              <h4 className="font-display text-gold-300 text-sm tracking-[0.15em] uppercase mb-3">
                Dubai
              </h4>
              <p className="text-champagne/50 text-xs leading-relaxed tracking-wider">
                Emirates Financial Towers
                <br />
                DIFC, Dubai, UAE
              </p>
            </div>

            {/* Singapore */}
            <div className="text-center">
              <div className="diamond-marker mx-auto mb-4" />
              <h4 className="font-display text-gold-300 text-sm tracking-[0.15em] uppercase mb-3">
                Singapore
              </h4>
              <p className="text-champagne/50 text-xs leading-relaxed tracking-wider">
                Marina Bay Financial Centre
                <br />
                Central Business District
              </p>
            </div>

            {/* Switzerland */}
            <div className="text-center">
              <div className="diamond-marker mx-auto mb-4" />
              <h4 className="font-display text-gold-300 text-sm tracking-[0.15em] uppercase mb-3">
                Geneva
              </h4>
              <p className="text-champagne/50 text-xs leading-relaxed tracking-wider">
                Rue du Rhône
                <br />
                Geneva, Switzerland
              </p>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="w-full max-w-2xl mb-8">
            <div className="flex items-center gap-4">
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300/20 to-transparent" />
              <span className="diamond-marker w-[5px] h-[5px]" />
              <span className="flex-1 h-px bg-gradient-to-r from-transparent via-gold-300/20 to-transparent" />
            </div>
          </div>

          {/* Copyright */}
          <p className="text-champagne/30 text-[11px] tracking-[0.2em] uppercase">
            &copy; {new Date().getFullYear()} Twenty1Global Trading LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
