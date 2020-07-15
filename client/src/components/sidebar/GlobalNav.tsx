import React from 'react'
import styled, { css } from 'styled-components/macro'
import { isLoggedInVar } from 'resolvers'
import { Menu as MuiMenu, MenuItem, Fade, Tooltip } from '@material-ui/core'
import MuiAddIcon from '@material-ui/icons/Add'
import MuiLightBrightnessIcon from '@material-ui/icons/Brightness4'
import MuiDarkBrightnessIcon from '@material-ui/icons/Brightness4Outlined'
import IconButton from 'components/common/mui/IconButton'
import { ReactComponent as UserIcon } from 'assets/user.svg'
import { useLogin } from 'hooks/useLogin'
import { useTheme } from 'hooks/useTheme'
import { gql } from '@apollo/client'
import {
  useCreatePostMutation,
  useGlobalNavDataQuery,
} from '__generated__/client-types'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.spacing(8)}px;
  background: ${({ theme }) => theme.themeColors.globalNavBackground};
`

const Header = styled.div``

const StyledIconButton = styled(IconButton)`
  /* color: white; */
  width: 48px;
  height: 48px;
  padding: 0;

  /* &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  } */
`

const Body = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: ${({ theme }) => theme.spacing(1)}px;
`

interface ProfileCircleProps {
  isLoggedIn: boolean
}
const ProfileCircle = styled.div<ProfileCircleProps>`
  height: 24px;
  width: 24px;

  svg {
    fill: ${({ isLoggedIn }) =>
      isLoggedIn ? 'white' : 'rgba(255, 255, 255, 0.47)'};
  }
`

interface ProfileButtonProps {
  isLoggedIn: boolean
}
const ProfileButton = styled(StyledIconButton).withConfig({
  shouldForwardProp: (prop) => !['isLoggedIn'].includes(prop),
})<ProfileButtonProps>`
  ${({ isLoggedIn }) =>
    !isLoggedIn &&
    css`
      &:hover {
        ${ProfileCircle} {
          svg {
            fill: white;
          }
        }
      }
    `}
`

const AddIcon = styled(MuiAddIcon)`
  font-size: 2.125rem;
`

const Menu = styled(MuiMenu)`
  .MuiPaper-root {
    margin-left: 8px;
    width: 125px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;

  & > * {
    margin-top: ${({ theme }) => theme.spacing(1)}px;
  }
`

interface Props {
  closeSidebar: () => void
}
export default function GlobalNav({ closeSidebar }: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { themeMode, toggleTheme } = useTheme()
  const { promptLogin, isLoggedIn } = useLogin()
  const { data } = useGlobalNavDataQuery()
  const [createPostMutation] = useCreatePostMutation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleProfileClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isLoggedIn) {
      promptLogin()
      return
    }

    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    isLoggedInVar(false)
    window.location.reload()
  }

  return (
    <Root>
      <Header />
      <Body>
        <Tooltip placement="right" title="Create Post">
          <StyledIconButton
            background="globalNav"
            onClick={async () => {
              const gameId = data?.featuredEvent.currentUserGameId
              if (gameId) {
                try {
                  const response = await createPostMutation({
                    variables: {
                      input: {
                        gameId,
                      },
                    },
                  })

                  navigate(
                    `/posts/${
                      response.data?.createPost.__typename ===
                        'CreatePostSuccess' && response.data.createPost.post.id
                    }/edit`
                  )
                  closeSidebar()
                } catch (e) {
                  console.error(e)
                  enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                  })
                }
              } else {
                console.error('Trying to create post error: No game id')
                enqueueSnackbar('Please login or join the event', {
                  variant: 'error',
                })
              }
            }}
          >
            <AddIcon />
          </StyledIconButton>
        </Tooltip>
      </Body>
      <Footer>
        <StyledIconButton onClick={toggleTheme} background="globalNav">
          {themeMode === 'light' ? (
            <MuiLightBrightnessIcon />
          ) : (
            <MuiDarkBrightnessIcon />
          )}
        </StyledIconButton>
        <ProfileButton
          onClick={handleProfileClick}
          isLoggedIn={isLoggedIn}
          background="globalNav"
        >
          <ProfileCircle isLoggedIn={isLoggedIn}>
            <UserIcon />
          </ProfileCircle>
        </ProfileButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          marginThreshold={0}
          elevation={0}
          getContentAnchorEl={null}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Footer>
    </Root>
  )
}

gql`
  query GlobalNavData {
    featuredEvent {
      id
      currentUserGameId
    }
  }

  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on CreatePostSuccess {
        post {
          id
        }
      }
    }
  }
`
