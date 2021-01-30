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
  min-width: 0;
  padding-left: 8px;
  padding-right: 8px;

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
  max-width: ${MAX_LENGTH}px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.125rem;
`

const ButtonText = styled(Typography)`
  max-width: ${MAX_LENGTH}px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.125rem;
`

interface Props {
  to?: string
  children: React.ReactNode
  isParent?: boolean
}
export default function Breadcrumb({ to, children, isParent }: Props) {
  if (to) {
    return (
      <StyledButton
        variant="text"
        // @ts-ignore
        component={Link}
        to={to}
        noUnderline
      >
        <ButtonText color={isParent ? 'textSecondary' : 'textPrimary'}>
          {children}
        </ButtonText>
      </StyledButton>
    )
  }

  return (
    <Text color={isParent ? 'textSecondary' : 'textPrimary'}>{children}</Text>
  )
}

Breadcrumb.displayName = 'Breadcrumb'
