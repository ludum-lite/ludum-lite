import React, { useEffect } from 'react'
import StickyBox from 'react-sticky-box'
import styled, { css } from 'styled-components/macro'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import { Hidden, Toolbar } from '@material-ui/core'
import { useNotificationBar } from 'hooks/useNotificationBar'

interface StyledStickyBoxProps {
  hasNotificationBar: boolean
}
const StyledStickyBox = styled(StickyBox)<StyledStickyBoxProps>`
  ${({ hasNotificationBar }) =>
    hasNotificationBar &&
    css`
      /* Workaround for react-sticky-box behavior where the notification bar above the sticky element
  causing jumping when scrolling up the page */
      margin-top: -64px;
      padding-top: 64px;
    `}
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 200;
`

const StickyBreadcrumbContainer = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1000;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const BreadcrumbContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
`

const StyledAppBar = styled.div`
  z-index: 1000;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: stretch;
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.themeColors.borderColors.level1};

  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

const Content = styled.div``

interface Props {
  children: React.ReactNode
  breadcrumbs?: React.ReactNode
}
export default function Page({ children, breadcrumbs }: Props) {
  const [, setUsePostOverlay] = usePostOverlayed()
  const { notificationBar } = useNotificationBar()

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
    <StyledStickyBox hasNotificationBar={!!notificationBar}>
      <Root>
        <Hidden mdUp>{breadcrumbBar}</Hidden>
        <Hidden smDown>
          <StickyBreadcrumbContainer>{breadcrumbBar}</StickyBreadcrumbContainer>
        </Hidden>
        <Content>{children}</Content>
      </Root>
    </StyledStickyBox>
  )
}

Page.displayName = 'Page'
