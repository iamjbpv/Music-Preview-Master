const config = require("config");
var fs = require("fs");

var SpotifyWebApi = require("spotify-web-api-node");
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: config.get("spotifyClientId"),
  clientSecret: config.get("spotifyClientSecret"),
  //redirectUri: "http://www.example.com/callback",
});

//read the access token and set it here
global.spotifyToken = "";
fs.readFile("./data/token.txt", "utf8", function (err, data) {
  if (err) throw err;
  //console.log(data);
  spotifyApi.setAccessToken(data);
  spotifyToken = data;
  console.log("access token set");
});

module.exports = async function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if token is okay
  // Get an artist
  try {
    var response = await spotifyApi.searchArtists("5SOS");
    console.log("Success");
    req.authToken = spotifyToken;
    next();
  } catch (err) {
    console.error(err.statusCode);
    if (err.statusCode == 401) {
      try {
        const response = await spotifyApi.clientCredentialsGrant();
        console.log(
          "The access token expires in " + response.body["expires_in"]
        );
        console.log("The access token is " + response.body["access_token"]);
        // Save the access token so that it's used in future calls
        //   spotifyApi.setAccessToken(data.body["access_token"]);
        //   globalAuthToken = data.body["access_token"];
        req.authToken = response.body["access_token"];

        //write the access token to the text file
        fs.writeFile(
          "./data/token.txt",
          response.body["access_token"],
          function (err) {
            if (err) throw err;
            console.log("Saved!");
          }
        );
        next();
      } catch (err) {
        console.log(
          "Something went wrong when retrieving an access token",
          err
        );
      }
    }
  }
};
