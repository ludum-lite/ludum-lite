import React from 'react'
import StickyBox from 'react-sticky-box'
import styled, { css } from 'styled-components/macro'
import { InputAdornment } from '@material-ui/core'
import { events } from 'utils'
import CountdownWidget from '../sidebar/CountdownWidget'
import TeamWidget from '../team-widget/TeamWidget'
import GameWidget from '../game-widget/GameWidget'
import SearchIcon from '@material-ui/icons/Search'
import Icon from 'components/common/mui/Icon'
import Input from 'components/common/mui/Input'

const WidgetsContainer = styled.div`
  border-left: 1px solid ${({ theme }) => theme.themeColors.borderColor};
`

const SearchInputContainer = styled.div`
  display: flex;
  min-height: ${({ theme }) => theme.spacing(8)}px;
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.borderColor};
  margin: 0 ${({ theme }) => theme.spacing(1)}px;
`

const SearchInput = styled(Input)`
  border-radius: 0px;
  box-shadow: none;
  background: none;
  flex: 1 1 0px;
  max-width: 400px;

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
  min-width: 277px;
  width: 277px;
  padding: ${({ theme }) => theme.spacing(2)}px;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface CommonWidgetProps {
  hide?: boolean
  hasTabs?: boolean
}
const widgetContainerStyles = ({ hide, hasTabs }: CommonWidgetProps) => css`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: hidden;
  display: ${hide && 'none'};
  border-top-left-radius: ${hasTabs && 0};
`

const StyledCountdownWidget = styled(CountdownWidget)<CommonWidgetProps>`
  ${widgetContainerStyles}
`

const StyledGameWidget = styled(GameWidget)<CommonWidgetProps>`
  ${widgetContainerStyles}
`

const StyledTeamWidget = styled(TeamWidget)<CommonWidgetProps>`
  ${widgetContainerStyles}
`

export default function WidgetsSidebar() {
  return (
    <WidgetsContainer>
      <StickyBox>
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
          <StyledCountdownWidget events={events} />
          <StyledGameWidget />
          <StyledTeamWidget />
        </Widgets>
      </StickyBox>
    </WidgetsContainer>
  )
}
