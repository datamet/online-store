const { setup: validatorSetup, validate } = require('./validation/validator')
const db = require('./db')
const setupServer = require('./server')
const listento = require('./start')
const { log, setup: setupLogger } = require('./lib/logger')
const error = require('./lib/error')
const config = require('./serverconfig')

const app = {}

const server = ({ resources, config: configObj }) => {
    const { events, errors, tracebacks } = configObj
    setupLogger(events, errors, tracebacks)
    validatorSetup(resources.types)
    db.setup(resources.connectors, resources.gateways)
    const { server: expressServer, useBefore, useAfter } = setupServer(resources.api, resources.handlers, resources.policies)
    const { listen } = listento(expressServer, db.connect)
    app.useBefore = useBefore
    app.useAfter = useAfter
    app.listen = listen

    return app
}

module.exports = {
    server,
    validate,
    log,
    db: db.db,
    error,
    config
}