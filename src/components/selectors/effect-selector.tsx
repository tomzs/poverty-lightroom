'use client'

import * as React from 'react'
import type { SliderProps } from '@radix-ui/react-slider'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

interface EffectSelectorProps {
  defaultValue: SliderProps['defaultValue']
  effect: string
  onEffectChange: (effect: string, value: number) => void
}

export function EffectSelector({
  defaultValue,
  effect,
  onEffectChange,
}: EffectSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    onEffectChange(effect, newValue[0])
  }

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor={effect.toLowerCase()}>{effect}</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {value?.[0].toFixed(2)}{' '}
          </span>
        </div>
        <Slider
          id={effect.toLowerCase()}
          max={1}
          defaultValue={value}
          step={0.01}
          min={-1}
          onValueChange={handleValueChange}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label={`${effect.toLowerCase()} selector`}
        />
      </div>
    </div>
  )
}
