const express = require('express')
const favicon = require('express-favicon')
var http = require('http')
var enforce = require('express-sslify')
var helmet = require('helmet')
const featurePolicy = require('feature-policy')
require('dotenv').config()

const path = require('path')
const port = process.env.PORT || 8080
const app = express()

try {
  if (process.env.NODE_ENV === 'production') { app.use(enforce.HTTPS({ trustProtoHeader: true })) }
  app.use(helmet())
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'text/html', 'maxcdn.bootstrapcdn.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
      fontSrc: ["'self'", 'fonts.googleapis.com', 'fonts.gstatic.com', 'data:'],
      scriptSrc: ["'self'", 'text/html', 'www.googletagmanager.com', 'unsafe-inline'],
      connectSrc: [
        "'self'",
        'npoint.io'
      ],
      imgSrc: ["'self'", 'www.w3.org', 'data:', 'npoint.io', "www.googletagmanager.com",  "googletagmanager"]
    }
  }))
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
  app.use(featurePolicy({
    features: {
      fullscreen: ["'self'"],
      camera: ["'self'"],
      payment: ["'self'"],
      microphone: ["'self'"]
    }
  }))
} catch (error) {
  console.log(error)
}

app.use(favicon(path.join(__dirname, '/build/favicon.png')))
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

http.createServer(app).listen(port)
