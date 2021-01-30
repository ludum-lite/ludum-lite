import React from 'react'
import styled from 'styled-components/macro'
import { gql } from '@apollo/client'

import { Game_GameFragment } from '__generated__/client-types'
import FocusableCard from 'components/common/FocusableCard'
import Typography from 'components/common/mui/Typography'
import Icon from 'components/common/mui/Icon'
import NoImageIcon from '@material-ui/icons/Wallpaper'

const TOP_ROW_HEIGHT = 48

const Root = styled(FocusableCard)`
  display: flex;
  flex-direction: column;
  height: 300px;
`

const TopRow = styled.div`
  height: ${TOP_ROW_HEIGHT}px;
  display: flex;
  overflow: hidden;
`

const Title = styled(Typography).attrs({
  variant: 'h4',
})`
  display: flex;
  flex: 1 1 auto;
  padding-left: ${({ theme }) => theme.spacing(1)}px;
  align-items: center;
  color: ${({ theme }) => theme.themeColors.game.titleColor};
  white-space: nowrap;
  overflow: hidden;
`

const BaseTypeContainer = styled(Typography)`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  position: relative;
  margin-left: ${TOP_ROW_HEIGHT / 2}px;
  padding-right: ${({ theme }) => theme.spacing(2)}px;
  padding-left: ${({ theme }) => theme.spacing(1)}px;
  font-size: 1.375rem;
  padding-bottom: 4px; /* Center the text */

  &:before {
    content: '';
    position: absolute;
    left: -${TOP_ROW_HEIGHT / 2}px;
    top: 0;
    border-top: ${TOP_ROW_HEIGHT / 2}px solid;
    border-bottom: ${TOP_ROW_HEIGHT / 2}px solid transparent;
    border-right: ${TOP_ROW_HEIGHT / 4}px solid;
    border-left: ${TOP_ROW_HEIGHT / 4}px solid transparent;
  }
`

const JamTypeContainer = styled(BaseTypeContainer)`
  background-color: ${({ theme }) =>
    theme.themeColors.game.jamTagBackgroundColor};
  color: ${({ theme }) => theme.themeColors.game.jamTagColor};

  &:before {
    color: ${({ theme }) => theme.themeColors.game.jamTagBackgroundColor};
  }
`

const CompoTypeContainer = styled(BaseTypeContainer)`
  background-color: ${({ theme }) =>
    theme.themeColors.game.compoTagBackgroundColor};
  color: ${({ theme }) => theme.themeColors.game.compoTagColor};

  &:before {
    color: ${({ theme }) => theme.themeColors.game.compoTagBackgroundColor};
  }
`

const ImageContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const NoImage = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;

  .MuiSvgIcon-root {
    font-size: 8rem;
    color: ${({ theme }) => theme.themeColors.placeholderIconBackgroundColor};
  }
`

const Image = styled.img``

interface Props {
  game: Game_GameFragment
}
export default function Game({ game }: Props) {
  console.log(game)

  const eventTypeTag = React.useMemo(() => {
    if (game.eventType === 'Jam') {
      return <JamTypeContainer>Jam</JamTypeContainer>
    } else {
      return <CompoTypeContainer>Compo</CompoTypeContainer>
    }
  }, [game])

  const coverImage = React.useMemo(() => {
    if (game.coverImagePath) {
      return <Image src={game.coverImagePath} />
    }

    return (
      <NoImage>
        <Icon icon={NoImageIcon} />
      </NoImage>
    )
  }, [])

  return (
    <Root>
      <TopRow>
        <Title>{game.name}</Title>
        {eventTypeTag}
      </TopRow>
      <ImageContainer>{coverImage}</ImageContainer>
    </Root>
  )
}

Game.displayName = 'Game'

gql`
  fragment Game_game on Game {
    id
    coverImagePath
    name
    eventType
  }
`
