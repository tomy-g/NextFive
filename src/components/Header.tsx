'use client'

import React, { useEffect, useState } from 'react'
import { Button, Link, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, useDisclosure } from '@nextui-org/react'
import LinkNext from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import NextFiveSVG from './NextFiveSVG'
import { usePathname } from 'next/navigation'
import { Settings } from 'lucide-react'
import SettingsPanel from './SettingsPanel'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import models from '@/constants/gptModels.json'

interface Props {
  setUserApiKey: (apiKey: string) => void
  setModelGlobal: (apiKey: string) => void
}

export default function Header ({ setUserApiKey, setModelGlobal }: Props) {
  const defaultModel = models.find(option => option.default)
  const path = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [apiKey, setApiKey] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [apiKeyDB, setApiKeyDB] = useLocalStorage('apiKey', '')
  const [customApiKey, setCustomApiKey] = useState(false)
  const [switchValue, setSwitchValue] = useState(false)
  const [select, setSelect] = useState(defaultModel?.key)
  const [model, setModel] = useState(defaultModel?.key)
  const [modelDB, setModelDB] = useLocalStorage('model', defaultModel?.key)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  useEffect(() => {
    setApiKey(apiKeyDB)
    setCustomApiKey(apiKeyDB !== '')
    setSwitchValue(apiKeyDB !== '')
    setModel(modelDB)
    setModelGlobal(modelDB)
  }, [])

  useEffect(() => {
    setApiKeyDB(apiKey)
    setUserApiKey(apiKey)
    setCustomApiKey(switchValue)
  }, [apiKey])

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}
      classNames={{
        wrapper: 'px-0',
        item: ['data-[active=true]:!text-primary']
      }}
    >
      <LinkNext href='/'>
        <NavbarBrand>
          <NextFiveSVG />
        </NavbarBrand>
      </LinkNext>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem isActive={path === '/recommendations'}>
          <Link className='text-inherit' href='/recommendations'>
            Recommendations
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path === '/about'}>
          <Link className='text-inherit' href='/about'>
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            onPress={() => {
              setSwitchValue(customApiKey)
              onOpen()
              setInputValue(apiKey)
              setSelect(model)
            }}
            startContent={<Settings size={18} />}
          >
            Settings
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
      <NavbarMenu className='items-end gap-8'>
        <NavbarMenuItem isActive={path === '/recommendations'}>
          <Link onPress={() => { setIsMenuOpen(false) }} className='text-inherit' href='/recommendations'>
            Recommendations
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem isActive={path === '/about'}>
          <Link onPress={() => { setIsMenuOpen(false) }} className='text-inherit' href='/about'>
            About
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            onPress={() => {
              setIsMenuOpen(false)
              setSwitchValue(customApiKey)
              onOpen()
              setInputValue(apiKey)
              setSelect(model)
            }}
            startContent={<Settings size={18} />}
          >
            Settings
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
      <SettingsPanel
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setApiKey={setApiKey}
        inputValue={inputValue}
        setInputValue={setInputValue}
        select={select ?? 'gpt-4o-mini'}
        setSelect={setSelect}
        setModel={setModel}
        setModelDB={setModelDB}
        setModelGlobal={setModelGlobal}
        switchValue={switchValue}
        setSwitchValue={setSwitchValue}
      />
    </Navbar>
  )
}
