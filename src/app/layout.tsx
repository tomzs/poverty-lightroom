import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'

import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Poverty lightroom',
  description: 'Very, very, very lite version of lightroom-ish app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  )
}
