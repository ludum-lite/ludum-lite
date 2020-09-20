import { DefaultTheme } from 'styled-components/macro'

export function getVoteColor(
  vote: number | null | undefined,
  theme: DefaultTheme
) {
  if (vote === 1) {
    return theme.themeColors.button.color.contained.successBackground
  } else if (vote === 0) {
    return theme.themeColors.button.color.contained.errorBackground
  } else if (vote === -1) {
    return theme.themeColors.defaultIconBlack
  } else {
    return theme.themeColors.themeSlaughter.remaingVotesBackground
  }
}
