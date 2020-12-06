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
  ${({ border }) =>
    border &&
    css`
      border: 1px solid ${({ theme }) => theme.themeColors.borderColors.level1};
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
