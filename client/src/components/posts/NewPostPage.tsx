import React from 'react'
import styled from 'styled-components/macro'
import {
  useCreatePostMutation,
  useNewPostPageDataQuery,
} from '__generated__/client-types'
import { useSnackbar } from 'notistack'
import { useNavigate } from 'react-router'
import { gql } from '@apollo/client'
import { useFocusJoinEventButton } from 'hooks/useFocusJoinEventButton'
import { useLogin } from 'hooks/useLogin'

const Root = styled.div``

export default function NewPostPage() {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const { data } = useNewPostPageDataQuery()
  const [createPostMutation] = useCreatePostMutation()
  const [, setIsFocusedJoinEventButton] = useFocusJoinEventButton()
  const { isLoggedIn } = useLogin()

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
        if (!isLoggedIn) {
          enqueueSnackbar('Please login', {
            variant: 'error',
          })
        } else {
          enqueueSnackbar('Please join the event from the right side bar', {
            variant: 'error',
          })
          setIsFocusedJoinEventButton(true)
  
          setTimeout(() => {
            setIsFocusedJoinEventButton(false)
          }, 4000)
        }
        navigate('/')
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
