import SearchMovies from '@/components/SearchMovies'
// import { Textarea } from '@nextui-org/react'
import Recommendations from '@/components/Recommendations'
import Header from '@/components/Header'

export default function Home () {
  return (
    <div className='w-96 lg:w-[60rem] '>
      <main>
        <Header />
        <SearchMovies />
        <Recommendations/>
      </main>
    </div>
  )
}
