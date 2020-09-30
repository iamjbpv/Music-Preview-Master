const express = require("express");
const app = express();
const path = require('path');

var SpotifyWebApi = require("spotify-web-api-node");
// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: "",
  clientSecret: "",
  //redirectUri: "http://www.example.com/callback",
});

spotifyApi.setAccessToken("");

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

// app.get("/", (req, res) => res.send("API RUNNING"));
// app.get("/", function (req, res) {
//   res.sendFile("client/dist/index.html", { root: __dirname });
// });

//define routes
app.use("/api/", require("./routes/api/spotify"));

//static no dynamic files, server static files
app.use(express.static(path.join(__dirname, 'client/dist')));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
