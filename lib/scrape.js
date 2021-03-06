var levelup = require('level');
var db = levelup('./db', {valueEncoding: 'json'});

var fs = require('fs');
var url = require('url');
var request = require('request');
var cheerio = require('cheerio');
var flatten = require('lodash.flatten');

var BASE_URL = 'http://www.ubu.com/sound/';
request(BASE_URL, function (err, resp, body) {
  if (!err && resp.statusCode == 200) {
    var artists = parseArtists(body);
    db.put('artist-list', artists, function(err) {
      artists.forEach(function(artist) {
        request(url.resolve(BASE_URL, artist.href), function(err, resp, body) {
          if (err) console.error('err:: ', err);
          if (!err && resp.statusCode == 200) {
            var trax = getAllTrackURLS(body);
            db.put(artist.text, trax, function(err) {
              if (!err) console.log(trax.length +' tracks written for '+artist.text);
            })
          }
        });
      });
    })
  }
});

function findTitle(el) {
  var title;
  if (el.children[0].data === undefined) {
    if (el.children[0].next === null) {
      title = el.children[0].children[0].data.trim()
    } else {
      title = el.children[0].next.data.trim()
    }
  } else {
    title = el.children[0].data.trim()
  }

  return title;
}

function getAllTrackURLS(body) {
  var $ = cheerio.load(body);
  return $('a').toArray()
         .filter(function(el) {
           return el.attribs.href !== undefined &&
             el.attribs.href.indexOf('.mp3') > -1 &&
             el.children.length;
         }).map(function(el) {
           return {
             href: el.attribs.href,
             text: findTitle(el)
           }
         });
}

function processRow(row) {
  return row.children.filter(function(child) {
           return child.name === 'a';
         }).filter(function(link) {
           return !~link.children[0].data.indexOf('Podcasts'); // filter podcasts for now, cus of parsing problem
         }).map(function(link) {
           return {
             href: link.attribs.href,
             text: link.children[0].data.trim()
           };
         });
}

function parseArtists(body) {
  var $ = cheerio.load(body);
  var rows = $('td');
  return flatten([rows[4], rows[6], rows[8], rows[10]].map(processRow));
}