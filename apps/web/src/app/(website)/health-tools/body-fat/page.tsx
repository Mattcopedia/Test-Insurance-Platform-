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
  heightToCm,
} from '../components/calculator-page-shell'

function bodyFatMale_zones() {
  return [
    { label: 'Low Fat', color: '#f9a8d4', from: 0, to: 6 },
    { label: 'Optimal', color: '#22c55e', from: 6, to: 13 },
    { label: 'Healthy', color: '#86efac', from: 13, to: 17 },
    { label: 'Overweight', color: '#f97316', from: 17, to: 24 },
    { label: 'Obese', color: '#ef4444', from: 24, to: 40 },
  ]
}

function bodyFatFemale_zones() {
  return [
    { label: 'Low Fat', color: '#f9a8d4', from: 0, to: 14 },
    { label: 'Optimal', color: '#22c55e', from: 14, to: 20 },
    { label: 'Healthy', color: '#86efac', from: 20, to: 24 },
    { label: 'Overweight', color: '#f97316', from: 24, to: 31 },
    { label: 'Obese', color: '#ef4444', from: 31, to: 50 },
  ]
}

function calcBodyFat(gender: 'male' | 'female', bmi: number, age: number) {
  const gVal = gender === 'male' ? 1 : 0
  return 1.2 * bmi + 0.23 * age - 10.8 * gVal - 5.4
}

function getBodyFatCategory(pct: number, gender: 'male' | 'female') {
  if (gender === 'male') {
    if (pct < 6)
      return {
        label: 'Low Fat range',
        color: '#f9a8d4',
        tips: [
          'Consider a high-calorie health plan',
          'Focus on muscle-building cover',
          'Nutrition support benefits',
        ],
      }
    if (pct < 14)
      return {
        label: 'Optimal Fat range',
        color: '#22c55e',
        tips: [
          'Maintain with regular health checks',
          'OPD cover for consultations',
          'Preventive care benefits',
        ],
      }
    if (pct < 18)
      return {
        label: 'Healthy Fat range',
        color: '#86efac',
        tips: ['Keep up your routine', 'Annual health checkup cover', 'Dental & optical benefits'],
      }
    if (pct < 25)
      return {
        label: 'Overweight range',
        color: '#f97316',
        tips: [
          'OPD cover for frequent consultations',
          'FREE annual health checkup',
          'Tax benefits up to ₦1 Lakh',
        ],
      }
    return {
      label: 'Obesity range',
      color: '#ef4444',
      tips: [
        'Comprehensive inpatient cover',
        'Chronic disease management',
        'Specialist consultation benefits',
      ],
    }
  } else {
    if (pct < 14)
      return {
        label: 'Low Fat range',
        color: '#f9a8d4',
        tips: [
          'Consider a high-calorie health plan',
          'Focus on muscle-building cover',
          'Maternity nutrition support',
        ],
      }
    if (pct < 21)
      return {
        label: 'Optimal Fat range',
        color: '#22c55e',
        tips: [
          'Maintain with regular health checks',
          'OPD cover for consultations',
          'Preventive care benefits',
        ],
      }
    if (pct < 25)
      return {
        label: 'Healthy Fat range',
        color: '#86efac',
        tips: ['Keep up your routine', 'Annual health checkup cover', 'Dental & optical benefits'],
      }
    if (pct < 32)
      return {
        label: 'Overweight range',
        color: '#f97316',
        tips: [
          'OPD cover for frequent consultations',
          'FREE annual health checkup',
          'Tax benefits',
        ],
      }
    return {
      label: 'Obesity range',
      color: '#ef4444',
      tips: [
        'Comprehensive inpatient cover',
        'Chronic disease management',
        'Specialist consultation benefits',
      ],
    }
  }
}

export default function BodyFatPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [cm, setCm] = useState('')
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const heightCm = heightUnit === 'metric' ? parseFloat(cm) : heightToCm(feet, inches)
    const w = parseFloat(weight)
    const a = parseFloat(age)
    if (!heightCm || !w || !a) return
    const heightM = heightCm / 100
    const bmi = w / (heightM * heightM)
    const pct = calcBodyFat(gender, bmi, a)
    setBodyFat(parseFloat(Math.max(0, pct).toFixed(1)))
  }

  const zones = gender === 'male' ? bodyFatMale_zones() : bodyFatFemale_zones()
  const maxZone = gender === 'male' ? 40 : 50
  const category = bodyFat ? getBodyFatCategory(bodyFat, gender) : null

  const leftContent = (
    <HealthCalculatorCard title="Calculate your Body Fat">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <HealthGenderToggle value={gender} onChange={setGender} />
        <TextField
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min={1}
          max={100}
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
          placeholder="Weight (Kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min={1}
        />
        <CalculateButton />
      </form>

      {bodyFat !== null && category && (
        <div
          className="mt-5 p-4 rounded-[10px] border"
          style={{ borderColor: category.color + '40', backgroundColor: category.color + '10' }}
        >
          <p className="text-[13px] text-black/50 mb-1">Nourish yourself,</p>
          <p className="text-[18px] font-bold mb-3" style={{ color: category.color }}>
            You are at {category.label}
          </p>
          <p className="text-[13px] font-semibold text-black/60 mb-2">Things to look for:</p>
          <ul className="text-[13px] text-black/60 space-y-1 list-disc pl-4">
            {category.tips.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
          <div className="mt-4">
            <Button asChild size="sm" fullWidth={false}>
              <Link href="/marketplace/health-insurance">View health plans</Link>
            </Button>
          </div>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = (
    <div className="flex flex-col items-center gap-4 w-full">
      <HealthCalculatorGauge value={bodyFat ?? 0} min={0} max={maxZone} zones={zones} unit="%" />
      {bodyFat !== null && (
        <div className="text-center">
          <p className="text-[28px] font-bold text-[#1a237e]">Your Body Fat is {bodyFat}%</p>
          {category && (
            <p className="text-[14px] font-semibold" style={{ color: category.color }}>
              {category.label}
            </p>
          )}
        </div>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is Body Fat?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          Body fat percentage is a measurement of body composition telling you how much of your body
          weight is fat versus lean mass. It&apos;s a more accurate indicator of health than BMI
          alone, as it accounts for fat distribution.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[13px] text-[#1a237e]">
          Body Fat % = (1.20 × BMI) + (0.23 × age) − (10.8 × gender) − 5.4
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
        { label: 'Body Fat Calculator' },
      ]}
      title="Body Fat Calculator"
      description="A Body fat calculator is a convenient tool to assess your body fat and composition, which are the leading indicators of good health. Knowing your body fat can help you achieve an optimal weight based on your physiology."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
