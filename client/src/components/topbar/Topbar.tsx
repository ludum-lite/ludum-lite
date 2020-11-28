import { useSidebarOpen } from 'hooks/useSidebarOpen'
import React from 'react'
import styled from 'styled-components/macro'
import { Hidden, InputAdornment, Toolbar } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AppsIcon from '@material-ui/icons/Apps'
import IconButton from 'components/common/mui/IconButton'
import Input from 'components/common/mui/Input'
import SearchIcon from '@material-ui/icons/Search'
import Icon from 'components/common/mui/Icon'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1100;
  top: 0;
  right: 0;
  position: sticky;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin-left: ${({ theme }) => theme.variables.sidebar.widthPx};
  }
`

const StyledToolbar = styled(Toolbar)`
  align-items: stretch;
`

const SearchInput = styled(Input)`
  border-radius: 0px;
  box-shadow: none;
  background: none;
  flex: 1 1 0px;
  max-width: 400px;

  &:hover {
    box-shadow: none;
  }

  &.Mui-focused {
    box-shadow: none;
  }

  .MuiInputBase-input {
    height: initial;
  }
`

const StyledAppBar = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.themeColors.borderColor};
  margin-left: ${({ theme }) => theme.spacing(2)}px;
`

const StyledIconButton = styled(IconButton)`
  border-radius: 0px;

  &:hover {
    background: ${({ theme }) =>
      theme.themeColors.button.background.page.text?.hoverBackground};
  }
`

const Separator = styled.div`
  flex: 1 1 0px;
`

interface Props {}
export default function Topbar({}: Props) {
  const { setIsSidebarOpen } = useSidebarOpen()

  const onClickLeftIcon = React.useCallback(() => {
    setIsSidebarOpen(true)
  }, [setIsSidebarOpen])

  return (
    <Root>
      <StyledAppBar>
        <StyledToolbar disableGutters>
          <SearchInput
            placeholder="Search"
            startAdornment={
              <InputAdornment position="start">
                <Icon icon={SearchIcon} />
              </InputAdornment>
            }
          />
          <Separator />
          <StyledIconButton aria-label="menu" onClick={onClickLeftIcon}>
            <AppsIcon />
          </StyledIconButton>
        </StyledToolbar>
      </StyledAppBar>
    </Root>
  )
}
