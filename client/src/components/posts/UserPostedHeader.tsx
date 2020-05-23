import React from 'react'
import styled from 'styled-components/macro'

import moment from 'moment'
import { getStaticUrl } from 'utils'

import { Typography } from '@material-ui/core'
import Link from 'components/common/mui/Link'

const HeaderUserContainer = styled.div`
  display: flex;
  flex: 1 1 0px;
  align-items: center;
`
const AvatarContainer = styled.div`
  display: flex;
  margin-right: 8px;
`
const AvatarLink = styled(Link)`
  display: flex;
`
const Avatar = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 4px;
`
const UserLink = styled(Link)`
  margin-right: 4px;
`

type Props = {
  userProfilePath: string
  userAvatarPath: string
  userName: string
  postedDate: string
}

export default function UserPostedHeader({
  userProfilePath,
  userAvatarPath,
  userName,
  postedDate,
}: Props) {
  return (
    <HeaderUserContainer>
      <AvatarContainer>
        <AvatarLink to={userProfilePath}>
          <Avatar src={getStaticUrl(userAvatarPath)} alt="" />
        </AvatarLink>
      </AvatarContainer>
      <UserLink
        to={userProfilePath}
        color="textSecondary"
        variant="caption"
      >{`u/${userName}`}</UserLink>
      <Typography variant="caption" color="textPrimary">
        {moment(postedDate).fromNow()}
      </Typography>
    </HeaderUserContainer>
  )
}
