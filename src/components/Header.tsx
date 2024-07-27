'use client'
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
import { usePathname } from 'next/navigation'

export default function Header () {
  const path = usePathname()
  return (
    <Navbar
      classNames={{
        wrapper: 'px-0',
        item: [
          'data-[active=true]:!text-primary',
        ]

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
        {/* <NavbarItem isActive>
          <Link href='#' aria-current='page'>
            Settings
          </Link>
        </NavbarItem> */}
      </NavbarContent>
    </Navbar>

  )
}
