import { toast } from 'sonner'

export const downloadCanvasImage = (
  canvas: HTMLCanvasElement | null,
  fileName: string,
  fileType: 'png' | 'jpg',
  callback: () => void,
) => {
  const mimeType = `image/${fileType}`
  const qualityArgument = fileType === 'jpg' ? 0.95 : undefined
  if (!canvas) {
    toast.error('Something went wrong, please try again')

    return
  }
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        toast.error('Canvas to Blob conversion failed')
        return
      }

      const blobUrl = URL.createObjectURL(blob)

      const downloadLink = document.createElement('a')
      downloadLink.href = blobUrl
      downloadLink.download = `${fileName}.${fileType}`

      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      callback()

      URL.revokeObjectURL(blobUrl)
    },
    mimeType,
    qualityArgument,
  )
}
