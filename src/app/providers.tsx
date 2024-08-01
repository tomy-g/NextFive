'use client'

import { ApiKeyContext } from '@/contexts/ApiKeyContext'
import Header from '@/components/Header'
import { ModelContext } from '@/contexts/ModelContext'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function Providers ({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [userApiKey, setUserApiKey] = useState('')
  const [model, setModel] = useState('gpt-4o-mini')
  return (
    <NextUIProvider navigate={router.push}>
      <Header setUserApiKey={setUserApiKey} setModelGlobal={setModel}/>
      <ApiKeyContext.Provider value={userApiKey}>
        <ModelContext.Provider value={model}>
          {children}
        </ModelContext.Provider>
      </ApiKeyContext.Provider>
    </NextUIProvider>
  )
}
