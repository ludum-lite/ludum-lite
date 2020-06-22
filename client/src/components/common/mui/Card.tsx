import React from 'react'
import { Card as MuiCard, CardProps } from '@material-ui/core'
import styled, { css } from 'styled-components/macro'

interface StyledCardProps {
  border?: boolean
  clickable?: boolean
}

const StyledCard = styled(MuiCard).withConfig({
  shouldForwardProp: (prop) => !['border', 'clickable'].includes(prop),
})<StyledCardProps>`
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.03);

  ${({ border }) =>
    border &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.13);
    `}

  ${({ clickable, border }) =>
    clickable &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`

interface Props {
  border?: boolean
  clickable?: boolean
}

export const Card: React.FC<Props & CardProps> = ({
  border,
  clickable,
  ...other
}) => {
  return (
    <StyledCard
      elevation={0}
      border={border}
      clickable={clickable}
      {...other}
    />
  )
}

export default Card
