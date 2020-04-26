import React from 'react'
import styled from 'styled-components/macro'
import { useQuery, gql } from '@apollo/client'
import * as Types from './__generated__/GetPostDetailsData'

import { Typography, Collapse, IconButton } from '@material-ui/core'
import Markdown from 'components/common/Markdown'
import UserPostedHeader from '../UserPostedHeader'
import ExpandMore from '@material-ui/icons/ExpandMore'

const GET_DATA = gql`
  query GetPostDetailsData($id: Int!) {
    post(id: $id) {
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

const Root = styled.div``

const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 12px 8px;
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
  margin: -1em 12px 0px 12px;
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
  padding-top: ${({ theme }) => theme.spacing(2)}px;
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
      id: postId,
    },
  })

  const post = data?.post

  const initialShouldCollapse = React.useMemo(() => {
    if (!post) return false

    let result = false

    const textLength = post.body.length
    const maxTextLength = 500

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

  if (!post || !post.author) return null

  if (!post.publishedDate) {
    console.error('no publish date', post)
    throw new Error('no publish date')
  }

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
        <Collapse in={!finalShouldCollapse} collapsedHeight={350}>
          <Markdown source={post.body} />
        </Collapse>
        <CollapseButtonContainer show={finalShouldCollapse}>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              setShouldCollapse(false)
            }}
          >
            <ExpandMore fontSize="large" />
          </IconButton>
        </CollapseButtonContainer>
      </Content>
    </Root>
  )
}
