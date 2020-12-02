import React, { useEffect } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import { Hidden, Toolbar } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 200;
`

const StyledAppBar = styled.div`
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
  z-index: 1000;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: stretch;
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.borderColor};
`

const StickyBreadcrumbContainer = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1000;
`

const BreadcrumbContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
`

const Content = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px;
`

interface Props {
  children: React.ReactNode
  breadcrumbs?: React.ReactNode
}
export default function Page({ children, breadcrumbs }: Props) {
  const [, setUsePostOverlay] = usePostOverlayed()

  useEffect(() => {
    return () => {
      setUsePostOverlay(false)
    }
  }, [setUsePostOverlay])

  const breadcrumbBar = (
    <StyledAppBar>
      <StyledToolbar disableGutters>
        <BreadcrumbContainer>{breadcrumbs}</BreadcrumbContainer>
      </StyledToolbar>
    </StyledAppBar>
  )

  return (
    <Root>
      <Hidden mdUp>{breadcrumbBar}</Hidden>
      <Hidden smDown>
        <StickyBreadcrumbContainer>{breadcrumbBar}</StickyBreadcrumbContainer>
      </Hidden>
      <Content>{children}</Content>
    </Root>
  )
}
