import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import {
  List,
  ListItem as MuiListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { ReactComponent as LudumLogo } from 'assets/ludum.svg'
import { ReactComponent as DareLogo } from 'assets/dare.svg'

import { useSidebarDataQuery, EventPhase } from '__generated__/client-types'
import { Link as RouterLink, useParams } from 'react-router-dom'
import GlobalNav from './GlobalNav'
import CountdownWidget from './CountdownWidget'
import { events } from 'utils'

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

const JoinEventListItem = styled(ListItem)`
  border: 2px dashed rgba(255, 255, 255, 0.85);
`

const StyledLudumLogo = styled(LudumLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.portlandOrange};
  height: 35px;
`

const StyledDareLogo = styled(DareLogo)`
  fill: ${({ theme }) => theme.ldStyleVariables.darkOrange};
  height: 35px;
  margin-top: 10px;
`

const Separator = styled.div`
  flex: 1 1 0px;
`

const StyledCountdownWidget = styled(CountdownWidget)`
  max-height: 500px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const paths = [
  {
    url: 'posts',
    text: 'Feed',
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

interface Props {}
export default function Sidebar({}: Props) {
  const { basePath } = useParams()
  const { data } = useSidebarDataQuery()

  const JoinButton = React.useMemo(() => {
    if (data?.featuredEvent?.__typename === 'Event') {
      const featuredEvent = data.featuredEvent

      return (
        featuredEvent.eventPhase === EventPhase.EventRunning &&
        !featuredEvent.currentUserGameId && (
          <JoinEventListItem button>
            <ListItemText primary="Join Event!" />
          </JoinEventListItem>
        )
      )
    }
  }, [data])

  return (
    <Root>
      <GlobalNav />
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
          {JoinButton}
        </List>
        <Separator />
        <StyledCountdownWidget events={events} />
      </ContextualNav>
    </Root>
  )
}

Sidebar.fragments = {
  event: gql`
    fragment Sidebar_event on Event {
      id
      currentUserGameId
      eventPhase
    }
  `,
}

gql`
  query SidebarData {
    featuredEvent {
      ...Sidebar_event
    }

    ${Sidebar.fragments.event}
  }
`
