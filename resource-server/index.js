const path = require('path')
const { mode, port, autoport, gateway, events, errors, tracebacks } = require('./config')
const { server } = require('server-framework')

const userparser = require('./middleware/userparser')

const app = server({
	resources: {
		api:        path.resolve(__dirname, './api'),
		connectors: path.resolve(__dirname, './db/connectors'),
		gateways:   path.resolve(__dirname, './db/gateways'),
		handlers:   path.resolve(__dirname, './handlers'),
		policies:   path.resolve(__dirname, './policies'),
		types:      path.resolve(__dirname,'./types')
	},
	config: {
		mode,
		port,
		autoport,
		gateway,
		events,
		errors,
		tracebacks
	}
})

app.useBefore(userparser)

app.listen()
