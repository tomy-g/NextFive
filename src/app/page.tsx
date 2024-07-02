import SearchBar from '@/components/SearchBar'
import ApiKey from '@/components/ApiKey'
// import { Textarea } from '@nextui-org/react'
import Recommendations from '@/components/Recomendations'

export default function Home () {
  return (
    <div className='w-32 lg:w-[60rem] '>
      <main>
        <ApiKey />
        <SearchBar />
        <Recommendations/>
        {/* <Textarea
          isReadOnly
          label='Description'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter your description'
          defaultValue='NextUI is a React UI library that provides a set of accessible, reusable, and beautiful components.'
          className='max-w'
        /> */}
      </main>
    </div>
  )
}
