import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import {
  EventThemePage_EventFragment,
  EventPhase,
  ThemeSubmissionForm_EventFragmentDoc,
  ThemeSlaughterForm_EventFragmentDoc,
  ThemeVotingForm_EventFragmentDoc,
} from '__generated__/client-types'
import { filter } from 'graphql-anywhere'
import ThemeSubmissionForm from './theme/ThemeSubmissionForm'
import { useMe } from 'hooks/useMe'
import { Typography } from '@material-ui/core'
import ThemeSubPage from './theme/ThemeSubPage'
import ThemeSlaughterForm from './theme/ThemeSlaughterForm'
import ThemeVotingForm from './theme/ThemeVotingForm'

const LoginMessage = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(7)}px;
`

interface Props {
  event: EventThemePage_EventFragment
}
export default function EventThemePage({ event }: Props) {
  const { me, hasLoaded } = useMe()

  if (!me && hasLoaded) {
    return (
      <LoginMessage>
        <Typography variant="h5" color="textSecondary">
          Please log in
        </Typography>
      </LoginMessage>
    )
  }

  if (event) {
    if (event.eventPhase === EventPhase.ThemeSubmission) {
      return (
        <ThemeSubPage title="Theme Suggestion Round">
          <ThemeSubmissionForm
            event={filter(ThemeSubmissionForm_EventFragmentDoc, event)}
          />
        </ThemeSubPage>
      )
    } else if (event.eventPhase === EventPhase.ThemeSlaughter) {
      return (
        <ThemeSubPage title="Theme Slaughter Round">
          <ThemeSlaughterForm
            event={filter(ThemeSlaughterForm_EventFragmentDoc, event)}
          />
        </ThemeSubPage>
      )
    } else if (
      event.eventPhase === EventPhase.ThemeVoting ||
      event.eventPhase === EventPhase.EventRunning ||
      event.eventPhase === EventPhase.GameVoting ||
      event.eventPhase === EventPhase.Results
    ) {
      return (
        <ThemeSubPage title="Theme Voting Round">
          <ThemeVotingForm
            event={filter(ThemeVotingForm_EventFragmentDoc, event)}
          />
        </ThemeSubPage>
      )
    }
  }

  return null
}

EventThemePage.displayName = 'EventThemePage'

gql`
  fragment EventThemePage_event on Event {
    id
    eventPhase

    ...ThemeSubmissionForm_event
    ...ThemeSlaughterForm_event
    ...ThemeVotingForm_event
  }

  ${ThemeSubmissionForm_EventFragmentDoc}
  ${ThemeSlaughterForm_EventFragmentDoc}
  ${ThemeVotingForm_EventFragmentDoc}
`
