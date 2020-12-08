import React from 'react'
import styled, { css } from 'styled-components/macro'
import Typography from 'components/common/mui/Typography'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown'
import { ignoreProps } from 'utils'
import ButtonGroup from 'components/common/mui/ButtonGroup'
import IconButton from 'components/common/mui/IconButton'

interface RootProps {
  vote: number | null | undefined
}
const Root = styled.div<RootProps>`
  display: flex;
  align-items: stretch;
  background: ${({ theme }) => theme.themeColors.backgrounds.level2};

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

interface StyledButtonProps {
  isActive: boolean
}
const StyledIconButton = styled(IconButton).withConfig({
  shouldForwardProp: ignoreProps(['isActive']),
})<StyledButtonProps>`
  /* &:not(:last-child) {
    margin-right: ${({ theme }) => theme.spacing(0.5)}px;
  } */

  .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  /* && {
    ${({ isActive, theme }) =>
      isActive &&
      css`
        border: 1px solid rgb(0, 0, 0, 9%);
        background: ${theme.themeColors.rows.background.white.background};
      `}
  } */
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
        <ButtonGroup aria-label="text alignment">
          <StyledIconButton
            value={-1}
            aria-label="left aligned"
            isActive={vote === -1}
            variant={vote === -1 ? 'contained' : 'text'}
            onClick={() => {
              onReject(id)
            }}
          >
            <ThumbDownIcon fontSize="small" />
          </StyledIconButton>
          <StyledIconButton
            value={0}
            aria-label="centered"
            isActive={vote === 0}
            variant={vote === 0 ? 'contained' : 'text'}
            onClick={() => {
              onMaybe(id)
            }}
          >
            <ThumbsUpDownIcon fontSize="small" />
          </StyledIconButton>
          <StyledIconButton
            value={1}
            aria-label="right aligned"
            isActive={vote === 1}
            variant={vote === 1 ? 'contained' : 'text'}
            onClick={() => {
              onApprove(id)
            }}
          >
            <ThumbUpIcon fontSize="small" />
          </StyledIconButton>
        </ButtonGroup>
        <PreviousVoteName>{name}</PreviousVoteName>
      </PreviousVoteContent>
    </Root>
  )
}

export default React.memo(PreviousRoundVoteRow)
