import React from 'react'

export default function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const storedValueRef = React.useRef<T | null>(null)
  const [cachedInitialValue] = React.useState(initialValue)
  const [storedValue, setStoredValue] = React.useState<T>(initialValue)

  React.useEffect(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return cachedInitialValue
      const calculatedStoredValue = item ? JSON.parse(item) : cachedInitialValue
      storedValueRef.current = calculatedStoredValue
      setStoredValue(calculatedStoredValue)
    } catch (error) {
      // If error also return cachedInitialValue
      console.log(error)
      const calculatedStoredValue = cachedInitialValue
      storedValueRef.current = calculatedStoredValue
      setStoredValue(calculatedStoredValue)
    }
  }, [key, cachedInitialValue])

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
