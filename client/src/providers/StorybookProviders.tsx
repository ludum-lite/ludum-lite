import React from 'react'
import StylesProvider from './StylesProvider'

interface Props {
  children: React.ReactNode
}
export default function StorybookProviders({ children }: Props) {
  return <StylesProvider>{children}</StylesProvider>
}
