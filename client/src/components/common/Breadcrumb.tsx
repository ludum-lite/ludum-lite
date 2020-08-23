import React from 'react'
import styled from 'styled-components/macro'
import Button from './mui/Button'
import Typography from './mui/Typography'
import Link from './mui/Link'

const MAX_LENGTH = 120

const StyledButton = styled(Button)`
  span {
    display: block;
    max-width: ${MAX_LENGTH}px;
    overflow: hidden;
    text-overflow: ellipsis;
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
}
export default function Breadcrumb({ to, children }: Props) {
  if (to) {
    return (
      <StyledButton
        background="page"
        variant="text"
        // @ts-ignore
        component={Link}
        to={to}
        noUnderline
        isBreadcrumb
      >
        {children}
      </StyledButton>
    )
  }

  return <Text>{children}</Text>
}
