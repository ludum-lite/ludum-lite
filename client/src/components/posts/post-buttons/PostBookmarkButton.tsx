import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from 'components/common/mui/Button'
import { favoritedIdsVar } from 'resolvers'
import { useQuery, gql } from '@apollo/client'
import * as Types from '__generated__/Types'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import BookmarkIcon from '@material-ui/icons/Bookmark'

interface StyledButtonProps {
  active: boolean
}
const StyledButton = styled(Button)<StyledButtonProps>`
  ${({ active }) =>
    !active &&
    css`
      &:hover {
        color: ${({ theme }) => theme.themeColors.bookmarkButton.activeColor};
        background-color: ${({ theme }) => theme.buttonRootBackgroundColor};
      }
    `}

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) =>
        theme.themeColors.bookmarkButton.activeColor};
      color: white;

      &:hover {
        background: ${({ theme }) =>
          theme.themeColors.bookmarkButton.activeColor};
      }
    `}
`

interface Props {
  postId: number
}
export default function PostBookmarkButton({ postId }: Props) {
  const { data: globalData } = useQuery<
    Types.PostBookmarkButton_GetFavoritedIds
  >(GET_GLOBAL_DATA)
  const [isHovering, setIsHovering] = React.useState(false)

  const favoritedIds = globalData?.favoritedIds
  const hasFavoritedPost = !!favoritedIds?.includes(postId)

  const IconComponent = React.useMemo(() => {
    if (hasFavoritedPost) {
      if (isHovering) {
        return BookmarkBorderIcon
      } else {
        return BookmarkIcon
      }
    } else {
      if (isHovering) {
        return BookmarkIcon
      } else {
        return BookmarkBorderIcon
      }
    }
  }, [hasFavoritedPost, isHovering])

  return (
    <StyledButton
      active={hasFavoritedPost}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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
        setIsHovering(false)
      }}
    >
      <IconComponent />
    </StyledButton>
  )
}

const GET_GLOBAL_DATA = gql`
  query PostBookmarkButton_GetFavoritedIds {
    favoritedIds @client
  }
`
