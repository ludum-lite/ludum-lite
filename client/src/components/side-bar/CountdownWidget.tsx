import React from 'react'
import styled from 'styled-components/macro'
import Countdown from './Countdown'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.div``

const Subtitle = styled.div``

interface Props {}
export default function CountdownWidget({}: Props) {
  return (
    <Root>
      <Title>Ludum Dare 47</Title>
      {/* <Countdown /> */}
      <Subtitle>until Theme Submission</Subtitle>
    </Root>
  )
}
