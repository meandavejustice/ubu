var getTracklist = require('./tracklist');
var ja = require('justaudio');
var playingIndex = 0;

getTracklist(function(trax) {
  playTrack(trax[playingIndex], trax);
})

function playTrack(track, trax) {
  console.log('now playing:: ', track.track +' by '+track.artist, track.url);
  ja.playUrl(track.url, false, function() {
    playTrack(trax[++playingIndex], trax);
  })
}
