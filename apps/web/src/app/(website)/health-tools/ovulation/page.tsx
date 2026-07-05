'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HealthCalculatorCard, Button, cn } from '@wrapa/ui'
import { CalculatorPageShell, CalculateButton } from '../components/calculator-page-shell'

const CYCLE_OPTIONS = Array.from({ length: 25 }, (_, i) => i + 21)

interface OvulationResult {
  ovulationStart: Date
  ovulationEnd: Date
  ovulationDate: Date
  nextCycle: Date
}

function calcOvulation(lastPeriod: Date, cycleLength: number): OvulationResult {
  const ovulationDate = new Date(lastPeriod)
  ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14)

  const ovulationStart = new Date(ovulationDate)
  ovulationStart.setDate(ovulationStart.getDate() - 5)

  const ovulationEnd = new Date(ovulationDate)
  ovulationEnd.setDate(ovulationEnd.getDate() + 1)

  const nextCycle = new Date(lastPeriod)
  nextCycle.setDate(nextCycle.getDate() + cycleLength)

  return { ovulationStart, ovulationEnd, ovulationDate, nextCycle }
}

function formatDate(d: Date) {
  return d.toISOString().split('T')[0]
}

function formatDisplayDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Mini calendar component
function MiniCalendar({
  year,
  month,
  highlightRange,
  accentDate,
}: {
  year: number
  month: number
  highlightRange: [Date, Date] | null
  accentDate: Date | null
}) {
  const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  function isInRange(day: number) {
    if (!highlightRange) return false
    const d = new Date(year, month, day)
    return d >= highlightRange[0] && d <= highlightRange[1]
  }

  function isAccent(day: number) {
    if (!accentDate) return false
    const d = new Date(year, month, day)
    return d.toDateString() === accentDate.toDateString()
  }

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]
  while (cells.length % 7 !== 0) cells.push(null)

  return (
    <div className="bg-white rounded-[12px] shadow-[0px_2px_16px_rgba(0,0,0,0.08)] p-4 w-full max-w-[280px]">
      <p className="text-[14px] font-bold text-black/80 text-center mb-3">
        {monthNames[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[11px] font-semibold text-black/40 py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {cells.map((day, i) => (
          <div key={i} className="flex items-center justify-center h-8">
            {day && (
              <div
                className={cn(
                  'w-7 h-7 flex items-center justify-center rounded-full text-[12px] font-medium',
                  isAccent(day) && 'bg-[#db2777] text-white font-bold',
                  !isAccent(day) && isInRange(day) && 'bg-[#fce7f3] text-[#9d174d]',
                  !isAccent(day) && !isInRange(day) && 'text-black/70'
                )}
              >
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function OvulationPage() {
  const [lastPeriod, setLastPeriod] = useState('')
  const [cycleLength, setCycleLength] = useState('28')
  const [result, setResult] = useState<OvulationResult | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!lastPeriod || !cycleLength) return
    const d = new Date(lastPeriod)
    const c = parseInt(cycleLength, 10)
    if (isNaN(d.getTime()) || isNaN(c)) return
    setResult(calcOvulation(d, c))
  }

  const leftContent = (
    <HealthCalculatorCard title="Plan your pregnancy with accuracy">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-black/60">
            First day of your last period
          </label>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className={cn(
              'h-[60px] px-4 rounded-[10px] bg-white border-none',
              'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)] ring-1 ring-transparent',
              'focus:outline-none focus:ring-black/20',
              'font-sans text-[15px] text-black/75'
            )}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-black/60">
            How long is your average cycle?
          </label>
          <div className="relative">
            <select
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className={cn(
                'w-full h-[60px] pl-4 pr-10 rounded-[10px] bg-white border-none',
                'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)] ring-1 ring-transparent',
                'focus:outline-none focus:ring-black/20',
                'font-sans text-[15px] text-black/75 appearance-none'
              )}
            >
              {CYCLE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} Days
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <CalculateButton />
      </form>

      {result && (
        <div className="mt-5 flex flex-col gap-3">
          {[
            {
              icon: '🌸',
              label: 'Ovulation Period',
              value: `${formatDisplayDate(result.ovulationStart)} – ${formatDisplayDate(result.ovulationEnd)}`,
            },
            {
              icon: '📅',
              label: 'Approximate Ovulation Date',
              value: formatDisplayDate(result.ovulationDate),
            },
            {
              icon: '🩸',
              label: 'Next Menstrual Cycle',
              value: formatDisplayDate(result.nextCycle),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 p-3 rounded-[10px] bg-[#fdf2f8] border border-[#db2777]/15"
            >
              <span className="text-[20px]">{item.icon}</span>
              <div>
                <p className="text-[12px] text-black/45">{item.label}</p>
                <p className="text-[14px] font-bold text-black/80">{item.value}</p>
              </div>
              <Link
                href="#"
                className="ml-auto text-[12px] text-[#db2777] underline underline-offset-2"
              >
                Know more
              </Link>
            </div>
          ))}
        </div>
      )}
    </HealthCalculatorCard>
  )

  const calendarYear = result ? result.ovulationDate.getFullYear() : new Date().getFullYear()
  const calendarMonth = result ? result.ovulationDate.getMonth() : new Date().getMonth()

  const rightContent = (
    <div className="flex flex-col items-center gap-4 w-full">
      {result ? (
        <>
          <div className="bg-[#fdf2f8] rounded-[12px] p-4 w-full max-w-[280px]">
            <p className="text-[13px] font-bold text-[#9d174d] text-center mb-3">
              Your ovulation window
            </p>
            {/* Fertility bar */}
            <div className="flex items-center justify-center gap-1 mb-4">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full border-2',
                      i < 5 ? 'bg-[#db2777] border-[#9d174d]' : 'border-[#db2777]'
                    )}
                  />
                  <div className="w-[2px] h-3 bg-[#9d174d]" />
                </div>
              ))}
            </div>
          </div>
          <MiniCalendar
            year={calendarYear}
            month={calendarMonth}
            highlightRange={[result.ovulationStart, result.ovulationEnd]}
            accentDate={result.ovulationDate}
          />
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center text-black/40 py-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <p className="text-[14px]">Enter your period date to see your fertility window</p>
        </div>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is an Ovulation Calculator?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          Knowing when you ovulate is key to planning or preventing pregnancy. Since the exact day
          can vary each month, this calculator uses your last period date and cycle length to
          predict your fertile window. Simple and science-backed, it helps you understand your cycle
          and improve your chances of conceiving.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[13px] text-[#1a237e] space-y-1">
          <p>Ovulation = First day of period + (Cycle length − 14)</p>
          <p>Fertile window = Ovulation day − 5 to Ovulation day + 1</p>
        </div>
      </div>
      <div className="flex">
        <Button asChild size="md">
          <Link href="/marketplace">Find the Right Plan Today →</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <CalculatorPageShell
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Health Wellness' },
        { label: 'Fitness Calculators' },
        { label: 'Ovulation Calculator' },
      ]}
      title="Ovulation Calculator"
      description="Knowing when you ovulate is key to planning or preventing pregnancy. Since the exact day can vary each month, this calculator uses your last period date and cycle length to predict your fertile window."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
