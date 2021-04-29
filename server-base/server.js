/**
 * Purpose: Creating server and telling it to use
 * express on every request.
 *
 * Exports: Server object that can listen on any port
 */

const http = require('http')
const express = require('express')
const bodyparser = require('./middleware/bodyparser')
const router = require('./router/router')
const errorhandler = require('./middleware/errorhandler')
const logger = require('./middleware/logger')

const server = http.createServer()
const app = express()

server.on('request', app)

const middleware = []
const userMiddleware = (req, res, next) => {
    middlewareToUse = [...middleware]
    
    const nextUserMiddleware = (error) => {
        if (error) throw error
        const policy = middlewareToUse.shift()
        if (policy) policy(req, res, nextUserMiddleware)
    }
    nextUserMiddleware()

    next()
}

const use = (func) => {
    middleware.push(func)
}

module.exports = (api_path, handlers_path, policies_path) => {
    app.use(bodyparser)
    app.use(router(api_path, handlers_path, policies_path))
    app.use(userMiddleware)
    app.use(errorhandler)
    app.use(logger)

    return { server, use }
}
