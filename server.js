var express = require('express')
var fs = require('fs')
var http = require('http')
var https = require('https')
var app = express()

app.use(function(req, res, next) {
  if(!req.secure) {
    var secureUrl = "https://" + req.headers['host'] + req.url;
    res.writeHead(301, { "Location":  secureUrl });
    return res.end();
  }
  next();
})

app.use(express.static('build'))

var credentials = {
  key: fs.readFileSync('security/private.key', 'utf8'),
  cert: fs.readFileSync('security/certificate.crt', 'utf8'),
  ca: fs.readFileSync('security/ca_bundle.crt', 'utf8'),
}

var httpServer = http.createServer(app)
var httpsServer = https.createServer(credentials, app)

httpServer.listen(80)
httpsServer.listen(443)
