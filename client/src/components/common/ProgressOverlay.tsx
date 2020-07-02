import React from 'react'
import styled from 'styled-components/macro'
import { CircularProgress } from '@material-ui/core'

const Root = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.12);
`

const StyledCircularProgress = styled(CircularProgress)``

interface Props {
  loading: boolean
}
export default function ProgressOverlay({ loading }: Props) {
  if (loading) {
    return (
      <Root>
        <StyledCircularProgress />
      </Root>
    )
  }

  return null
}
