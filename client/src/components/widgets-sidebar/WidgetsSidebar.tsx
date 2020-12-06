import React, { Fragment } from 'react'
import StickyBox from 'react-sticky-box'
import styled from 'styled-components/macro'
import { Drawer, Hidden, InputAdornment } from '@material-ui/core'
import { events } from 'utils'
import CountdownWidget from '../sidebar/CountdownWidget'
import TeamWidget from '../team-widget/TeamWidget'
import GameWidget from '../game-widget/GameWidget'
import JoinEventWidget from '../join-event-widget/JoinEventWidget'
import SearchIcon from '@material-ui/icons/Search'
import Icon from 'components/common/mui/Icon'
import Input from 'components/common/mui/Input'
import { useWidgetsSidebarOpen } from 'hooks/useWidgetsSidebarOpen'

const WIDTH = 277

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorDockedRight {
    border-left: none;
  }
`

const StyledHidden = styled(Hidden)`
  height: 100%;
`

const Root = styled.div`
  height: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    box-shadow: -1px 0 0 0
      ${({ theme }) => theme.themeColors.borderColors.level1};
  }
`

const SearchInputContainer = styled.div`
  display: flex;
  min-height: ${({ theme }) => theme.spacing(8)}px;
  position: fixed;
  top: 0px;
  width: ${WIDTH}px;
  z-index: 1000;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 0 ${({ theme }) => theme.spacing(1)}px;
  }
`

const SearchInput = styled(Input)`
  border-radius: 0px;
  box-shadow: none;
  background: none;
  flex: 1 1 0px;
  max-width: 400px;
  box-shadow: 0 1px 0 0 ${({ theme }) => theme.themeColors.borderColors.level1};

  &:hover {
    box-shadow: 0 1px 0 0
      ${({ theme }) => theme.themeColors.borderColors.level1};
    background: ${({ theme }) =>
      theme.themeColors.topbar.searchInput.hoverBackground};
  }

  &.Mui-focused {
    box-shadow: 0 1px 0 0
      ${({ theme }) => theme.themeColors.borderColors.level1};
    background: ${({ theme }) =>
      theme.themeColors.topbar.searchInput.focusBackground};
  }

  .MuiInputBase-input {
    height: initial;
  }
`

const Widgets = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  min-width: ${WIDTH}px;
  width: ${WIDTH}px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  padding-top: ${({ theme }) => theme.spacing(10)}px;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  }
`

export default function WidgetsSidebar() {
  const {
    isWidgetsSidebarOpen,
    setIsWidgetsSidebarOpen,
  } = useWidgetsSidebarOpen()

  const closeSidebar = React.useCallback(() => {
    setIsWidgetsSidebarOpen(false)
  }, [setIsWidgetsSidebarOpen])

  console.log(isWidgetsSidebarOpen)

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <StyledDrawer
          anchor="right"
          open={isWidgetsSidebarOpen}
          onClose={closeSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Root>
            <SearchInputContainer>
              <SearchInput
                placeholder="Search"
                startAdornment={
                  <InputAdornment position="start">
                    <Icon icon={SearchIcon} />
                  </InputAdornment>
                }
              />
            </SearchInputContainer>
            <Widgets>
              <CountdownWidget events={events} />
              <GameWidget />
              <TeamWidget />
              <JoinEventWidget />
            </Widgets>
          </Root>
        </StyledDrawer>
      </Hidden>
      <StyledHidden smDown implementation="css">
        <Root>
          <SearchInputContainer>
            <SearchInput
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <Icon icon={SearchIcon} />
                </InputAdornment>
              }
            />
          </SearchInputContainer>
          <StickyBox>
            <Widgets>
              <CountdownWidget events={events} />
              <GameWidget />
              <TeamWidget />
              <JoinEventWidget />
            </Widgets>
          </StickyBox>
        </Root>
      </StyledHidden>
    </Fragment>
  )
}
