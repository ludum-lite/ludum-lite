import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { To } from 'history'

export default React.forwardRef<
  any,
  MuiLinkProps &
    Omit<RouterLinkProps, 'to'> & {
      to?: To
    }
>(({ to, ...others }, ref) => {
  if (to) {
    return <MuiLink component={RouterLink} ref={ref} to={to} {...others} />
  } else {
    return <MuiLink ref={ref} {...others} />
  }
})
