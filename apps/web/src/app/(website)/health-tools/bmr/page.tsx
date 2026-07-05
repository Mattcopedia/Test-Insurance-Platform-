'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HealthCalculatorCard,
  HealthGenderToggle,
  HealthHeightInput,
  HealthCalculatorGauge,
  TextField,
  Button,
} from '@wrapa/ui'
import {
  CalculatorPageShell,
  CalculateButton,
  ActivitySelect,
  ACTIVITY_MULTIPLIERS,
  heightToCm,
} from '../components/calculator-page-shell'

const BMR_ZONES = [
  { label: '< 1200', color: '#eab308', from: 0, to: 1200 },
  { label: '1200–1800', color: '#22c55e', from: 1200, to: 1800 },
  { label: '1800–2500', color: '#f97316', from: 1800, to: 2500 },
  { label: '> 2500', color: '#ef4444', from: 2500, to: 4000 },
]

function mifflinBmr(gender: 'male' | 'female', w: number, h: number, a: number) {
  const base = 10 * w + 6.25 * h - 5 * a
  return gender === 'male' ? base + 5 : base - 161
}

export default function BmrPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [cm, setCm] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('')
  const [result, setResult] = useState<{ bmr: number; tdee: number } | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const heightCm = heightUnit === 'metric' ? parseFloat(cm) : heightToCm(feet, inches)
    const w = parseFloat(weight)
    const a = parseFloat(age)
    const mult = ACTIVITY_MULTIPLIERS[activity] ?? 1.2
    if (!heightCm || !w || !a) return
    const bmr = Math.round(mifflinBmr(gender, w, heightCm, a))
    setResult({ bmr, tdee: Math.round(bmr * mult) })
  }

  const leftContent = (
    <HealthCalculatorCard title="Calculate your BMR">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <HealthGenderToggle value={gender} onChange={setGender} />
        <TextField
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min={1}
          max={120}
        />
        <HealthHeightInput
          feet={feet}
          inches={inches}
          cm={cm}
          unit={heightUnit}
          onFeetChange={setFeet}
          onInchesChange={setInches}
          onCmChange={setCm}
          onUnitToggle={() => setHeightUnit((u) => (u === 'imperial' ? 'metric' : 'imperial'))}
        />
        <TextField
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min={1}
        />
        <ActivitySelect value={activity} onChange={setActivity} />
        <CalculateButton />
      </form>

      {result && (
        <div className="mt-5 flex flex-col gap-3">
          <div className="p-4 rounded-[10px] bg-[#f0faf4] border border-[#22c55e]/30">
            <p className="text-[13px] text-black/50 mb-0.5">Your BMR is</p>
            <p className="text-[26px] font-bold text-[#166534]">
              {result.bmr.toLocaleString()} cal/day
            </p>
          </div>
          <div className="p-4 rounded-[10px] bg-[#eef3fc] border border-[#1a56db]/20">
            <p className="text-[13px] text-black/50 mb-0.5">Daily needs with activity</p>
            <p className="text-[22px] font-bold text-[#1a237e]">
              {result.tdee.toLocaleString()} cal/day
            </p>
          </div>
          {/* Pro tip */}
          <div className="p-4 rounded-[10px] bg-[#fffbeb] border border-[#f97316]/20">
            <p className="text-[12px] font-bold text-black/60 mb-2">💡 Pro tip</p>
            <ul className="text-[13px] text-black/60 space-y-1 list-disc pl-4">
              <li>Max benefits with full insurance cover</li>
              <li>Stay active, pay less for insurance</li>
              <li>Earn wellness rewards on your plan</li>
            </ul>
          </div>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = (
    <div className="flex flex-col items-center gap-4 w-full">
      <HealthCalculatorGauge
        value={result?.bmr ?? 0}
        min={0}
        max={4000}
        zones={BMR_ZONES}
        unit=" cal"
      />
      {result && (
        <div className="text-center">
          <p className="text-[28px] font-bold text-[#1a237e]">{result.bmr.toLocaleString()}</p>
          <p className="text-[13px] text-black/50">cal/day (BMR)</p>
        </div>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">What is BMR?</h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          The Basal Metabolic Rate (BMR) is the number of calories your body requires to maintain
          its basic functions while at rest. It&apos;s the minimum calories needed to keep your
          heart beating, lungs breathing, and body temperature regulated.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[13px] text-[#1a237e] space-y-1">
          <p>Male: (10 × weight) + (6.25 × height) − (5 × age) + 5</p>
          <p>Female: (10 × weight) + (6.25 × height) − (5 × age) − 161</p>
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
        { label: 'BMR Calculator' },
      ]}
      title="BMR Calculator"
      description="The basal metabolic rate (BMR) calculator determines the number of calories your body requires to maintain its basic functions while at rest. BMR is a crucial physiological measure that indicates the minimum calories needed for your body to operate effectively."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
