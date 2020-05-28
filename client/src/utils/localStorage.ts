export function getItemWithDefault<T extends string>(
  key: string,
  defaultValue: T
): T {
  let value = null
  try {
    value = localStorage.getItem(key)
  } catch (e) {}

  if (value === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue))
    return defaultValue
  }

  return JSON.parse(value)
}
