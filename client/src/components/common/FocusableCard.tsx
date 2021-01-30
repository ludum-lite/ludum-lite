import React from 'react'
import styled, { css, keyframes } from 'styled-components/macro'
import { ignoreProps } from 'utils'

const activeBoxShadowKeyFrames = (color: string) => keyframes`
  0% {
    box-shadow: inset 6px 0 0px 0px transparent;
  }

  100% {
    box-shadow: inset 6px 0 0px 0px ${color};
  }
`

interface RootProps {
  active?: boolean
}
const Root = styled.div.withConfig({
  shouldForwardProp: ignoreProps(['active']),
})<RootProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  transition: box-shadow 5000ms;
  border-bottom: 1px solid
    ${({ theme }) => theme.themeColors.borderColors.level1};

  &:first-child {
    border-top: 1px solid
      ${({ theme }) => theme.themeColors.borderColors.level1};
  }

  ${({ active, theme }) =>
    active &&
    css`
      animation: ${activeBoxShadowKeyFrames(
          theme.themeColors.post.activeBorderColor
        )}
        250ms forwards;
    `}
`

interface Props {
  active?: boolean
  className?: string
  onClick?: () => void
  children?: React.ReactNode
}
export default function FocusableCard(props: Props) {
  return <Root {...props} />
}

FocusableCard.displayName = 'FocusableCard'
