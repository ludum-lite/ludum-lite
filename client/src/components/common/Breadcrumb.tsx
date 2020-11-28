import React from 'react'
import styled from 'styled-components/macro'
import Button from './mui/Button'
import Typography from './mui/Typography'
import Link from './mui/Link'

type TextColor = 'black' | 'white'

const MAX_LENGTH = 150

interface ButtonProps {
  textColor: TextColor
}
const StyledButton = styled(Button)<ButtonProps>`
  span {
    display: block;
    max-width: ${MAX_LENGTH}px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const Text = styled(Typography)`
  padding: 4px 6px;
  color: ${({ theme }) => theme.themeColors.breadcrumbs.color};
  max-width: ${MAX_LENGTH}px;
  overflow: hidden;
  text-overflow: ellipsis;
`

interface Props {
  to?: string
  children: React.ReactNode
  textColor?: TextColor
}
export default function Breadcrumb({
  to,
  children,
  textColor = 'black',
}: Props) {
  if (to) {
    return (
      <StyledButton
        background="level1"
        variant="text"
        // @ts-ignore
        component={Link}
        to={to}
        noUnderline
        isBreadcrumb
        color={textColor === 'white' ? 'primary' : 'secondary'}
      >
        {children}
      </StyledButton>
    )
  }

  return (
    <Text textColor={textColor === 'white' ? 'white' : undefined}>
      {children}
    </Text>
  )
}
