'use client'

import * as React from 'react'
import type { SliderProps } from '@radix-ui/react-slider'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

interface ExposureSelectorProps {
  defaultValue: SliderProps['defaultValue']
}

export function ExposureSelector({ defaultValue }: ExposureSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="exposure">Exposure</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {value}
          </span>
        </div>
        <Slider
          id="exposure"
          max={1}
          defaultValue={value}
          step={0.01}
          min={-1}
          onValueChange={setValue}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="exposure"
        />
      </div>
    </div>
  )
}
