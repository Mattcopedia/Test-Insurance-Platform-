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
  ActivitySelect,
  ACTIVITY_MULTIPLIERS,
  heightToCm,
} from '../components/calculator-page-shell'

function mifflinBmr(gender: 'male' | 'female', weightKg: number, heightCm: number, age: number) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

export default function CaloriePage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState('')
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [cm, setCm] = useState('')
  const [weight, setWeight] = useState('')
  const [activity, setActivity] = useState('')
  const [calories, setCalories] = useState<number | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const heightCm = heightUnit === 'metric' ? parseFloat(cm) : heightToCm(feet, inches)
    const w = parseFloat(weight)
    const a = parseFloat(age)
    const mult = ACTIVITY_MULTIPLIERS[activity] ?? 1.2
    if (!heightCm || !w || !a) return
    const bmr = mifflinBmr(gender, w, heightCm, a)
    setCalories(Math.round(bmr * mult))
  }

  const leftContent = (
    <HealthCalculatorCard title="Calculate your Calories">
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

      {calories && (
        <div className="mt-5 p-4 rounded-[10px] bg-[#fffbeb] border border-[#f97316]/30">
          <p className="text-[13px] text-black/50 mb-1">Daily calorie needs to maintain weight</p>
          <p className="text-[32px] font-bold text-[#92400e]">
            {calories.toLocaleString()} kcal/day
          </p>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = (
    <div className="flex flex-col items-center gap-2">
      <div className="w-[180px] h-[180px] rounded-[20px] bg-[#1a56db] flex items-center justify-center shadow-lg">
        <div className="text-center text-white">
          <p className="text-[42px] font-bold leading-none">
            {calories ? calories.toLocaleString() : '0'}
          </p>
          <p className="text-[16px] font-semibold opacity-80">kcal</p>
        </div>
      </div>
      {calories && (
        <p className="text-[13px] text-black/50 text-center mt-2">Daily calorie requirement</p>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-6 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is a Calorie Calculator?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          A calorie calculator helps estimate the number of calories you should consume in a day. It
          gives you an idea of how many daily calories are needed to maintain or achieve your ideal
          body weight using the Mifflin-St Jeor equation.
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-mono text-[13px] text-[#1a237e] space-y-1">
          <p>Male: (10 × weight) + (6.25 × height) − (5 × age) + 5</p>
          <p>Female: (10 × weight) + (6.25 × height) − (5 × age) − 161</p>
          <p>× Activity multiplier (1.2 – 1.9)</p>
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
        { label: 'Calorie Calculator' },
      ]}
      title="Calorie Calculator"
      description="A calorie calculator helps to estimate the number of calories you should consume in a day. It gives you an idea of how many daily calories are needed to maintain or achieve your ideal body weight."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
