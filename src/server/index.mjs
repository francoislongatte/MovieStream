// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import TorrentSearchApi from "torrent-search-api";
import path from "path";
import bodyParser from "body-parser";

// enable providers
TorrentSearchApi.enablePublicProviders();
TorrentSearchApi.disableProvider('Torrent9');

// init project
const app = express();
const jsonParser = bodyParser.json();

app.use(cors());
app.use(express.static(path.resolve("./build")));

app.get("/providers", function(req, res) {
  res.json(TorrentSearchApi.getActiveProviders());
});

app.post("/magnet", jsonParser, async (req, res) => {
  console.log(req.body);
  const magnet = await TorrentSearchApi.getMagnet(req.body);
  console.log("magnet : ",magnet);
  res.json(magnet);
});

app.get("/search", async function(req, res) {
  var query = req.query.q || "";
  var limit = req.query.limit || 20;
  var category = "Movies";
  console.log('search - start', query);
  await TorrentSearchApi.search(query, category, limit)
    .then(torrents => {
      console.log('search - done', query);
      res.json(torrents);
    })
    .catch(err => res.err("Une erreur s' produite au niveau de la recherche"));
});

// listen for requests :)
var listener = app.listen(9005, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
