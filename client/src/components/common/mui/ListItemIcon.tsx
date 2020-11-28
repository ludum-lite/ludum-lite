import React from 'react'
import {
  ListItemIcon as MuiListItemIcon,
  ListItemIconProps,
} from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

interface StyledListItemIconProps {
  compactPadding?: boolean
}

const StyledListItemIcon = styled(MuiListItemIcon).withConfig({
  shouldForwardProp: (prop) => !['compactPadding'].includes(prop),
})<StyledListItemIconProps>`
  color: inherit;

  ${({ compactPadding }) =>
    compactPadding &&
    css`
      min-width: 0px;
      padding-right: ${({ theme }) => theme.spacing(1)}px;
    `}
`

interface Props {
  compactPadding?: boolean
}

export const ListItemIcon: React.FC<Props & ListItemIconProps> = ({
  compactPadding,
  ...other
}) => {
  return <StyledListItemIcon compactPadding={compactPadding} {...other} />
}

export default ListItemIcon
