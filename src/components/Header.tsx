import React from 'react'
import { Link } from '@nextui-org/react'
import LinkNext from 'next/link'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/navbar'
import NextFiveSVG from './NextFiveSVG'

export default function Header () {
  return (
    <Navbar
      classNames={{
        wrapper: 'px-0'
      }}
    >
      <LinkNext href='/'>
        <NavbarBrand>
          <NextFiveSVG />
        </NavbarBrand>
      </LinkNext>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='/recommendations'>
            Recommendations
          </Link>
        </NavbarItem>
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
      </NavbarContent>
    </Navbar>

  )
}
