import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { To } from 'history'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

interface StyledLinkProps {
  overlay?: boolean
  noUnderline?: boolean
}
const StyledLink = styled(MuiLink).withConfig({
  shouldForwardProp: ignoreProps(['overlay']),
})<StyledLinkProps>`
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

  ${({ noUnderline }) =>
    noUnderline &&
    css`
      &:hover {
        text-decoration: none;
      }
    `}
`

interface LinkProps {
  overlay?: boolean
  component?: React.ElementType
  to?: To
  children?: React.ReactNode
  noUnderline?: boolean
}
export default React.forwardRef<
  any,
  LinkProps &
    Omit<MuiLinkProps, 'children'> &
    Omit<RouterLinkProps, 'to' | 'component' | 'children'>
>(({ to, children, overlay, ...others }, ref) => {
  if (to) {
    return (
      <MuiLink
        component={StyledLink}
        as={RouterLink}
        ref={ref}
        to={to}
        overlay={overlay}
        children={overlay ? '' : children}
        {...others}
      />
    )
  } else {
    return (
      <StyledLink ref={ref} overlay={overlay} children={children} {...others} />
    )
  }
})
