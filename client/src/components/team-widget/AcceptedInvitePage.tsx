import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import { useAcceptedInvitePageQuery } from '__generated__/client-types'
import { useParams } from 'react-router'
import Typography from 'components/common/mui/Typography'
import ClickToCopyButton from 'components/common/ClickToCopyButton'
import { useMe } from 'hooks/useMe'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
  margin: ${({ theme }) => theme.spacing(4)}px;
  padding: ${({ theme }) => theme.spacing(10)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  align-self: center;
`

const Title = styled(Typography)``

const SubTitle = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

const InviteButton = styled(ClickToCopyButton)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
  font-family: 'Oxygen Mono';
`

export default function AcceptedInvitePage() {
  const { me } = useMe()
  const { userId } = useParams()
  const { data } = useAcceptedInvitePageQuery({
    variables: {
      input: {
        id: parseInt(userId),
      },
    },
  })

  const returnLink = `${window.location.origin}/confirm-invite/${me?.id}`

  if (!data || !me) return null

  return (
    <Root>
      <Title variant="h4">Invite Accepted!</Title>
      <SubTitle color="textSecondary" variant="body1">
        Please send this link to your team leader, {data.user.name}.
      </SubTitle>
      <InviteButton text={returnLink} fullWidth variant="contained">
        {returnLink}
      </InviteButton>
    </Root>
  )
}

AcceptedInvitePage.displayName = 'AcceptedInvitePage'

gql`
  query AcceptedInvitePage($input: IdInput!) {
    user(input: $input) {
      id
      name
      avatarPath
    }
  }
`
