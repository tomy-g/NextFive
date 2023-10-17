import { Button } from '@nextui-org/button'

export default function Home () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className="flex flex-wrap gap-4 items-center">
        <Button color="default">
          Default
        </Button>
        <Button color="primary">
          Primary
        </Button>
        <Button color="secondary">
          Secondary
        </Button>
        <Button color="success">
          Success
        </Button>
        <Button color="warning">
          Warning
        </Button>
        <Button color="danger">
          Danger
        </Button>
      </div>
    </main>
  )
}
