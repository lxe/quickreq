'user strict';

var http = require('http');
var https = require('https');
var url = require('url');

module.exports = quickreq;

function quickreq (opts) {
  if (!opts) throw 'quickreq requires at least a "uri" option';

  var reqOpts = url.parse(opts.uri || opts);
  reqOpts.method = opts.method || 'GET';

  var req = http.request(reqOpts);
  return req;
}
