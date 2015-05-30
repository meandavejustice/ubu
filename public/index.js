var playIndex = 0;
var info = document.querySelector('.info');
var tracklist = __JSON_GLOBALS_.tracklist;
var src;
var infoTmp = require('../templates/info');

play(tracklist[playIndex]);
[].slice.call(document.querySelectorAll('.mylist li a.track')).forEach(function(el, index) {
  el.addEventListener('click', selectTrack);
})

function selectTrack(ev) {
  ev.preventDefault();
  var el = ev.target;
  playIndex = parseInt(el.getAttribute('data-index'), 10);
  src.pause();
  src.remove();
  play(tracklist[playIndex]);
}

function updateInfo(track) {
  info.innerHTML = '';
  info.appendChild(infoTmp(track));
}

document.querySelector('.prev').addEventListener('click', previousTrack);

function previousTrack() {
  src.pause();
  src.remove();
  play(tracklist[--playIndex]);
}

document.querySelector('.next').addEventListener('click', nextTrack);

function nextTrack() {
  src.pause();
  src.remove();
  play(tracklist[++playIndex]);
}

document.querySelector('.play').addEventListener('click', playTrack);

function playTrack(ev) {
  if (!src) play(tracklist[playIndex]);
  else {
    src.play();
    frame = requestAnimationFrame(updateProgress)
  }
}

var frame = 0;
document.querySelector('.stop').addEventListener('click', function(ev) {
  src.pause()
  cancelAnimationFrame(frame);
});

function play(track) {
  src = document.createElement('audio');
  src.src = track.url;
  src.controls = true;
  updateInfo(track);
  src.onended = function() {
    src.pause();
    src.remove();
    play(tracklist[++playIndex]);
  }
  src.play();
  frame = requestAnimationFrame(updateProgress)
}

var progressEl = document.querySelector('.progress');
var progressBar = progressEl.querySelector('.progress-bar');

function updateProgress() {
  progressBar.style.width = ((src.currentTime / src.duration) * 100) + '%';
  frame = requestAnimationFrame(updateProgress)
}

progressEl.addEventListener('click', setProgress);

function setProgress(ev) {
  src.currentTime = (src.duration * ((ev.offsetX / progressEl.offsetWidth) * 100) / 100);
}