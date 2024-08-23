'use client'

import * as React from 'react'
import type { SliderProps } from '@radix-ui/react-slider'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

interface ContrastSelectorProps {
  defaultValue: SliderProps['defaultValue']
}

export function ContrastSelector({ defaultValue }: ContrastSelectorProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="contrast">Contrast</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {value}
          </span>
        </div>
        <Slider
          id="contrast"
          max={1}
          defaultValue={value}
          step={0.01}
          min={-1}
          onValueChange={setValue}
          onChange={(value) => console.log(value)}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label="contrast"
        />
      </div>
    </div>
  )
}
