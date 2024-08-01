import { useState } from 'react'
export const useLocalStorage = (key: any, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const item = window.localStorage.getItem(key)
        return item != null ? JSON.parse(item) : initialValue
      }
    } catch (error) {
      console.error(error)
      return initialValue
    }
  })

  function setValue (value: any) {
    try {
      if (typeof window !== 'undefined') {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(error)
    }
  }
  return [storedValue, setValue]
}
