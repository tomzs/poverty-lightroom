'use client'
import { ExportImage } from './header-actions'
import { useImageStore } from '@/hooks/use-image-store'

export const Header = () => {
  const { image } = useImageStore()
  return (
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 h-16 sm:flex-row sm:items-center sm:space-y-0">
      <h2 className="text-lg font-semibold text-nowrap">poverty lightroom</h2>

      {image && (
        <div className="flex space-x-2">
          <ExportImage />
        </div>
      )}
    </div>
  )
}
