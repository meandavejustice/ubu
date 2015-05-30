var h = require('hyperscript');

module.exports = function(track) {
  return h('dl',
           h('dt', "Artist"),
           h('dd', track.artist),
           h('dt', "Track"),
           h('dd', track.track),
           h('dt', "URL"),
           h('dd', h('a', {href: track.url}, track.url)));
}
