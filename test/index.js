'user strict';

var test = require('tape');
var http = require('http');
var https = require('https');
var getport = require('getport');

var quickreq = require('../');

var server = http.createServer(function reqHandler(req, res) {
  res.end('data');
});

test('setup', function setup(t) {
  getport(function onPort(err, port) {
    t.error(err, 'OK');
    server.root = 'http://127.0.0.1:' + port;
    server.listen(port, t.end);
  });
});

test('basic', function basic(t) {
  var req = quickreq({
    method: 'get',
    uri: server.root
  });

  var start;

  req.on('socket', function (socket) {
    console.log('socket', Date.now() - start);
  });

  req.on('response', function (response) {
    console.log('response', Date.now() - start);
    t.end();
    response.on('data', console.log.bind(console, 'data'));
    response.on('end', console.log.bind(console, 'end'));
  });

  start = Date.now();
  req.end();
});

test('teardown', function teardown(t) {
  server.close(t.end);
});
