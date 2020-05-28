import React from 'react'
import styled from 'styled-components/macro'

import moment from 'moment'
import { getStaticUrl } from 'utils'

import { Typography } from '@material-ui/core'
import Link from 'components/common/mui/Link'
import Avatar from './Avatar'

const HeaderUserContainer = styled.div`
  display: flex;
  flex: 1 1 0px;
  align-items: center;
`

const StyledAvatar = styled(Avatar)`
  display: flex;
  margin-right: 8px;
`

const UserLink = styled(Link)`
  margin-right: 4px;
`

type Props = {
  userProfilePath?: string
  userAvatarPath?: string | null
  userName?: string
  postedDate?: string | null
}

export default function UserPostedHeader({
  userProfilePath,
  userAvatarPath,
  userName,
  postedDate,
}: Props) {
  return (
    <HeaderUserContainer>
      <StyledAvatar
        avatarPath={getStaticUrl(userAvatarPath)}
        linkPath={userProfilePath || ''}
        size={30}
      />
      <UserLink
        to={userProfilePath || ''}
        color="textSecondary"
        variant="caption"
      >{`u/${userName}`}</UserLink>
      <Typography variant="caption" color="textPrimary">
        {postedDate && moment(postedDate).fromNow()}
      </Typography>
    </HeaderUserContainer>
  )
}
