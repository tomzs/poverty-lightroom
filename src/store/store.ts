import type { ImageEffect } from '@/types/types'
import { create } from 'zustand'

interface Store {
  image: File | null
  imgElement: HTMLImageElement | null
  setImgElement: (img: HTMLImageElement) => void
  setImage: (file: File) => void
  clearImage: () => void

  canvas: HTMLCanvasElement | null
  setCanvas: (canvas: HTMLCanvasElement | null) => void

  gl: WebGLRenderingContext | null
  setGl: (gl: WebGLRenderingContext | null) => void

  effects: {
    contrast: number
    saturation: number
    brightness: number
    exposure: number
  }
  setEffect: (effect: ImageEffect, value: number) => void
}

export const useStore = create<Store>()((set, get) => ({
  image: null,
  imgElement: null,
  setImgElement: (img: HTMLImageElement) => set({ imgElement: img }),
  setImage: (file: File) => set({ image: file }),
  clearImage: () => set({ image: null }),

  canvas: null,
  setCanvas: (canvas: HTMLCanvasElement | null) => set({ canvas }),
  gl: null,
  setGl: (gl: WebGLRenderingContext | null) => set({ gl }),

  effects: {
    contrast: 0,
    saturation: 0,
    brightness: 0,
    exposure: 0,
  },
  setEffect: (effect, value) =>
    set((state) => ({
      effects: {
        ...state.effects,
        [effect]: value,
      },
    })),
}))
