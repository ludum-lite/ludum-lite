import { xor } from 'lodash'

export function toggle(arr: any[], value: any) {
  return xor(arr, [value])
}

export function getValidValue<
  T extends { [key: string]: boolean | null | undefined },
  K extends keyof T
>(options: T, currentValue: K): K | undefined {
  const validOptions = Object.entries(options).filter(([key, value]) =>
    Boolean(value)
  )

  const currentValueIsValid = validOptions.some(([key]) => key === currentValue)

  if (currentValueIsValid) {
    return currentValue
  }

  if (validOptions.length) {
    return validOptions[0][0] as K
  }
}
