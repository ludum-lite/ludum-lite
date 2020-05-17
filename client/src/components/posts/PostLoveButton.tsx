import React from 'react'
import styled from 'styled-components/macro'
import { gql, useMutation, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

import FavoriteIcon from '@material-ui/icons/FavoriteRounded'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorderRounded'
import { useLogin } from 'hooks/useLogin'
import Button from 'components/common/mui/Button'

const RightIcon = styled.div`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  font-size: 2rem;
`

interface Props {
  post: Types.PostLoveButton_post
  me: Types.PostLoveButton_me
}
export default function PostLoveButton({ me, post }: Props) {
  const { promptLogin } = useLogin()

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

  console.log(me)
  const hasLovedPost =
    me.__typename === 'Me' && (me.lovedPosts || []).includes(post.id)
  const isLoggedIn = globalData?.isLoggedIn

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation()
        if (isLoggedIn) {
          if (hasLovedPost) {
            unlovePost()
          } else {
            lovePost()
          }
        } else {
          promptLogin()
        }
      }}
    >
      {hasLovedPost ? (
        <RightIcon as={FavoriteIcon} />
      ) : (
        <RightIcon as={FavoriteBorderIcon} />
      )}
      {post.numLove}
    </Button>
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
