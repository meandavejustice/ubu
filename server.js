var http = require("http");
var st = require("st");
var Router = require("routes-router");
var sendJSON = require('send-data/json');
var sendHTML = require('send-data/html');
var getTracklist = require('./lib/orm').getTracklist;
var getArtists = require('./lib/orm').getArtists;
var tracklist = [];
var artists = [];

var baseTmp = require('./templates/base');
var listTmp = require('./templates/list');
var infoTmp = require('./templates/info');

getTracklist(function(trax) {
  tracklist = trax;
});

getArtists(function(artists) {
  artists = artists;
});

var app = Router()
var port = 6969;

var staticHandler = st({
  path: __dirname+'/public',
  cache: false
});

app.addRoute("/playlist", function(req, res) {
  if (tracklist.length) sendJSON(req, res, tracklist);
  else {
    getTracklist(function(err, tracklist) {
      if (!err) sendJSON(req, res, tracklist);
    })
  }
})

app.addRoute("/artists", function(req, res) {
  if (artists.length) sendJSON(req, res, artists);
  else {
    getArtists(function(err, artists) {
      if (!err) sendJSON(req, res, artists);
    })
  }
})

app.addRoute("/", function(req, res) {
  sendHTML(req, res,
           baseTmp(listTmp(tracklist),
                   infoTmp(tracklist[0]),
                   {tracklist:tracklist}).outerHTML)
})

app.addRoute("*", function(req, res) {
  staticHandler(req, res);
})

var server = http.createServer(app);
server.listen(port);

console.log("Server listening on port: ", port);