import {
  RESTDataSource,
  Response,
  Request,
  RequestOptions,
} from 'apollo-datasource-rest'
import { Context } from './context'
import config from '../config'
import qs from 'qs'

export default class BaseAPI extends RESTDataSource<Context> {
  constructor() {
    super()
    this.baseURL = config.baseURL
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.authToken) {
      request.headers.set(
        'cookie',
        `${config.authKey}=${this.context.authToken}`
      )
    }

    if (request.method === 'POST') {
      /***
       * Ld uses this content-type so use qs to stringify objects during POST
       * for better dev UX
       * Example:    this.post('vx/comments', { postId: 1, body: 'test'})
       * Instead of: this.post('vx/comments', { headers: {...} }, qs.stringify({ postId: 1, body: 'test'}))
       */
      request.body = qs.stringify(request.body)
      request.headers.set(
        'Content-Type',
        'application/x-www-form-urlencoded;charset=UTF-8'
      )
    }
  }

  async didReceiveResponse(response: Response, request: Request) {
    // https://github.com/apollographql/apollo-server/issues/1562#issuecomment-642141533
    // Deleting the cache so that resolvers that fetch/update/fetch will work
    // I think this is fine to do globally since dataloader has a cache as well that has
    // a better api
    this.memoizedResults.delete(this.cacheKeyFor(request))

    const body = await super.didReceiveResponse(response, request)

    if (response.ok && request.headers.get('includeHeaders')) {
      body._headers = response.headers
    }

    return body
  }
}
