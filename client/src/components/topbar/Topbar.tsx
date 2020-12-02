import { useSidebarOpen } from 'hooks/useSidebarOpen'
import React from 'react'
import styled from 'styled-components/macro'
import { Hidden, Toolbar } from '@material-ui/core'
import AppsIcon from '@material-ui/icons/Apps'
import IconButton from 'components/common/mui/IconButton'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1100;
  top: 0;
  right: 0;
  position: sticky;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const StyledAppBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.borderColor};

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0px ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: stretch;
`

const StyledIconButton = styled(IconButton)`
  border-radius: 0px;
  width: 64px;
`

const Separator = styled.div`
  flex: 1 1 0px;
`

export default function Topbar() {
  const { setIsSidebarOpen } = useSidebarOpen()

  const onClickLeftIcon = React.useCallback(() => {
    setIsSidebarOpen(true)
  }, [setIsSidebarOpen])

  return (
    <Hidden mdUp>
      <Root>
        <StyledAppBar>
          <StyledToolbar disableGutters>
            <Separator />
            <StyledIconButton aria-label="menu" onClick={onClickLeftIcon}>
              <AppsIcon />
            </StyledIconButton>
          </StyledToolbar>
        </StyledAppBar>
      </Root>
    </Hidden>
  )
}
