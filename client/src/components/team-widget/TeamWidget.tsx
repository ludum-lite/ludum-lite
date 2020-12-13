import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  useTeamWidgetDataQuery,
  useAddUserToGameMutation,
  useRemoveUserFromGameMutation,
} from '__generated__/client-types'
import {
  Dialog,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Menu,
  MenuItem,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { useLogin } from 'hooks/useLogin'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import TeamMember from './TeamMember'
import AddTeamMemberButton from './AddTeamMemberButton'
import Avatar from 'components/posts/Avatar'
import ClickToCopyButton from 'components/common/ClickToCopyButton'
import { useSnackbar } from 'notistack'
import ProgressOverlay from 'components/common/ProgressOverlay'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import Typography from 'components/common/mui/Typography'
import DialogTitle from 'components/common/mui/DialogTitle'
import WidgetContainer from 'components/widgets/WidgetContainer'
import { ignoreProps } from 'utils'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  /* Balance top spacing created by text leading and icon button height */
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  min-height: 40px;
`

const TeamList = styled.div`
  display: flex;
  /* flex-direction: row-reverse; */
  /* justify-content: flex-end; */
  align-items: flex-end;
  flex-wrap: wrap;

  & > * {
    margin-right: -8px;
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledAddTeamMemberButton = styled(AddTeamMemberButton)`
  order: 1000;
`

interface StyledTeamMemberProps {
  order: number
}
const StyledTeamMember = styled(TeamMember).withConfig({
  shouldForwardProp: ignoreProps(['order']),
})<StyledTeamMemberProps>`
  order: ${({ order }) => order};
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
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(4)}px`};
`

const InviteText = styled(Typography)`
  white-space: pre;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;
`

const AddedTagContainer = styled(ListItemSecondaryAction)`
  pointer-events: none;
`

const AddedTag = styled.div`
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(3)}px`};
  background: ${({ theme }) =>
    theme.themeColors.friendAddedBadge.backgroundColor};
  color: ${({ theme }) => theme.themeColors.friendAddedBadge.color};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
`

