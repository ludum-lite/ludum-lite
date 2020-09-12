import React, { Fragment } from 'react'
import styled, { css } from 'styled-components/macro'
import { gql } from '@apollo/client'
import _ from 'lodash'

import {
  Typography,
  LinearProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FilledInput,
  Menu,
  Breadcrumbs,
} from '@material-ui/core'
import PopupPage from '../common/PopupPage'
import UserPostedHeader from './UserPostedHeader'
import { useParams, useNavigate } from 'react-router'
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
  useEditPostMutation,
  usePublishPostMutation,
} from '__generated__/client-types'
import useLocalStorage from 'hooks/useLocalStorage'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import useEditablePreviewActionRow from 'hooks/useEditablePreviewActionRow'
import { useForm, Controller } from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { useMinLoadingTime } from 'hooks/useMinLoadingTime'
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import Tag from 'components/common/Tag'
import PreviewableMarkdownInput from 'components/common/PreviewableMarkdownInput'
import Breadcrumb from 'components/common/Breadcrumb'

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
  max-width: 100%;
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
  padding: ${({ theme }) => `${theme.spacing(3)}px`};
`

const TitleText = styled(Typography)`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ActionRow = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: ${({ theme }) => theme.spacing(1)}px;
  }
`

const StyledLinearProgress = styled(LinearProgress)`
  margin: ${({ theme }) => theme.spacing(3)}px;
`

const StyledAddCommentForm = styled(AddCommentForm)`
  margin: 0 ${({ theme }) => theme.spacing(3)}px
    ${({ theme }) => theme.spacing(3)}px;
`

const CommentsContainer = styled.div`
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
  margin-top: ${({ theme }) => theme.spacing(1)}px;
  background: ${({ theme }) => theme.themeColors.post.editActionRowBackground};
`

const TitleInput = styled(FilledInput)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const TitleInputError = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const StyledPreviewableMarkdownInput = styled(PreviewableMarkdownInput)`
  /* margin-bottom: ${({ theme }) => theme.spacing(3)}px; */
`

const MenuButton = styled(IconButton)`
  width: 36px;
  height: 36px;
  padding: 0;
