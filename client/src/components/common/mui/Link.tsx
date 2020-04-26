import React from 'react'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@material-ui/core'
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom'

export default function Link(props: MuiLinkProps & RouterLinkProps) {
  return <MuiLink component={RouterLink} {...props} />
}
