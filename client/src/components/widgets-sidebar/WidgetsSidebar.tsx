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

const WidgetsContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.themeColors.borderColors.level1};
  height: 100%;
`

const SearchInputContainer = styled.div`
  display: flex;
  min-height: ${({ theme }) => theme.spacing(8)}px;
  padding: 0 ${({ theme }) => theme.spacing(1)}px;
  position: fixed;
  top: 0px;
  width: ${WIDTH}px;
  z-index: 1000;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const SearchInput = styled(Input)`
  border-radius: 0px;
  box-shadow: none;
  background: none;
  flex: 1 1 0px;
  max-width: 400px;
  border-bottom: 1px solid
    ${({ theme }) => theme.themeColors.borderColors.level1};

  &:hover {
    box-shadow: none;
    background: ${({ theme }) =>
      theme.themeColors.topbar.searchInput.hoverBackground};
  }

  &.Mui-focused {
    box-shadow: none;
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

const WidgetContainer = styled.div`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) => theme.themeColors.backgrounds.level2};
  border: 1px solid ${({ theme }) => theme.themeColors.borderColors.level2};
  padding: ${({ theme }) => theme.spacing(2)}px;
`

export default function WidgetsSidebar() {
  const {
    isWidgetsSidebarOpen,
    setIsWidgetsSidebarOpen,
  } = useWidgetsSidebarOpen()

  const closeSidebar = React.useCallback(() => {
    setIsWidgetsSidebarOpen(false)
  }, [setIsWidgetsSidebarOpen])

  return (
    <Fragment>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden mdUp implementation="css">
        <StyledDrawer
          anchor="left"
          open={isWidgetsSidebarOpen}
          onClose={closeSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <WidgetsContainer>
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
              <WidgetContainer>
                <CountdownWidget events={events} />
              </WidgetContainer>
              <WidgetContainer>
                <GameWidget />
              </WidgetContainer>
              <WidgetContainer>
                <TeamWidget />
              </WidgetContainer>
              <JoinEventWidget />
            </Widgets>
          </WidgetsContainer>
        </StyledDrawer>
      </Hidden>
      <StyledHidden smDown implementation="css">
        <WidgetsContainer>
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
              <WidgetContainer>
                <CountdownWidget events={events} />
              </WidgetContainer>
              <WidgetContainer>
                <GameWidget />
              </WidgetContainer>
              <WidgetContainer>
                <TeamWidget />
              </WidgetContainer>
              <JoinEventWidget />
            </Widgets>
          </StickyBox>
        </WidgetsContainer>
      </StyledHidden>
    </Fragment>
  )
}
