var h = require('hyperscript');

module.exports = function(tracks, onClick) {
  return h('ul', {className: "list pln"},
           tracks.map(function(track, index) {
             return h('li', h('a', {className: "track",
                                    href: track.url, 'data-index': index,
                                    'data-artist': track.artist,
                                    'data-track': track.track},
                              track.artist + ' - '+track.track),
                      h('span', " | "),
                      h('a', {href:track.url}, "direct link"));
          }));
}
