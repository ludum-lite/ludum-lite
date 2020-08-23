import React from 'react'
import { useTheme } from 'styled-components/macro'
import { favoritedIdsVar } from 'resolvers'
import { gql } from '@apollo/client'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import ToggleButton from 'components/common/ToggleButton'
import { usePostBookmarkButton_GetFavoritedIdsQuery } from '__generated__/client-types'
import { Background } from 'components/common/mui/Button'

interface Props {
  postId: number
  background: Background
}
export default function PostBookmarkButton({ postId, background }: Props) {
  const theme = useTheme()
  const { data: globalData } = usePostBookmarkButton_GetFavoritedIdsQuery()
  const favoritedIds = globalData?.favoritedIds
  const hasFavoritedPost = !!favoritedIds?.includes(postId)

  return (
    <ToggleButton
      active={hasFavoritedPost}
      color={theme.themeColors.bookmarkButton.activeColor}
      activeIcon={BookmarkIcon}
      defaultIcon={BookmarkBorderIcon}
      size="small"
      background={background}
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

gql`
  query PostBookmarkButton_GetFavoritedIds {
    favoritedIds @client
  }
`
