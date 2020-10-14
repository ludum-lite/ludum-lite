import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import { ThemeVotingForm_EventFragment } from '__generated__/client-types'

const Root = styled.div``

interface Props {
  event: ThemeVotingForm_EventFragment
}
export default function ThemeVotingForm({}: Props) {
  return <Root />
}

gql`
  # mutation ApproveEventIdea($input: IdInput!) {
  #   approveEventIdea(input: $input) {
  #     ... on ApproveEventIdeaSuccess {
  #       success
  #     }
  #   }
  # }

  # mutation RejectEventIdea($input: IdInput!) {
  #   rejectEventIdea(input: $input) {
  #     ... on RejectEventIdeaSuccess {
  #       success
  #     }
  #   }
  # }

  # mutation FlagEventIdea($input: IdInput!) {
  #   flagEventIdea(input: $input) {
  #     ... on FlagEventIdeaSuccess {
  #       success
  #     }
  #   }
  # }

  fragment ThemeVotingForm_event on Event {
    id
    eventPhase
    votingRounds {
      name
      page
      votingRoundIdeas {
        id
        name
        myVote
      }
    }
    eventIdeas {
      id
      name
      myVote
    }
  }
`
