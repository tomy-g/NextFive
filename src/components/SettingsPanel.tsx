import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch
} from '@nextui-org/react'
import React, { type Key } from 'react'

interface Props {
  isOpen: boolean
  onOpenChange: () => void
  setApiKey: (apiKey: string) => void
  inputValue: string
  setInputValue: (inputValue: string) => void
  select: string
  setSelect: (select: string) => void
  setModel: (model: string) => void
  setModelDB: (modelDB: string) => void
  setModelGlobal: (model: string) => void
  switchValue: boolean
  setSwitchValue: (switchValue: boolean) => void
}

export default function SettingsPanel ({
  isOpen,
  onOpenChange,
  setApiKey,
  inputValue,
  setInputValue,
  select,
  setSelect,
  setModel,
  setModelDB,
  setModelGlobal,
  switchValue,
  setSwitchValue
}: Props) {
  const options = [
    { key: 'gpt-4o-mini', label: 'GPT 4o Mini' },
    { key: 'gpt-4o', label: 'GPT 4o (recomended)' }
  ]

  function saveSettings (onClose: () => void) {
    setModel(select)
    setModelDB(select)
    setModelGlobal(select)
    if (inputValue !== '' && switchValue) {
      setApiKey(inputValue)
      onClose()
    } else if (!switchValue) {
      setApiKey('')
      setInputValue('')
      onClose()
    }
  }
  return (
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
            <ModalHeader className='flex flex-col gap-1'>Settings</ModalHeader>
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
                isSelected={switchValue}
                onValueChange={setSwitchValue}
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
                isDisabled={!switchValue}
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
                isDisabled={(inputValue === '' && switchValue) || select === ''}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
