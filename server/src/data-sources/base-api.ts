import { RESTDataSource, Response, Request } from 'apollo-datasource-rest'

export default class BaseAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.ldjam.com/'
  }

  async didReceiveResponse(response: Response, request: Request) {
    const body = await super.didReceiveResponse(response, request)

    if (response.ok && request.headers.get('includeHeaders')) {
      body._headers = response.headers
    }

    return body
  }
}
