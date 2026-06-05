export function ContactMap() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        {/* Map placeholder — dimensions match typical Figma map embed */}
        <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[480px] rounded-[20px] overflow-hidden bg-[#e8ecf0]">
          {/* Grid overlay to suggest a map */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <defs>
              <pattern
                id="map-grid"
                x="0"
                y="0"
                width="48"
                height="48"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#334155" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#map-grid)" />
          </svg>

          {/* Road lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <line x1="0" y1="45%" x2="100%" y2="42%" stroke="#94a3b8" strokeWidth="3" />
            <line x1="0" y1="65%" x2="100%" y2="60%" stroke="#94a3b8" strokeWidth="2" />
            <line x1="28%" y1="0" x2="30%" y2="100%" stroke="#94a3b8" strokeWidth="3" />
            <line x1="62%" y1="0" x2="65%" y2="100%" stroke="#94a3b8" strokeWidth="2" />
          </svg>

          {/* Pin marker */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="size-[52px] lg:size-[64px] rounded-full bg-[#990505] flex items-center justify-center shadow-[0px_8px_32px_0px_rgba(153,5,5,0.4)]">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="bg-white rounded-[10px] px-4 py-2 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.12)]">
                <p className="font-bold text-[14px] lg:text-[16px] text-black/80 whitespace-nowrap">
                  WRAPA HQ — Nairobi, Kenya
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
