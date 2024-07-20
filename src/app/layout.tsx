import '../app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/Header'

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
      <body className={inter.className + ' five-dark text-foreground bg-background flex flex-col items-center min-h-screen '}>
        <div className='w-full px-6 lg:w-[60rem] lg:px-0'>
          <Header />
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
