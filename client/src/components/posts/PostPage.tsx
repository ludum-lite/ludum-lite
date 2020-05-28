import React from 'react'
import styled from 'styled-components/macro'
import { gql, useQuery } from '@apollo/client'
import * as Types from '__generated__/Types'

import {
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core'
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
import { getItemWithDefault } from 'utils'
import { sortBy } from 'lodash'

enum CommentSortBy {
  DatePostedNewest = 'datePosted_newest',
  DatePostedOldest = 'datePosted_oldest',
  Loves = 'loves',
}

const CommentSortByToDisplay = {
  [CommentSortBy.DatePostedNewest]: 'Date posted (Newest)',
  [CommentSortBy.DatePostedOldest]: 'Date posted (Oldest)',
  [CommentSortBy.Loves]: 'Popular',
}

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

const CommentsTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: ${({ theme }) => theme.spacing(3)}px 0;
`

const CommentsTitle = styled(Typography)`
  /* Align bottom of text with container */
  line-height: 0.9;
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

let storedCommentSortBy = getItemWithDefault<CommentSortBy>(
  'comments_sortBy',
  CommentSortBy.DatePostedNewest
)

export default function PostPage() {
  const { id: postId } = useParams()
  const [commentSortBy, setSortBy] = React.useState<CommentSortBy>(
    storedCommentSortBy
  )

  const onChangeSortBy = React.useCallback((sortBy: CommentSortBy) => {
    localStorage.setItem('comments_sortBy', JSON.stringify(sortBy))
    setSortBy(sortBy)
  }, [])

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

  const comments = post?.comments

  const sortedComments = React.useMemo(() => {
    if (comments) {
      if (commentSortBy === CommentSortBy.DatePostedNewest) {
        return sortBy(comments, 'createdAt').reverse()
      } else if (commentSortBy === CommentSortBy.DatePostedOldest) {
        return sortBy(comments, 'createdAt')
      } else if (commentSortBy === CommentSortBy.Loves) {
        return sortBy(comments, ['numLove', 'createdAt']).reverse()
      }
    }

    return []
  }, [commentSortBy, comments])

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
            <CommentsTitleContainer>
              <CommentsTitle variant="h5">Comments</CommentsTitle>
              <FormControl variant="filled">
                <InputLabel id="demo-simple-select-filled-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={commentSortBy}
                  onChange={(e) => {
                    console.log(e)
                    onChangeSortBy(e.target.value as CommentSortBy)
                  }}
                >
                  <MenuItem value={CommentSortBy.DatePostedNewest}>
                    {CommentSortByToDisplay[CommentSortBy.DatePostedNewest]}
                  </MenuItem>
                  <MenuItem value={CommentSortBy.DatePostedOldest}>
                    {CommentSortByToDisplay[CommentSortBy.DatePostedOldest]}
                  </MenuItem>
                  <MenuItem value={CommentSortBy.Loves}>
                    {CommentSortByToDisplay[CommentSortBy.Loves]}
                  </MenuItem>
                </Select>
              </FormControl>
            </CommentsTitleContainer>
            {post && (
              <Comments
                comments={filter(Comments.fragments.comment, sortedComments)}
                post={filter(Comments.fragments.post, post)}
              />
            )}
          </CommentsContained>
        </Body>
      )
    }

    return <StyledLinearProgress />
  }, [post, loading, commentSortBy, onChangeSortBy, sortedComments])

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
