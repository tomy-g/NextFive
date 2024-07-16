import '../app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextFive',
  description: 'A film recommendation app'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className + ' five-dark text-foreground bg-background flex min-h-screen flex-col items-center justify-between px-24'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
