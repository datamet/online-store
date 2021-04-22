/**
 * Purpose: Creating server and telling it to use
 * express on every request.
 * 
 * Exports: Server object that can listen on any port
 */

const express = require('express')
const bodyparser = require('./lib/middleware/bodyparser')

const app = express()
const router = express.Router()

app.use(bodyparser)
app.use(router)

app.listen(5000)
