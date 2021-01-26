import React from 'react'
import styled from 'styled-components/macro'
// import { useSearchParams } from 'react-router-dom'

import { gql, NetworkStatus } from '@apollo/client'

import Button from 'components/common/mui/Button'
import { Typography, LinearProgress } from '@material-ui/core'
// import { ignoreProps } from 'utils'
import Game from './Game'
import {
  useGetGamesPageDataQuery,
  PostType,
  Game_GameFragmentDoc,
  // usePostsPage_GetFavoritedIdsQuery,
} from '__generated__/client-types'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
  /* Keep scroll bar on bar while loading so the page doesn't jump sideways */
  margin-bottom: -1;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLinearProgress = styled(LinearProgress)`
  border: 1px solid ${({ theme }) => theme.themeColors.loader.barBackground};
`

const Games = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterContainer = styled.div`
  margin: ${({ theme }) => theme.spacing(2)}px;
`

const MoreButton = styled(Button)`
  height: 112px;
`

// interface SortButtonProps {
//   active: boolean
// }
// const SortButton = styled(Button).withConfig({
//   shouldForwardProp: ignoreProps(['active']),
// })<SortButtonProps>`
//   /* ${({ active }) =>
//     active &&
//     css`
//       background-color: ${({ theme }) => theme.themeColors.backgrounds.level1};

//       &:hover {
//         background-color: ${({ theme }) =>
//           theme.themeColors.backgrounds.level1};
//       }
//     `} */
// `

const SortActions = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)}px;

  & > *:not(last-child) {
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
`

// TODO mark for duplication
const NoItemsContainerRoot = styled.div`
  display: flex;
  height: 125px;
  align-items: center;
  justify-content: center;
`

const NoItemsContainer = () => (
  <NoItemsContainerRoot>
    <Typography variant="h4" color="textSecondary">
      No Games :(
    </Typography>
  </NoItemsContainerRoot>
)

export default function GamesPage() {
  // const [searchParams, setSearchParams] = useSearchParams({
  //   postType: PostType.All,
  // })

  // const postType = searchParams.get('postType') as PostType

  const { data, loading, fetchMore, networkStatus } = useGetGamesPageDataQuery({
    variables: {
      filters: {
        eventId: 825,
      },
      limit: 3,
      page: 0,
    },
    notifyOnNetworkStatusChange: true,
  })

  console.log({
    data,
  })

  const gameComponents =
    data?.searchGames?.games?.map((game) => (
      <Game key={game.id} game={game} />
    )) || []

  const hasGames = gameComponents.length > 0

  const body = React.useMemo(() => {
    if (
      networkStatus === NetworkStatus.loading ||
      networkStatus === NetworkStatus.setVariables
    ) {
      return null
    } else if (hasGames) {
      return <Games>{gameComponents}</Games>
    } else {
      return <NoItemsContainer />
    }
  }, [gameComponents, hasGames, networkStatus])

  const footer = React.useMemo(() => {
    if (
      (networkStatus === NetworkStatus.ready ||
        networkStatus === NetworkStatus.error) &&
      !hasGames
    ) {
      return null
    } else if (loading) {
      return <StyledLinearProgress />
    }

    return (
      <MoreButton
        variant="outlined"
        color="primary"
        disableElevation
        fullWidth
        onClick={() => {
          fetchMore({
            variables: {
              page: (data?.searchGames?.page || 0) + 1,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev
              return {
                ...fetchMoreResult,
                searchGames: {
                  ...fetchMoreResult.searchGames,
                  games: [
                    ...prev.searchGames.games,
                    ...fetchMoreResult.searchGames.games,
                  ],
                },
              }
            },
          })
        }}
      >
        <Typography variant="h4">Load More</Typography>
      </MoreButton>
    )
  }, [loading, networkStatus, data, fetchMore, hasGames])

  return (
    <Root>
      <SortActions>
        <FormControl variant="filled">
          <InputLabel id="games-event-label">Event</InputLabel>
          <Select
            labelId="games-event-label"
            id="games-event-select"
            value="47"
            // onChange={(e) => {
            //   onChangeSortBy(e.target.value as CommentSortBy)
            // }}
          >
            <MenuItem value="47">Ludum Dare 47</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="games-event-label">Category</InputLabel>
          <Select
            labelId="games-event-label"
            id="games-event-select"
            value="47"
            // onChange={(e) => {
            //   onChangeSortBy(e.target.value as CommentSortBy)
            // }}
          >
            <MenuItem value="47">Jam+Compo</MenuItem>
            <MenuItem value="48">Jam</MenuItem>
            <MenuItem value="49">Compo</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="filled">
          <InputLabel id="games-event-label">Sort</InputLabel>
          <Select
            labelId="games-event-label"
            id="games-event-select"
            value="47"
            // onChange={(e) => {
            //   onChangeSortBy(e.target.value as CommentSortBy)
            // }}
          >
            <MenuItem value="47">Smart</MenuItem>
            <MenuItem value="48">Classic</MenuItem>
            <MenuItem value="49">Danger</MenuItem>
            <MenuItem value="50">Zero</MenuItem>
            <MenuItem value="51">Feedback</MenuItem>
            <MenuItem value="52">Grade</MenuItem>
          </Select>
        </FormControl>
      </SortActions>
      <Content>
        {body}
        <FooterContainer>{footer}</FooterContainer>
      </Content>
    </Root>
  )
}

gql`
  query GetGamesPageData(
    $filters: SearchGamesFiltersInput!
    $limit: Int!
    $page: Int!
  ) {
    searchGames(filters: $filters, limit: $limit, page: $page) {
      page
      games {
        ...Game_game
      }
    }
  }
  ${Game_GameFragmentDoc}
`
