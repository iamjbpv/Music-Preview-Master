const express = require("express");

const app = express();

var SpotifyWebApi = require("spotify-web-api-node");
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "",
  clientSecret: "",
  //redirectUri: "http://www.example.com/callback",
});

spotifyApi.setAccessToken(
  ""
);

//connect database

//init middlewarre
app.use(express.json({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //  MIDDLEWARE to allow any address

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => res.send("API RUNNING"));
// app.get("/", function (req, res) {
//   res.sendFile("client/dist/index.html", { root: __dirname });
// });

app.get("/api/artists/:name", async (req, res) => {
  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log("The access token expires in " + data.body["expires_in"]);
      console.log("The access token is " + data.body["access_token"]);

      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body["access_token"]);
    },
    function (err) {
      console.log("Something went wrong when retrieving an access token", err);
    }
  );
  try {
    var response = await spotifyApi.searchArtists(req.params.name);
    console.log("Artists", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/albums/:id", async (req, res) => {
  try {
    var response = await spotifyApi.getArtistAlbums(req.params.id);
    console.log("Artist albums", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

app.get("/api/tracks/:id", async (req, res) => {
  try {
    var response = await spotifyApi.getAlbumTracks(req.params.id);
    console.log("Artist albums", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

//define routes
// app.use("/api/spotify/", require("./routes/api/spotify"));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
