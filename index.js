'use strict';

let http = require('http');
const PORT = process.env.PORT || 3000;

let server = http.createServer(function(req, res) { res.end('OK')});

server.listen(PORT, function() {
  console.log("Server listening on port %s", PORT);
})