'use client'
import { useShallow } from 'zustand/react/shallow'
import { useStore } from '@/store'
import { set } from 'date-fns'

export const useImageStore = () => {
  const { image, setImage, clearImage, imgElement, setImgElement } = useStore(
    useShallow((state) => ({
      image: state.image,
      setImage: state.setImage,
      imgElement: state.imgElement,
      setImgElement: state.setImgElement,
      clearImage: state.clearImage,
    })),
  )
  return { image, setImage, clearImage, imgElement, setImgElement }
}
