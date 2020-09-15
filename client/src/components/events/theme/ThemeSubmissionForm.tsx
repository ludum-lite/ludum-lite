import React from 'react'
import { gql } from '@apollo/client'
import styled from 'styled-components/macro'
import { ThemeSubmissionForm_EventFragment } from '__generated__/client-types'

const Root = styled.div``

interface Props {
  event: ThemeSubmissionForm_EventFragment
}
export default function ThemeSubmissionForm({ event }: Props) {
  console.log(event)
  return <Root />
}

gql`
  mutation AddEventIdea($input: AddEventIdeaInput!) {
    addEventIdea(input: $input) {
      ... on AddEventIdeaSuccess {
        eventIdea {
          id
          name
        }
      }
    }
  }

  mutation EditEventIdea($input: EditEventIdeaInput!) {
    editEventIdea(input: $input) {
      ... on EditEventIdeaSuccess {
        eventIdea {
          id
          name
        }
      }
    }
  }

  mutation DeletEventIdea($input: DeleteEventIdeaInput!) {
    deleteEventIdea(input: $input) {
      ... on DeleteEventIdeaSuccess {
        eventIdea {
          id
          name
        }
      }
    }
  }

  fragment ThemeSubmissionForm_event on Event {
    id
    eventPhase
    eventIdeas {
      id
      name
    }
  }
`