`

type FormInputs = {
  title: string
  body: string
}

interface PostPageProps {
  isEditing?: boolean
}

export default function PostPage({ isEditing }: PostPageProps) {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const popupState = usePopupState({ variant: 'popover', popupId: 'menu' })
  const { id: postId } = useParams()
  const {
    control,
    register,
    handleSubmit,
    errors,
    setError,
    clearErrors,
    reset,
  } = useForm<FormInputs>()

  const [commentSortBy, setSortBy] = useLocalStorage(
    'comments_sortBy',
    CommentSortBy.DatePostedNewest
  )

  const startEditing = React.useCallback(() => {
    navigate(`/posts/${postId}/edit`)
    clearErrors()
  }, [navigate, postId, clearErrors])

  const stopEditing = React.useCallback(() => {
    navigate(`/posts/${postId}`, {
      replace: true,
    })
    clearErrors()
    reset()
  }, [clearErrors, navigate, reset, postId])

  const onChangeSortBy = React.useCallback(
    (sortBy: CommentSortBy) => {
      localStorage.setItem('comments_sortBy', JSON.stringify(sortBy))
      setSortBy(sortBy)
    },
    [setSortBy]
  )

  const { setActivePostId } = useActivePostId()

  const [editPostMutation] = useEditPostMutation()
  const [publishPostMutation] = usePublishPostMutation()

  const { fn: editPost, isLoading: isSavingPost } = useMinLoadingTime(
    editPostMutation
  )

  React.useEffect(() => {
    return () => {
      setActivePostId(parseInt(postId))
    }
  }, [postId, setActivePostId])

  const { data, loading } = useGetPostOverlayPageDataQuery({
    variables: {
      input: {
        id: parseInt(postId),
      },
    },
  })

  const post = data?.post
  const me = data?.me
  const isMyPost = me?.__typename === 'Me' && me?.id === post?.authorId
  const isNotMyPost =
    Boolean(me?.__typename) &&
    (me?.__typename === 'UnauthorizedResponse' ||
      (me?.__typename === 'Me' && me?.id !== post?.authorId))

  React.useEffect(() => {
    if (isNotMyPost && isEditing) {
      stopEditing()
    }
  }, [isNotMyPost, isEditing, stopEditing])

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

  const onSave = React.useMemo(() => {
    return handleSubmit(async (data) => {
      if (post) {
        try {
          const response = await editPost({
            variables: {
              input: {
                id: post?.id,
                title: data.title,
                body: data.body,
              },
            },
          })

          if (response.data?.editPost.__typename === 'EditPostFieldError') {
            if (response.data.editPost.fields?.title) {
              setError('title', {
                type: 'manual',
                message: response.data.editPost.fields?.title,
              })
            }

            if (response.data.editPost.fields?.body) {
              setError('body', {
                type: 'manual',
                message: response.data.editPost.fields?.body,
              })
            }
          } else {
            enqueueSnackbar('Post saved successfully', {
              variant: 'success',
            })

            stopEditing()
          }
        } catch (e) {
          console.log(e)
          enqueueSnackbar('There was an error', {
            variant: 'error',
          })
        }
      } else {
        console.error('post wasnt loaded')
      }
    })
  }, [editPost, enqueueSnackbar, handleSubmit, post, setError, stopEditing])

  const { state, actionRow: editActionRow } = useEditablePreviewActionRow({
    value: post?.body || '',
    isSaving: isSavingPost,
    onSubmit: onSave,
    onCancel: stopEditing,
  })

  const menu = React.useMemo(() => {
    const menuItems = []

    if (isMyPost) {
      menuItems.push(
        <MenuItem
          key="edit"
          onClick={() => {
            popupState.close()
            startEditing()
          }}
        >
          Edit
        </MenuItem>
      )

      if (!post?.publishedDate) {
        menuItems.push(
          <MenuItem
            key="publish"
            onClick={async () => {
              popupState.close()

              if (post?.id) {
                try {
                  const response = await publishPostMutation({
                    variables: {
                      input: {
                        id: post.id,
                      },
                    },
                  })

                  if (
                    response.data?.publishPost.__typename ===
                    'PublishPostNameTooShort'
                  ) {
                    setError('title', {
                      type: 'manual',
                      message: 'Title is blank',
                    })
                  } else {
                    enqueueSnackbar('Successfully published', {
                      variant: 'success',
                    })
                  }
                } catch (e) {
                  console.error(e)
                }
              }
            }}
          >
            Publish
          </MenuItem>
        )
      }
    }

    if (menuItems.length) {
      return (
        <Fragment>
          <MenuButton background="white" {...bindTrigger(popupState)}>
            <Icon icon={MoreHorizIcon} />
          </MenuButton>
          <Menu {...bindMenu(popupState)}>{menuItems}</Menu>
        </Fragment>
      )
    }
  }, [
    enqueueSnackbar,
    isMyPost,
    popupState,
    post,
    publishPostMutation,
    setError,
    startEditing,
  ])

  const body = React.useMemo(() => {
    if (!loading && post) {
      return (
        <Body>
          {isEditing && <EditActionRow>{editActionRow}</EditActionRow>}
          <Article>
            <Header>
              <HeaderContent>
                {isEditing && state === 'write' ? (
                  <Fragment>
                    <TitleInput
                      name="title"
                      placeholder="Title"
                      defaultValue={post.name}
                      inputRef={register}
                    />
                    {errors.title && (
                      <TitleInputError variant="caption" color="error">
                        {errors.title.message}
                      </TitleInputError>
                    )}
                  </Fragment>
                ) : (
                  <Title>
                    <TitleText variant="h5">
                      {post.name || '-- No Title  --'}
                    </TitleText>
                    {errors.title && (
                      <Typography variant="caption" color="error">
                        {errors.title.message}
                      </Typography>
                    )}
                  </Title>
                )}
                {!isEditing && (
                  <HeaderUserContainer>
                    <UserPostedHeader
                      userProfilePath={post.author?.profilePath}
                      userAvatarPath={post.author?.avatarPath}
                      userName={post.author?.name}
                      postedDate={
                        post.publishedDate || (
                          <Tag variant="primary">Unpublished</Tag>
                        )
                      }
                    />
                  </HeaderUserContainer>
                )}
              </HeaderContent>
            </Header>
            <Controller
              as={StyledPreviewableMarkdownInput}
              name="body"
              control={control}
              state={isEditing ? state : 'preview'}
              defaultValue={post.body || ''}
            />
          </Article>
          {!isEditing && (
            <Fragment>
              <StyledAddCommentForm postId={post.id} />
              <CommentsContainer>
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
              </CommentsContainer>
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
    state,
    register,
    errors.title,
    control,
    commentSortBy,
    sortedComments,
    onChangeSortBy,
  ])

  const breadcrumbs = React.useMemo(() => {
    if (post) {
      return (
        <Breadcrumbs>
          <Breadcrumb to="/posts">Posts</Breadcrumb>
          <Breadcrumb to={`/posts/${post.id}`}>{post.name}</Breadcrumb>
          {isEditing && <Breadcrumb>Edit</Breadcrumb>}
        </Breadcrumbs>
      )
    }

    return null
  }, [post, isEditing])

  const actionRow = React.useMemo(() => {
    if (!loading && !isEditing && post) {
      return (
        <ActionRow>
          {post && me && (
            <PostLoveButton
              post={filter(PostLoveButton_PostFragmentDoc, post)}
              me={filter(PostLoveButton_MeFragmentDoc, me)}
              background="white"
            />
          )}
          {post && <PostBookmarkButton postId={post.id} background="white" />}
          {menu}
        </ActionRow>
      )
    }

    return null
  }, [loading, isEditing, post, me, menu])

  return (
    <PopupPage breadcrumbs={breadcrumbs} actionRow={actionRow}>
      {body}
    </PopupPage>
  )
}

gql`
  query GetPostOverlayPageData($input: IdInput!) {
    post(input: $input) {
      ...PostPage_post
    }
    me {
      ...PostLoveButton_me
    }
  }

  fragment PostPage_post on Post {
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

  ${PostLoveButton_PostFragmentDoc}
  ${PostLoveButton_MeFragmentDoc}
  ${Comments_CommentFragmentDoc}
  ${Comments_PostFragmentDoc}

  mutation EditPost($input: EditPostInput!) {
    editPost(input: $input) {
      ... on EditPostSuccess {
        post {
          id
          name
          body
        }
      }
      ... on EditPostFieldError {
        fields {
          body
          title
        }
      }
    }
  }

  mutation PublishPost($input: IdInput!) {
    publishPost(input: $input) {
      ... on PublishPostSuccess {
        post {
          ...PostPage_post
        }
      }
      ... on PublishPostNameTooShort {
        success
      }
      ... on UnauthorizedResponse {
        code
      }
    }
  }
`
