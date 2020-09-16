import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'
import Avatar from 'components/posts/Avatar'
import {
  useAcceptedInvitePageQuery,
  useAddFriendAndAddToGameMutation,
} from '__generated__/client-types'
import { getCurrentEvent, events } from 'utils'
import Button from 'components/common/mui/Button'
import { useParams, useNavigate } from 'react-router'
import Typography from 'components/common/mui/Typography'
import { useMinLoadingTime } from 'hooks/useMinLoadingTime'
import { useSnackbar } from 'notistack'
import { useLogin } from 'hooks/useLogin'

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
  max-width: 330px;
`

const StyledButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(3)}px;
`

interface Props {}
export default function ConfirmInviteAndAddToTeamPage({}: Props) {
  const { isLoggedIn, promptLogin } = useLogin()
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { userId } = useParams()
  const { data } = useAcceptedInvitePageQuery({
    variables: {
      input: {
        id: parseInt(userId),
      },
    },
  })
  const event = getCurrentEvent(events)
  const [addFriendAndAddToGameMutation, ,] = useAddFriendAndAddToGameMutation({
    variables: {
      input: {
        id: parseInt(userId),
      },
    },
  })

  const { fn: addFriendAndAddToGame, isLoading } = useMinLoadingTime(
    addFriendAndAddToGameMutation,
    {
      timeBeforeLoaderShown: 0,
      showLoaderMinDuration: 1000,
    }
  )

  React.useEffect(() => {
    async function runMutation() {
      const { data } = await addFriendAndAddToGame()
      if (data?.addFriendAndAddToGame.__typename === 'UnauthorizedResponse') {
        enqueueSnackbar('Something went wrong.', {
          variant: 'error',
        })
      } else {
        enqueueSnackbar('Successfully added!', {
          variant: 'success',
        })
      }
    }

    if (isLoggedIn) {
      runMutation()
    } else {
      enqueueSnackbar('Please login.', {
        variant: 'error',
      })

      promptLogin()
    }
  }, [addFriendAndAddToGame, enqueueSnackbar, isLoggedIn, promptLogin])

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
        has accepted your invitation to join your team for Ludum Dare{' '}
        {event?.eventNumber}!
      </SubTitle>
      <StyledButton
        fullWidth
        background="white"
        variant="contained"
        color="secondary"
        disabled
        loading={isLoading}
        onClick={() => {
          navigate('/')
        }}
      >
        Go Home
      </StyledButton>
    </Root>
  )
}

gql`
  query ConfirmInviteAndAddToTeamPage($input: IdInput!) {
    user(input: $input) {
      id
      name
      avatarPath
    }
  }

  mutation AddFriendAndAddToGame($input: IdInput!) {
    addFriendAndAddToGame(input: $input) {
      ... on AddFriendAndAddToGameSuccess {
        success
        game {
          id
          teamUsers {
            ...TeamWidget_teamUser
          }
        }
      }
    }
  }
`
