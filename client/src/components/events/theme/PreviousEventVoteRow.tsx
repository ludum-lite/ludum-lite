import React from 'react'
import styled, { css } from 'styled-components/macro'
import { getVoteColor } from './utils'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import Typography from 'components/common/mui/Typography'
import Button from 'components/common/mui/Button'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import FlagIcon from '@material-ui/icons/Flag'

const Root = styled.div`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) =>
    theme.themeColors.rows.background.white.background};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }
`

interface PreviousVoteSideIndicatorProps {
  vote?: number | null
}
const PreviousVoteSideIndicator = styled.div<PreviousVoteSideIndicatorProps>`
  width: 4px;

  ${({ vote, theme }) => {
    const background = getVoteColor(vote, theme)

    return css`
      background: ${background};
    `
  }}
`

const PreviousVoteContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing(1)}px ${theme.spacing(1)}px`};
`

const PreviousVoteName = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

const PreviousVoteActions = styled(ButtonGroup)``

interface Props {
  id: number
  vote?: number | null
  name: string
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onFlag?: (id: number) => void
}
function PreviousEventVoteRow({
  id,
  vote,
  name,
  onApprove,
  onReject,
  onFlag,
}: Props) {
  return (
    <Root>
      <PreviousVoteSideIndicator vote={vote} />
      <PreviousVoteContent>
        <PreviousVoteName>{name}</PreviousVoteName>
        <PreviousVoteActions>
          <Button
            size="small"
            variant={vote === 1 ? 'contained' : 'text'}
            color="success"
            onClick={() => {
              onApprove(id)
            }}
          >
            Yes
          </Button>
          <Button
            size="small"
            variant={vote === 0 ? 'contained' : 'text'}
            color="error"
            onClick={() => {
              onReject(id)
            }}
          >
            No
          </Button>
          {onFlag && (
            <IconButton
              size="small"
              variant={vote === -1 ? 'contained' : 'text'}
              onClick={() => {
                onFlag(id)
              }}
            >
              <Icon icon={FlagIcon} />
            </IconButton>
          )}
        </PreviousVoteActions>
      </PreviousVoteContent>
    </Root>
  )
}

export default React.memo(PreviousEventVoteRow)
