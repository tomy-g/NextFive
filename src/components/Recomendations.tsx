'use client'
import { PROMPT } from '../../constants/prompt'
import { useState } from 'react'

export default function Recommendations () {
  const [generation, setGeneration] = useState()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <div
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={async () => {
          setIsLoading(true)
          await fetch('/api/completion', {
            method: 'POST',
            body: JSON.stringify({
              prompt: PROMPT
            })
          }).then(response => {
            void response.json().then(json => {
              setGeneration(json.object)
              setIsLoading(false)
            })
          })
        }}
      >
        Generate
      </div>

      {isLoading ? 'Loading...' : <pre>{JSON.stringify(generation)}</pre>}
    </div>
  )
}
