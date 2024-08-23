import { Header } from '@/components/header'
import { Separator } from '@/components/ui/separator'
import { Children } from 'react'

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="h-full flex-col">
      <Header />
      <Separator />
      <div className="container h-full py-6">{children}</div>
    </div>
  )
}
