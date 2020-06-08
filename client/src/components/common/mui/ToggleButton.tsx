import React from 'react'
import {
  ToggleButton as MuiToggleButton,
  ToggleButtonProps,
} from '@material-ui/lab'
import styled, { css } from 'styled-components/macro'

type Padding = 'icon' | 'text'

interface StyledToggleButtonProps {
  padding?: Padding
}

const StyledToggleButton = styled(MuiToggleButton).withConfig({
  shouldForwardProp: (prop) => !['padding'].includes(prop),
})<StyledToggleButtonProps>`
  ${({ padding }) =>
    padding === 'text' &&
    css`
      padding: 6px 16px;
    `}
`

interface Props {
  padding?: Padding
}

export const ToggleButton: React.FC<Props & ToggleButtonProps> = ({
  padding = 'icon',
  ...other
}) => {
  return <StyledToggleButton padding={padding} {...other} />
}

export default StyledToggleButton
