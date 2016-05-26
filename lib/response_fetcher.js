'use strict'

const SITE = 'stackoverflow.com';

let Google = require('google');
Google.resultsPerPage = 3;

function getResponse(msg, cb) {
  Google(msg + 'site:' + SITE, function (err, res) {
    if (err) {
      return cb('No results found');
    } else {
      let results = formatLinks(res.links);
      return cb(results);
    }
  })
}

function formatLinks (links) {
  return links.reduce(function(result, link) {
    return result += link.href + '\n';
  }, '');
}

module.exports = getResponse;