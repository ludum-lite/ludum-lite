import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import { useTeamWidgetDataQuery } from '__generated__/client-types'
import { Typography } from '@material-ui/core'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import TeamMember from './TeamMember'
import AddTeamMemberButton from './AddTeamMemberButton'

const Root = styled.div`
  display: flex;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  color: white;
  padding: ${({ theme }) => theme.spacing(2)}px;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const TeamList = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-end;

  & > *:not(:last-child) {
    margin-left: -8px;
  }
`

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const isLoggedIn = useIsLoggedIn()
  const { data } = useTeamWidgetDataQuery()

  if (isLoggedIn) {
    if (data?.featuredEvent?.__typename === 'Event') {
      if (data.featuredEvent.currentUserGameId) {
        return (
          <Root className={className}>
            <TopRow>
              <Typography variant="h6">My Team</Typography>
              <IconButton background="globalNav" size="small">
                <Icon icon={MoreHorizIcon} />
              </IconButton>
            </TopRow>
            <TeamList>
              <AddTeamMemberButton />
              <TeamMember avatarPath="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" />
              <TeamMember
                avatarPath="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                leader
              />
            </TeamList>
          </Root>
        )
      }
    }
  }

  return null
}

gql`
  fragment TeamWidget_event on Event {
    id
    currentUserGameId
    eventPhase
  }

  query TeamWidgetData {
    featuredEvent {
      ...TeamWidget_event
    }
  }

  mutation JoinEvent {
    joinEvent {
      ... on JoinEventSuccess {
        gameId
        featuredEvent {
          id
          currentUserGameId
        }
      }
    }
  }
`
