import React from 'react'
import styled, { css } from 'styled-components/macro'

import MultilineTextField from 'components/common/MultilineTextField'
import Button from 'components/common/mui/Button'
import Markdown from 'components/common/Markdown'
import Fade from '@material-ui/core/Fade'
import { ignoreProps } from 'utils'
import { gql, useMutation } from '@apollo/client'
import * as Types from '__generated__/Types'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'
import { useLogin } from 'hooks/useLogin'

const FADE_TIMEOUT = 150

const Root = styled.div``

interface FormProps {
  hasContent: boolean
}
const Form = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  padding: 4px;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin: -4px;
  transition-property: background-color;
  transition-duration: ${FADE_TIMEOUT}ms;

  ${({ hasContent }) =>
    hasContent &&
    css`
      background-color: ${({ theme }) =>
        theme.themeColors.addCommentForm.background};
    `}
`

const ActionRow = styled.div`
  display: flex;
  padding-bottom: ${({ theme }) => theme.spacing(1 / 2)}px;

  & > *:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(1 / 2)}px;
  }
`

interface ActionButtonProps {
  active: boolean
}
const ActionButton = styled(Button).withConfig({
  shouldForwardProp: ignoreProps(['active']),
})<ActionButtonProps>`
  background: transparent;

  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) =>
        theme.themeColors.addCommentForm.textFieldActiveBackground};

      &:hover {
        background: ${({ theme }) =>
          theme.themeColors.addCommentForm.textFieldActiveBackground};
      }
    `}

  ${({ active }) =>
    !active &&
    css`
      color: white;
    `}
`

const SaveButton = styled(Button)`
  color: black;
  background: ${({ theme }) =>
    theme.themeColors.addCommentForm.textFieldActiveBackground};

  &:hover {
    background: ${({ theme }) =>
      theme.themeColors.addCommentForm.textFieldActiveBackground};
  }
`

const Separator = styled.div`
  flex: 1 1 0px;
`

interface StyledMultilineTextFieldProps {
  hasContent: boolean
}
const StyledMultilineTextField = styled(MultilineTextField).withConfig({
  shouldForwardProp: ignoreProps(['hasContent']),
})<StyledMultilineTextFieldProps>`
  .MuiFilledInput-multiline {
    padding: ${({ theme }) => theme.spacing(3)}px;
    background: ${({ theme }) =>
      theme.themeColors.addCommentForm.textFieldBackground};
    box-shadow: ${({ theme }) => theme.themeColors.addCommentForm.boxShadow};

    ${({ hasContent }) =>
      hasContent &&
      css`
        background: ${({ theme }) =>
          theme.themeColors.addCommentForm.textFieldActiveBackground};
      `}
  }
`

const PreviewContainer = styled.div`
  background: ${({ theme }) =>
    theme.themeColors.addCommentForm.textFieldActiveBackground};
  padding: ${({ theme }) =>
    `calc(${theme.spacing(3)}px - 1em) ${theme.spacing(3)}px`};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  min-height: 124px;
  white-space: pre;
`

interface Props {
  postId: number
  className?: string
}
export default function AddCommentForm({ className, postId }: Props) {
  const isLoggedIn = useIsLoggedIn()
  const { promptLogin } = useLogin()
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  )
  const [body, setBody] = React.useState('')

  const [addComment] = useMutation<Types.AddComment, Types.AddCommentVariables>(
    ADD_COMMENT,
    {
      variables: {
        input: {
          body,
          postId,
        },
      },
    }
  )

  // const onSubmit = async (comment: any, form: FormApi<object>) => {
  //   try {
  //     await store.commentStore.addComment({
  //       ...comment,
  //       parent: 0,
  //       nodeId,
  //     })
  //     form.reset()
  //   } catch {
  //     return { [FORM_ERROR]: 'Error' }
  //   }
  // }

  return (
    // onSubmit={onSubmit}
    // initialValues={{ view: 'write' }}
    <Root className={className}>
      <Form hasContent={Boolean(body)}>
        <Fade in={Boolean(body)} timeout={FADE_TIMEOUT}>
          <ActionRow>
            <ActionButton
              active={selectedTab === 'write'}
              onClick={() => {
                setSelectedTab('write')
              }}
              padding={'wide'}
            >
              Write
            </ActionButton>
            <ActionButton
              active={selectedTab === 'preview'}
              onClick={() => {
                setSelectedTab('preview')
              }}
              padding={'wide'}
            >
              Preview
            </ActionButton>
            <Separator />
            <SaveButton
              variant="contained"
              color="primary"
              type="submit"
              padding="wide"
              onClick={(e) => {
                e.preventDefault()
                addComment()
              }}
            >
              Submit
            </SaveButton>
          </ActionRow>
        </Fade>
        {selectedTab === 'write' ? (
          <StyledMultilineTextField
            name="body"
            placeholder="Leave a comment"
            fullWidth
            rows="4"
            value={body}
            hasContent={Boolean(body)}
            onChange={(e) => {
              if (!isLoggedIn) {
                promptLogin()
                return
              }

              setBody(e.target.value)
              e.preventDefault()
              e.stopPropagation()
            }}
            onClick={() => {
              if (!isLoggedIn) {
                promptLogin()
              }
            }}
          />
        ) : (
          <PreviewContainer>
            <Markdown source={body} />
          </PreviewContainer>
        )}
      </Form>
    </Root>
  )
}

const ADD_COMMENT = gql`
  mutation AddComment($input: AddCommentInput!) {
    addComment(input: $input) {
      ... on AddCommentSuccess {
        comment {
          id
          postId
          body
        }
      }
    }
  }
`
