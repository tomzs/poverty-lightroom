import { GLCanvas } from './gl-canvas'
import { EffectSelector } from '../selectors/effect-selector'
import { useStore } from '@/store'
import type { ImageEffect } from '@/types'
import { useImageEffect } from '@/hooks/use-gl-effects-store'

export const Editor = () => {
  const setEffect = useStore((state) => state.setEffect)

  const contrast = useImageEffect('contrast')
  const saturation = useImageEffect('saturation')
  const brightness = useImageEffect('brightness')
  const exposure = useImageEffect('exposure')

  const handleEffectChange = (effect: string, value: number) => {
    setEffect(effect as ImageEffect, value)
  }
  const effectsList = Object.keys({
    contrast,
    saturation,
    brightness,
    exposure,
  })
  return (
    <div className="grid h-full items-stretch gap-6 grid-cols-[1fr_200px]">
      <div className="flex flex-col space-y-4 order-2">
        {/* <ContrastSelector defaultValue={[0]} />
        <SaturationSelector defaultValue={[0]} />
        <BrightnessSelector defaultValue={[0]} />
        <ExposureSelector defaultValue={[0]} /> */}
        {effectsList.map((effect) => (
          <EffectSelector
            key={effect}
            effect={effect}
            defaultValue={[0]} // Slider expects an array
            onEffectChange={handleEffectChange}
          />
        ))}
        {/* <Button
          variant={'ghost'}
          onClick={() =>
            setEffects({
              contrast: 0,
              saturation: 0,
              brightness: 0,
              exposure: 0,
            })
          }
        >
          Reset
        </Button> */}
      </div>
      <div className="order-1">
        <div className="flex h-full flex-col space-y-4">
          <GLCanvas />
        </div>
      </div>
    </div>
  )
}
