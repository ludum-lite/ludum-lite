import React from 'react'
import styled from 'styled-components/macro'
import Typography from 'components/common/mui/Typography'

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const Title = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

interface Props {
  title: string
  children: React.ReactNode
}
export default function ThemeSubPage({ title, children }: Props) {
  return (
    <Root>
      <Title variant="h5">{title}</Title>
      {children}
    </Root>
  )
}
