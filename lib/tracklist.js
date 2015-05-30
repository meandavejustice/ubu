var levelup = require('level');
var db = levelup('./db', {valueEncoding: 'json'});
var flatten = require('lodash.flatten');
var shuffle = require('array-shuffle');

module.exports = function(cb) {
  var myTracks = [];
  db.createReadStream()
  .on('data', function (data) {
    if (data.key === 'artist-list') return;
    else if (Number(Math.random() > Math.random())) myTracks.push(getRandomTracks(data.key, data.value));
  }).on('end', function() {
    cb(shuffle(flatten(myTracks)));
  })

}

function getRandomTracks(artist, trax) {
  return trax.filter(function() {
           return Number(Math.random() > Math.random());
         }).map(function(track) {
           return {
             artist: artist,
             track: track.text,
             url: track.href
           };
         })
}
