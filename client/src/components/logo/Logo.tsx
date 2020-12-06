import React from 'react'
import styled from 'styled-components/macro'
import { ReactComponent as LudumLogo } from 'assets/ludum.svg'
import { ReactComponent as DareLogo } from 'assets/dare.svg'

const Root = styled.div`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.themeColors.logo.ludumBackground};
  height: 30px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.themeColors.logo.dareBackground};
  height: 30px;
`

interface Props {
  className?: string
}
export default function Logo({ className }: Props) {
  return (
    <Root className={className}>
      <StyledLudumLogo />
      <StyledDareLogo />
    </Root>
  )
}
