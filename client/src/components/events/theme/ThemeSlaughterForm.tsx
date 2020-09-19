import React from 'react'
import { gql } from '@apollo/client'
import styled, { css } from 'styled-components/macro'
import {
  ThemeSlaughterForm_EventFragment,
  useApproveEventIdeaMutation,
  useRejectEventIdeaMutation,
  useFlagEventIdeaMutation,
} from '__generated__/client-types'
import { sample, sortBy, partition } from 'lodash'
import Button from 'components/common/mui/Button'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Typography from 'components/common/mui/Typography'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import FlagIcon from '@material-ui/icons/Flag'
import useUserLocalStorage from 'hooks/useUserLocalStorage'
import Input from 'components/common/mui/Input'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

const ThemeTitle = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const Suggestion = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background: ${({ theme }) =>
    theme.themeColors.slaughterSuggestion.background};
  align-self: stretch;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(5)}px`};
  min-height: 50px;
  box-shadow: ${({ theme }) => theme.themeColors.cardBoxShadow_bottomHeavy};
`

const SuggestionFlagButtonContainer = styled.div`
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
`

const SuggestionActions = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`

const PreviousVotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-top: ${({ theme }) => theme.spacing(5)}px;
`

const PreviousVotesActionsRow = styled.div`
  display: flex;
  justify-content: space-between;
`

const PreviousVotes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  overflow: auto;
  max-height: 500px;
  box-shadow: ${({ theme }) => theme.themeColors.cardBoxShadow_bottomHeavy};
`

const PreviousVote = styled.div`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) =>
    theme.themeColors.rows.background.white.background};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }
`

interface PreviousVoteSideIndicatorProps {
  vote: number | null | undefined
}
const PreviousVoteSideIndicator = styled.div<PreviousVoteSideIndicatorProps>`
  width: 4px;

  ${({ vote, theme }) => {
    let background

    if (vote === 1) {
      background = theme.themeColors.button.color.contained.successBackground
    } else if (vote === 0) {
      background = theme.themeColors.button.color.contained.errorBackground
    } else if (vote === -1) {
      background = theme.themeColors.defaultIconBlack
    }

    return css`
      background: ${background};
    `
  }}
