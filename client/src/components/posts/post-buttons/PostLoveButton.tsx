import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql } from '@apollo/client'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import ToggleButton from 'components/common/ToggleButton'
import {
  PostLoveButton_PostFragment,
  PostLoveButton_MeFragment,
  useLovePostMutation,
  useUnlovePostMutation,
} from '__generated__/client-types'
import { Background } from 'components/common/mui/Button'

interface Props {
  post: PostLoveButton_PostFragment
  me: PostLoveButton_MeFragment
  background: Background
}
export default function PostLoveButton({ me, post, background }: Props) {
  const { promptLogin, isLoggedIn } = useLogin()
  const theme = useTheme()

  const [lovePost] = useLovePostMutation({
    variables: {
      input: {
        id: post.id,
      },
    },
  })

  const [unlovePost] = useUnlovePostMutation({
    variables: {
      input: {
        id: post.id,
      },
    },
  })

  const hasLovedPost =
    me.__typename === 'Me' && (me.lovedPosts || []).includes(post.id)

  return (
    <ToggleButton
      active={hasLovedPost}
      color={theme.themeColors.loveButton.activeColor}
      activeIcon={FavoriteIcon}
      defaultIcon={FavoriteBorderIcon}
      size="small"
      background={background}
      onClick={(e) => {
        e.stopPropagation()
        if (isLoggedIn && me.__typename === 'Me') {
          if (hasLovedPost) {
            unlovePost({
              optimisticResponse: {
                __typename: 'Mutation',
                unlovePost: {
                  __typename: 'UnlovePostSuccess' as const,
                  me: {
                    __typename: 'Me' as const,
                    id: me.id,
                    lovedPosts: me.lovedPosts?.filter(
                      (postId) => postId !== post.id
                    ),
                  },
                  post: {
                    __typename: 'Post' as const,
                    id: post.id,
                    numLove: post.numLove - 1,
                  },
                },
              },
            })
          } else {
            lovePost({
              optimisticResponse: {
                __typename: 'Mutation',
                lovePost: {
                  __typename: 'LovePostSuccess' as const,
                  me: {
                    __typename: 'Me' as const,
                    id: me.id,
                    lovedPosts: [...(me.lovedPosts || []), post.id],
                  },
                  post: {
                    __typename: 'Post' as const,
                    id: post.id,
                    numLove: post.numLove + 1,
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
      {post.numLove}
    </ToggleButton>
  )
}

gql`
  fragment PostLoveButton_post on Post {
    id
    numLove
  }

  fragment PostLoveButton_me on MeResponse {
    ... on Me {
      __typename
      id
      lovedPosts
    }
  }

  mutation LovePost($input: IdInput!) {
    lovePost(input: $input) {
      ... on LovePostSuccess {
        post {
          ...PostLoveButton_post
        }
        me {
          ...PostLoveButton_me
        }
      }
    }
  }

  mutation UnlovePost($input: IdInput!) {
    unlovePost(input: $input) {
      ... on UnlovePostSuccess {
        post {
          ...PostLoveButton_post
        }
        me {
          ...PostLoveButton_me
        }
      }
    }
  }
`
