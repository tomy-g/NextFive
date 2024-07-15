import SearchMovies from '@/components/SearchMovies'
// import { Textarea } from '@nextui-org/react'
import Recommendations from '@/components/Recommendations'

export default function Home () {
  return (
    <div className='w-32 lg:w-[60rem] '>
      <main>
        <SearchMovies />
        <Recommendations/>
      </main>
    </div>
  )
}
