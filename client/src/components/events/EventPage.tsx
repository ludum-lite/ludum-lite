import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import { Typography, LinearProgress, Breadcrumbs } from '@material-ui/core'
import Page from 'components/common/Page'
import { useParams } from 'react-router'
import { useGetEventPageDataQuery } from '__generated__/client-types'
import Breadcrumb from 'components/common/Breadcrumb'

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
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const Article = styled.div`
  padding: ${({ theme }) => `${theme.spacing(3)}px`};
`

const TitleText = styled(Typography)`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`

const StyledLinearProgress = styled(LinearProgress)`
  margin: 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px;
`

type FormInputs = {
  title: string
  body: string
}

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
      return (
        <Body>
          <Article>
            <Header>
              <HeaderContent>
                <Title>
                  <TitleText variant="h5">
                    {event.name || '-- No Title  --'}
                  </TitleText>
                </Title>
                Need date
              </HeaderContent>
            </Header>
          </Article>
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
  }
`
