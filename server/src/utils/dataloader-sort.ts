// @ts-nocheck
// Copied this from https://github.com/reachifyio/dataloader-sort/blob/master/src/index.js
// This old package includes babel as a depenceny which explodes the size of dependencies

const getMapKey = (data: Object, keyObject: Object): string => {
  const filteredData = {}
  const keys = Object.keys(keyObject)
  keys.sort()
  keys.forEach((key) => (filteredData[key] = data[key]))
  return JSON.stringify(filteredData)
}

const sort = <T extends any = any>(
  keys: readonly (number | string | Object)[],
  data: T[],
  prop?: string = 'id'
): Array<T> => {
  if (!keys.length) return []
  if (!data.length) return new Array(keys.length).fill(null)

  const map = []

  // Map data with retrievable keys
  data.forEach((d) => {
    const mapKey = typeof keys[0] === 'object' ? getMapKey(d, keys[0]) : d[prop]

    if (map[mapKey]) {
      throw new Error(`Multiple options in data matching key ${String(mapKey)}`)
    }

    map[mapKey] = d
  })

  return keys.map((key) => {
    const mapKey = typeof key === 'object' ? getMapKey(key, key) : key
    return map[mapKey] || null
  })
}

export default sort