`

const PreviousVoteContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(1)}px`};
`

const PreviousVoteName = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

const PreviousVoteActions = styled(ButtonGroup)``

// type FormInputs = {
//   name: string
// }

interface Props {
  event: ThemeSlaughterForm_EventFragment
}
export default function ThemeSlaughterForm({ event }: Props) {
  const [themeIdeaVoteOrder, setThemeIdeaVoteOrder] = useUserLocalStorage<
    number[]
  >('themeIdeaVoteOrder', [])
  const [approveEventIdeaMutation] = useApproveEventIdeaMutation()
  const [rejectEventIdeaMutation] = useRejectEventIdeaMutation()
  const [flagEventIdeaMutation] = useFlagEventIdeaMutation()
  const [searchValue, setSearchValue] = React.useState('')

  const approveEventIdea = React.useCallback(
    (eventIdeaId: number) => {
      approveEventIdeaMutation({
        variables: {
          input: {
            id: eventIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.approveEventIdea.__typename === 'ApproveEventIdeaSuccess') {
            cache.modify({
              id: `EventIdea:${eventIdeaId}`,
              fields: {
                myVote: () => 1,
              },
            })
          }
        },
      })
    },
    [approveEventIdeaMutation]
  )

  const rejectEventIdea = React.useCallback(
    (eventIdeaId: number) => {
      rejectEventIdeaMutation({
        variables: {
          input: {
            id: eventIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.rejectEventIdea.__typename === 'RejectEventIdeaSuccess') {
            cache.modify({
              id: `EventIdea:${eventIdeaId}`,
              fields: {
                myVote: () => 0,
              },
            })
          }
        },
      })
    },
    [rejectEventIdeaMutation]
  )

  const flagEventIdea = React.useCallback(
    (eventIdeaId: number) => {
      flagEventIdeaMutation({
        variables: {
          input: {
            id: eventIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.flagEventIdea.__typename === 'FlagEventIdeaSuccess') {
            cache.modify({
              id: `EventIdea:${eventIdeaId}`,
              fields: {
                myVote: () => -1,
              },
            })
          }
        },
      })
    },
    [flagEventIdeaMutation]
  )

  const remainingEventIdeas = React.useMemo(() => {
    return (
      event.eventIdeas?.filter((eventIdea) => eventIdea.myVote === null) || []
    )
  }, [event.eventIdeas])

  // Use the locally preserved order of voting. Keep votes that happened on ldjam to the bottom since we don't know
  // how to sort those
  const votedEventIdeas = React.useMemo(() => {
    const votedEventIdeasUnsorted =
      event.eventIdeas?.filter((eventIdea) => eventIdea.myVote !== null) || []

    const [
      ideasVotedOnLdLite,
      ideasNotVotedOnLdLite,
    ] = partition(votedEventIdeasUnsorted, (eventIdea) =>
      themeIdeaVoteOrder.includes(eventIdea.id)
    )

    const ideasVotedOnLdLiteSorted = sortBy(ideasVotedOnLdLite, [
      (eventIdea) => {
        return themeIdeaVoteOrder.indexOf(eventIdea.id)
      },
    ])

    const result = [...ideasVotedOnLdLiteSorted, ...ideasNotVotedOnLdLite]

    return result
  }, [event.eventIdeas, themeIdeaVoteOrder])

  const filteredRemainingEventIdeas = React.useMemo(() => {
    return remainingEventIdeas.filter((eventIdea) =>
      eventIdea.name.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [remainingEventIdeas, searchValue])

  const [currentEventIdea, setCurrentEventIdea] = React.useState(() =>
    sample(remainingEventIdeas)
  )

  const remainingEventIdeasWithoutCurrent = React.useMemo(() => {
    if (currentEventIdea) {
      return (
        remainingEventIdeas.filter(
          (eventIdea) => eventIdea.id !== currentEventIdea.id
        ) || []
      )
    }

    return []
  }, [remainingEventIdeas, currentEventIdea])

  return (
    <Root>
      <ThemeTitle variant="h5">Would this be a good Theme?</ThemeTitle>
      {currentEventIdea && (
        <>
          <Suggestion>
            <Typography variant="h4" bold>
              {currentEventIdea.name}
            </Typography>
            <SuggestionFlagButtonContainer>
              <IconButton
                onClick={() => {
                  flagEventIdea(currentEventIdea.id)
                  setThemeIdeaVoteOrder([
                    currentEventIdea.id,
                    ...themeIdeaVoteOrder,
                  ])
                  setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
                }}
              >
                <Icon icon={FlagIcon} />
              </IconButton>
            </SuggestionFlagButtonContainer>
          </Suggestion>
          <SuggestionActions>
            <Button
              size="large"
              variant="contained"
              customColor="success"
              onClick={() => {
                approveEventIdea(currentEventIdea.id)
                setThemeIdeaVoteOrder([
                  currentEventIdea.id,
                  ...themeIdeaVoteOrder,
                ])
                setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
              }}
            >
              <u>Y</u>es
            </Button>
            <Button
              size="large"
              variant="contained"
              customColor="error"
              onClick={() => {
                rejectEventIdea(currentEventIdea.id)
                setThemeIdeaVoteOrder([
                  currentEventIdea.id,
                  ...themeIdeaVoteOrder,
                ])
                setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
              }}
            >
              <u>N</u>o
            </Button>
          </SuggestionActions>
        </>
      )}
      <PreviousVotesContainer>
        <PreviousVotesActionsRow>
          <Input
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
          />
        </PreviousVotesActionsRow>
        <PreviousVotes>
          {filteredRemainingEventIdeas.map((eventIdea) => (
            <PreviousVote key={eventIdea.id}>
              <PreviousVoteSideIndicator vote={eventIdea.myVote} />
              <PreviousVoteContent>
                <PreviousVoteName>{eventIdea.name}</PreviousVoteName>
                <PreviousVoteActions>
                  <Button
                    size="small"
                    variant={eventIdea.myVote === 1 ? 'contained' : 'text'}
                    customColor="success"
                    onClick={() => {
                      approveEventIdea(eventIdea.id)
                    }}
                  >
                    Yes
                  </Button>
                  <Button
                    size="small"
                    variant={eventIdea.myVote === 0 ? 'contained' : 'text'}
                    customColor="error"
                    onClick={() => {
                      rejectEventIdea(eventIdea.id)
                    }}
                  >
                    No
                  </Button>
                  <IconButton
                    size="small"
                    variant={eventIdea.myVote === -1 ? 'contained' : 'default'}
                    onClick={() => {
                      flagEventIdea(eventIdea.id)
                    }}
                  >
                    <Icon icon={FlagIcon} />
                  </IconButton>
                </PreviousVoteActions>
              </PreviousVoteContent>
            </PreviousVote>
          ))}
        </PreviousVotes>
      </PreviousVotesContainer>
    </Root>
  )
}

gql`
  mutation ApproveEventIdea($input: IdInput!) {
    approveEventIdea(input: $input) {
      ... on ApproveEventIdeaSuccess {
        success
      }
    }
  }

  mutation RejectEventIdea($input: IdInput!) {
    rejectEventIdea(input: $input) {
      ... on RejectEventIdeaSuccess {
        success
      }
    }
  }

  mutation FlagEventIdea($input: IdInput!) {
    flagEventIdea(input: $input) {
      ... on FlagEventIdeaSuccess {
        success
      }
    }
  }

  fragment ThemeSlaughterForm_event on Event {
    id
    eventPhase
    eventIdeas {
      id
      name
      myVote
    }
  }
`
