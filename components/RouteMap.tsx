export function RouteMap() {
  return (
    <div className="relative w-full max-w-2xl mx-auto rounded-2xl bg-dark-block p-6 sm:p-8 shadow-lift overflow-hidden border border-gold/30">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-strong via-brand to-brand-strong opacity-80 pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="eyebrow text-gold-deep">Sourcing international & Logistique</span>
          <span className="font-mono text-xs text-gold-deep/80">Almería → Oran → Alger</span>
        </div>

        {/* Original SVG Route Map (Spain to Algeria) */}
        <div className="relative aspect-[2/1] w-full flex items-center justify-center">
          <svg viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="routeGrad" x1="0" y1="120" x2="500" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#B8962E" />
                <stop offset="50%" stopColor="#E3C766" />
                <stop offset="100%" stopColor="#8A6E1E" />
              </linearGradient>
            </defs>

            {/* Stylized Landmasses (Spain top, Mediterranean sea center, Algeria bottom) */}
            {/* Spain / Europe North */}
            <path d="M50 20 H350 C400 20 450 40 480 60 C420 80 350 70 300 80 C200 100 120 70 50 80 Z" fill="#B8962E" opacity="0.35" stroke="#B8962E" strokeWidth="0.8" />
            <text x="180" y="55" fill="#6E561A" fontSize="12" fontFamily="monospace" opacity="0.8">ESPAGNE</text>

            {/* Mediterranean Sea separator line / waves */}
            <path d="M50 110 Q 250 130 480 110" stroke="#B8962E" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

            {/* Algeria / North Africa South */}
            <path d="M50 170 C150 160 250 180 350 160 C420 150 460 200 480 220 H50 Z" fill="#B8962E" opacity="0.45" stroke="#B8962E" strokeWidth="0.8" />
            <text x="220" y="200" fill="#6E561A" fontSize="12" fontFamily="monospace" opacity="0.8">ALGÉRIE</text>

            {/* Almería Pin (Spain) */}
            <circle cx="160" cy="75" r="5" fill="#B8962E" />
            <circle cx="160" cy="75" r="10" stroke="#E3C766" strokeWidth="1" className="animate-ping" opacity="0.6" />
            <text x="135" y="65" fill="#1B1F1D" fontSize="11" fontWeight="600" fontFamily="monospace">Almería</text>

            {/* Oran Pin */}
            <circle cx="210" cy="145" r="4" fill="#6E561A" />
            <text x="185" y="165" fill="#1B1F1D" fontSize="11" fontWeight="600" fontFamily="monospace">Oran</text>

            {/* Alger Pin */}
            <circle cx="340" cy="135" r="5" fill="#8A6E1E" />
            <text x="325" y="160" fill="#1B1F1D" fontSize="11" fontWeight="600" fontFamily="monospace">Alger</text>

            {/* Animated Dashed Route (Almería -> Oran -> Alger) */}
            <path
              d="M160 75 Q 185 110 210 145 T 340 135"
              stroke="url(#routeGrad)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="animate-[dash_3s_linear_infinite]"
            />

            {/* Moving glowing packet dot along route */}
            <circle r="4" fill="#6E561A">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M160 75 Q 185 110 210 145 T 340 135"
              />
            </circle>
          </svg>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#1B1F1D]/80 font-mono border-t border-gold/20">
          <div>📍 Sourcing direct Almería</div>
          <div>🚢 Traversée maritime sécurisée</div>
          <div>📦 Livraison à domicile (Wilaya)</div>
        </div>
      </div>
    </div>
  );
}