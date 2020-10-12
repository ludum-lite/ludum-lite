import Typography from 'components/common/mui/Typography'
import React from 'react'
import styled, { css } from 'styled-components/macro'
import { ignoreProps } from 'utils'

interface TitleTagProps {
  backgroundVariant: 'contained' | 'inverted'
}
const Root = styled(Typography).withConfig({
  shouldForwardProp: ignoreProps(['backgroundVariant']),
})<TitleTagProps>`
  flex: 0 0 auto;
  display: flex;
  font-weight: bold;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(2)}px`};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;

  ${({ backgroundVariant, theme }) =>
    backgroundVariant === 'inverted' &&
    css`
      background: ${theme.themeColors.post.backgroundColor};
      color: ${theme.themeColors.post.newsTagBackground};
    `}

  ${({ backgroundVariant, theme }) =>
    backgroundVariant === 'contained' &&
    css`
      background: ${theme.themeColors.post.newsTagBackground};
      color: ${theme.themeColors.post.newsTagColor};
    `}
`

interface Props {
  className?: string
  variant: 'contained' | 'inverted'
}
export default function NewsTag({ className, variant }: Props) {
  return (
    <Root className={className} backgroundVariant={variant} variant="h5">
      News
    </Root>
  )
}
