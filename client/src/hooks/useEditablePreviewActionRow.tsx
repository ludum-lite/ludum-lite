import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from 'components/common/mui/Button'
import { ignoreProps } from 'utils'

const ActionRow = styled.div`
  display: flex;

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

export type State = 'write' | 'preview'

export default function useEditablePreviewActionRow({
  value,
  isSaving,
  onSubmit,
  onCancel,
}: {
  value: string
  isSaving?: boolean
  onSubmit: () => void
  onCancel?: () => void
}) {
  const [state, setState] = React.useState<State>('write')

  const actionRow = React.useMemo(() => {
    return (
      <ActionRow>
        <ActionButton
          active={state === 'write'}
          onClick={() => {
            setState('write')
          }}
          background="globalNav"
        >
          Write
        </ActionButton>
        <ActionButton
          active={state === 'preview'}
          onClick={() => {
            setState('preview')
          }}
          background="globalNav"
        >
          Preview
        </ActionButton>
        <Separator />
        {onCancel && (
          <Button background="globalNav" onClick={onCancel} disabled={isSaving}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          background="globalNav"
          loading={isSaving}
          onClick={async (e) => {
            e.preventDefault()

            try {
              await onSubmit()

              setState('write')
            } catch (e) {}
          }}
        >
          Submit
        </Button>
      </ActionRow>
    )
  }, [isSaving, onCancel, onSubmit, state])

  return {
    state,
    actionRow,
  }
}
