/**
 * Purpose: Creating server and telling it to use
 * express on every request.
 *
 * Exports: Server object that can listen on any port
 */

const http = require('http')
const express = require('express')
const bodyparser = require('./lib/middleware/bodyparser')
const router = require('./lib/router/router')
const errorhandler = require('./lib/middleware/errorhandler')
const logger = require('./lib/middleware/logger')

const server = http.createServer()
const app = express()

server.on('request', app)

app.use(bodyparser)
app.use(router)
app.use(errorhandler)
app.use(logger)

module.exports = { server }
