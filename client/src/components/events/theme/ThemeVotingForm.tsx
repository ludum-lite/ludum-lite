import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import { ThemeVotingForm_EventFragment, useApproveVotingRoundIdeaMutation, useRejectVotingRoundIdeaMutation, useVoteMaybeVotingRoundIdeaMutation } from '__generated__/client-types'
import Button from 'components/common/mui/Button'
import PreviousVoteList from './PreviousVoteList'
import PreviousRoundVoteRow from './PreviousRoundVoteRow'

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const VotingRoundTab = styled(Button)``

const VotingRoundTabs = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;

  ${VotingRoundTab} {
    margin-right: ${({ theme }) => theme.spacing(2)}px;
  }
`

interface Props {
  event: ThemeVotingForm_EventFragment
}
export default function ThemeVotingForm({ event }: Props) {
  const selectedTab = 1
  const selectedVotingRound = event.votingRounds?.find(
    (votingRound) => votingRound.page === selectedTab
  )
  const [approveVotingRoundIdeaMutation] = useApproveVotingRoundIdeaMutation()
  const [voteMaybeVotingRoundIdeaMutation] = useVoteMaybeVotingRoundIdeaMutation()
  const [rejectVotingRoundIdeaMutation] = useRejectVotingRoundIdeaMutation()

  const approveVotingRoundIdea = React.useCallback(
    (votingRoundIdeaId: number) => {
      approveVotingRoundIdeaMutation({
        variables: {
          input: {
            id: votingRoundIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.approveVotingRoundIdea.__typename === 'ApproveVotingRoundIdeaSuccess') {
            cache.modify({
              id: `VotingRoundIdea:${votingRoundIdeaId}`,
              fields: {
                myVote: () => 1,
              },
            })
          }
        },
      })
    },
    [approveVotingRoundIdeaMutation]
  )

  const rejectVotingRoundIdea = React.useCallback(
    (votingRoundIdeaId: number) => {
      rejectVotingRoundIdeaMutation({
        variables: {
          input: {
            id: votingRoundIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.rejectVotingRoundIdea.__typename === 'RejectVotingRoundIdeaSuccess') {
            cache.modify({
              id: `VotingRoundIdea:${votingRoundIdeaId}`,
              fields: {
                myVote: () => -1,
              },
            })
          }
        },
      })
    },
    [rejectVotingRoundIdeaMutation]
  )

  const voteMaybeVotingRoundIdea = React.useCallback(
    (votingRoundIdeaId: number) => {
      voteMaybeVotingRoundIdeaMutation({
        variables: {
          input: {
            id: votingRoundIdeaId,
          },
        },
        update(cache, { data }) {
          if (data?.voteMaybeVotingRoundIdea.__typename === 'VoteMaybeVotingRoundIdeaSuccess') {
            cache.modify({
              id: `VotingRoundIdea:${votingRoundIdeaId}`,
              fields: {
                myVote: () => 0,
              },
            })
          }
        },
      })
    },
    [voteMaybeVotingRoundIdeaMutation]
  )

  return (
    <Root>
      <VotingRoundTabs>
        {event.votingRounds?.map((votingRound) => (
          <VotingRoundTab
            key={votingRound.name}
            variant="contained"
            color={selectedTab === votingRound.page ? 'secondary' : 'default'}
          >
            {votingRound.name}
          </VotingRoundTab>
        ))}
      </VotingRoundTabs>
      <PreviousVoteList>
        {selectedVotingRound?.votingRoundIdeas.map((votingRoundIdea) => (
          <PreviousRoundVoteRow
            key={votingRoundIdea.id}
            id={votingRoundIdea.id}
            vote={votingRoundIdea.myVote}
            name={votingRoundIdea.name}
            onApprove={approveVotingRoundIdea}
            onReject={rejectVotingRoundIdea}
            onMaybe={voteMaybeVotingRoundIdea}
          />
        ))}
      </PreviousVoteList>
    </Root>
  )
}

gql`
  mutation ApproveVotingRoundIdea($input: IdInput!) {
    approveVotingRoundIdea(input: $input) {
      ... on ApproveVotingRoundIdeaSuccess {
        success
      }
    }
  }

  mutation RejectVotingRoundIdea($input: IdInput!) {
    rejectVotingRoundIdea(input: $input) {
      ... on RejectVotingRoundIdeaSuccess {
        success
      }
    }
  }

  mutation VoteMaybeVotingRoundIdea($input: IdInput!) {
    voteMaybeVotingRoundIdea(input: $input) {
      ... on VoteMaybeVotingRoundIdeaSuccess {
        success
      }
    }
  }

  fragment ThemeVotingForm_event on Event {
    id
    votingRounds {
      name
      page
      votingRoundIdeas {
        id
        name
        myVote
      }
    }
  }
`
