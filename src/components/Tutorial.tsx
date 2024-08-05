import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import React from 'react'

interface Props {
  isModalOpen: boolean
  setIsOpen: (value: boolean) => void
}

export default function Tutorial ({ isModalOpen, setIsOpen }: Props) {
  return (
    <Modal
      isOpen={isModalOpen}
      isDismissable={false}
      placement='center'
      hideCloseButton={true}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className=' text-xl flex flex-col gap-1 mt-2'>
              Welcome to NextFive! 👋
            </ModalHeader>
            <ModalBody>
              <p className='mt-2 text-foreground-600'>
                NextFive recommends movies and TV shows based on your
                preferences. To get the best suggestions, add{' '}
                <b>5 related titles you like</b>.
              </p>
              <ol className='list-outside ml-4'>
                <li className='mt-4 text-foreground-500 text-sm list-disc'>
                Example 1: If you pick Avengers, Loki, Spider-Man: Homecoming,
                 WandaVision, and Iron Man 3, the AI will recommend more Marvel Cinematic Universe titles.
                </li>
                <li className='mt-4 text-foreground-500 text-sm list-disc'>
                Example 2: If you choose Se7en, Zodiac, Prisoners, True Detective, and Memories of Murder,
                you&apos;ll receive recommendations for dark mystery movies and TV shows.
                </li>
              </ol>
              <p className='mt-6 text-foreground-600'>
                For more information about the app visit the{' '}
                <Link href='/about'>About</Link> section.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color='success'
                className='text-background font-semibold'
                onPress={() => {
                  setIsOpen(false)
                  onClose()
                }}
              >
                Let&apos;s begin!
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
