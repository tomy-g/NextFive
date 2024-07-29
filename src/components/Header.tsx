'use client'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  useDisclosure
} from '@nextui-org/react'
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
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

interface Props {
  setUserApiKey: (apiKey: string) => void
}

export default function Header ({ setUserApiKey }: Props) {
  const path = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [apiKey, setApiKey] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [apiKeyDB, setApiKeyDB] = useLocalStorage('apiKey', '')
  const [customApiKey, setCustomApiKey] = useState(false)
  const [swichValue, setSwichValue] = useState(false)

  function saveApiKey (onClose: () => void) {
    if (inputValue !== '' && swichValue) {
      setApiKey(inputValue)
      onClose()
    } else if (!swichValue) {
      setApiKey('')
      setInputValue('')
      onClose()
    }
  }

  useEffect(() => {
    setApiKey(apiKeyDB)
    setCustomApiKey(apiKeyDB !== '')
    setSwichValue(apiKeyDB !== '')
  }, [])

  useEffect(() => {
    setApiKeyDB(apiKey)
    setUserApiKey(apiKey)
    setCustomApiKey(swichValue)
  }, [apiKey])

  return (
    <Navbar
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
              setSwichValue(customApiKey)
              onOpen()
              setInputValue(apiKey)
            }}
            startContent={<Settings size={18} />}
          >
            Settings
          </Button>
        </NavbarItem>
      </NavbarContent>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange()
        }}
        className='bg-background-100'
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Settings
              </ModalHeader>
              <ModalBody>
                <p className='mt-4'>
                  If you enable this option, you can use your own OPENAI API key to have
                  unlimited access to NextFive.
                </p>
                <p>
                  Your api key is <b><em>only stored in your browser and is not shared with anyone.</em></b>
                </p>
                <Switch
                  className='mt-4'
                  isSelected={swichValue}
                  onValueChange={setSwichValue}
                >
                  Custom API key
                </Switch>
                <Input
                  className='mt-4'
                  label='Api Key'
                  value={inputValue}
                  onValueChange={setInputValue}
                  placeholder='Enter your API key'
                  variant='bordered'
                  isDisabled={!swichValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color='primary'
                  className='text-background'
                  onPress={() => {
                    saveApiKey(onClose)
                  }}
                  isDisabled={inputValue === '' && swichValue}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Navbar>
  )
}
