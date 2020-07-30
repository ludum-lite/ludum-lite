import React from 'react'
import styled, { css } from 'styled-components/macro'

import moment from 'moment'
import { getStaticUrl, ignoreProps } from 'utils'

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

interface UserLinkProps {
  highlightUserLink?: boolean
}
const UserLink = styled(Link).withConfig({
  shouldForwardProp: ignoreProps(['highlightUserLink']),
})<UserLinkProps>`
  margin-right: 4px;
  ${({ highlightUserLink }) =>
    highlightUserLink &&
    css`
      color: ${({ theme }) => theme.themeColors.comment.postAuthorLinkColor};
      font-weight: bold;
    `}
`

interface Props {
  userProfilePath?: string
  userAvatarPath?: string | null
  userName?: string
  postedDate?: string | React.ReactNode | null
  highlightUserLink?: boolean
}

export default function UserPostedHeader({
  userProfilePath,
  userAvatarPath,
  userName,
  postedDate,
  highlightUserLink,
}: Props) {
  const postedDateComponent = React.useMemo(() => {
    if (typeof postedDate === 'string') {
      const postedDateMoment = moment(postedDate)

      if (postedDateMoment.isValid()) {
        return postedDateMoment.fromNow()
      } else {
        return postedDate
      }
    } else {
      return postedDate
    }
  }, [postedDate])

  return (
    <HeaderUserContainer>
      <StyledAvatar
        avatarPath={getStaticUrl(userAvatarPath)}
        linkPath={userProfilePath || ''}
        size={30}
      />
      {userName ? (
        <UserLink
          to={userProfilePath || ''}
          color="textSecondary"
          variant="caption"
          highlightUserLink={highlightUserLink}
        >{`u/${userName}`}</UserLink>
      ) : (
        'User not available'
      )}
      <Typography variant="caption" color="textPrimary">
        {postedDateComponent}
      </Typography>
    </HeaderUserContainer>
  )
}
