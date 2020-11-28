import React from 'react'
import styled from 'styled-components/macro'
import {
  useCreatePostMutation,
  useNewPostPageDataQuery,
} from '__generated__/client-types'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { gql } from '@apollo/client'

const Root = styled.div``

interface Props {}
export default function NewPostPage({}: Props) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { data } = useNewPostPageDataQuery()
  const [createPostMutation] = useCreatePostMutation()

  React.useEffect(() => {
    async function createPost() {
      const gameId = data?.featuredEvent.currentUserGameId
      if (gameId) {
        try {
          const response = await createPostMutation({
            variables: {
              input: {
                gameId,
              },
            },
          })

          navigate(
            `/posts/${
              response.data?.createPost.__typename === 'CreatePostSuccess' &&
              response.data.createPost.post.id
            }/edit`
          )
        } catch (e) {
          console.error(e)
          enqueueSnackbar('Something went wrong', {
            variant: 'error',
          })
        }
      } else {
        console.error('Trying to create post error: No game id')
        enqueueSnackbar('Please login or join the event', {
          variant: 'error',
        })
      }
    }

    createPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Root />
}

gql`
  query NewPostPageData {
    featuredEvent {
      id
      currentUserGameId
    }
  }

  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on CreatePostSuccess {
        post {
          id
        }
      }
    }
  }
`
