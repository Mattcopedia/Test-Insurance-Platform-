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

const BMI_ZONES = [
  { label: 'Underweight', color: '#eab308', from: 0, to: 18.5 },
  { label: 'Normal', color: '#22c55e', from: 18.5, to: 24.9 },
  { label: 'Overweight', color: '#f97316', from: 24.9, to: 29.9 },
  { label: 'Obesity', color: '#ef4444', from: 29.9, to: 40 },
]

function getBmiCategory(bmi: number) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#eab308' }
  if (bmi < 25) return { label: 'Normal weight', color: '#22c55e' }
  if (bmi < 30) return { label: 'Overweight', color: '#f97316' }
  return { label: 'Obesity', color: '#ef4444' }
}

export default function BmiPage() {
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [heightUnit, setHeightUnit] = useState<'imperial' | 'metric'>('imperial')
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')
  const [cm, setCm] = useState('')
  const [weight, setWeight] = useState('')
  const [bmi, setBmi] = useState<{ value: number; heightCm: number } | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const heightCm = heightUnit === 'metric' ? parseFloat(cm) : heightToCm(feet, inches)
    const weightKg = parseFloat(weight)
    if (!heightCm || !weightKg) return
    const heightM = heightCm / 100
    setBmi({ value: parseFloat((weightKg / (heightM * heightM)).toFixed(1)), heightCm })
  }

  const category = bmi ? getBmiCategory(bmi.value) : null
  const healthyWeightMin = bmi ? parseFloat((18.5 * (bmi.heightCm / 100) ** 2).toFixed(1)) : null
  const healthyWeightMax = bmi ? parseFloat((24.9 * (bmi.heightCm / 100) ** 2).toFixed(1)) : null

  const leftContent = (
    <HealthCalculatorCard title="Calculate your BMI">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <HealthGenderToggle value={gender} onChange={setGender} />
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

      {bmi && category && (
        <div className="mt-5 p-4 rounded-[10px] bg-[#f8f9fb] border border-black/8">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[32px] font-bold text-[#1a237e]">{bmi.value}</span>
            <span className="text-[14px] text-black/50">BMI</span>
          </div>
          <p className="font-semibold text-[15px] mb-3" style={{ color: category.color }}>
            {category.label}
          </p>
          <div className="grid grid-cols-2 gap-3 text-[13px]">
            <div>
              <p className="text-black/40">Healthy BMI range</p>
              <p className="font-semibold text-black/80">18.5 – 24.9</p>
            </div>
            {healthyWeightMin && healthyWeightMax && (
              <div>
                <p className="text-black/40">Healthy weight</p>
                <p className="font-semibold text-black/80">
                  {healthyWeightMin}–{healthyWeightMax} kg
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </HealthCalculatorCard>
  )

  const rightContent = (
    <div className="flex flex-col items-center gap-4 w-full">
      <HealthCalculatorGauge value={bmi?.value ?? 0} min={0} max={40} zones={BMI_ZONES} unit="" />
      {bmi && category && (
        <div className="text-center">
          <p className="text-[28px] font-bold text-[#1a237e]">{bmi.value}</p>
          <p className="text-[14px] font-semibold" style={{ color: category.color }}>
            {category.label}
          </p>
        </div>
      )}
      {!bmi && (
        <div className="grid grid-cols-2 gap-3 text-center text-[12px] text-black/50 w-full max-w-[260px]">
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-[#eab308] mr-1" />
            Underweight &lt;18.5
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-[#22c55e] mr-1" />
            Normal 18.5–24.9
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-[#f97316] mr-1" />
            Overweight 25–29.9
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-[#ef4444] mr-1" />
            Obesity ≥30
          </div>
        </div>
      )}
    </div>
  )

  const educationalContent = (
    <div className="flex flex-col gap-10 max-w-[820px]">
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          What is Body Mass Index (BMI)?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-4">
          Body Mass Index (BMI) is a health screening tool that calculates body fat based on weight
          and height. It gives you a number that shows whether you are underweight, normal weight,
          overweight, or obese. Using a BMI calculator helps you understand potential health risks
          associated with being overweight or obese.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-[#eef3fc]">
                <th className="text-left px-4 py-3 font-semibold text-[#1a237e]">BMI Category</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1a237e]">BMI Range</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Underweight', 'Less than 18.5'],
                ['Normal weight', '18.5 – 24.9'],
                ['Overweight', '25 – 29.9'],
                ['Obesity', '30 or greater'],
              ].map(([cat, range]) => (
                <tr key={cat} className="border-t border-black/8">
                  <td className="px-4 py-3 text-black/75">{cat}</td>
                  <td className="px-4 py-3 text-black/75">{range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#1a237e] mb-3">
          How is BMI Calculated?
        </h2>
        <p className="text-[14px] lg:text-[15px] text-black/65 leading-relaxed mb-3">
          BMI is calculated by dividing the weight of a person (in kg) by the square of their height
          (in meters).
        </p>
        <div className="bg-[#eef3fc] rounded-[10px] px-5 py-4 font-semibold text-[15px] text-[#1a237e]">
          BMI = weight (kg) / (height (m))²
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
        { label: 'BMI Calculator' },
      ]}
      title="BMI Calculator"
      description="A BMI calculator is a free online Body Mass Index calculator that helps you check whether your weight is healthy for your height. It gives you a BMI number that shows if you are underweight, normal weight, overweight, or obese."
      leftContent={leftContent}
      rightContent={rightContent}
      educationalContent={educationalContent}
    />
  )
}
