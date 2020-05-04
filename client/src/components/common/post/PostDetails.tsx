import React from 'react'
import styled from 'styled-components/macro'
import { useQuery, gql } from '@apollo/client'
import * as Types from '__generated__/Types'

import { Typography, Collapse } from '@material-ui/core'
import Markdown from 'components/common/Markdown'
import Button from 'components/common/mui/Button'
import UserPostedHeader from '../UserPostedHeader'
import ExpandMore from '@material-ui/icons/ExpandMore'

const GET_DATA = gql`
  query GetPostDetailsData($input: GetByIdInput!) {
    post(input: $input) {
      id
      name
      body
      publishedDate
      author {
        id
        profilePath
        avatarPath
        name
      }
    }
  }
`

const Root = styled.div`
  width: 600px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const HeaderContent = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-direction: column;
`

const HeaderUserContainer = styled.div`
  margin-bottom: 8px;
`

const Title = styled.div`
  margin-right: 8px;
`

const TitleText = styled(Typography)`
  font-weight: 500;
`

const Content = styled.div`
  position: relative;
`

// const RightIcon = styled.div`
//   margin-right: ${({ theme }) => theme.spacing(1)};
//   font-size: 1.32rem;
// `

interface CollapseButtonContainerProps {
  show: boolean
}
const CollapseButtonContainer = styled.div<CollapseButtonContainerProps>`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(1) * 1.5}px 0;
  background-color: white;
  box-shadow: 0 -23px 21px 7px #ffffff;
  z-index: 3;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 250ms;
  transition-delay: 100ms;
`

type Props = {
  postId: number
  forceExpand?: boolean
}
export default function PostDetails({ postId, forceExpand }: Props) {
  const [shouldCollapse, setShouldCollapse] = React.useState<
    boolean | undefined
  >(undefined)

  const { data, error } = useQuery<
    Types.GetPostDetailsData,
    Types.GetPostDetailsDataVariables
  >(GET_DATA, {
    variables: {
      input: {
        id: postId,
      },
    },
  })

  const post = data?.post

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
    <Root>
      <Header>
        <HeaderContent>
          <HeaderUserContainer>
            <UserPostedHeader
              userProfilePath={post.author.profilePath}
              userAvatarPath={post.author.avatarPath || ''}
              userName={post.author.name}
              postedDate={post.publishedDate}
            />
          </HeaderUserContainer>
          <Title>
            <TitleText variant="h5">{post.name}</TitleText>
          </Title>
        </HeaderContent>
      </Header>
      <Content>
        <Collapse
          in={!finalShouldCollapse}
          collapsedHeight={initialShouldCollapse ? 350 : 0}
        >
          <Markdown source={post.body} />
        </Collapse>
        <CollapseButtonContainer show={finalShouldCollapse}>
          <Button
            fullWidth
            disableElevation
            size="large"
            onClick={(e) => {
              e.stopPropagation()
              setShouldCollapse(false)
            }}
            endIcon={<ExpandMore />}
          >
            Show More
          </Button>
        </CollapseButtonContainer>
      </Content>
    </Root>
  )
}
