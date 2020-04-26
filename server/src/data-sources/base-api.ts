import {
  RESTDataSource,
  Response,
  Request,
  RequestOptions,
} from 'apollo-datasource-rest'
import { Context } from './context'

export default class BaseAPI extends RESTDataSource<Context> {
  constructor() {
    super()
    this.baseURL = 'https://api.ldjam.com/'
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.authToken) {
      request.headers.set('cookie', `SIDS=${this.context.authToken}`)
    }
  }

  async didReceiveResponse(response: Response, request: Request) {
    const body = await super.didReceiveResponse(response, request)

    if (response.ok && request.headers.get('includeHeaders')) {
      body._headers = response.headers
    }

    return body
  }
}
