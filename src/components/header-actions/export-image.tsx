'use client'
import { useImageStore } from '@/hooks/use-image-store'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'

import { downloadCanvasImage } from '@/lib/download-canvas'
import { useCanvasStore } from '@/hooks/use-canvas-store'
import { renderImage } from '@/lib/webgl'
import { useImageEffect } from '@/hooks/use-gl-effects-store'

export const ExportImage = () => {
  const [exportOpen, setExportOpen] = useState(false)
  const [fileName, setFileName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { canvas, gl } = useCanvasStore()
  const contrast = useImageEffect('contrast')
  const saturation = useImageEffect('saturation')
  const brightness = useImageEffect('brightness')
  const exposure = useImageEffect('exposure')

  const { image, imgElement } = useImageStore()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value)
  }

  useEffect(() => {
    if (image) {
      setFileName(image.name)
    }
  }, [image])

  const callback = () => {
    setIsLoading(false)
    setExportOpen(false)
  }
  const handleSave = () => {
    setIsLoading(true)
    if (gl && canvas && imgElement) {
      renderImage(gl, imgElement, {
        contrast,
        saturation,
        brightness,
        exposure,
      })
      downloadCanvasImage(
        canvas,
        fileName.split('.')[0],
        fileName.split('.')[1] as 'png' | 'jpg',
        callback,
      )
    }
  }

  return (
    <Dialog open={exportOpen} onOpenChange={setExportOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Export</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px]">
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle>Ready to Export?</DialogTitle>
          <DialogDescription>
            Your edits are complete! Enter the file name and export your
            masterpiece.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">File name</Label>
            <Input
              id="name"
              autoFocus
              value={fileName}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
