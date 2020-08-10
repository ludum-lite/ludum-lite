import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { To } from 'history'
import styled, { css } from 'styled-components/macro'

interface StyledLinkProps {
  overlay?: boolean
}
const StyledLink = styled(MuiLink)<StyledLinkProps>`
  z-index: 2;

  ${({ overlay }) =>
    overlay &&
    css`
      z-index: 1;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    `};
`

interface LinkProps {
  overlay?: boolean
}
export default React.forwardRef<
  any,
  LinkProps &
    MuiLinkProps &
    Omit<RouterLinkProps, 'to'> & {
      to?: To
    }
>(({ to, ...others }, ref) => {
  if (to) {
    return (
      <MuiLink
        component={StyledLink}
        as={RouterLink}
        ref={ref}
        to={to}
        {...others}
      />
    )
  } else {
    return <StyledLink ref={ref} {...others} />
  }
})
