import React from 'react'
import styled, { css } from 'styled-components/macro'
import Typography from 'components/common/mui/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { ignoreProps } from 'utils'

interface RootProps {
  vote: number | null | undefined
}
const Root = styled.div<RootProps>`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) =>
    theme.themeColors.rows.background.white.background};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  }

  ${({ vote, theme }) => {
    if (vote === 1) {
      return css`
        background: ${theme.themeColors.themeRoundVoting.approveBackground};
      `
    } else if (vote === 0) {
      return css`
        background: ${theme.themeColors.themeRoundVoting.neutralBackground};
      `
    } else if (vote === -1) {
      return css`
        background: ${theme.themeColors.themeRoundVoting.rejectBackground};
      `
    }
  }}
`

const PreviousVoteContent = styled.div`
  flex: 1 1 0px;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(0.5)}px ${theme.spacing(1)}px`};
`

interface StyledToggleButtonProps {
  isActive: boolean
}
const StyledToggleButton = styled(ToggleButton).withConfig({
  shouldForwardProp: ignoreProps(['isActive'])
})<StyledToggleButtonProps>`
  border: 1px solid transparent;

  && {
    border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  }

  &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(0.5)}px;
  }

  .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      && {
        border: 1px solid rgb(0, 0, 0, 9%);
      }
    `}

  && {
    ${({ isActive, theme }) => isActive && css`
      background: ${theme.themeColors.rows.background.white.background};
    `}
  }
`

const PreviousVoteName = styled(Typography)`
  padding: ${({ theme }) => theme.spacing(1)}px;
`

interface Props {
  id: number
  vote?: number | null
  name: string
  onApprove: (id: number) => void
  onReject: (id: number) => void
  onMaybe: (id: number) => void
}
function PreviousRoundVoteRow({
  id,
  vote,
  name,
  onApprove,
  onReject,
  onMaybe,
}: Props) {
  return (
    <Root vote={vote}>
      <PreviousVoteContent>
        <ToggleButtonGroup
          value={vote}
          size="small"
          exclusive
          onChange={(_, newVote) => {
            if (newVote === -1) {
              onReject(id)
            } else if (newVote === 0) {
              onMaybe(id)
            } else if (newVote === 1) {
              onApprove(id)
            }
          }}
          aria-label="text alignment"
        >
          <StyledToggleButton
            value={-1}
            aria-label="left aligned"
            isActive={vote === -1}
          >
            <ThumbDownIcon fontSize="small" />
          </StyledToggleButton>
          <StyledToggleButton
            value={0}
            aria-label="centered"
            isActive={vote === 0}
          >
            <ThumbsUpDownIcon fontSize="small" />
          </StyledToggleButton>
          <StyledToggleButton
            value={1}
            aria-label="right aligned"
            isActive={vote === 1}
          >
            <ThumbUpIcon fontSize="small" />
          </StyledToggleButton>
        </ToggleButtonGroup>
        <PreviousVoteName>{name}</PreviousVoteName>
      </PreviousVoteContent>
    </Root>
  )
}

export default React.memo(PreviousRoundVoteRow)
