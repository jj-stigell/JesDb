## Table of Contents

* [Running the app](#running-the-app)
* [Production build](#production-build)
* [Testing](#testing)
* [Environment variables](#environment-variables)
* [Running with Docker](#running-with-docker)

## Running the app

Install the necessary modules at the project root:
```
$ yarn install
```

Start the app on local machine (make sure necessary [ENV](#environment-variables) are set), this will expose the app to localhost port [3000](http://localhost:3000/):
```
$ yarn start
```

## Production build

Create a production optimized build from the project:
```
$ yarn build
```

## Testing

Frontend tests can be run with the command from client directory:
```
$ yarn test
```

## Environment variables

Running frontend requires the following environment variables to be set:

* `REACT_APP_NODE_ENV`: The environment in which the application is running (e.g. `development`, `production`, `test`). default: `development`
* `REACT_APP_SUPABASE_URL`: URL to your Supabase project. default: `''`
* `REACT_APP_SUPABASE_KEY`: Supabase API key. Only use public key here. Do not expose your private key. default: `''`
* `REACT_APP_AUTH_CALLBACK_URL`: This is the URL that the user will be redirected to after they authenticate with OAuth. This URL must be added to the list of "Redirect URIs" in your Supabase project settings. default: `http://localhost:3000/auth/callback`

Set the environment variables to .env file in the client root folder.

**Exporting environment variables**

To export environment variables in your terminal, use the following commands:
```
$ export REACT_APP_NODE_ENV=value
```

## Running with Docker

You can also run the application with Docker.

To build the Docker image run command in the project root:
```
$ docker build . -t jesdb-client
```

After image has been build you can run the container with command:
```
$ docker run -p 3000:3000 -d jesdb-client
```

App will run in the localhost port [3000](http://localhost:3000/)
