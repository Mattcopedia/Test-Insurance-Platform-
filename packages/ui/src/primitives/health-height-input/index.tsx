'use client'

import * as React from 'react'
import { cn } from '../../cn'
import { TextField } from '../text-field'
import { Checkbox } from '../checkbox'

export interface HealthHeightInputProps {
  feet: string
  inches: string
  cm: string
  unit: 'imperial' | 'metric'
  onFeetChange: (v: string) => void
  onInchesChange: (v: string) => void
  onCmChange: (v: string) => void
  onUnitToggle: () => void
  className?: string
}

function HealthHeightInput({
  feet,
  inches,
  cm,
  unit,
  onFeetChange,
  onInchesChange,
  onCmChange,
  onUnitToggle,
  className,
}: HealthHeightInputProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {unit === 'imperial' ? (
        <div className="flex gap-3">
          <TextField
            type="number"
            placeholder="Height (Feet)"
            value={feet}
            onChange={(e) => onFeetChange(e.target.value)}
            min={1}
            max={8}
          />
          <TextField
            type="number"
            placeholder="Height (Inch)"
            value={inches}
            onChange={(e) => onInchesChange(e.target.value)}
            min={0}
            max={11}
          />
        </div>
      ) : (
        <TextField
          type="number"
          placeholder="Height (cm)"
          value={cm}
          onChange={(e) => onCmChange(e.target.value)}
          min={50}
          max={250}
        />
      )}
      <Checkbox
        checked={unit === 'metric'}
        onCheckedChange={() => onUnitToggle()}
        label="Switch to cm"
      />
    </div>
  )
}

export { HealthHeightInput }
