import React from 'react'

interface ListboxWrapperProps {
  children: React.ReactNode
  isOpen: boolean
}

export const ListboxWrapper: React.FC<ListboxWrapperProps> = ({ children, isOpen }) => (
  <div
    className={`absolute z-50 top-14 drop-shadow-xl w-full border-small px-2 py-2
  rounded-large bg-background-100 border-foreground-100 ${isOpen ? '' : 'opacity-0 pointer-events-none'}
  transition ease-in duration-150 `}
  role='dialog'
  >
    {children}
  </div>
)
