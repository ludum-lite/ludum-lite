import React, { Fragment } from 'react'
import styled, { css } from 'styled-components/macro'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './sidebar/Sidebar'
import RoutesWithFallback from './common/RoutesWithFallback'
import PostsPage from 'components/posts/PostsPage'
import { usePostOverlayed } from 'hooks/usePostOverlay'
import PostPage from './posts/PostPage'
import { useLogin } from 'hooks/useLogin'
import { useHasNavigatedWithin } from 'hooks/useHasNavigatedWithin'
import { useMe } from 'hooks/useMe'
// import { ignoreProps } from 'utils'
// import CountdownWidget from './sidebar/CountdownWidget'
// import TeamWidget from './team-widget/TeamWidget'
// import GameWidget from './game-widget/GameWidget'
import InvitePage from './team-widget/InvitePage'
import AcceptedInvitePage from './team-widget/AcceptedInvitePage'
// import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
// import VideogameAssetIcon from '@material-ui/icons/VideogameAsset'
// import PeopleAltIcon from '@material-ui/icons/PeopleAlt'
import ConfirmInviteAndAddToTeamPage from './team-widget/ConfirmInviteAndAddToTeamPage'
import { Hidden } from '@material-ui/core'
// import IconButton from 'components/common/mui/IconButton'
// import Icon from './common/mui/Icon'
// import { borderRadius } from 'polished'
// import { useFeaturedEvent } from 'hooks/useFeaturedEvent'
// import NotificationBar from './notification-bar/NotificationBar'
import EventPage from './events/EventPage'
import { ROUTES } from './routes/routes'
// import useSelectedWidget from 'hooks/useSelectedWidget'
import NewPostPage from './posts/NewPostPage'
import Topbar from './topbar/Topbar'
import WidgetsSidebar from './widgets-sidebar/WidgetsSidebar'

const Root = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
`

const AppContent = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0px;
  position: relative;
  max-width: 1100px;

  ${({ theme }) => theme.breakpoints.up('md')} {
    /* margin-left: ${({ theme }) => theme.variables.sidebar.widthPx}; */
    /* margin-right: 277px; */
    /* margin-top: ${({ theme }) => theme.spacing(8)}px; */
  }
`

const MiddleContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  flex-direction: column;
  height: 100%;
`

// const WidgetSelector = styled.div`
//   display: flex;

//   & > *:not(:last-child) {
//     margin-right: ${({ theme }) => theme.spacing(1)}px;
//   }
// `

// interface WidgetSelectorButtonProps {
//   active?: boolean
// }
// const WidgetSelectorButton = styled(IconButton).withConfig({
//   shouldForwardProp: ignoreProps(['active']),
// })<WidgetSelectorButtonProps>`
//   ${borderRadius('bottom', 0)}
//   background: rgba(0, 0, 0, 0.18);

//   ${({ active }) =>
//     active &&
//     css`
//       background: ${({ theme }) => theme.themeColors.contextualNavBackground};
//       color: white;
//       width: 70px;

//       &:hover {
//         background: ${({ theme }) => theme.themeColors.contextualNavBackground};
//       }
//     `}
// `

// const Widgets = styled.div`
//   flex: 1 1 auto;
//   display: flex;
//   flex-direction: column;
//   width: inherit;
// `

// interface CommonWidgetProps {
//   hide?: boolean
//   hasTabs?: boolean
// }
// const widgetContainerStyles = ({ hide, hasTabs }: CommonWidgetProps) => css`
//   border-radius: ${({ theme }) => theme.shape.borderRadius}px;
//   overflow: hidden;
//   display: ${hide && 'none'};
//   border-top-left-radius: ${hasTabs && 0};
// `
// const StyledCountdownWidget = styled(CountdownWidget)<CommonWidgetProps>`
//   max-height: 600px;
//   ${widgetContainerStyles}
// `

// const StyledGameWidget = styled(GameWidget)<CommonWidgetProps>`
//   ${widgetContainerStyles}
// `

