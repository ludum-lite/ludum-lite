import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import { gql, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

import { Typography, LinearProgress } from '@material-ui/core'
import PopupPage from './PopupPage'
import UserPostedHeader from './UserPostedHeader'
import { useParams } from 'react-router'
import Markdown from 'components/common/Markdown'
import PostLoveButton from './post-buttons/PostLoveButton'
import PostBookmarkButton from './post-buttons/PostBookmarkButton'
import { filter } from 'graphql-anywhere'
import { useActivePostId } from 'hooks/useActivePostId'

const Header = styled.div`
  display: flex;
  align-items: center;
`

const HeaderContent = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
`

const HeaderUserContainer = styled.div``

const Title = styled.div`
  margin-right: 8px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const TitleText = styled(Typography)`
  font-weight: 500;
`

const ActionRow = styled.div`
  flex: 1 1 0px;
  display: flex;
  justify-content: flex-end;

  & > * {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

const GET_DATA = gql`
  query GetPostOverlayPageData($input: IdInput!) {
    post(input: $input) {
      id
      name
      publishedDate
      body
      author {
        id
        profilePath
        avatarPath
        name
      }
      ...PostLoveButton_post
    }
    me {
      ...PostLoveButton_me
    }
  }
  ${PostLoveButton.fragments.post}
  ${PostLoveButton.fragments.me}
`

export default function PostPage() {
  const { id: postId } = useParams()

  const { setActivePostId } = useActivePostId()

  React.useEffect(() => {
    return () => {
      setActivePostId(parseInt(postId))
    }
  })

  const { data, loading } = useQuery<
    Types.GetPostOverlayPageData,
    Types.GetPostOverlayPageDataVariables
  >(GET_DATA, {
    variables: {
      input: {
        id: parseInt(postId),
      },
    },
  })

  const post = data?.post
  const me = data?.me

  const body = React.useMemo(() => {
    if (!loading) {
      return (
        <Fragment>
          <Header>
            <HeaderContent>
              <Title>
                <TitleText variant="h5">{post?.name}</TitleText>
              </Title>
              <HeaderUserContainer>
                <UserPostedHeader
                  userProfilePath={post?.author?.profilePath || 'N/A'}
                  userAvatarPath={post?.author?.avatarPath || 'N/A'}
                  userName={post?.author?.name || 'N/A'}
                  postedDate={post?.publishedDate || 'N/A'}
                />
              </HeaderUserContainer>
            </HeaderContent>
          </Header>
          {post?.body && <Markdown source={post.body} />}
        </Fragment>
      )
    }

    return <LinearProgress />
  }, [post, loading])

  const actionRow = React.useMemo(() => {
    if (!loading) {
      return (
        <ActionRow>
          {post && me && (
            <PostLoveButton
              post={filter(PostLoveButton.fragments.post, post)}
              me={filter(PostLoveButton.fragments.me, me)}
            />
          )}
          {post && <PostBookmarkButton postId={post.id} />}
        </ActionRow>
      )
    }

    return null
  }, [post, me, loading])

  return <PopupPage actionRow={actionRow}>{body}</PopupPage>
}
