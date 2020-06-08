import React from 'react'
import { useTheme } from 'styled-components/macro'
import { favoritedIdsVar } from 'resolvers'
import { useQuery, gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ToggleButton from 'components/common/ToggleButton'

interface Props {
  postId: number
}
export default function PostBookmarkButton({ postId }: Props) {
  const theme = useTheme()
  const { data: globalData } = useQuery<
    Types.PostBookmarkButton_GetFavoritedIds
  >(GET_GLOBAL_DATA)
  const favoritedIds = globalData?.favoritedIds
  const hasFavoritedPost = !!favoritedIds?.includes(postId)

  return (
    <ToggleButton
      active={hasFavoritedPost}
      color={theme.themeColors.bookmarkButton.activeColor}
      activeIcon={BookmarkIcon}
      defaultIcon={BookmarkBorderIcon}
      size="small"
      onClick={(e) => {
        e.stopPropagation()
        let newFavoritedIds: number[]

        if (hasFavoritedPost) {
          newFavoritedIds = favoritedIdsVar().filter((id) => postId !== id)
        } else {
          newFavoritedIds = [...favoritedIdsVar(), postId]
        }

        favoritedIdsVar(newFavoritedIds)
        window.localStorage.setItem(
          'favoritedIds',
          JSON.stringify(newFavoritedIds)
        )
      }}
    />
  )
}

const GET_GLOBAL_DATA = gql`
  query PostBookmarkButton_GetFavoritedIds {
    favoritedIds @client
  }
`
