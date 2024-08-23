'use client'

import { useShallow } from 'zustand/react/shallow'
import { useStore } from '@/store'

export const useCanvasStore = () => {
  const { canvas, setCanvas, gl, setGl } = useStore(
    useShallow((state) => ({
      canvas: state.canvas,
      setCanvas: state.setCanvas,
      gl: state.gl,
      setGl: state.setGl,
    })),
  )
  return { canvas, setCanvas, gl, setGl }
}
