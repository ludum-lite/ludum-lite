import React from 'react'
import styled from 'styled-components/macro'
import {
  List,
  ListItem as MuiListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { ReactComponent as LudumLogo } from 'assets/ludum.svg'
import { ReactComponent as DareLogo } from 'assets/dare.svg'

import { Link as RouterLink, useParams } from 'react-router-dom'
import GlobalNav from './GlobalNav'
import { ThemeMode } from 'utils/types'

const Root = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
`

const ContextualNav = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.spacing(34)}px;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  padding: 0px ${({ theme }) => theme.spacing(2)}px;
`

const Title = styled(Typography)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: ${({ theme }) => theme.spacing(4)}px 0px;
`

const ListItem = styled(MuiListItem)`
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  transition: none;
  color: white;

  &.Mui-selected {
    background: ${({ theme }) => theme.themeColors.globalNavBackground};

    &:hover {
      background: ${({ theme }) => theme.themeColors.globalNavBackground};
    }
  }

  &:not(.Mui-selected) {
    &:hover {
      background: rgba(255, 255, 255, 0.24);
    }
  }
` as typeof MuiListItem

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.portlandOrange};
  height: 35px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.darkOrange};
  height: 35px;
  margin-top: 10px;
`

const paths = [
  {
    url: 'posts',
    text: 'Posts',
  },
  {
    url: 'news',
    text: 'News',
  },
  {
    url: 'games',
    text: 'Games',
  },
  {
    url: 'events',
    text: 'Events',
  },
]

interface Props {
  toggleTheme: () => void
  themeMode: ThemeMode
}
export default function Sidebar({ toggleTheme, themeMode }: Props) {
  const { basePath } = useParams()

  return (
    <Root>
      <GlobalNav toggleTheme={toggleTheme} themeMode={themeMode} />
      <ContextualNav>
        <Title>
          <StyledLudumLogo />
          <StyledDareLogo />
        </Title>
        <List disablePadding>
          {paths.map((path) => (
            <ListItem
              key={path.url}
              button
              selected={basePath === path.url}
              component={RouterLink}
              to={`/${path.url}`}
            >
              <ListItemText primary={path.text} />
            </ListItem>
          ))}
        </List>
      </ContextualNav>
    </Root>
  )
}
