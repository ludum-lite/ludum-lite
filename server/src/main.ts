import { ApolloServer } from 'apollo-server'
import { RESTDataSource } from 'apollo-datasource-rest'
import resolvers from './resolvers'
import typeDefs from './type-defs'
import { environment } from './environment'

console.log(process.env)

class API extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://api.ldjam.com/'
  }

  async didReceiveResponse(response, _request) {
    const body = await super.didReceiveResponse(response, _request)

    if (response.ok && _request.headers.get('includeHeaders')) {
      body._headers = response.headers
    }

    return body
  }
}

function getCookieValue(cookies, a) {
  var b = cookies.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)')
  return b ? b.pop() : ''
}

class PostAPI extends API {
  postReducer(post) {
    return {
      ...post,
      loveTimestamp: post['love-timestamp'],
    }
  }

  async getAllPosts() {
    const rawIds = (await this.get('vx/node/feed/1/all/post')).feed.map(
      (p) => p.id
    )

    const response = await this.get(
      `vx/node2/get/${rawIds.join('+')}?author&parent&superparent`
    )
    return response.node.map((p) => this.postReducer(p))
  }

  async getPost(postId) {
    const response = await this.get(
      `vx/node2/get/${postId}?author&parent&superparent`
    )

    if (response.node.length === 1) {
      return this.postReducer(response.node[0])
    } else {
      throw new Error('got different length of nodes', response)
    }
  }
}

class UserAPI extends API {
  async login(email, password) {
    const response = await this.post(
      'vx/user/login',
      `login=${email}&pw=${password}`,
      {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          includeHeaders: true,
        },
        credentials: 'include',
      }
    )

    const cookies = response._headers.get('set-cookie')

    return getCookieValue(cookies, 'SIDS')
  }

  async me() {
    const response = await this.get('vx/user/get', undefined, {
      headers: {
        cookie: 'SIDS=ob3pkb32565b0gdasjq3kkim57',
      },
      credentials: 'include',
    })

    console.log(response)
  }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    postApi: new PostAPI(),
    userApi: new UserAPI(),
  }),
})

// The `listen` method launches a web server.
server.listen(environment.port).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})

// Hot Module Replacement
if ((module as any).hot) {
  ;(module as any).hot.accept()
  ;(module as any).hot.dispose(() => console.log('Module disposed. '))
}
