import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextFive',
  description: 'Movie recommendation app powered by AI'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className='scroll-pt-16 '>
      <body
        className={
          inter.className +
          ' five-dark text-foreground bg-background flex flex-col items-center min-h-screen '
        }
      >
        <div className='w-full px-6 lg:w-[60rem] lg:px-0'>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
