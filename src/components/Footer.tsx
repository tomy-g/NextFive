import { Link } from '@nextui-org/react'
import { Github } from 'lucide-react'
import React from 'react'

export default function Footer () {
  return (
    <nav className='mt-48 mb-16 flex flex-col items-center gap-4'>
      <p>
        Developed by{' '}
        <Link
          href='https://www.linkedin.com/in/tomas-goizueta/'
          isExternal
          color='success'
          underline='hover'
        >
          Tomy Goizueta
        </Link>
      </p>
      <Link href='https://github.com/tomy-g/NextFive' className='text-foreground-200 text-sm' isExternal showAnchorIcon>
        <Github className='mr-2' size={20} /> Github Repository
      </Link>
    </nav>
  )
}
