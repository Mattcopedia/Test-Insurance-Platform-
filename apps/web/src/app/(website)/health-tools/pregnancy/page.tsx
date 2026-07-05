'use client'

import { useState } from 'react'
import Link from 'next/link'
import { HealthCalculatorCard, Button, cn } from '@wrapa/ui'
import { CalculatorPageShell, CalculateButton } from '../components/calculator-page-shell'

const MILESTONES = [
  { week: 4, label: 'Implantation complete, pregnancy hormone detectable' },
  { week: 8, label: 'Heartbeat detectable, major organs forming' },
  { week: 12, label: 'End of first trimester, risk of miscarriage drops' },
  { week: 16, label: 'Baby can make facial expressions, moves more' },
  { week: 20, label: 'Anatomy scan recommended, halfway point' },
  { week: 24, label: 'Viability milestone reached (24 weeks)' },
  { week: 28, label: 'Third trimester begins, baby opens eyes' },
  { week: 32, label: 'Baby practices breathing movements' },
  { week: 36, label: 'Baby is full term at 37 weeks' },
  { week: 40, label: 'Estimated due date: time to meet your baby!' },
]

function addDays(d: Date, days: number) {
  const r = new Date(d)
  r.setDate(r.getDate() + days)
  return r
}

function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getWeeksAndDays(lmp: Date, today = new Date()) {
  const diff = Math.max(0, today.getTime() - lmp.getTime())
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24))
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 }
}

function getTrimester(weeks: number) {
  if (weeks <= 12) return 1
  if (weeks <= 27) return 2
  return 3
}

export default function PregnancyPage() {
  const [lmp, setLmp] = useState('')
  const [result, setResult] = useState<{
    dueDate: Date
    lmpDate: Date
    currentWeeks: number
    currentDays: number
    trimester: number
    t1Start: Date
    t1End: Date
    t2Start: Date
    t2End: Date
    t3Start: Date
    t3End: Date
  } | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!lmp) return
    const lmpDate = new Date(lmp)
    if (isNaN(lmpDate.getTime())) return
    const dueDate = addDays(lmpDate, 280)
    const { weeks, days } = getWeeksAndDays(lmpDate)
    const trimester = getTrimester(weeks)
    setResult({
      dueDate,
      lmpDate,
      currentWeeks: weeks,
      currentDays: days,
      trimester,
      t1Start: lmpDate,
      t1End: addDays(lmpDate, 12 * 7 - 1),
      t2Start: addDays(lmpDate, 12 * 7),
      t2End: addDays(lmpDate, 27 * 7 - 1),
      t3Start: addDays(lmpDate, 27 * 7),
      t3End: dueDate,
    })
  }

  const leftContent = (
    <HealthCalculatorCard title="Your pregnancy journey">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-black/60">
            First day of last menstrual period
          </label>
          <input
            type="date"
            value={lmp}
            onChange={(e) => setLmp(e.target.value)}
            className={cn(
              'h-[60px] px-4 rounded-[10px] bg-white border-none',
              'shadow-[0px_4px_160px_0px_rgba(0,0,0,0.10)] ring-1 ring-transparent',
              'focus:outline-none focus:ring-black/20',
              'font-sans text-[15px] text-black/75'
            )}
          />
        </div>
        <CalculateButton />
      </form>

      {result && (
        <div className="mt-5 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <ResultRow icon="👶" label="Due date is" value={formatDate(result.dueDate)} />
            <ResultRow
              icon="🤰"
              label="Gestational age"
              value={`${result.currentWeeks} weeks & ${result.currentDays} days`}
            />
          </div>

          <div>
            <p className="text-[13px] font-bold text-black/60 mb-3">Your pregnancy milestones</p>
            {/* Progress bar */}
            <div className="relative h-2 bg-[#e5e7eb] rounded-full mb-4 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#db2777] rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (result.currentWeeks / 40) * 100)}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-[12px]">
              {[
                { n: '1st trimester', start: result.t1Start, end: result.t1End },
                { n: '2nd trimester', start: result.t2Start, end: result.t2End },
                { n: '3rd trimester', start: result.t3Start, end: result.t3End },
              ].map((t) => (
                <div key={t.n} className="bg-[#fdf2f8] rounded-[8px] p-2">
                  <p className="font-semibold text-[#9d174d] mb-0.5">{t.n}</p>
                  <p className="text-black/50">
                    {formatDate(t.start).split(',')[0]} to {formatDate(t.end).split(',')[0]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-[10px] bg-[#fdf2f8] border border-[#db2777]/15">
            <p className="text-[13px] font-bold text-[#9d174d] mb-1">
              Secure Your Pregnancy Journey
            </p>
            <p className="text-[12px] text-black/55 mb-3">
              Get The Right Maternity Cover Before Your Due Date!
            </p>
            <Button asChild size="sm" fullWidth={false}>
              <Link href="/marketplace/health-insurance">View plans →</Link>
            </Button>
          </div>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = result ? (
    <div className="flex flex-col gap-4 w-full max-w-[340px]">
      <div className="bg-white rounded-[12px] shadow-[0px_2px_16px_rgba(0,0,0,0.08)] p-5">
        <p className="text-[13px] font-bold text-black/60 mb-4">Week-by-week milestones</p>
        <div className="flex flex-col gap-3 max-h-[380px] overflow-y-auto pr-1">
          {MILESTONES.map((m) => {
            const passed = result.currentWeeks >= m.week
            return (
              <div key={m.week} className="flex items-start gap-3">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0',
                    passed ? 'bg-[#db2777] text-white' : 'bg-[#f3f4f6] text-black/40'
                  )}
                >
                  {m.week}w
                </div>
                <p
                  className={cn(
                    'text-[12px] leading-relaxed pt-1',
                    passed ? 'text-black/70' : 'text-black/35'
                  )}
                >
                  {m.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-3 text-center text-black/40 py-8">
      <svg
        width="56"
        height="56"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
      </svg>
      <p className="text-[14px]">Enter your last period date to see your pregnancy journey</p>
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is a Pregnancy Calculator?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          A pregnancy calculator helps you estimate your due date and track your journey week by
          week. By entering your last menstrual period, you can get personalised insights into your
          current pregnancy week, trimester stages, and upcoming prenatal milestones.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[13px] text-[#1a237e]">
          Due date = LMP + 280 days (Naegele&apos;s rule)
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
        { label: 'Pregnancy Calculator' },
      ]}
      title="Pregnancy Calculator"
      description="A pregnancy calculator helps you estimate your due date and track your journey week by week. By entering your last menstrual period, conception date, or IVF transfer date, you can get personalised insights into your current pregnancy week, trimester stages, and upcoming prenatal milestones."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}

function ResultRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-[10px] bg-[#f8f9fb]">
      <span className="text-[24px]">{icon}</span>
      <div>
        <p className="text-[12px] text-black/45">{label}</p>
        <p className="text-[15px] font-bold text-black/85">{value}</p>
      </div>
    </div>
  )
}
