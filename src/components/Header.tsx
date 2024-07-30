'use client'
import React, { type Key, useEffect, useState } from 'react'
import {
  Button,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
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
  setModelGlobal: (apiKey: string) => void
}

export default function Header ({ setUserApiKey, setModelGlobal }: Props) {
  const path = usePathname()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [apiKey, setApiKey] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [apiKeyDB, setApiKeyDB] = useLocalStorage('apiKey', '')
  const [customApiKey, setCustomApiKey] = useState(false)
  const [swichValue, setSwichValue] = useState(false)
  const [select, setSelect] = useState('gpt-4o-mini')
  const [model, setModel] = useState('gpt-4o-mini')
  const [modelDB, setModelDB] = useLocalStorage('model', 'gpt-4o-mini')

  function saveSettings (onClose: () => void) {
    setModel(select)
    setModelDB(select)
    setModelGlobal(select)
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
    setModel(modelDB)
    setModelGlobal(modelDB)
  }, [])

  useEffect(() => {
    setApiKeyDB(apiKey)
    setUserApiKey(apiKey)
    setCustomApiKey(swichValue)
  }, [apiKey])

  const options = [
    { key: 'gpt-4o-mini', label: 'GPT 4o Mini' },
    { key: 'gpt-4o', label: 'GPT 4o (recomended)' }
  ]

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
              setSelect(model)
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
                  If you enable this option, you can use your own OPENAI API key
                  to have unlimited access to NextFive.
                </p>
                <p>
                  Your api key is{' '}
                  <b>
                    <em>
                      only stored in your browser and is not shared with anyone.
                    </em>
                  </b>
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
                <Select
                  selectedKeys={[select]}
                  selectionMode='single'
                  className='mt-4'
                  label='Select an AI Model'
                  variant='bordered'
                  onSelectionChange={(keys: 'all' | Set<Key>) => {
                    if (keys === 'all' || keys.size === 0) {
                      setSelect('gpt-4o-mini')
                    } else {
                      const selectedKey = Array.from(keys).join(', ')
                      setSelect(selectedKey)
                    }
                  }}
                >
                  {options.map(option => (
                    <SelectItem key={option.key} value={option.key}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color='primary'
                  className='text-background'
                  onPress={() => {
                    saveSettings(onClose)
                  }}
                  isDisabled={(inputValue === '' && swichValue) || select === ''}
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
