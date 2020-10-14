import BaseAPI from './base-api'
import { map } from 'lodash'
import {
  IdInput,
  VotingRound,
  ApproveVotingRoundIdeaResponse,
  RejectVotingRoundIdeaResponse,
  VoteMaybeVotingRoundIdeaResponse,
} from '../__generated__/schema-types'
import { unauthorizedResponse } from './const'

export type ApiVotingRoundsResponse = {
  allowed: number[]
  lists: {
    [page: number]: {
      id: number
      node: number
      idea: number
      theme: string
    }[]
  }
  names: {
    [page: number]: string
  }
  pages: number
}

export type ApiVotingRoundVotesResponse = {
  votes: {
    [id: number]: number
  }
}

// function apiEventIdeasToEventIdeas(eventIdeas: ApiVotingRoundDto): EventIdea[] {
//   return Object.entries(eventIdeas).map(([id, name]) => ({
//     __typename: 'EventIdea',
//     id: parseInt(id),
//     name: name as string,
//   }))
// }

export default class VotingRoundAPI extends BaseAPI {
  async getVotingRounds(eventId: number): Promise<VotingRound[]> {
    try {
      const votingRoundsResponse = (await this.get(
        `vx/theme/list/get/${eventId}`
      )) as ApiVotingRoundsResponse
      const myVotingRoundVotesResponse = (await this.get(
        `vx/theme/list/vote/getmy/${eventId}`
      )) as ApiVotingRoundVotesResponse

      const votingRounds: VotingRound[] = map(
        votingRoundsResponse.lists,
        (votingRoundIdeas, page) => {
          const pageInt = parseInt(page)

          return {
            __typename: 'VotingRound',
            name: votingRoundsResponse.names[pageInt],
            page: pageInt,
            votingRoundIdeas: votingRoundIdeas.map((votingRoundIdea) => ({
              __typename: 'VotingRoundIdea',
              id: votingRoundIdea.id,
              name: votingRoundIdea.theme,
              page: pageInt,
              myVote: myVotingRoundVotesResponse.votes[votingRoundIdea.id],
            })),
          }
        }
      )

      console.log({
        votingRoundsResponse,
        myVotingRoundVotesResponse,
        votingRounds,
        eventId,
      })

      return votingRounds
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  async approveVotingRoundIdea({
    id,
  }: IdInput): Promise<ApproveVotingRoundIdeaResponse> {
    try {
      this.get(`vx/theme/list/vote/yes/${id}`)

      return {
        __typename: 'ApproveVotingRoundIdeaSuccess',
        success: true,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  async voteMaybeVotingRoundIdea({
    id,
  }: IdInput): Promise<VoteMaybeVotingRoundIdeaResponse> {
    try {
      this.get(`vx/theme/list/vote/maybe/${id}`)

      return {
        __typename: 'VoteMaybeVotingRoundIdeaSuccess',
        success: true,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }

  async rejectVotingRoundIdea({
    id,
  }: IdInput): Promise<RejectVotingRoundIdeaResponse> {
    try {
      this.get(`vx/theme/list/vote/no/${id}`)

      return {
        __typename: 'RejectVotingRoundIdeaSuccess',
        success: true,
      }
    } catch (e) {
      console.error(e)
      return unauthorizedResponse
    }
  }
}
