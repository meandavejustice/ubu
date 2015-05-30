var h = require('hyperscript');
var JSONGlobals = require("json-globals")

module.exports = function(list, info, clientData) {
  return h('html',
           h('head',
             h('link', {rel: "stylesheet", href:"tachyons.min.css", type:"text/css", media:"screen"}),
             h('link', {rel: "stylesheet", href:"style.css", type:"text/css", media:"screen"}),
             h('link', {rel: "stylesheet", href:"http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"}),
             h('script', JSONGlobals(clientData)),
             h("meta", {"charset":"utf-8"}),
             h('meta', {name: "viewport", content: "width=device-width, initial-scale=1"})),
           h('body', {className: "wi-100"},
             h('header', {className: "bb b--light-gray pvm"},
               h('div', {className: "center mw8 phm phl-ns"},
                 h('h1', {className: "f3 book dib prm"},
                   h('a', {className: "link", href:"/", title: "home"}, "ubu web player")),
                 h('h2', {className: "f4 book orange dib"},
                   h('i', "a random selection of sounds from ubuweb.com")))),
             h('main', {className: "center mw8 phm phl-ns pbxl"},
               h('aside', {className:"info"}, (info)),
               h('div', {className: "pas"},
                 h('button', {className:"pas btn btn--black btn--black:hover play"}, "play"),
                 h('button', {className:"pas btn btn--black btn--black:hover stop"}, "stop"),
                 h('button', {className:"pas btn btn--black btn--black:hover next"}, "next"),
                 h('button', {className:"pas btn btn--black btn--black:hover prev"}, "prev")),
               h('div', {className: 'control'},
                 h('div.progress',
                   h('span.progress-bar'))
                ),
               h('div', {className: "mylist"}, (list))),
             h('script', {type: "text/javascript", src: "bundle.js"})));
}
