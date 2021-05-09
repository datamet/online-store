/**
 * Purpose: Setup router with all parsed json endpoints,
 * their middleware, policies and handlers
 * 
 * Exports: An express app that uses the router
 */

const { log } = require('../lib/logger')
const express = require('express')
const wrap = require('../lib/wrap')

const getPolicies = require('./policyloader')
const getHandlers = require('./handleloader')
const getRawEndpoints = require('./apiloader')
const getEndpoints = require('./endpointParser')

const app = express()
const router = express.Router()

module.exports = (api_path, handlers_path, policies_path) => {
    const policies = getPolicies(policies_path)
    const handlers = getHandlers(handlers_path)
    const rawEndpoints = getRawEndpoints(api_path)
    const endpoints = getEndpoints(rawEndpoints, handlers, policies)

    for (const [i, endpoint] of endpoints.entries()) {
        const method = endpoint.method
        const path = endpoint.path
        const handler = endpoint.handler
        const policies = endpoint.policies

        const wrappedPolicies = policies.map(policy => wrap(policy))
        
        log(log.DEBUG, `Setup: ${method.toUpperCase()} ${path} => ${rawEndpoints[i].handler} (${policies.length} policies)`)
        router[method](path, ...wrappedPolicies, wrap(handler))
    }
    
    app.use(router)

    return app
}