import { useStore } from '@/store'
import type { ImageEffect } from '@/types'

export const useImageEffect = (effect: ImageEffect) =>
  useStore((state) => state.effects[effect])
