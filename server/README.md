## Deploying

Followed https://www.serverless.com/blog/serverless-api-gateway-domain

From now on, only have to run `yarn serverless deploy`. This happens automatically during a git workflow build.

## Notes

Was having major issues with cors. It turned out the section on 4xx responses here fixes it: https://www.serverless.com/blog/cors-api-gateway-survival-guide

## Trying to use the default aws build host

Right now it's a custom build image with node:12.16.2
https://console.aws.amazon.com/amplify/home?region=us-east-1#/dtjwwymup6406/settings/build

Attempting a build with the default. I think this is just the frontend building, node10 should be fine
