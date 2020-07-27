export const getStaticUrl = (path: string | null | undefined): string => {
  if (path) {
    if (path.indexOf('///') === 0) {
      return `${process.env.REACT_APP_STATIC_DOMAIN}${path.substr(2)}`
    }

    return `${process.env.REACT_APP_STATIC_DOMAIN}${path}`
  }

  return ''
}
