/**
 * Purpose: Setup router with all parsed json endpoints,
 * their middleware, policies and handlers
 * 
 * Exports: An express app that uses the router
 */

const path = require('path')
const express = require('express')

const getPolicies = require('./policyloader')
const getHandlers = require('./handleloader')
const getRawEndpoints = require('./apiloader')
const getEndpoints = require('./endpointParser')

const policies = getPolicies(path.resolve(__dirname, '../middleware/policies'))
const handlers = getHandlers(path.resolve(__dirname, '../../handlers'))
const rawEndpoints = getRawEndpoints(path.resolve(__dirname, '../../api'))
const endpoints = getEndpoints(rawEndpoints, handlers, policies)

const app = express()
const router = express.Router()

for (const endpoint of endpoints) {
    const method = endpoint.method
    const path = endpoint.path
    const handler = endpoint.handler
    const policies = endpoint.policies

    const catcher = handler => async (req, res, next) => {
        try {
            await handler(req, res, next)
        }
        catch(err) {
            next(err)
        } 
    }

    router[method](path, ...policies, catcher(handler))
}

app.use(router)

module.exports = app
