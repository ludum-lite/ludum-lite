import { DefaultTheme } from 'styled-components/macro'

export function getVoteColor(
  vote: number | null | undefined,
  theme: DefaultTheme
) {
  if (vote === 1) {
    return theme.themeColors.button.level1?.contained?.success?.background
  } else if (vote === 0) {
    return theme.themeColors.button.level1?.contained?.error?.background
  } else if (vote === -1) {
    return theme.themeColors.defaultIconBlack
  } else {
    return theme.themeColors.themeSlaughter.remaingVotesBackground
  }
}
