'use client'
import { useImageStore } from '@/hooks/use-image-store'
import { Button } from '../ui/button'
import { useStore } from '@/store'

export const NewImage = () => {
  const { clearImage, image, setEffect } = useStore()
  const handleNewImage = () => {
    setEffect('brightness', 0)
    setEffect('contrast', 0)
    setEffect('exposure', 0)
    setEffect('saturation', 0)

    clearImage()
  }

  return (
    image && (
      <Button variant="ghost" onClick={handleNewImage}>
        New
      </Button>
    )
  )
}
