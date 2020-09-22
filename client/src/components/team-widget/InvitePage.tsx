import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import Avatar from 'components/posts/Avatar'
import {
  useInvitePageQuery,
  useAddFriendMutation,
} from '__generated__/client-types'
import { getCurrentEvent, events } from 'utils'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Button from 'components/common/mui/Button'
import { useParams, useNavigate } from 'react-router'
import Typography from 'components/common/mui/Typography'
import { useLogin } from 'hooks/useLogin'
import { useMinLoadingTime } from 'hooks/useMinLoadingTime'
import { useSnackbar } from 'notistack'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.themeColors.whiteBackground};
  margin: ${({ theme }) => theme.spacing(4)}px;
  padding: ${({ theme }) => theme.spacing(10)}px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  align-self: center;
`

const StyledAvatar = styled(Avatar)``

const UserTitle = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

const SubTitle = styled(Typography)`
  margin-top: ${({ theme }) => theme.spacing(1)}px;
`

const StyledButtonGroup = styled(ButtonGroup)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

export default function InvitePage() {
  const { promptLogin, isLoggedIn } = useLogin()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { userId } = useParams()
  const { data } = useInvitePageQuery({
    variables: {
      input: {
        id: parseInt(userId),
      },
    },
  })
  const event = getCurrentEvent(events)
  const [addFriendMutation] = useAddFriendMutation({
    variables: {
      input: {
        id: parseInt(userId),
      },
    },
  })

  const { fn: addFriend, isLoading } = useMinLoadingTime(addFriendMutation)

  if (!data) return null

  return (
    <Root>
      <StyledAvatar
        avatarPath={data.user.avatarPath}
        circle
        defaultToProfileImage
        size={140}
      />
      <UserTitle variant="h4">{data.user.name}</UserTitle>
      <SubTitle color="textSecondary" variant="body1">
        has invited you to their team for Ludum Dare {event?.eventNumber}!
      </SubTitle>
      <StyledButtonGroup>
        <Button
          fullWidth
          background="white"
          variant="contained"
          color="secondary"
          disabled
          loading={isLoading}
          onClick={async () => {
            if (isLoggedIn) {
              try {
                await addFriend()
                enqueueSnackbar('Successfully added!', {
                  variant: 'success',
                })
                navigate(`/accepted-invite/${userId}`)
              } catch (e) {
                console.error(e)
                enqueueSnackbar('Error. Try again?', {
                  variant: 'error',
                })
              }
            } else {
              promptLogin()
            }
          }}
        >
          Accept
        </Button>
        <Button
          fullWidth
          background="white"
          variant="contained"
          color="default"
          onClick={() => {
            if (isLoggedIn) {
            } else {
              promptLogin()
            }
          }}
        >
          Decline
        </Button>
      </StyledButtonGroup>
    </Root>
  )
}

gql`
  query InvitePage($input: IdInput!) {
    user(input: $input) {
      id
      name
      avatarPath
    }
  }

  mutation AddFriend($input: IdInput!) {
    addFriend(input: $input) {
      ... on AddFriendSuccess {
        success
      }
    }
  }
`
