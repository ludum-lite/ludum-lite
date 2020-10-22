import { gql } from 'apollo-server-lambda'

export const typeDefs = gql`
  type Event {
    themeVotingPhase1: VotingPhase
    themeVotingPhase2: VotingPhase
    themeVotingPhase3: VotingPhase
    themeVotingPhase4: VotingPhase
    themeVotingPhase5: VotingPhase
  }
`
