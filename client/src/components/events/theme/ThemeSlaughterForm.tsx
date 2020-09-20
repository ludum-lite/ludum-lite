import React from 'react'
import { gql } from '@apollo/client'
import styled, { css } from 'styled-components/macro'
import {
  ThemeSlaughterForm_EventFragment,
  useApproveEventIdeaMutation,
  useRejectEventIdeaMutation,
  useFlagEventIdeaMutation,
} from '__generated__/client-types'
import { GlobalHotKeys } from 'react-hotkeys'
import { sample, sortBy, partition, groupBy, mapValues } from 'lodash'
import Button from 'components/common/mui/Button'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Typography from 'components/common/mui/Typography'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import FlagIcon from '@material-ui/icons/Flag'
import MuiSortIcon from '@material-ui/icons/Sort'
import MuiSearchIcon from '@material-ui/icons/Search'
import useUserLocalStorage from 'hooks/useUserLocalStorage'
import Input from 'components/common/mui/Input'
import { DebounceInput } from 'react-debounce-input'
import { Select, MenuItem } from '@material-ui/core'
import { getVoteColor } from './utils'
import PreviousVoteRow from './PreviousVoteRow'

const keyMap = {
  APPROVE: 'y',
  REJECT: 'n',
}

enum VoteFilterBy {
  All = 'all',
  Approved = 'approved',
  Rejected = 'rejected',
  Flagged = 'flagged',
}

const VoteFilterByToDisplay = {
  [VoteFilterBy.All]: 'All',
  [VoteFilterBy.Approved]: 'Approved',
  [VoteFilterBy.Rejected]: 'Rejected',
  [VoteFilterBy.Flagged]: 'Flagged',
}

const VoteFilterByToInt = {
  [VoteFilterBy.Approved]: 1,
  [VoteFilterBy.Rejected]: 0,
  [VoteFilterBy.Flagged]: -1,
}

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
    theme.themeColors.themeSlaughter.suggestionBackground};
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

const FilterPreviousVotesInput = styled(Input)`
  flex: 0 1 300px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`

const SelectDisplayValue = styled.div`
  display: flex;
  align-items: center;
`

const FilterBySelect = styled(Select)`
  flex: 0 1 150px;
`

const SortIcon = styled(MuiSortIcon)`
  margin: -5px 0 -5px 0;
  padding-right: 4px;
`

const SearchIcon = styled(MuiSearchIcon)`
  padding-right: 4px;
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

/* Distribution Bar */
const PreviousVotesDistributionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-top: ${({ theme }) => theme.spacing(4)}px;
`

const PreviousVotesDistributionList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const PreviousVotesDistributionItem = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface DistributionCircleProps {
  vote?: number | null
}
const DistributionCircle = styled.div<DistributionCircleProps>`
  height: 12px;
  width: 12px;
  border-radius: 100%;
  margin-right: ${({ theme }) => theme.spacing(1)}px;

  ${({ vote, theme }) => {
    const background = getVoteColor(vote, theme)

    return css`
      background: ${background};
    `
  }}
`

const DistributionText = styled(Typography)`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`

const DistributionNumber = styled(Typography)``

const PreviousVotesBar = styled.div`
  display: flex;
  overflow: hidden;
  border-radius: 12px;
  height: 12px;
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

interface PreviousVotesBarSegmentProps {
  count: number
  vote?: number | null
}
const PreviousVotesBarSegment = styled.div<PreviousVotesBarSegmentProps>`
  flex: ${({ count }) => count} 0 5px;

  &:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.themeColors.whiteBackground};
  }

  ${({ vote, theme }) => {
    const background = getVoteColor(vote, theme)

    return css`
      background: ${background};
    `
  }}
