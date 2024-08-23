'use client'

import { Editor } from '@/components/editor'
import { ImageDropzone } from '@/components/image-dropzone'
import { useImageStore } from '@/hooks/use-image-store'

export default function EditorPage() {
  const { image, setImage } = useImageStore()

  return image ? <Editor /> : <ImageDropzone file={image} setFile={setImage} />
}
