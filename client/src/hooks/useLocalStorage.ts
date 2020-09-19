import React from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [cachedInitialValue] = React.useState(initialValue)

  const getValue = React.useCallback(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return cachedInitialValue
      return item ? JSON.parse(item) : cachedInitialValue
    } catch (error) {
      // If error also return cachedInitialValue
      console.log(error)
      return cachedInitialValue
    }
  }, [cachedInitialValue, key])

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const storedValueRef = React.useRef<T | null>(null)
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    const newValue = getValue()
    storedValueRef.current = newValue
    return newValue
  })

  React.useEffect(() => {
    const newValue = getValue()
    storedValueRef.current = newValue
    setStoredValue(newValue)
  }, [key, cachedInitialValue, getValue])

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = React.useCallback(
    (value: T) => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValueRef.current) : value
        // Save state
        setStoredValue(valueToStore)
        // Save to local storage
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        // A more advanced implementation would handle the error case
        console.log(error)
      }
    },
    [key]
  )

  return [storedValue, setValue] as const
}
