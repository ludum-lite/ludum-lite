export function filterOutErrorsFromResponses<K>(responses: (Error | K)[]): K[] {
  const hasError = responses.some((response) => response instanceof Error)

  if (hasError) {
    console.error('Failed to load all responses', responses)
    return []
  }

  return responses as K[]
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
