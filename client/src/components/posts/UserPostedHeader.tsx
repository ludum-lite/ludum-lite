import React from 'react'
import styled, { css } from 'styled-components/macro'

import moment from 'moment'
import { getStaticUrl, ignoreProps } from 'utils'

import Link from 'components/common/mui/Link'
import Avatar from './Avatar'
import Typography from 'components/common/mui/Typography'

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
  collapsedNewsPost?: boolean
}
const UserLink = styled(Link).withConfig({
  shouldForwardProp: ignoreProps(['highlightUserLink', 'collapsedNewsPost']),
})<UserLinkProps>`
  margin-right: ${({ theme }) => theme.spacing(1)}px;
  ${({ highlightUserLink }) =>
    highlightUserLink &&
    css`
      color: ${({ theme }) => theme.themeColors.comment.postAuthorLinkColor};
      font-weight: bold;
    `}

  ${({ collapsedNewsPost }) =>
    collapsedNewsPost &&
    css`
      color: ${({ theme }) => theme.themeColors.fadedWhite};
    `}
`

interface Props {
  userProfilePath?: string
  userAvatarPath?: string | null
  userName?: string
  postedDate?: string | React.ReactNode | null
  highlightUserLink?: boolean
  collapsedNewsPost?: boolean
}

export default function UserPostedHeader({
  userProfilePath,
  userAvatarPath,
  userName,
  postedDate,
  highlightUserLink,
  collapsedNewsPost,
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
          collapsedNewsPost={collapsedNewsPost}
        >{`u/${userName}`}</UserLink>
      ) : (
        'User not available'
      )}
      <Typography
        variant="caption"
        color={collapsedNewsPost ? undefined : 'textPrimary'}
        textColor={collapsedNewsPost ? 'white' : undefined}
      >
        {postedDateComponent}
      </Typography>
    </HeaderUserContainer>
  )
}
