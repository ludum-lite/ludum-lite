import React from 'react'
import styled from 'styled-components/macro'
import Typography from './Typography'

export default {
  title: 'Typography',
  component: Typography,
}
const BasicRoot = styled.div`
  display: flex;
  flex-direction: column;
`

export const Basic = () => (
  <BasicRoot>
    <Typography variant="h1">H1 This is some text</Typography>
    <Typography variant="h2">H2 This is some text</Typography>
    <Typography variant="h3">H3 This is some text</Typography>
    <Typography variant="h4">H4 This is some text</Typography>
    <Typography variant="h5">H5 This is some text</Typography>
    <Typography variant="h6">H6 This is some text</Typography>
  </BasicRoot>
)
