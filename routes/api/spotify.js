const express = require("express");
const router = express.Router();

//middleware
const token = require("../../middleware/token");

var SpotifyWebApi = require("spotify-web-api-node");
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "9f6f59eb49a544fda5e4d36f1c2788f7",
  clientSecret: "8801f825035c4a8eb2b9625e7d9836e2",
  //redirectUri: "http://www.example.com/callback",
});

spotifyApi.setAccessToken("");

//@route GET api/
//@desc Get index
//@access Public
router.get("/", token, async (req, res) => {
  res.send("API INDEX");
});

//@route GET api/artists/:name
//@desc Get Artists
//@access Public
router.get("/artists/:name", token, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.authToken);
    var response = await spotifyApi.searchArtists(req.params.name);
    console.log("Artists", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

//@route GET api/albums/:id
//@desc Get Albums of Artist
//@access Public
router.get("/albums/:id", token, async (req, res) => {
  try {
    spotifyApi.setAccessToken(req.authToken);
    var response = await spotifyApi.getArtistAlbums(req.params.id);
    console.log("Artist albums", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

//@route GET api/tracks/:id
//@desc Get Tracks of Album
//@access Public
router.get("/tracks/:id", async (req, res) => {
  try {
    var response = await spotifyApi.getAlbumTracks(req.params.id);
    console.log("Artist albums", response.body);
    res.json(response.body);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
