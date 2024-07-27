'use client'
import { Link } from '@nextui-org/react'
import React from 'react'

export default function About () {
  return (
    <main className='mt-8 flex gap-16 flex-col sm:flex-row'>
      <aside className='bg-secondary-50 p-4 pr-10 rounded-md'>
        <ul className='list-none'>
          <li>
            <Link href='#about' className='text-foreground mb-2 text-nowrap'>About NextFive</Link>
          </li>
          <li>
            <Link href='#usage' className='text-foreground mb-2 text-nowrap'>Usage</Link>
          </li>
          <li>
            <Link href='#troubleshoot' className='text-foreground mb-2 text-nowrap'>Troubleshoot</Link>
          </li>
          <li>
            <Link className='text-foreground mb-2 text-nowrap'>About NextFive</Link>
          </li>
        </ul>
      </aside>
      <article>
        <h1 className='text-4xl text-primary'>About</h1>
        <p className='mt-4 text-lg text-foreground'>
          NextFive is a web application that uses{' '}
          <Link href='https://openai.com/api/' isExternal showAnchorIcon>
            Open AI
          </Link>{' '}
          API and{' '}
          <Link href='https://www.omdbapi.com/' isExternal showAnchorIcon>
            OMDB
          </Link>{' '}
          API to recommend you 5 movies or TV shows based on another 5 of your
          preference.
        </p>
      </article>
    </main>
  )
}
