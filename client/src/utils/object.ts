import { xor } from 'lodash'

export function toggle(arr: any[], value: any) {
  return xor(arr, [value])
}
