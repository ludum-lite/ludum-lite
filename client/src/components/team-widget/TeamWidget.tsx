import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  useTeamWidgetDataQuery,
  useAddUserToGameMutation,
} from '__generated__/client-types'
import {
  Typography,
  Dialog,
  DialogTitle,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core'
import { useLogin } from 'hooks/useLogin'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import TeamMember from './TeamMember'
import AddTeamMemberButton from './AddTeamMemberButton'
import { useMe } from 'hooks/useMe'
import Button from 'components/common/mui/Button'
import CopyToClipboard from 'react-copy-to-clipboard'
import Avatar from 'components/posts/Avatar'
import ClickToCopyButton from 'components/common/ClickToCopyButton'

const Root = styled.div`
  display: flex;
  background: ${({ theme }) => theme.themeColors.contextualNavBackground};
  color: white;
  padding: ${({ theme }) => theme.spacing(2)}px;
  flex-direction: column;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

const TeamList = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-end;

  & > *:not(:last-child) {
    margin-left: -8px;
  }
`

const InviteLinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.spacing(2)}px;
  margin-top: 0;
  padding-top: ${({ theme }) => theme.spacing(2)}px;
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
`

const InviteButton = styled(ClickToCopyButton)`
  font-family: 'Oxygen Mono';
`

const InviteText = styled(Typography)`
  padding-top: ${({ theme }) => theme.spacing(1)}px;
  white-space: pre;
`

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const { isLoggedIn } = useLogin()
  const { me } = useMe()
  const [
    showTeamMemberSelectDialog,
    setShowTeamMemberSelectDialog,
  ] = React.useState<boolean>(false)

  const { data } = useTeamWidgetDataQuery()

  const handleClose = () => {
    setShowTeamMemberSelectDialog(false)
  }

  const [addUserToGameMutation] = useAddUserToGameMutation()

  const addUserToGame = React.useCallback(
    async (userId: number) => {
      if (data?.featuredEvent?.currentUserGameId) {
        try {
          await addUserToGameMutation({
            variables: {
              input: {
                userId,
                gameId: data?.featuredEvent.currentUserGameId,
              },
            },
          })

          handleClose()
        } catch (e) {
          console.error(e)
        }
      }
    },
    [data, addUserToGameMutation]
  )

  if (isLoggedIn && me) {
    if (
      data?.featuredEvent?.__typename === 'Event' &&
      data?.me?.__typename === 'Me'
    ) {
      if (data.featuredEvent.currentUserGameId) {
        const inviteLink = `${window.location.origin}/invite/${me.id}`
        const userIdsFollowingMe = data.me.userIdsFollowingMe
        const leaderUser = data.featuredEvent.currentUserGame?.author
        const teamUsers = data.featuredEvent.currentUserGame?.teamUsers

        return (
          <Root className={className}>
            <TopRow>
              <Typography variant="h6">My Team</Typography>
              <IconButton background="globalNav" size="small">
                <Icon icon={MoreHorizIcon} />
              </IconButton>
            </TopRow>
            <TeamList>
              <AddTeamMemberButton
                onClick={() => setShowTeamMemberSelectDialog(true)}
              />
              {teamUsers &&
                teamUsers
                  .filter((user) => user.id !== leaderUser?.id)
                  .sort((user) => {
                    if (user.id === me.id) {
                      return -1
                    } else {
                      return user.id
                    }
                  })
                  .map((user) => (
                    <Tooltip
                      key={user.id}
                      title={user.name}
                      enterDelay={0}
                      arrow
                      placement="top"
                    >
                      <TeamMember avatarPath={user.avatarPath} />
                    </Tooltip>
                  ))}
              {leaderUser && (
                <Tooltip
                  title={leaderUser.name}
                  enterDelay={0}
                  arrow
                  placement="top"
                >
                  <TeamMember avatarPath={leaderUser.avatarPath} leader />
                </Tooltip>
              )}
            </TeamList>
            <Dialog open={showTeamMemberSelectDialog} onClose={handleClose}>
              <DialogTitle>Add friend to team</DialogTitle>
              <List>
                {data.me.usersImFollowing
                  ?.filter((user) => userIdsFollowingMe?.includes(user.id))
                  .map((user) => (
                    <ListItem
                      key={user.id}
                      button
                      onClick={() => addUserToGame(user.id)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          avatarPath={user.avatarPath || ''}
                          linkPath={`${user.id}`}
                          size={40}
                          circle
                        />
                      </ListItemAvatar>
                      <ListItemText primary={user.name} />
                    </ListItem>
                  ))}
              </List>
              <InviteLinkContainer>
                <InviteButton
                  text={inviteLink}
                  fullWidth
                  background="white"
                  variant="contained"
                >
                  {inviteLink}
                </InviteButton>
                <InviteText variant="caption" color="primary">
                  {`Don't see your friend listed? Send this link to your friend!
They'll get a confirmation link to send back to you.`}
                </InviteText>
              </InviteLinkContainer>
            </Dialog>
          </Root>
        )
      }
    }
  }

  return null
}

gql`
  fragment TeamWidget_teamUser on User {
    id
    name
    avatarPath
  }

  query TeamWidgetData {
    featuredEvent {
      id
      currentUserGameId
      currentUserGame {
        id
        teamUsers {
          ...TeamWidget_teamUser
        }
        author {
          ...TeamWidget_teamUser
        }
      }
      eventPhase
    }

    me {
      ... on Me {
        id
        userIdsFollowingMe
        usersImFollowing {
          id
          name
          avatarPath
        }
      }
    }
  }

  mutation AddUserToGame($input: AddUserToGameInput!) {
    addUserToGame(input: $input) {
      ... on AddUserToGameSuccess {
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
