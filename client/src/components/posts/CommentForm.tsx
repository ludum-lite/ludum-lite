import React from 'react'
import styled, { css } from 'styled-components/macro'

import MultilineTextField from 'components/common/MultilineTextField'
import Markdown from 'components/common/Markdown'
import Fade from '@material-ui/core/Fade'
import { useLogin } from 'hooks/useLogin'
import useEditablePreviewActionRow from 'hooks/useEditablePreviewActionRow'

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

  /* ${({ hasContent }) =>
    hasContent &&
    css`
      background-color: ${({ theme }) =>
        theme.themeColors.addCommentForm.background};
    `} */
`

const StyledMultilineTextField = styled(MultilineTextField)`
  .MuiInputBase-root {
    padding-top: 16px;
    padding-bottom: 16px;
  }
`

const ActionRow = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
`

const PreviewContainer = styled.div`
  padding: ${({ theme }) =>
    `0 ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px`};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  min-height: 108px;
  white-space: pre;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.themeColors.input.outlineColor};
`

interface Props {
  className?: string
  body: string
  autoFocus?: boolean
  forceControlsToDisplay?: boolean
  onChange: (data: { body: string }) => void
  onSubmit: () => Promise<any>
  onCancel?: () => void
}
export default function CommentForm({
  className,
  body,
  autoFocus,
  forceControlsToDisplay,
  onChange,
  onCancel,
  onSubmit,
}: Props) {
  const { promptLogin, isLoggedIn } = useLogin()
  const { state, actionRow } = useEditablePreviewActionRow({
    value: body,
    onCancel,
    onSubmit,
  })

  const showControls = forceControlsToDisplay || Boolean(body)

  return (
    <Root className={className}>
      <Form hasContent={showControls}>
        <Fade in={showControls} timeout={FADE_TIMEOUT}>
          <ActionRow>{actionRow}</ActionRow>
        </Fade>
        {state === 'write' ? (
          <StyledMultilineTextField
            name="body"
            placeholder="Leave a comment"
            fullWidth
            rows="4"
            value={body}
            autoFocus={autoFocus}
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
