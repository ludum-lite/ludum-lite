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
})<ActionButtonProps>``

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
  onSubmit: Function
  onCancel?: () => void
}) {
  const [state, setState] = React.useState<State>('write')

  const wrappedOnCancel = React.useCallback(() => {
    onCancel?.()
    setState('write')
  }, [onCancel])

  const actionRow = React.useMemo(() => {
    return (
      <ActionRow>
        <ActionButton
          active={state === 'write'}
          variant={state === 'write' ? 'contained' : 'outlined'}
          color={state === 'write' ? 'primary' : 'primary'}
          onClick={() => {
            setState('write')
          }}
        >
          Write
        </ActionButton>
        <ActionButton
          active={state === 'preview'}
          variant={state === 'preview' ? 'contained' : 'outlined'}
          color={state === 'preview' ? 'primary' : 'primary'}
          onClick={() => {
            setState('preview')
          }}
        >
          Preview
        </ActionButton>
        <Separator />
        {onCancel && (
          <Button onClick={wrappedOnCancel} disabled={isSaving}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          loading={isSaving}
          variant="contained"
          color="primary"
          onClick={async (e) => {
            e.preventDefault()

            try {
              await onSubmit()

              setState('write')
            } catch (e) {}
          }}
        >
          Save
        </Button>
      </ActionRow>
    )
  }, [isSaving, wrappedOnCancel, onCancel, onSubmit, state])

  return {
    state,
    actionRow,
  }
}
