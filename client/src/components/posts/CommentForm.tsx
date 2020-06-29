import React from 'react'
import styled, { css } from 'styled-components/macro'

import MultilineTextField from 'components/common/MultilineTextField'
import Button from 'components/common/mui/Button'
import Markdown from 'components/common/Markdown'
import Fade from '@material-ui/core/Fade'
import { ignoreProps } from 'utils'
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
  ${({ active }) =>
    active &&
    css`
      color: ${({ theme }) => theme.palette.text.primary};
      background: ${({ theme }) =>
        theme.themeColors.addCommentForm.textFieldActiveBackground};

      &:hover {
        background: ${({ theme }) =>
          theme.themeColors.addCommentForm.textFieldActiveBackground};
      }
    `}
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
  body: string
  onChange: (data: { body: string }) => void
  onSubmit: () => Promise<any>
  onCancel?: () => void
  className?: string
}
export default function CommentForm({
  className,
  body,
  onChange,
  onCancel,
  onSubmit,
}: Props) {
  const { promptLogin, isLoggedIn } = useLogin()
  const [selectedTab, setSelectedTab] = React.useState<'write' | 'preview'>(
    'write'
  )

  return (
    <Root className={className}>
      <Form hasContent={Boolean(body)}>
        <Fade in={Boolean(body)} timeout={FADE_TIMEOUT}>
          <ActionRow>
            <ActionButton
              active={selectedTab === 'write'}
              onClick={() => {
                setSelectedTab('write')
              }}
              background="globalNav"
            >
              Write
            </ActionButton>
            <ActionButton
              active={selectedTab === 'preview'}
              onClick={() => {
                setSelectedTab('preview')
              }}
              background="globalNav"
            >
              Preview
            </ActionButton>
            <Separator />
            {onCancel && (
              <Button background="globalNav" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              background="globalNav"
              onClick={async (e) => {
                e.preventDefault()

                try {
                  await onSubmit()

                  setSelectedTab('write')
                } catch (e) {}
              }}
            >
              Submit
            </Button>
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

              onChange({
                body: e.target.value,
              })

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
