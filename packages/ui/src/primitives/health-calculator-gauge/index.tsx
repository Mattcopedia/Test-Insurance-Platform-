'use client'

import * as React from 'react'
import { cn } from '../../cn'

export interface GaugeZone {
  label: string
  color: string
  from: number
  to: number
}

export interface HealthCalculatorGaugeProps {
  value: number
  min: number
  max: number
  zones: GaugeZone[]
  unit?: string
  className?: string
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy - r * Math.sin(rad) }
}

function valueToAngle(v: number, min: number, max: number) {
  const clamped = Math.max(min, Math.min(max, v))
  return 180 - ((clamped - min) / (max - min)) * 180
}

function arcPath(cx: number, cy: number, r: number, fromAngle: number, toAngle: number) {
  const start = polarToXY(cx, cy, r, fromAngle)
  const end = polarToXY(cx, cy, r, toAngle)
  const largeArc = fromAngle - toAngle > 180 ? 1 : 0
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`
}

export function HealthCalculatorGauge({
  value,
  min,
  max,
  zones,
  unit = '',
  className,
}: HealthCalculatorGaugeProps) {
  const cx = 100
  const cy = 100
  const r = 75
  const sw = 20

  const needleAngle = valueToAngle(value, min, max)
  const rotateDeg = 90 - needleAngle

  return (
    <div className={cn('w-full max-w-[300px] mx-auto select-none', className)}>
      <svg viewBox="0 0 200 115" width="100%" aria-label="Health metric gauge">
        <defs>
          {zones.map((zone, i) => {
            const sa = valueToAngle(zone.from, min, max)
            const ea = valueToAngle(zone.to, min, max)
            return <path key={i} id={`lp-${i}`} d={arcPath(cx, cy, r - sw / 2 + 1, sa, ea)} />
          })}
        </defs>

        {/* Background track */}
        <path
          d={arcPath(cx, cy, r, 180, 0)}
          stroke="#e5e7eb"
          strokeWidth={sw}
          fill="none"
          strokeLinecap="butt"
        />

        {/* Colored zone arcs */}
        {zones.map((zone, i) => {
          const sa = valueToAngle(zone.from, min, max)
          const ea = valueToAngle(zone.to, min, max)
          return (
            <path
              key={i}
              d={arcPath(cx, cy, r, sa, ea)}
              stroke={zone.color}
              strokeWidth={sw}
              fill="none"
              strokeLinecap="butt"
            />
          )
        })}

        {/* Zone labels following arc curves */}
        {zones.map((zone, i) => (
          <text
            key={i}
            fontSize="6"
            fill="white"
            fontWeight="600"
            fontFamily="system-ui, sans-serif"
          >
            <textPath href={`#lp-${i}`} startOffset="50%" textAnchor="middle">
              {zone.label}
            </textPath>
          </text>
        ))}

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - 60}
          stroke="#1e3a5f"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${rotateDeg}deg)`,
            transition: 'transform 0.6s ease-out',
          }}
        />
        <circle cx={cx} cy={cy} r="7" fill="#1e3a5f" />
        <circle cx={cx} cy={cy} r="3" fill="white" />

        {/* Min / Max labels */}
        <text
          x="20"
          y="113"
          textAnchor="middle"
          fontSize="8"
          fill="#9ca3af"
          fontFamily="system-ui, sans-serif"
        >
          {min}
          {unit}
        </text>
        <text
          x="180"
          y="113"
          textAnchor="middle"
          fontSize="8"
          fill="#9ca3af"
          fontFamily="system-ui, sans-serif"
        >
          {max}
          {unit}
        </text>
      </svg>
    </div>
  )
}
