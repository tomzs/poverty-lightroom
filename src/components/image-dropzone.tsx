'use client'

import { Alert, AlertTitle, AlertDescription } from './ui/alert'
import { Button } from './ui/button'

import { useDropzone } from 'react-dropzone'
import { useCallback, useState } from 'react'

import { toast } from 'sonner'

export const ImageDropzone = ({
  file,
  setFile,
}: {
  file: File | null
  setFile: (file: File) => void
}) => {
  const validateImage = useCallback((file: File) => {
    return new Promise((resolve) => {
      if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        toast.warning('Invalid image type, only PNG and JPEG are allowed')
        resolve(false)
        return
      }
      const img = new Image()
      img.onload = () => {
        if (img.width > 4096 || img.height > 4096) {
          toast.warning("Image dimensions can't exceed 4096x4096")
          resolve(false)
        } else {
          resolve(true)
        }
      }
      img.src = URL.createObjectURL(file)
    })
  }, [])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      const isValid = await validateImage(file)
      if (isValid) {
        setFile(file)
      }
    },
    // TODO:  setFile?
    [validateImage, setFile],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    maxFiles: 1,
  })
  return (
    <>
      {!file && (
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-yellow-300 rounded-lg p-6 cursor-pointer"
        >
          <>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the image here ...</p>
            ) : (
              <p>Drag n drop an image here, or click to select one</p>
            )}
          </>
        </div>
      )}
      {file && (
        <div className="mt-4">
          <p>Selected file: {file.name}</p>
          <Button
            onClick={() => {
              console.log('UPLOAD', file)
            }}
            className="mt-2"
          >
            Upload
          </Button>
        </div>
      )}
    </>
  )
}