interface Props {
  className?: string
}
export default function GameWidget({ className }: Props) {
  const popupState = usePopupState({ variant: 'popover', popupId: 'menu' })

  const { isLoggedIn } = useLogin()

  const { enqueueSnackbar } = useSnackbar()

  const [
    showUserOptionsForUserId,
    setShowUserOptionsForUserId,
  ] = React.useState<number | null>(null)

  const [
    showTeamMemberSelectDialog,
    setShowTeamMemberSelectDialog,
  ] = React.useState<boolean>(false)

  const [showJoinATeamDialog, setShowJoinATeamDialog] = React.useState<boolean>(
    false
  )

  const { data, refetch } = useTeamWidgetDataQuery()

  const handleCloseUserOptions = () => {
    setShowUserOptionsForUserId(null)
  }

  const handleCloseAddFriendToTeam = () => {
    setShowTeamMemberSelectDialog(false)
  }

  const handleCloseJoinATeam = React.useCallback(() => {
    setShowJoinATeamDialog(false)
  }, [setShowJoinATeamDialog])

  const [
    removeUserFromGameMutation,
    { loading: isRemovingUserFromGame },
  ] = useRemoveUserFromGameMutation()
  const [addUserToGameMutation] = useAddUserToGameMutation()

  const addUserToGame = React.useCallback(
    async (userId: number, userName: string) => {
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

          enqueueSnackbar(`Successfully added ${userName} to the team`, {
            variant: 'success',
          })

          handleCloseAddFriendToTeam()
        } catch (e) {
          console.error(e)
        }
      }
    },
    [data, addUserToGameMutation, enqueueSnackbar]
  )

  const gameId = data?.featuredEvent.currentUserGameId

  const userOptionsDialog = React.useMemo(() => {
    if (showUserOptionsForUserId) {
      const user = data?.featuredEvent.currentUserGame?.teamUsers?.find(
        (user) => user.id === showUserOptionsForUserId
      )

      return (
        <Dialog
          open={Boolean(showUserOptionsForUserId)}
          onClose={handleCloseUserOptions}
        >
          <ProgressOverlay loading={isRemovingUserFromGame} />
          <List>
            <ListItem button>
              <ListItemText primary={`Go to ${user?.name}'s profile`} />
            </ListItem>
            {gameId && (
              <ListItem
                button
                onClick={async () => {
                  await removeUserFromGameMutation({
                    variables: {
                      input: {
                        gameId,
                        userId: showUserOptionsForUserId,
                      },
                    },
                  })

                  enqueueSnackbar(
                    `Successfully removed ${user?.name} from the team`,
                    {
                      variant: 'success',
                    }
                  )

                  handleCloseUserOptions()
                }}
              >
                <ListItemText primary={`Remove ${user?.name} from team`} />
              </ListItem>
            )}
          </List>
        </Dialog>
      )
    }

    return null
  }, [
    showUserOptionsForUserId,
    data,
    isRemovingUserFromGame,
    gameId,
    removeUserFromGameMutation,
    enqueueSnackbar,
  ])

  const joinATeamDialog = React.useMemo(() => {
    if (showJoinATeamDialog) {
      return (
        <Dialog
          open={Boolean(showJoinATeamDialog)}
          onClose={handleCloseJoinATeam}
        >
          <DialogTitle>Join a Team</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please ask your new team leader to add you to their team.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }

    return null
  }, [showJoinATeamDialog, handleCloseJoinATeam])

  if (isLoggedIn) {
    if (
      data?.featuredEvent?.__typename === 'Event' &&
      data?.me?.__typename === 'Me'
    ) {
      const me = data!.me

      if (data.featuredEvent.currentUserGameId) {
        const inviteLink = `${window.location.origin}/invite/${me.id}`
        const userIdsFollowingMe = data.me.userIdsFollowingMe
        const leaderUser = data.featuredEvent.currentUserGame?.author
        const teamUsers = data.featuredEvent.currentUserGame?.teamUsers
        const isLeader = leaderUser?.id === me.id

        const teamMembersToRender = teamUsers?.filter(
          (user) => user.id !== leaderUser?.id
        )

        return (
          <WidgetContainer>
            <Root className={className}>
              <TopRow>
                <Typography variant="h4" bold>
                  My Team
                </Typography>
                <IconButton
                  // size="small"
                  {...bindTrigger(popupState)}
                >
                  <Icon icon={MoreHorizIcon} />
                </IconButton>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem
                    onClick={async () => {
                      popupState.close()
                      setShowJoinATeamDialog(true)
                    }}
                  >
                    Join a different team
                  </MenuItem>
                  {gameId && teamUsers && teamUsers.length > 1 && (
                    <MenuItem
                      onClick={async () => {
                        popupState.close()
                        await removeUserFromGameMutation({
                          variables: {
                            input: {
                              gameId,
                              userId: me.id,
                            },
                          },
                        })
                        await refetch()
                      }}
                    >
                      Leave Team
                    </MenuItem>
                  )}
                </Menu>
              </TopRow>
              <TeamList>
                <StyledAddTeamMemberButton
                  onClick={() => setShowTeamMemberSelectDialog(true)}
                />
                {teamMembersToRender
                  ?.sort((user) => {
                    if (user.id === me.id) {
                      return -1
                    } else {
                      return user.id
                    }
                  })
                  .map((user, index) => (
                    <Tooltip
                      key={user.id}
                      title={user.name}
                      enterDelay={0}
                      arrow
                      placement="top"
                    >
                      <StyledTeamMember
                        avatarPath={user.avatarPath}
                        order={teamMembersToRender.length - index}
                        onClick={() => {
                          if (isLeader) {
                            setShowUserOptionsForUserId(user.id)
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                {leaderUser && (
                  <Tooltip
                    title={leaderUser.name}
                    enterDelay={0}
                    arrow
                    placement="top"
                  >
                    <StyledTeamMember
                      avatarPath={leaderUser.avatarPath}
                      order={0}
                      leader
                    />
                  </Tooltip>
                )}
              </TeamList>
              <Dialog
                open={showTeamMemberSelectDialog}
                onClose={handleCloseAddFriendToTeam}
              >
                <DialogTitle>Add friend to team</DialogTitle>
                <List>
                  {data.me.usersImFollowing
                    ?.filter((user) => userIdsFollowingMe?.includes(user.id))
                    .map((user) => (
                      <ListItem
                        key={user.id}
                        button
                        onClick={() => addUserToGame(user.id, user.name)}
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
                        {teamUsers?.some(
                          (teamUser) => teamUser.id === user.id
                        ) && (
                          <AddedTagContainer>
                            <AddedTag>Added</AddedTag>
                          </AddedTagContainer>
                        )}
                      </ListItem>
                    ))}
                </List>
                <InviteLinkContainer>
                  <InviteText variant="caption" color="textSecondary">
                    {`Don't see your friend listed? Send them this link!
They'll get a confirmation link to send back to you.`}
                  </InviteText>
                  <InviteButton text={inviteLink} fullWidth variant="contained">
                    {inviteLink}
                  </InviteButton>
                </InviteLinkContainer>
              </Dialog>
              {userOptionsDialog}
              {joinATeamDialog}
            </Root>
          </WidgetContainer>
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

  mutation RemoveUserFromGame($input: RemoveUserFromGameInput!) {
    removeUserFromGame(input: $input) {
      ... on RemoveUserFromGameSuccess {
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
