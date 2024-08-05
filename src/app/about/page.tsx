'use client'
import Heading from '@/components/Heading'
import { Link } from '@nextui-org/react'
import React from 'react'

export default function About () {
  return (
    <main className='mt-8 mb-36 flex gap-16 flex-col sm:flex-row sm:items-start'>
      <aside className='bg-secondary-50 p-4 pr-10 rounded-md'>
        <ul className='list-none'>
          <li>
            <Link href='#about' className='text-foreground mb-2 text-nowrap'>
              About NextFive
            </Link>
          </li>
          <li>
            <Link href='#usage' className='text-foreground mb-2 text-nowrap'>
              Usage
            </Link>
          </li>
          <li>
            <Link
              href='#troubleshoot'
              className='text-foreground mb-2 text-nowrap'
            >
              Settings
            </Link>
          </li>
          <li>
            <Link className='text-foreground mb-2 text-nowrap'>
              Troubleshoot
            </Link>
          </li>
        </ul>
      </aside>
      <article>
        <section>
          <h2 className='text-4xl text-primary'>About</h2>
          <Heading title='WHAT?' />
          <p className='mt-4 text-foreground'>
            NextFive is a web application that uses{' '}
            <Link href='https://openai.com/api/' isExternal showAnchorIcon>
              OpenAI
            </Link>{' '}
            and{' '}
            <Link href='https://www.omdbapi.com/' isExternal showAnchorIcon>
              OMDB
            </Link>{' '}
            APIs to recommend you 5 movies or TV shows based on another 5 of
            your preference.
          </p>
          <Heading title='WHY?' />
          <p className='mt-4 text-foreground'>
            In an era when we are overwhelmed with a great number of options,
            it is common to spend more time choosing what to watch than actually
            watching it.
          </p>
          <p className='mt-4 text-foreground'>
            The idea behind NextFive is to help you find movies or TV shows that
            you will like based on your preferences.
          </p>
          <Heading title='HOW?' />
          <p className='mt-4 text-foreground'>
            NextFive uses the power of AI to understand your taste and recommend
            you the best options.
          </p>
          <p className='mt-4 text-foreground'>
            Other recommendation systems require you to select the genres and
            other characteristics of the movies you like, leading to generic
            results. But with NextFive, you just need to select 5 movies or TV
            shows you like and the AI will do the rest, trying to give you the
            best recommendations.
          </p>
        </section>
        <section id='usage'>
          <h2 className='text-4xl text-primary mt-12'>Usage</h2>
          <Heading title='HOW TO USE?' />
          <p className='mt-4 text-foreground'>
            To use NextFive, you just need to search the movies/shows you
            already like; you need to select at least 1. Also, you can filter
            the results by selecting the type of media you want to watch
            (Movie/TV).
          </p>
          <p className='mt-4 text-foreground'>
            To obtain the best recommendations, you should select titles with a connection between them,
            for example, movies with the same subgenre (dark comedy, 80s action, etc) with the same director or actors...
            This way GPT can understand your taste better and give you titles that you will like.
          </p>
          <p className='mt-4 text-foreground'>
            Then you can click on the &quot;Recommend&quot; button and the AI
            will give you 5 recommendations based on your preferences.
          </p>
          <Heading title='MOVIE DETAILS' />
          <p className='mt-4 text-foreground'>
            You can check the details of the movies by clicking on the movie
            card, this will redirect you to the movie page.
          </p>
          <Heading title='PREVIOUS RECOMMENDATIONS' />
          <p className='mt-4 text-foreground'>
            All the recommendations you have received will be stored in your
            browser memory, so you can access them later.
          </p>
          <p className='mt-4 text-foreground'>
            You can view all the recommendations you have received on the{' '}
            <Link href='/recommendations'>Recommendations</Link> page.
          </p>
          <p className='mt-4 text-foreground'>
            You can also clear all the previous recommendations by clicking on
            the &quot;Remove all&quot; button.
          </p>
        </section>
        <section id='settings'>
          <h2 className='text-4xl text-primary mt-12'>Settings</h2>
          <Heading id='apikey' title='API KEY' />
          <p className='mt-4 text-foreground'>
            NextFive uses the OpenAI API to generate the recommendations. The
            app by default uses a shared API key, which has a limit of 10
            recommendations per day per user.
          </p>
          <p className='mt-4 text-foreground'>
            However, you can set your own API key to have unlimited access to
            the app. To do this, you need to create an account on the{' '}
            <Link href='https://platform.openai.com/' isExternal showAnchorIcon>
              OpenAI website{' '}
            </Link>
            and{' '}
            <Link
              href='https://platform.openai.com/api-keys'
              isExternal
              showAnchorIcon
            >
              generate an API key
            </Link>
            .
          </p>
          <p className='mt-4 text-foreground'>
            Then you can set your API key in the Settings panel. Your API key
            will be stored only in your browser memory and{' '}
            <b>will not be shared with anyone.</b>
          </p>
          <Heading id='models' title='AI MODEL' />
          <p className='mt-4 text-foreground'>
            NextFive uses the GPT-4o mini model by default to generate the
            recommendations. Currently, this is the best performance/price model
            available in the OpenAI API.
          </p>
          <p className='mt-4 text-foreground'>
            Additionally, if you {' '} <Link href='#apikey'>set up your own API key</Link> you can choose between
            GPT-4o mini (default) and <b>GPT-4o</b>, a more powerful model that
            depending on your movie input can give you better recommendations.
          </p>
          <p className='mt-4 text-foreground'>
            However, at the time of writing this documentation, the GPT-4o model
            is 33.3 times more expensive than the GPT-4o mini model. So it is up
            to you to try them and see which one gives you the best
            recommendations.
          </p>
          <p className='mt-4 text-foreground'>
            You can check the pricing of the models on the{' '}
            <Link
              href='https://platform.openai.com/pricing'
              isExternal
              showAnchorIcon
            >
              OpenAI pricing page
            </Link>
          </p>
        </section>
        <section>
          <h2 className='text-4xl text-primary mt-12'>Troubleshoot</h2>
          <Heading title='LIMIT REACHED' id='error-limit' />
          <p className='mt-4 text-foreground'>If you see the message: </p>
          <p className='m-2 text-danger-600 bg-danger-50 p-2 rounded-md'>
            You have reached the limit of free recommendations for today. Set
            your own API key to have unlimited access!
          </p>
          <p className='mt-2'>
            It means you have reached the limit of free recommendations for
            today.
          </p>
          <p className='mt-4 text-foreground'>
            To have unlimited access to the app, you need to set your own API
            key. You can learn how to do this in the{' '}
            <Link href='#apikey'>API Key section</Link>.
          </p>
          <Heading title='RECOMMENDATION FAILED' id='error-api' />
          <p className='mt-4 text-foreground'>If you see the message:</p>
          <p className='m-2 text-danger-600 bg-danger-50 p-2 rounded-md'>
            An error occurred, make sure you have set your API key correctly
          </p>
          <p className='mt-2'>
            It means that the recommendation process failed. The most common
            reason for this is that you have set your API key incorrectly.
          </p>
          <p className='mt-4 text-foreground'>
            Please make sure you have set your API key correctly. You can learn
            how to do this in the <Link href='#apikey'>API Key section</Link>.
          </p>
          <Heading title='MOVIE NOT LOADED CORRECTLY' />
          <p className='mt-4 text-foreground'>
            If in one of the recommendation posters you see the message
          </p>
          <p className='m-2 text-danger-600 bg-danger-50 p-2 rounded-md'>
            Movie not loaded correctly
          </p>
          <p>
            It means that the movie details could not be loaded correctly. This
            is usually due to the data provided by GPT being incorrect and the
            movie does not exist in the OMDB database, although this is rare and
            only happens with less known movies.
          </p>
        </section>
      </article>
    </main>
  )
}
