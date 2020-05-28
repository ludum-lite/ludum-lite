import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import ToggleButton from 'components/common/ToggleButton'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'

interface Props {
  comment: Types.CommentLoveButton_comment
  post: Types.CommentLoveButton_post
}
export default function CommentLoveButton({ comment, post }: Props) {
  const { promptLogin } = useLogin()
  const isLoggedIn = useIsLoggedIn()
  const theme = useTheme()

  const [loveComment] = useMutation<
    Types.LoveComment,
    Types.LoveCommentVariables
  >(LOVE_COMMENT, {
    variables: {
      input: {
        id: comment.id,
      },
    },
  })

  const [unloveComment] = useMutation<
    Types.UnloveComment,
    Types.UnloveCommentVariables
  >(UNLOVE_COMMENT, {
    variables: {
      input: {
        id: comment.id,
      },
    },
  })

  const hasLovedPost = (post.myCommentLove || []).includes(comment.id)

  return (
    <ToggleButton
      active={hasLovedPost}
      color={theme.themeColors.loveButton.activeColor}
      activeIcon={FavoriteIcon}
      defaultIcon={FavoriteBorderIcon}
      onClick={(e) => {
        if (isLoggedIn) {
          if (hasLovedPost) {
            unloveComment({
              optimisticResponse: {
                unloveComment: {
                  __typename: 'UnloveCommentSuccess' as const,
                  comment: {
                    __typename: 'Comment' as const,
                    id: comment.id,
                    numLove: comment.numLove - 1,
                  },
                  post: {
                    __typename: 'Post' as const,
                    id: post.id,
                    myCommentLove: (post.myCommentLove || []).filter(
                      (commentId) => commentId !== comment.id
                    ),
                  },
                },
              },
            })
          } else {
            loveComment({
              optimisticResponse: {
                loveComment: {
                  __typename: 'LoveCommentSuccess' as const,
                  comment: {
                    __typename: 'Comment' as const,
                    id: comment.id,
                    numLove: comment.numLove + 1,
                  },
                  post: {
                    __typename: 'Post' as const,
                    id: post.id,
                    myCommentLove: [...(post.myCommentLove || []), comment.id],
                  },
                },
              },
            })
          }
        } else {
          promptLogin()
        }
      }}
    >
      {comment.numLove}
    </ToggleButton>
  )
}

CommentLoveButton.fragments = {
  comment: gql`
    fragment CommentLoveButton_comment on Comment {
      id
      numLove
    }
  `,
  post: gql`
    fragment CommentLoveButton_post on Post {
      id
      myCommentLove
    }
  `,
}

const LOVE_COMMENT = gql`
  mutation LoveComment($input: IdInput!) {
    loveComment(input: $input) {
      ... on LoveCommentSuccess {
        comment {
          ...CommentLoveButton_comment
        }
        post {
          ...CommentLoveButton_post
        }
      }
    }
  }
  ${CommentLoveButton.fragments.comment}
  ${CommentLoveButton.fragments.post}
`

const UNLOVE_COMMENT = gql`
  mutation UnloveComment($input: IdInput!) {
    unloveComment(input: $input) {
      ... on UnloveCommentSuccess {
        comment {
          ...CommentLoveButton_comment
        }
        post {
          ...CommentLoveButton_post
        }
      }
    }
  }
  ${CommentLoveButton.fragments.comment}
  ${CommentLoveButton.fragments.post}
`
