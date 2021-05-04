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
const cookieparser = require('./middleware/cookieparser')
const wrap = require('./lib/wrap')

const server = http.createServer()
const app = express()

server.on('request', app)

const middlewareAfter = []
const middlewareBefore = []
const userMiddleware = middleware => (req, res, next) => {
    let middlewareToUse = [...middleware]
    
    const nextUserMiddleware = (error) => {
        if (error) return next(error)
        const middleware = middlewareToUse.shift()
        if (middleware) middleware(req, res, nextUserMiddleware)
        else next()
    }
    nextUserMiddleware()
}

const useBefore = (func) => middlewareBefore.push(wrap(func))
const useAfter = (func) => middlewareAfter.push(wrap(func))

module.exports = (api_path, handlers_path, policies_path) => {
    app.use(bodyparser)
    app.use(cookieparser)
    app.use(userMiddleware(middlewareBefore))
    app.use(router(api_path, handlers_path, policies_path))
    app.use(userMiddleware(middlewareAfter))
    app.use(logger)
    app.use(errorhandler)

    return { server, useBefore, useAfter }
}
