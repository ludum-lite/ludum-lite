import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  useGameWidgetDataQuery,
  EventPhase,
  useJoinEventMutation,
  useEditGameNameMutation,
} from '__generated__/client-types'
import Button from 'components/common/mui/Button'
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
import useLocalStorage from 'hooks/useLocalStorage'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import GameDetailListItem from './GameDetailListItem'
import Input from 'components/common/mui/Input'

const Root = styled.div`
  display: flex;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  color: white;
`

const GameDetails = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(2)}px;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const GameDetailsBody = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1) * 1.5}px;
  }
`

const GameNameListItem = styled(GameDetailListItem)`
  height: 24px;
`

const JoinButton = styled(Button)`
  height: 64px;
`

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const isLoggedIn = useIsLoggedIn()
  const [gameName, setGameName] = React.useState<string>('')
  const { data } = useGameWidgetDataQuery({
    onCompleted(data) {
      setGameName(data?.featuredEvent?.currentUserGame?.name || '')
    },
  })

  const [preferredEventType, setPreferredEventType] = useLocalStorage<
    'compo' | 'jam' | null
  >('currentEventPreferredEventType', null)
  const [showJoinEventDialog, setShowJoinEventDialog] = React.useState<boolean>(
    false
  )
  const [editGameNameMutation] = useEditGameNameMutation()

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

  const content = React.useMemo(() => {
    if (isLoggedIn) {
      if (data?.featuredEvent?.__typename === 'Event') {
        if (data.featuredEvent.currentUserGameId) {
          return (
            <GameDetails>
              <TopRow>
                <Typography variant="h6">My Game</Typography>
                <IconButton background="contextualNav" size="small">
                  <Icon icon={MoreHorizIcon} />
                </IconButton>
              </TopRow>
              <GameDetailsBody>
                <GameNameListItem
                  label="Name"
                  value={
                    <Input
                      background="transparent"
                      textColor="white"
                      placeholder="Enter a name..."
                      fullWidth
                      flushLeftEdge
                      onChange={(e) => {
                        setGameName(e.target.value)
                      }}
                      onBlur={() => {
                        if (data.featuredEvent.currentUserGameId) {
                          editGameNameMutation({
                            variables: {
                              input: {
                                id: data.featuredEvent.currentUserGameId,
                                name: gameName,
                              },
                            },
                          })
                        }
                      }}
                      value={gameName}
                    />
                  }
                />
                <GameDetailListItem label="Status" value="Not Submitted" />
                <GameDetailListItem label="Ratings Recieved" value="0" />
                <GameDetailListItem label="Comments" value="0" />
              </GameDetailsBody>
            </GameDetails>
          )
        } else {
          const featuredEvent = data.featuredEvent

          const joinableEventPhases = [
            EventPhase.ThemeSelection,
            EventPhase.ThemeSlaughter,
            EventPhase.ThemeVoting,
            EventPhase.EventRunning,
          ]

          return (
            joinableEventPhases.includes(featuredEvent.eventPhase) &&
            !featuredEvent.currentUserGameId && (
              <JoinButton
                fullWidth
                background="contextualNav"
                onClick={() => setShowJoinEventDialog(true)}
              >
                <Typography variant="h6">Join Event!</Typography>
              </JoinButton>
            )
          )
        }
      }
    }
  }, [data, isLoggedIn, gameName, editGameNameMutation])

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
          <Button fullWidth onClick={() => joinEvent('jam')}>
            Jam
          </Button>
          <Button fullWidth onClick={() => joinEvent('compo')}>
            Compo
          </Button>
        </DialogActions>
      </Dialog>
    </Root>
  )
}

gql`
  query GameWidgetData {
    featuredEvent {
      id
      currentUserGameId
      currentUserGame {
        id
        name
      }
      eventPhase
    }
  }

  mutation EditGameName($input: EditGameNameInput!) {
    editGameName(input: $input) {
      ... on EditGameNameResponseSuccess {
        game {
          id
          name
        }
      }
    }
  }
`
