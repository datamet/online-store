/**
 * Purpose: Setup router with all parsed json endpoints,
 * their middleware, policies and handlers
 * 
 * Exports: An express app that uses the router
 */

const fs = require('fs')
const path = require('path')
const express = require('express')
const log = require('../log')

const getPolicies = require('./policyloader')
const getHandlers = require('./handleloader')
const getRawEndpoints = require('./apiloader')
const getEndpoints = require('./endpointParser')

const policies = getPolicies(path.resolve(__dirname, '../middleware/policies'))
const handlers = getHandlers(path.resolve(__dirname, '../../handlers'))
const rawEndpoints = getRawEndpoints(path.resolve(__dirname, config.api))
const endpoints = getEndpoints(rawEndpoints, handlers, policies)

const app = express()
const router = express.Router()

for (const endpoint of endpoints) {
    const method = endpoint.method
    const path = endpoint.path
    const handler = endpoint.handler
    const policies = endpoint.policies

    router[method](path, ...policies, handler)
}

app.use(router)

module.exports = app
