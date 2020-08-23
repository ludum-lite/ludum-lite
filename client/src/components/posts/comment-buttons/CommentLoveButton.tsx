import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql } from '@apollo/client'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import ToggleButton from 'components/common/ToggleButton'
import {
  CommentLoveButton_CommentFragment,
  CommentLoveButton_PostFragment,
  useLoveCommentMutation,
  useUnloveCommentMutation,
} from '__generated__/client-types'

interface Props {
  comment: CommentLoveButton_CommentFragment
  post: CommentLoveButton_PostFragment
}
export default function CommentLoveButton({ comment, post }: Props) {
  const { promptLogin, isLoggedIn } = useLogin()
  const theme = useTheme()

  const [loveComment] = useLoveCommentMutation({
    variables: {
      input: {
        id: comment.id,
      },
    },
  })

  const [unloveComment] = useUnloveCommentMutation({
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
      background="white"
      onClick={(e) => {
        if (isLoggedIn) {
          if (hasLovedPost) {
            unloveComment({
              optimisticResponse: {
                __typename: 'Mutation',
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
                __typename: 'Mutation',
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

gql`
  fragment CommentLoveButton_comment on Comment {
    id
    numLove
  }

  fragment CommentLoveButton_post on Post {
    id
    myCommentLove
  }

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
`
