import React from 'react'
import { Image, Link } from '@nextui-org/react'
import LinkNext from 'next/link'
import NextImage from 'next/image'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'

export default function Header () {
  return (
  // <header className='pt-5 w-96 lg:w-[60rem]'>
  //   <a href='/'>
  //     <Image src='nextFive.svg' className='w-32 aspect-[568/174] ' radius='none' as={NextImage} width={568} height={174} />
  //   </a>
      <Navbar classNames={{
        wrapper: 'px-0',
      }}>
        <NavbarBrand>
          <LinkNext href='/'>
            <Image
              src='nextFive.svg'
              className='w-32 aspect-[568/174] '
              radius='none'
              as={NextImage}
              width={568}
              height={174}
            />
          </LinkNext>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Help
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href='#' aria-current='page'>
              Settings
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color='foreground' href='#'>
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
  /* </header> */
  )
}
