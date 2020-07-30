import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

export default React.forwardRef<
  HTMLAnchorElement,
  MuiLinkProps & RouterLinkProps
>((props, ref) => {
  return <MuiLink component={RouterLink} ref={ref} {...props} />
})
