import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import {
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FilledInput,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
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
import { sortBy } from 'lodash'
import {
  useGetPostOverlayPageDataQuery,
  Comments_CommentFragmentDoc,
  Comments_PostFragmentDoc,
  PostLoveButton_MeFragmentDoc,
  PostLoveButton_PostFragmentDoc,
} from '__generated__/client-types'
import useLocalStorage from 'hooks/useLocalStorage'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import useEditablePreviewActionRow from 'hooks/useEditablePreviewActionRow'
import Input from 'components/common/mui/Input'
import { useForm } from 'react-hook-form'
import MultilineTextField from 'components/common/MultilineTextField'
import MultilineInput from 'components/common/MultilineInput'

enum CommentSortBy {
  DatePostedNewest = 'datePosted_newest',
  DatePostedOldest = 'datePosted_oldest',
  Loves = 'loves',
}

const CommentSortByToDisplay = {
  [CommentSortBy.DatePostedNewest]: 'Newest',
  [CommentSortBy.DatePostedOldest]: 'Oldest',
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
  margin: 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px;
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

const EditActionRow = styled.div`
  padding: ${({ theme }) => theme.spacing(1)}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  background: ${({ theme }) => theme.themeColors.post.editActionRowBackground};
`

const TitleInput = styled(FilledInput)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const StyledBodyInput = styled(MultilineTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`

type FormInputs = {
  title: string
  body: string
}

export default function PostPage() {
  const { id: postId } = useParams()
  const [isEditing, setIsEditing] = React.useState(false)
  const [commentSortBy, setSortBy] = useLocalStorage(
    'comments_sortBy',
    CommentSortBy.DatePostedNewest
  )

  const onChangeSortBy = React.useCallback(
    (sortBy: CommentSortBy) => {
      localStorage.setItem('comments_sortBy', JSON.stringify(sortBy))
      setSortBy(sortBy)
    },
    [setSortBy]
  )

  const { setActivePostId } = useActivePostId()

  React.useEffect(() => {
    return () => {
      setActivePostId(parseInt(postId))
    }
  })

  const { data, loading } = useGetPostOverlayPageDataQuery({
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

  const { register, handleSubmit } = useForm<FormInputs>()

  const onSave = React.useCallback(() => {
    handleSubmit(() => {
      console.log('saving')
    })
  }, [handleSubmit])

  const onCancel = React.useCallback(() => {
    setIsEditing(false)
  }, [])

  const { state, actionRow: editActionRow } = useEditablePreviewActionRow({
    value: post?.body || '',
    onSubmit: onSave,
    onCancel,
  })

  const startEditing = React.useCallback(() => {
    setIsEditing(true)
  }, [])

  const body = React.useMemo(() => {
    if (!loading && post) {
      return (
        <Body>
          {isEditing && <EditActionRow>{editActionRow}</EditActionRow>}
          <Article>
            <Header>
              <HeaderContent>
                {isEditing && state === 'write' ? (
                  <TitleInput
                    name="title"
                    placeholder="Title"
                    defaultValue={post.name || ''}
                    inputRef={register}
                  />
                ) : (
                  <Title>
                    <TitleText variant="h5">{post.name}</TitleText>
                  </Title>
                )}
                {!isEditing && (
                  <HeaderUserContainer>
                    <UserPostedHeader
                      userProfilePath={post.author?.profilePath || 'N/A'}
                      userAvatarPath={post.author?.avatarPath || 'N/A'}
                      userName={post.author?.name || 'N/A'}
                      postedDate={post.publishedDate || 'N/A'}
                    />
                  </HeaderUserContainer>
                )}
              </HeaderContent>
            </Header>
            {isEditing && state === 'write' ? (
              <StyledBodyInput
                name="body"
                placeholder="Body"
                defaultValue={post.body || ''}
              />
            ) : (
              post.body && <Markdown source={post.body} />
            )}
          </Article>
          {!isEditing && (
            <Fragment>
              <StyledAddCommentForm postId={post.id} />
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
                    comments={filter(
                      Comments_CommentFragmentDoc,
                      sortedComments
                    )}
                    post={filter(Comments_PostFragmentDoc, post)}
                  />
                )}
              </CommentsContained>
            </Fragment>
          )}
        </Body>
      )
    }

    return <StyledLinearProgress />
  }, [
    loading,
    post,
    isEditing,
    editActionRow,
    register,
    commentSortBy,
    sortedComments,
    onChangeSortBy,
  ])

  const actionRow = React.useMemo(() => {
    if (!loading && !isEditing) {
      const isMyPost = me?.__typename === 'Me' && me?.id === post?.authorId

      return (
        <ActionRow>
          {isMyPost && (
            <IconButton background="white" onClick={startEditing}>
              <Icon icon={EditIcon} />
            </IconButton>
          )}
          {post && me && (
            <PostLoveButton
              post={filter(PostLoveButton_PostFragmentDoc, post)}
              me={filter(PostLoveButton_MeFragmentDoc, me)}
            />
          )}
          {post && <PostBookmarkButton postId={post.id} />}
        </ActionRow>
      )
    }

    return null
  }, [loading, me, post, isEditing, startEditing])

  return (
    <PopupPage
      hideActionRow={isEditing}
      actionRow={actionRow}
      previousPath="/posts"
    >
      {body}
    </PopupPage>
  )
}

gql`
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
  ${PostLoveButton_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
  ${Comments_CommentFragmentDoc}
  ${Comments_PostFragmentDoc}
`
