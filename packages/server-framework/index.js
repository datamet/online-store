const { setup: validatorSetup, validate } = require('./validation/validator')
const db = require('./db')
const setupServer = require('./server')
const listento = require('./start')
const { log, setup: setupLogger } = require('./lib/logger')
const error = require('./lib/error')

const app = {}

const server = ({ resources, config: configObj }) => {
	const { events, errors, tracebacks, gateway, autoport, port, mode } = configObj
	setupLogger(events, errors, tracebacks)
	validatorSetup(resources.types)
	db.setup(gateway, resources.connectors, resources.gateways)
	const { server: expressServer, useBefore, useAfter } = setupServer(
		resources.api,
		resources.handlers,
		resources.policies
	)
	const { listen } = listento({
        mode,
        port,
        autoport, 
        server: expressServer, 
        connect: db.connect
    })
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
	error
}
