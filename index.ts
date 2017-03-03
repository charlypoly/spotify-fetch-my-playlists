import { SpotifyGraphQLClient, SpotifyClientConfiguration } from 'spotify-graphql';
import { ExecutionResult } from 'graphql';
import * as fs from 'fs';

const config: SpotifyClientConfiguration = {
    clientId: '', // not needed
    clientSecret: '', // not needed
    // generate OAuth token here :  https://developer.spotify.com/web-api/console/get-track/
    // => please select all playlist related grant types
    accessToken: ''
};

SpotifyGraphQLClient(config).query(`
  {
    me {
      playlists {
        id
        name
        tracks(debug: 1, throttle: 8) {
          track {
            id
            name
          }
        }
      }
    }
  }
`).then( (executionResult: ExecutionResult) => {
  if (executionResult.errors) { 
    console.log('error');
    console.error(JSON.stringify(executionResult.errors, null, 2));
  } else {
    console.log('success, wrote in ./spotify-playlists.json');
    fs.writeFileSync('spotify-playlists.json', JSON.stringify(executionResult.data, null, 2));
  }
})