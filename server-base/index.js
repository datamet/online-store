const { setup: validatorSetup, validate } = require('./validation/validator')
const db = require('./db')
const setupServer = require('./server')
const listento = require('./start')
const log = require('./lib/logger')
const config = require('./serverconfig')
const error = require('./lib/error')

const app = {
    listen: () => {}
}

const server = (options) => {
    validatorSetup(options.types)
    db.setup(options.connectors, options.gateways)
    const { server: expressServer } = setupServer(options.api, options.handlers, options.policies)
    const { listen } = listento(expressServer, db.connect)
    app.listen = listen

    return app
}

module.exports = {
    server,
    validate,
    log,
    config,
    db: db.db,
    error
}