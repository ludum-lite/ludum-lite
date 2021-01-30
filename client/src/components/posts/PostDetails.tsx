import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import { Collapse } from '@material-ui/core'
import Markdown from 'components/common/Markdown'
import Button from 'components/common/mui/Button'
import UserPostedHeader from './UserPostedHeader'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Icon from 'components/common/mui/Icon'
import { PostDetails_PostFragment } from '__generated__/client-types'
import Typography from 'components/common/mui/Typography'
import NewsTag from './NewsTag'

const Root = styled.div`
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  max-width: 100%;
`

const HeaderContent = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
  overflow: hidden;
`

const HeaderUserContainer = styled.div``

const TitleRow = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  align-items: center;
`

const StyledNewsTag = styled(NewsTag)`
  margin-right: ${({ theme }) => theme.spacing(1.5)}px;
`

const Title = styled.div`
  margin-right: 8px;
  overflow: hidden;
  max-width: 100%;
`

const TitleText = styled(Typography)`
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Content = styled.div`
  position: relative;
`

interface CollapseButtonContainerProps {
  show: boolean
}
const CollapseButtonContainer = styled.div<CollapseButtonContainerProps>`
  display: flex;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing(1) * 1.5}px;
  background-color: ${({ theme }) => theme.themeColors.post.backgroundColor};
  box-shadow: 0 -1px 20px 28px ${({ theme }) => theme.themeColors.post.backgroundColor};
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 250ms;
  transition-delay: 100ms;
  pointer-events: ${({ show }) => (show ? undefined : 'none')};
`

interface Props {
  post: PostDetails_PostFragment
  forceExpand?: boolean
  className?: string
  collapsedNewsPost?: boolean
}
export default function PostDetails({
  post,
  forceExpand,
  className,
  collapsedNewsPost,
}: Props) {
  const [shouldCollapse, setShouldCollapse] = React.useState<
    boolean | undefined
  >(undefined)

  const initialShouldCollapse = React.useMemo(() => {
    if (!post) return false

    let result = false

    const textLength = post.body.length
    const maxTextLength = 750

    const numLines = (post.body.match(/\n/g) || '').length + 1
    const maxNumLines = 10

    if (textLength > maxTextLength) {
      result = true
    }

    if (numLines > maxNumLines) {
      result = true
    }

    return result
  }, [post])

  const finalShouldCollapse = React.useMemo(() => {
    if (forceExpand) return false
    else if (shouldCollapse === undefined) return initialShouldCollapse
    else return shouldCollapse
  }, [forceExpand, initialShouldCollapse, shouldCollapse])

  if (post && !post.publishedDate) {
    console.error('no publish date', post)
  }

  if (!post || !post.author || !post.publishedDate) return null

  return (
    <Root className={className}>
      <Header>
        <HeaderContent>
          <TitleRow>
            {post.subtype === 'news' && (
              <StyledNewsTag
                variant={collapsedNewsPost ? 'inverted' : 'contained'}
              />
            )}
            <Title>
              <TitleText
                variant="h4"
                textColor={collapsedNewsPost ? 'white' : undefined}
              >
                {post.name}
              </TitleText>
            </Title>
          </TitleRow>
          <HeaderUserContainer>
            {/* <UserPostedHeader
              userProfilePath={post.author.profilePath}
              userAvatarPath={post.author.avatarPath || ''}
              userName={post.author.name}
              postedDate={post.publishedDate}
              collapsedNewsPost={collapsedNewsPost}
            /> */}
          </HeaderUserContainer>
        </HeaderContent>
      </Header>
      {!collapsedNewsPost && (
        <Content>
          <Collapse
            in={!finalShouldCollapse}
            collapsedHeight={initialShouldCollapse ? 350 : 0}
          >
            <Markdown source={post.body} removeHrefs />
          </Collapse>
          <CollapseButtonContainer show={finalShouldCollapse}>
            <Button
              fullWidth
              disableElevation
              size="large"
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation()
                setShouldCollapse(false)
              }}
              endIcon={<Icon icon={ExpandMore} />}
            >
              Show More
            </Button>
          </CollapseButtonContainer>
        </Content>
      )}
    </Root>
  )
}

PostDetails.displayName = 'PostDetails'

gql`
  fragment PostDetails_post on Post {
    id
    name
    body
    publishedDate
    subtype
    author {
      id
      profilePath
      avatarPath
      name
    }
  }
`
