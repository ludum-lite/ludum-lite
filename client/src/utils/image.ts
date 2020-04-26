export const getStaticUrl = (path: string | null | undefined): string => {
  if (path) {
    return `http://static.jam.vg${path}`
  }

  return ''
}
