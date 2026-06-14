'use client'

import dynamic from 'next/dynamic'
import { cn } from '@wrapa/ui'

// Dynamically imported with ssr:false so mapbox-gl never runs on the server.
// mapbox-gl v3 accesses window/document/navigator at module-init time; importing
// it during SSR produces a different DOM structure → hydration mismatch.
const ContactMapCanvas = dynamic(() => import('./contact-map-canvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#e8ecf0] animate-pulse" />,
})

const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

export function ContactMap() {
  return (
    <section className="bg-white pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1800px] px-6 lg:px-16">
        <div
          className={cn(
            'relative w-full h-[280px] sm:h-[380px] lg:h-[480px]',
            'rounded-[20px] overflow-hidden'
          )}
        >
          {!token ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#e8ecf0]">
              <p className="text-sm text-slate-500">
                Map unavailable — NEXT_PUBLIC_MAPBOX_TOKEN is not configured.
              </p>
            </div>
          ) : (
            <ContactMapCanvas token={token} />
          )}
        </div>
      </div>
    </section>
  )
}
