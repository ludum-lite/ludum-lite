## Deploying

Followed https://www.serverless.com/blog/serverless-api-gateway-domain

From now on, only have to run `yarn serverless deploy`. This happens automatically during a git workflow build.

Was having major issues with cors. It turned out the section on 4xx responses here fixes it: https://www.serverless.com/blog/cors-api-gateway-survival-guide
