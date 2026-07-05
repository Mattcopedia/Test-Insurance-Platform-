'use client'

import 'mapbox-gl/dist/mapbox-gl.css'
import { Map, Marker } from 'react-map-gl/mapbox'

const OFFICE_LAT = 6.4474
const OFFICE_LNG = 3.4548

interface ContactMapCanvasProps {
  token: string
}

export default function ContactMapCanvas({ token }: ContactMapCanvasProps) {
  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{ longitude: OFFICE_LNG, latitude: OFFICE_LAT, zoom: 14 }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      <Marker longitude={OFFICE_LNG} latitude={OFFICE_LAT} anchor="bottom">
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
              WRAPA HQ, Lagos, Nigeria
            </p>
          </div>
        </div>
      </Marker>
    </Map>
  )
}
