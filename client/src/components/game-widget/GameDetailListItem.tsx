import React from 'react'
import styled from 'styled-components/macro'
import { Typography } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  align-items: center;
`

const Label = styled(Typography)`
  font-weight: bold;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

interface Props {
  label: string
  value: React.ReactNode
  className?: string
}
export default function GameDetailListItem({ label, value, className }: Props) {
  const valueComponent = React.useMemo(() => {
    if (typeof value === 'string') {
      return <Typography variant="body2">{value}</Typography>
    } else {
      return value
    }
  }, [value])

  return (
    <Root className={className}>
      <Label variant="body1">{label}</Label>
      {valueComponent}
    </Root>
  )
}