`

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
  const [voteFilterBy, setVoteFilterBy] = React.useState(VoteFilterBy.All)

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

  const votedDistributions = React.useMemo(() => {
    return mapValues(
      groupBy(votedEventIdeas, (eventIdea) => eventIdea.myVote),
      (eventIdeas) => eventIdeas.length
    )
  }, [votedEventIdeas])

  const filteredVotedEventIdeas = React.useMemo(() => {
    const searchFilteredEventIdeas = votedEventIdeas.filter((eventIdea) =>
      eventIdea.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    if (voteFilterBy !== VoteFilterBy.All) {
      return searchFilteredEventIdeas.filter(
        (eventIdea) => eventIdea.myVote === VoteFilterByToInt[voteFilterBy]
      )
    } else {
      return searchFilteredEventIdeas
    }
  }, [votedEventIdeas, searchValue, voteFilterBy])

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

  const approveCurrentEventIdea = React.useCallback(() => {
    if (currentEventIdea) {
      approveEventIdea(currentEventIdea.id)
      setThemeIdeaVoteOrder([currentEventIdea.id, ...themeIdeaVoteOrder])
      setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
    }
  }, [
    approveEventIdea,
    currentEventIdea,
    remainingEventIdeasWithoutCurrent,
    setThemeIdeaVoteOrder,
    themeIdeaVoteOrder,
  ])

  const rejectCurrentEventIdea = React.useCallback(() => {
    if (currentEventIdea) {
      rejectEventIdea(currentEventIdea.id)
      setThemeIdeaVoteOrder([currentEventIdea.id, ...themeIdeaVoteOrder])
      setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
    }
  }, [
    rejectEventIdea,
    currentEventIdea,
    remainingEventIdeasWithoutCurrent,
    setThemeIdeaVoteOrder,
    themeIdeaVoteOrder,
  ])

  const flagCurrentEventIdea = React.useCallback(() => {
    if (currentEventIdea) {
      flagEventIdea(currentEventIdea.id)
      setThemeIdeaVoteOrder([currentEventIdea.id, ...themeIdeaVoteOrder])
      setCurrentEventIdea(sample(remainingEventIdeasWithoutCurrent))
    }
  }, [
    flagEventIdea,
    currentEventIdea,
    remainingEventIdeasWithoutCurrent,
    setThemeIdeaVoteOrder,
    themeIdeaVoteOrder,
  ])

  return (
    <Root>
      <ThemeTitle variant="h5">Would this be a good Theme?</ThemeTitle>
      {currentEventIdea && (
        <>
          <GlobalHotKeys
            keyMap={keyMap}
            handlers={{
              APPROVE: () => approveCurrentEventIdea(),
              REJECT: () => rejectCurrentEventIdea(),
            }}
            allowChanges
          />
          <Suggestion>
            <Typography variant="h4" bold>
              {currentEventIdea.name}
            </Typography>
            <SuggestionFlagButtonContainer>
              <IconButton onClick={flagCurrentEventIdea}>
                <Icon icon={FlagIcon} />
              </IconButton>
            </SuggestionFlagButtonContainer>
          </Suggestion>
          <SuggestionActions>
            <Button
              size="large"
              variant="contained"
              customColor="success"
              onClick={approveCurrentEventIdea}
            >
              <u>Y</u>es
            </Button>
            <Button
              size="large"
              variant="contained"
              customColor="error"
              onClick={rejectCurrentEventIdea}
            >
              <u>N</u>o
            </Button>
          </SuggestionActions>
        </>
      )}
      <PreviousVotesDistributionContainer>
        <PreviousVotesDistributionList>
          <PreviousVotesDistributionItem>
            <DistributionCircle vote={1} />
            <DistributionText>Approved</DistributionText>
            <DistributionNumber color="textSecondary">
              {votedDistributions[1]}
            </DistributionNumber>
          </PreviousVotesDistributionItem>
          <PreviousVotesDistributionItem>
            <DistributionCircle vote={-1} />
            <DistributionText>Rejected</DistributionText>
            <DistributionNumber color="textSecondary">
              {votedDistributions[-1]}
            </DistributionNumber>
          </PreviousVotesDistributionItem>
          <PreviousVotesDistributionItem>
            <DistributionCircle vote={0} />
            <DistributionText>Flagged</DistributionText>
            <DistributionNumber color="textSecondary">
              {votedDistributions[0]}
            </DistributionNumber>
          </PreviousVotesDistributionItem>
          <PreviousVotesDistributionItem>
            <DistributionCircle />
            <DistributionText>Remaining</DistributionText>
            <DistributionNumber color="textSecondary">
              {remainingEventIdeas.length}
            </DistributionNumber>
          </PreviousVotesDistributionItem>
        </PreviousVotesDistributionList>
        <PreviousVotesBar>
          <PreviousVotesBarSegment vote={1} count={votedDistributions[1]} />
          <PreviousVotesBarSegment vote={-1} count={votedDistributions[-1]} />
          <PreviousVotesBarSegment vote={0} count={votedDistributions[0]} />
          <PreviousVotesBarSegment count={remainingEventIdeas.length} />
        </PreviousVotesBar>
      </PreviousVotesDistributionContainer>
      <PreviousVotesContainer>
        <PreviousVotesActionsRow>
          <FilterPreviousVotesInput
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            inputComponent={DebounceInput}
            inputProps={{
              debounceTimeout: 200,
            }}
            startAdornment={<Icon icon={SearchIcon} />}
          />
          <FilterBySelect
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={voteFilterBy}
            variant="filled"
            renderValue={(value) => (
              <SelectDisplayValue>
                <Icon icon={SortIcon} />
                {VoteFilterByToDisplay[value as VoteFilterBy]}
              </SelectDisplayValue>
            )}
            onChange={(e) => {
              setVoteFilterBy(e.target.value as VoteFilterBy)
            }}
          >
            <MenuItem value={VoteFilterBy.All}>
              {VoteFilterByToDisplay[VoteFilterBy.All]}
            </MenuItem>
            <MenuItem value={VoteFilterBy.Approved}>
              {VoteFilterByToDisplay[VoteFilterBy.Approved]}
            </MenuItem>
            <MenuItem value={VoteFilterBy.Rejected}>
              {VoteFilterByToDisplay[VoteFilterBy.Rejected]}
            </MenuItem>
            <MenuItem value={VoteFilterBy.Flagged}>
              {VoteFilterByToDisplay[VoteFilterBy.Flagged]}
            </MenuItem>
          </FilterBySelect>
        </PreviousVotesActionsRow>
        <PreviousVotes>
          {filteredVotedEventIdeas.map((eventIdea) => (
            <PreviousVoteRow
              key={eventIdea.id}
              id={eventIdea.id}
              vote={eventIdea.myVote}
              eventIdeaName={eventIdea.name}
              onApprove={approveEventIdea}
              onReject={rejectEventIdea}
              onFlag={flagEventIdea}
            />
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
