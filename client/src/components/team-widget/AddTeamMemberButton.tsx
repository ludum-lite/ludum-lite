import React from 'react'
import styled from 'styled-components/macro'
import IconButton from 'components/common/mui/IconButton'
import Icon from 'components/common/mui/Icon'
import AddIcon from '@material-ui/icons/Add'

const Root = styled.div`
  display: flex;
`
const StyledIconButton = styled(IconButton)`
  border-radius: 50%;
  background: ${({ theme }) => theme.themeColors.backgrounds.level1};
  border: 2px dashed white;
  padding: 0;
  width: 40px;
  height: 40px;
`

interface Props {
  className?: string
  onClick: () => void
}
export default function AddTeamMemberButton({ className, onClick }: Props) {
  return (
    <Root className={className}>
      <StyledIconButton onClick={onClick}>
        <Icon icon={AddIcon} />
      </StyledIconButton>
    </Root>
  )
}

AddTeamMemberButton.displayName = 'AddTeamMemberButton'
