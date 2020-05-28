import React from 'react'
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
import AddCommentForm from './AddCommentForm'
import Comments from './Comments'

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

const Body = styled.div`
  display: flex;
  flex-direction: column;
`

const Article = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
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

const StyledLinearProgress = styled(LinearProgress)`
  margin: 0 ${({ theme }) => theme.spacing(3)}px;
`

const StyledAddCommentForm = styled(AddCommentForm)`
  margin: 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px;
`

const CommentsContained = styled.div`
  padding: 0 ${({ theme }) => theme.spacing(3)}px;
`

const CommentsTitle = styled(Typography)`
  margin: ${({ theme }) => theme.spacing(3)}px 0;
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
      comments {
        ...Comments_comment
      }
      ...PostLoveButton_post
      ...Comments_post
    }
    me {
      ...PostLoveButton_me
    }
  }
  ${PostLoveButton.fragments.post}
  ${PostLoveButton.fragments.me}
  ${Comments.fragments.comment}
  ${Comments.fragments.post}
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
        <Body>
          <Article>
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
          </Article>
          <StyledAddCommentForm />
          <CommentsContained>
            <CommentsTitle variant="h5">Comments</CommentsTitle>
            {post?.comments && (
              <Comments
                comments={filter(Comments.fragments.comment, post.comments)}
                post={filter(Comments.fragments.post, post)}
              />
            )}
          </CommentsContained>
        </Body>
      )
    }

    return <StyledLinearProgress />
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
