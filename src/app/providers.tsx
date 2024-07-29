'use client'

import { ApiKeyContext } from '@/components/ApiKeyContext'
import Header from '@/components/Header'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Providers ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userApiKey, setUserApiKey] = useState('')
  return (
    <NextUIProvider navigate={router.push}>
      <Header setUserApiKey={setUserApiKey}/>
      <ApiKeyContext.Provider value={userApiKey}>
        {children}
      </ApiKeyContext.Provider>
    </NextUIProvider>
  )
}
