import React from 'react'
import { useTheme } from 'styled-components/macro'
import { gql, useMutation } from '@apollo/client'
import * as Types from '__generated__/Types'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import ToggleButton from 'components/common/ToggleButton'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'

interface Props {
  post: Types.PostLoveButton_post
  me: Types.PostLoveButton_me
}
export default function PostLoveButton({ me, post }: Props) {
  const { promptLogin } = useLogin()
  const isLoggedIn = useIsLoggedIn()
  const theme = useTheme()

  const [lovePost] = useMutation<Types.LovePost, Types.LovePostVariables>(
    LOVE_POST,
    {
      variables: {
        input: {
          id: post.id,
        },
      },
    }
  )

  const [unlovePost] = useMutation<Types.UnlovePost, Types.UnlovePostVariables>(
    UNLOVE_POST,
    {
      variables: {
        input: {
          id: post.id,
        },
      },
    }
  )

  const hasLovedPost =
    me.__typename === 'Me' && (me.lovedPosts || []).includes(post.id)

  return (
    <ToggleButton
      active={hasLovedPost}
      color={theme.themeColors.loveButton.activeColor}
      activeIcon={FavoriteIcon}
      defaultIcon={FavoriteBorderIcon}
      onClick={(e) => {
        e.stopPropagation()
        if (isLoggedIn && me.__typename === 'Me') {
          if (hasLovedPost) {
            unlovePost({
              optimisticResponse: {
                unlovePost: {
                  __typename: 'UnlovePostSuccess' as const,
                  me: {
                    __typename: 'Me' as const,
                    id: me.id,
                    lovedPosts: me.lovedPosts.filter(
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
                lovePost: {
                  __typename: 'LovePostSuccess' as const,
                  me: {
                    __typename: 'Me' as const,
                    id: me.id,
                    lovedPosts: [...me.lovedPosts, post.id],
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

PostLoveButton.fragments = {
  post: gql`
    fragment PostLoveButton_post on Post {
      id
      numLove
    }
  `,
  me: gql`
    fragment PostLoveButton_me on MeResponse {
      ... on Me {
        __typename
        id
        lovedPosts
      }
    }
  `,
}

const LOVE_POST = gql`
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
  ${PostLoveButton.fragments.post}
  ${PostLoveButton.fragments.me}
`

const UNLOVE_POST = gql`
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
  ${PostLoveButton.fragments.post}
  ${PostLoveButton.fragments.me}
`
