'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  HealthCalculatorCard,
  HealthGenderToggle,
  HealthHeightInput,
  TextField,
  Button,
} from '@wrapa/ui'
import {
  CalculatorPageShell,
  CalculateButton,
  heightToCm,
} from '../components/calculator-page-shell'

function devineIdealWeight(gender: 'male' | 'female', heightCm: number) {
  const heightIn = heightCm / 2.54
  const extraInches = Math.max(0, heightIn - 60)
  const base = gender === 'male' ? 50 : 45.5
  return base + 2.3 * extraInches
}

export default function IdealWeightPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [cm, setCm] = useState('')
  const [result, setResult] = useState<{ min: number; max: number } | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const heightCm = heightUnit === 'metric' ? parseFloat(cm) : heightToCm(feet, inches)
    if (!heightCm) return
    const ideal = devineIdealWeight(gender, heightCm)
    setResult({ min: parseFloat((ideal - 5).toFixed(1)), max: parseFloat((ideal + 5).toFixed(1)) })
  }

  const leftContent = (
    <HealthCalculatorCard title="Calculate your Ideal body weight">
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
        <CalculateButton />
      </form>

      {result && (
        <div className="mt-5 p-4 rounded-[10px] bg-[#f0faf4] border border-[#22c55e]/30">
          <p className="text-[13px] text-black/50 mb-1">Your ideal weight range</p>
          <p className="text-[28px] font-bold text-[#166534]">
            {result.min} – {result.max} kg
          </p>
          <p className="text-[13px] text-black/50 mt-2">
            Based on the Devine formula for {gender === 'male' ? 'males' : 'females'}
          </p>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = (
    <div className="flex flex-col items-center gap-4">
      {/* Weighing scale display */}
      <div className="relative w-[220px] h-[220px] flex items-center justify-center">
        <svg viewBox="0 0 200 200" width="200" height="200" aria-hidden>
          {/* Scale base */}
          <ellipse cx="100" cy="170" rx="70" ry="14" fill="#e5e7eb" />
          <rect x="60" y="100" width="80" height="70" rx="8" fill="#f3f4f6" />
          {/* Scale face */}
          <rect
            x="40"
            y="50"
            width="120"
            height="90"
            rx="12"
            fill="white"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          {/* Display */}
          <rect x="55" y="65" width="90" height="50" rx="6" fill="#1a237e" />
          <text
            x="100"
            y="97"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontWeight="bold"
            fontFamily="system-ui, sans-serif"
          >
            {result ? `${result.min}` : '0'} kg
          </text>
          {/* Feet illustration */}
          <ellipse cx="80" cy="182" rx="15" ry="8" fill="#fbbf24" opacity="0.7" />
          <ellipse cx="120" cy="182" rx="15" ry="8" fill="#fbbf24" opacity="0.7" />
        </svg>
      </div>
      {result && (
        <div className="text-center">
          <p className="text-[13px] text-black/50">Ideal range</p>
          <p className="text-[22px] font-bold text-[#166534]">
            {result.min}–{result.max} kg
          </p>
        </div>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is Ideal Weight?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          Ideal weight calculators determine your ideal body weight based on your height, age, and
          gender. It helps you recognise a healthy target weight for your body, allowing you to
          boost your overall well-being and reduce potential health risks.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[14px] text-[#1a237e]">
          <p>Male: 50 + 2.3 × (height in inches − 60)</p>
          <p>Female: 45.5 + 2.3 × (height in inches − 60)</p>
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
        { label: 'Ideal Weight Calculator' },
      ]}
      title="Ideal Weight Calculator"
      description="Ideal weight calculators determine your ideal body weight based on your height, age, gender, and sometimes body fat percentage. It helps you recognise a healthy target weight for your body, allowing you to boost your overall well-being."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