// const StyledTeamWidget = styled(TeamWidget)<CommonWidgetProps>`
//   ${widgetContainerStyles}
// `

// const MobileWidgetContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: ${({ theme }) => `${theme.spacing(2)}px ${theme.spacing(4)}px 0`};
//   margin-top: ${({ theme }) => theme.spacing(2)}px;
//   max-width: 277px;
// `

// const WidgetsContainer = styled.div`
//   display: flex;
//   position: relative;
//   min-width: 277px;
//   width: 277px;
//   margin-right: ${({ theme }) => theme.spacing(2)}px;
//   margin-top: -${({ theme }) => theme.shape.borderRadius}px;

//   ${Widgets} {
//     & > *:not(:last-child) {
//       margin-bottom: ${({ theme }) => theme.spacing(1)}px;
//     }
//   }
// `

export default function App() {
  useHasNavigatedWithin()
  // const [selectedWidget, setSelectedWidget] = useSelectedWidget()
  const [postOverlayed] = usePostOverlayed()
  const { loginComponent } = useLogin()
  const { hasLoaded } = useMe()
  // const { featuredEvent } = useFeaturedEvent()

  if (hasLoaded) {
    return (
      <Root>
        <AppContent>
          <Routes>
            <Route path="/:basePath*" element={<Sidebar />} />
          </Routes>
          {/* <NotificationBar /> */}
          <MiddleContent>
            <Topbar />
            <RoutesWithFallback>
              <Route path={ROUTES.EVENT.SINGLE_BASE} element={<EventPage />} />
              <Route path={ROUTES.EVENT.SINGLE} element={<EventPage />} />
              <Route path="/posts" element={<PostsPage />} />
              {postOverlayed ? (
                <Route
                  path="/posts/:id"
                  element={
                    <>
                      <PostsPage />
                      <PostPage />
                    </>
                  }
                />
              ) : (
                <Route path="/posts/:id" element={<PostPage />} />
              )}
              <Route path="/posts/new" element={<NewPostPage />} />
              <Route path="/posts/:id/edit" element={<PostPage isEditing />} />
              <Route path="/invite/:userId" element={<InvitePage />} />
              <Route
                path="/accepted-invite/:userId"
                element={<AcceptedInvitePage />}
              />
              <Route
                path="/confirm-invite/:userId"
                element={<ConfirmInviteAndAddToTeamPage />}
              />
            </RoutesWithFallback>
          </MiddleContent>
          <WidgetsSidebar />
        </AppContent>
        {/* <Hidden mdUp>
          Move to Sidebar
          <MobileWidgetContainer>
            {isLoggedIn && (
              <WidgetSelector>
                <WidgetSelectorButton
                  active={selectedWidget === 'countdown'}
                  onClick={() => setSelectedWidget('countdown')}
                >
                  <Icon icon={QueryBuilderIcon} />
                </WidgetSelectorButton>
                <WidgetSelectorButton
                  active={selectedWidget === 'game'}
                  onClick={() => setSelectedWidget('game')}
                >
                  <Icon icon={VideogameAssetIcon} />
                </WidgetSelectorButton>
                {featuredEvent?.currentUserGameId && (
                  <WidgetSelectorButton
                    active={selectedWidget === 'team'}
                    onClick={() => setSelectedWidget('team')}
                  >
                    <Icon icon={PeopleAltIcon} />
                  </WidgetSelectorButton>
                )}
              </WidgetSelector>
            )}
            <Widgets>
              {isLoggedIn ? (
                <Fragment>
                  <StyledCountdownWidget
                    hide={selectedWidget !== 'countdown'}
                    events={events}
                    hasTabs
                  />
                  <StyledGameWidget
                    hide={selectedWidget !== 'game'}
                    hasTabs
                  />
                  <StyledTeamWidget
                    hide={selectedWidget !== 'team'}
                    hasTabs
                  />
                </Fragment>
              ) : (
                <StyledCountdownWidget events={events} />
              )}
            </Widgets>
          </MobileWidgetContainer>
        </Hidden> */}
        {loginComponent}
      </Root>
    )
  }

  return null
}
