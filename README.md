# Tallcraft API Server

A GraphQL API providing information about the Minecraft servers and players.

The application is powered by NodeJS running Apollo.

Visit https://api.tallcraft.com for the GraphQL playground and API documentation.

## Run (+ Develop) locally
1. Install NodeJS 14 + NPM
2. Run `npm install`
3. Copy `config.default.json` to `config.json` and configure the data connectors.
4. Run the server with `npm start`

## Docker
You can deploy the API server with Docker. For example:
```
docker run -v $(pwd)/config.json:/home/node/app/config.json docker.pkg.github.com/tallcraft/tc-api-server/app:master
```
`config.json` points to your local configuration file.

In order to use the GitHub packages repository you need to
authenticate with `docker login` using a [personal access token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line):

```
docker login docker.pkg.github.com --username <GitHubUsername>
```

`docker.pkg.github.com/tallcraft/tc-api-server/app:master` reflects the current master branch state.
