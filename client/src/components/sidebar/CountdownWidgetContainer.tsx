import React from 'react'
import { gql } from '@apollo/client'
import { events } from 'utils'
import CountdownWidget from '../sidebar/CountdownWidget'
import { getCurrentEvent, getEvent } from 'utils/timeline'
import { useGetCountdownWidgetContainerDataQuery } from '__generated__/client-types'

export default function CountdownWidgetContainer() {
  const [selectedEventNum, setSelectedEventNum] = React.useState(
    getCurrentEvent(events)?.eventNumber
  )
  const selectedEvent = selectedEventNum
    ? getEvent(events, selectedEventNum)
    : undefined

  const { data } = useGetCountdownWidgetContainerDataQuery({
    variables: {
      input: {
        id: selectedEvent?.id || 0,
      },
    },
  })

  return (
    <CountdownWidget
      events={events}
      selectedEvent={selectedEvent}
      onChangeSelectedEventNum={setSelectedEventNum}
      theme={data?.event?.theme || ''}
    />
  )
}

gql`
  query GetCountdownWidgetContainerData($input: IdInput!) {
    event(input: $input) {
      id
      theme
    }
  }
`
