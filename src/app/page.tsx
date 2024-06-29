import SearchBar from '@/components/SearchBar'
// import { Button } from '@nextui-org/button'

export default function Home () {
  return (
    <div className='w-32 lg:w-[60rem] '>
      <main>
        <SearchBar></SearchBar>
        {/* <div className='flex flex-wrap gap-4 items-center'>
          <Button color='default'>Default</Button>
          <Button color='primary' className='text-background font-medium'>
            Primary
          </Button>
          <Button color='primary' variant='bordered'>
            Primary
          </Button>
          <Button color='secondary'>Secondary</Button>
          <Button color='success' radius='sm'>
            Success
          </Button>
          <Button color='warning'>Warning</Button>
          <Button color='danger'>Danger</Button>
        </div> */}
      </main>
    </div>
  )
}
