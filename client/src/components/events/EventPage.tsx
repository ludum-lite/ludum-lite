import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import moment from 'moment'

import { Typography, LinearProgress, Breadcrumbs } from '@material-ui/core'
import Page from 'components/common/Page'
import { useParams } from 'react-router'
import { useGetEventPageDataQuery } from '__generated__/client-types'
import Breadcrumb from 'components/common/Breadcrumb'
import Icon from 'components/common/mui/Icon'
import EventIcon from '@material-ui/icons/Event'
import ScheduleIcon from '@material-ui/icons/Schedule'

const Header = styled.div`
  display: flex;
  align-items: center;
`

const HeaderContent = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  max-width: 100%;
`

const Title = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing(3)}px`};
`

const TitleText = styled(Typography)`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledLinearProgress = styled(LinearProgress)`
  margin: ${({ theme }) => theme.spacing(3)}px;
`

const EventDetail = styled.div`
  display: flex;
  align-items: center;
`

const EventDetails = styled.div`
  ${EventDetail}:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(0.5)}px;
  }
`

const EventDetailIcon = styled(Icon)`
  margin-right: ${({ theme }) => theme.spacing(0.5)}px;
`

interface EventPageProps {}

export default function EventPage(props: EventPageProps) {
  const { id: eventId } = useParams()

  const { data, loading } = useGetEventPageDataQuery({
    variables: {
      input: {
        id: parseInt(eventId),
      },
    },
  })

  const event = data?.event

  const body = React.useMemo(() => {
    if (!loading && event) {
      const startDate = moment.utc(event.startDate).local()
      const endDate = moment.utc(event.endDate).local()

      console.log(startDate.format())
      console.log(endDate.format())

      return (
        <Body>
          <Header>
            <HeaderContent>
              <Title>
                <TitleText variant="h5">
                  {event.name || '-- No Title  --'}
                </TitleText>
              </Title>
              <EventDetails>
                <EventDetail>
                  <EventDetailIcon icon={EventIcon} />
                  <Typography variant="body1">
                    {`${startDate.format('dddd MMMM Do')} to ${endDate.format(
                      'dddd MMMM Do, YYYY'
                    )}`}
                  </Typography>
                </EventDetail>
                <EventDetail>
                  <EventDetailIcon icon={ScheduleIcon} />
                  <Typography variant="body1">
                    {`Starts at ${startDate.format('h:mm A')}`}
                  </Typography>
                </EventDetail>
              </EventDetails>
            </HeaderContent>
          </Header>
        </Body>
      )
    }

    return <StyledLinearProgress />
  }, [loading, event])

  const breadcrumbs = React.useMemo(() => {
    if (event) {
      return (
        <Breadcrumbs>
          <Breadcrumb to="/events">Events</Breadcrumb>
          <Breadcrumb to={`/events/${event.id}`}>{event.name}</Breadcrumb>
        </Breadcrumbs>
      )
    }

    return null
  }, [event])

  return <Page breadcrumbs={breadcrumbs}>{body}</Page>
}

gql`
  query GetEventPageData($input: IdInput!) {
    event(input: $input) {
      ...EventPage_event
    }
  }

  fragment EventPage_event on Event {
    id
    name
    body
    startDate
    endDate
  }
`
