# Spotify API test

## Task

### Prerequisites

1. Study the [Spotify for developers](https://developer.spotify.com/documentation/web-api/quick-start/) page
2. Follow the instructions and get your Access Token to access the [Spotify Web API](https://developer.spotify.com/documentation/web-api/)
    - All requests to Web API require authentication.
    - This is achieved by sending a valid OAuth access token in the request header.
    - For more information about these authentication methods, see the [Web API Authorization Guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/).
3. Set your `client_id` and `client_secret` as `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)
3. Use the `init` function of the `helper/auth.js` in your spec files to initialize `spotify` [axios instance](https://github.com/axios/axios#creating-an-instance).

### Tests

#### Artists

Endpoints for retrieving information about one or more artists from the Spotify catalog.
- Base URL: https://api.spotify.com/v1
- [Documentation](https://developer.spotify.com/documentation/web-api/reference/artists/)
- [Console](https://developer.spotify.com/console/artists/)

| METHOD | ENDPOINT                         | USAGE                           |
|--------|----------------------------------|---------------------------------|
| GET    | /v1/artists/{id}/albums          | Get an Artist's Albums          |
| GET    | /v1/artists/{id}/related-artists | Get an Artist's Related Artists |
| GET    | /v1/artists/{id}/top-tracks      | Get an Artist's Top Tracks      |
| GET    | /v1/artists/{id}                 | Get an Artist                   |
| GET    | /v1/artists                      | Get Several Artists             |

**Design** test cases and **implement** them to check if the [Artist](https://developer.spotify.com/documentation/web-api/reference/artists/) service works as expected.
> TIP: Validate the status codes, response schemas.

### Authentication

#### Client Credentials Flow

The Client Credentials flow is used in server-to-server authentication. Only endpoints that do not access user information can be accessed. The advantage here in comparison with requests to the Web API made without an access token, is that a higher rate limit is applied.

- You do:	Login with your **Client ID** and **Secret Key**.
- You get:	**Access token**.

### Miscellaneous

The source of information is [Spotify for Developers](https://developer.spotify.com/)

### Contribution

In case of you would like to contribute to this task or create new tasks please contact:

> Sandor Orosz - os.sandor@gmail.com

