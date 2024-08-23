import { useCanvasStore } from '@/hooks/use-canvas-store'
import { useImageEffect } from '@/hooks/use-gl-effects-store'
import { useImageStore } from '@/hooks/use-image-store'
import { initWebGL, renderImage } from '@/lib/webgl'
import { useEffect, useRef, useState } from 'react'

export const GLCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { image, imgElement, setImgElement } = useImageStore()

  const contrast = useImageEffect('contrast')
  const saturation = useImageEffect('saturation')
  const brightness = useImageEffect('brightness')
  const exposure = useImageEffect('exposure')

  const { setGl, gl, setCanvas } = useCanvasStore()

  useEffect(() => {
    if (canvasRef.current) {
      setCanvas(canvasRef.current)
      const glContext = initWebGL(canvasRef.current)
      setGl(glContext)
    }
  }, [])

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setImgElement(img)
          if (canvasRef.current) {
            canvasRef.current.width = img.width
            canvasRef.current.height = img.height
            const glContext = initWebGL(canvasRef.current)
            setGl(glContext)
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(image)
    }
  }, [image])

  // mega sure that this is the reason for not getting 60fps
  useEffect(() => {
    if (gl && imgElement) {
      renderImage(gl, imgElement, {
        contrast,
        saturation,
        brightness,
        exposure,
      })
    }
  }, [gl, imgElement, contrast, saturation, brightness, exposure])

  return (
    <canvas
      ref={canvasRef}
      id="glCanvas"
      className="flex w-full rounded-md border border-input px-3 py-2 flex-1 p-4 min-h-[400px] bg-background max-w-full h-auto object-contain"
    />
  )
}
