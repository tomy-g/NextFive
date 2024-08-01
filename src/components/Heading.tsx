import { Divider } from '@nextui-org/react'

interface Props {
  title: string
  id?: string
}

export default function Heading ({ title, id }: Props) {
  return (
    <>
      <h3 id={id ?? ''} className='text-lg text-secondary-500 mt-8'>{title}</h3>
      <Divider className='bg-secondary-500 mt-1 mb-2' />
    </>
  )
}
