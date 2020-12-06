import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  useGameWidgetDataQuery,
  useGameWidget_EditGameMutation,
} from '__generated__/client-types'
import { useLogin } from 'hooks/useLogin'
import GameDetailListItem from './GameDetailListItem'
import Input from 'components/common/mui/Input'
import { useSnackbar } from 'notistack'
import { useMinLoadingTime } from 'hooks/useMinLoadingTime'
import Typography from 'components/common/mui/Typography'

const Root = styled.div`
  display: flex;
  /* Balance top spacing created by text leading and icon button height */
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const GameDetails = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
  min-height: 40px;
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

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const gameNameInputRef = React.useRef<HTMLInputElement>(null)
  const { enqueueSnackbar } = useSnackbar()
  const { isLoggedIn } = useLogin()
  const [gameName, setGameName] = React.useState<string>('')
  const { data } = useGameWidgetDataQuery({
    onCompleted(data) {
      setGameName(data?.featuredEvent?.currentUserGame?.name || '')
    },
  })

  const [editGameNameMutation] = useGameWidget_EditGameMutation()
  const { fn: editGameName } = useMinLoadingTime(editGameNameMutation)

  const persistedGameName = data?.featuredEvent.currentUserGame?.name

  React.useEffect(() => {
    if (persistedGameName) {
      setGameName(persistedGameName)
    }
  }, [persistedGameName])

  const content = React.useMemo(() => {
    if (isLoggedIn) {
      if (data?.featuredEvent?.__typename === 'Event') {
        if (data.featuredEvent.currentUserGameId) {
          return (
            <GameDetails>
              <TopRow>
                <Typography variant="h4" bold>
                  My Game
                </Typography>
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
                      ref={gameNameInputRef}
                      onKeyDown={async (e) => {
                        if (e.key === 'Enter') {
                          gameNameInputRef.current?.blur()
                        }
                      }}
                      onBlur={async () => {
                        if (
                          data?.featuredEvent.currentUserGameId &&
                          data?.featuredEvent.currentUserGame?.name !== gameName
                        ) {
                          console.log({
                            name: data?.featuredEvent.currentUserGame?.name,
                            gameName,
                          })
                          await editGameName({
                            variables: {
                              input: {
                                id: data.featuredEvent.currentUserGameId,
                                name: gameName,
                              },
                            },
                          })

                          enqueueSnackbar(
                            `Successfully updated your game's name to: ${gameName}`,
                            {
                              variant: 'success',
                            }
                          )
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
        }
      }
    }
  }, [isLoggedIn, data, gameName, editGameName, enqueueSnackbar])

  if (!content) {
    return null
  }

  return <Root className={className}>{content}</Root>
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

  mutation GameWidget_EditGame($input: EditGameInput!) {
    editGame(input: $input) {
      ... on EditGameSuccess {
        game {
          id
          name
        }
      }
    }
  }
`
