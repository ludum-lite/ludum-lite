import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  useJoinEventWidgetDataQuery,
  EventPhase,
  useJoinEventMutation,
} from '__generated__/client-types'
import Button from 'components/common/mui/Button'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  ButtonBaseActions,
} from '@material-ui/core'
import useUserLocalStorage from 'hooks/useUserLocalStorage'
import { useLogin } from 'hooks/useLogin'
import Typography from 'components/common/mui/Typography'
import { useFocusJoinEventButton } from 'hooks/useFocusJoinEventButton'

const Root = styled.div`
  display: flex;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
`

const JoinButton = styled(Button)`
  height: 64px;
`

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const { isLoggedIn } = useLogin()
  const { data } = useJoinEventWidgetDataQuery()

  const [, setPreferredEventType] = useUserLocalStorage<'compo' | 'jam' | null>(
    'currentEventPreferredEventType',
    null
  )
  const [showJoinEventDialog, setShowJoinEventDialog] = React.useState<boolean>(
    false
  )

  const handleClose = React.useCallback(() => {
    setShowJoinEventDialog(false)
  }, [])

  const [joinEventMutation] = useJoinEventMutation()

  const joinEvent = React.useCallback(
    async (type: 'jam' | 'compo') => {
      try {
        await joinEventMutation()
        setPreferredEventType(type)
        handleClose()
      } catch (e) {
        console.error(e)
      }
    },
    [setPreferredEventType, handleClose, joinEventMutation]
  )

  const [isJoinEventButtonFocused] = useFocusJoinEventButton()
  const joinEventButtonActionRef = React.useRef<ButtonBaseActions>(null)

  React.useEffect(() => {
    if (isJoinEventButtonFocused) {
      joinEventButtonActionRef.current?.focusVisible()
    }
  }, [isJoinEventButtonFocused])

  const content = React.useMemo(() => {
    if (isLoggedIn) {
      if (data?.featuredEvent?.__typename === 'Event') {
        const featuredEvent = data.featuredEvent

        const joinableEventPhases = [
          EventPhase.ThemeSubmission,
          EventPhase.ThemeSlaughter,
          EventPhase.ThemeVoting,
          EventPhase.EventRunning,
        ]

        return (
          joinableEventPhases.includes(featuredEvent.eventPhase) &&
          !featuredEvent.currentUserGameId && (
            <JoinButton
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => setShowJoinEventDialog(true)}
              action={joinEventButtonActionRef}
            >
              <Typography variant="h4">Join Event!</Typography>
            </JoinButton>
          )
        )
      }
    }
  }, [isLoggedIn, data, joinEventButtonActionRef])

  if (!content) {
    return null
  }

  return (
    <Root className={className}>
      {content}
      <Dialog open={showJoinEventDialog} onClose={handleClose}>
        <DialogTitle>Jam or Compo?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you joining the Jam or Compo? (You can change this later)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            onClick={() => joinEvent('jam')}
            variant="outlined"
            color="primary"
          >
            Jam
          </Button>
          <Button
            fullWidth
            onClick={() => joinEvent('compo')}
            variant="outlined"
            color="primary"
          >
            Compo
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  )
}

gql`
  query JoinEventWidgetData {
    featuredEvent {
      id
      currentUserGameId
      eventPhase
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
