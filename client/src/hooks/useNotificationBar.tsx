import React from 'react'
import styled from 'styled-components/macro'
import Typography from 'components/common/mui/Typography'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import ForwardIcon from '@material-ui/icons/Forward'
import { getCurrentEvent, events, findCurrentPhase, EventPhase } from 'utils'
import { EventPhase as ServerEventPhase } from '__generated__/client-types'
import moment from 'moment'
import Link from 'components/common/mui/Link'
import { singletonHook } from 'react-singleton-hook'
import { useFeaturedEvent } from './useFeaturedEvent'

type UseNotificationBarReturnType = {
  notificationBar: React.ReactElement | null
}

const init: UseNotificationBarReturnType = {
  notificationBar: null,
} as const

const Root = styled.div`
  background: ${({ theme }) => theme.themeColors.palette.secondary.main};
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spacing(8)}px;
  color: white;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: ${({ theme }) => theme.spacing(2)}px;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    padding: 0 ${({ theme }) => theme.spacing(2)}px;
  }
`

const NotificationTitle = styled(Typography)`
  font-size: 1.2rem;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

export const useNotificationBar = singletonHook(init, () => {
  const { featuredEvent } = useFeaturedEvent()
  const currentEvent = getCurrentEvent(events)
  const currentPhase = currentEvent && findCurrentPhase(currentEvent.timeline)

  const title = React.useMemo(() => {
    if (featuredEvent) {
      if (featuredEvent.eventPhase === ServerEventPhase.ThemeSubmission) {
        return 'Theme suggestions are open!'
      } else if (featuredEvent.eventPhase === ServerEventPhase.ThemeSlaughter) {
        return 'Theme slaughter in progress!'
      } else if (featuredEvent.eventPhase === ServerEventPhase.ThemeVoting) {
        if (currentPhase === EventPhase.ThemeVotingRound1) {
          return 'Theme voting round 1 in progress!'
        } else if (currentPhase === EventPhase.ThemeVotingRound2) {
          return 'Theme voting round 2 in progress!'
        } else if (currentPhase === EventPhase.ThemeVotingRound3) {
          return 'Theme voting round 3 in progress!'
        } else if (currentPhase === EventPhase.ThemeVotingFinal) {
          return 'Theme voting final round in progress!'
        } else {
          // Hopefully this never shows since we should be accurate in our predictions for when each round of voting is happening
          return 'Theme voting in progress!'
        }
      } else if (
        featuredEvent.eventPhase === ServerEventPhase.EventRunning &&
        featuredEvent.theme
      ) {
        const theme = <strong>{featuredEvent.theme}</strong>
        return (
          <span>
            The Ludum Dare {currentEvent?.eventNumber} theme is {theme}!
          </span>
        )
      } else if (featuredEvent.eventPhase === ServerEventPhase.GameVoting) {
        return `Play and vote for your favorite games now!`
      } else if (featuredEvent.eventPhase === ServerEventPhase.Results) {
        const twoMonthsAfterEnd = moment().isAfter(
          currentEvent?.timeline.Results.clone().add(2, 'months')
        )

        if (!twoMonthsAfterEnd) {
          return `Voting for Ludum Dare ${
            currentEvent?.eventNumber
          } has ended! See you at ${
            currentEvent
              ? `Ludum Dare ${currentEvent.eventNumber + 1}`
              : 'the next Ludum Dare'
          }!`
        }
      }
    }

    return null
  }, [featuredEvent, currentPhase, currentEvent])

  const actionButton = React.useMemo(() => {
    if (featuredEvent?.eventPhase === ServerEventPhase.EventRunning) {
      return null
    } else {
      return (
        <IconButton
          component={Link}
          // @ts-ignore
          to={`events/${featuredEvent?.id}/theme`}
          color="white"
        >
          <Icon icon={ForwardIcon} />
        </IconButton>
      )
    }
  }, [featuredEvent])

  const notificationBar = React.useMemo(() => {
    if (title) {
      return (
        <Root>
          <NotificationTitle>{title}</NotificationTitle>
          {actionButton}
        </Root>
      )
    }

    return null
  }, [actionButton, title])

  return {
    notificationBar,
  }
})
