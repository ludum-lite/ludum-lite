import React from 'react'
import styled, { css } from 'styled-components/macro'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import Button from 'components/common/mui/Button'
import { ignoreProps } from 'utils'

interface StyledButtonProps {
  active: boolean
}
const StyledButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active']),
})<StyledButtonProps>`
  font-size: 1.125rem;
  padding: 6px 1rem;

  ${({ active }) =>
    !active &&
    css`
      &:hover {
        color: ${({ theme }) => theme.themeColors.loveButton.activeColor};
        background-color: ${({ theme }) => theme.buttonRootBackgroundColor};
      }
    `}

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.themeColors.loveButton.activeColor};
      color: white;

      &:hover {
        background: ${({ theme }) => theme.themeColors.loveButton.activeColor};
      }
    `}
`

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 1.25rem;
`

interface Props {
  post: Types.PostLoveButton_post
  me: Types.PostLoveButton_me
}
export default function PostLoveButton({ me, post }: Props) {
  const { promptLogin } = useLogin()
  const [isHovering, setIsHovering] = React.useState(false)

  const { data: globalData } = useQuery<Types.PostLoveButtonGlobalData>(
    GET_GLOBAL_DATA
  )

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
  const isLoggedIn = globalData?.isLoggedIn

  const IconComponent = React.useMemo(() => {
    if (hasLovedPost) {
      if (isHovering) {
        return FavoriteBorderIcon
      } else {
        return FavoriteIcon
      }
    } else {
      if (isHovering) {
        return FavoriteIcon
      } else {
        return FavoriteBorderIcon
      }
    }
  }, [hasLovedPost, isHovering])

  return (
    <StyledButton
      active={hasLovedPost}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (isLoggedIn && me.__typename === 'Me') {
          setIsHovering(false)
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
      <RightIcon as={IconComponent} />
      {post.numLove}
    </StyledButton>
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

const GET_GLOBAL_DATA = gql`
  query PostLoveButtonGlobalData {
    isLoggedIn @client
  }
`

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
