import React from 'react'
import styled from 'styled-components/macro'
import {
  List,
  ListItem as MuiListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'

import { Link as RouterLink, useParams } from 'react-router-dom'
import GlobalNav from './GlobalNav'

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
  color: white;
  font-size: 32px;
  padding: ${({ theme }) => theme.spacing(4)}px 0px;
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

export default function Sidebar() {
  const { basePath } = useParams()

  return (
    <Root>
      <GlobalNav />
      <ContextualNav>
        <Title>Ludum Dare</Title>
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
