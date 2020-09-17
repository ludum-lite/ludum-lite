import { useMe } from './useMe'
import useLocalStorage from './useLocalStorage'

export default function useUserLocalStorage<T>(key: string, initialValue: T) {
  const { me } = useMe()

  const [value, setValue] = useLocalStorage(`${me?.id}_${key}`, initialValue)

  return [value, setValue] as const
}
