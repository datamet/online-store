const path = require('path')
const config = require('./config')
const { server } = require('server-framework')

const tokenvalidator = require('./middleware/tokenvalidator')

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
        // mode,
        // port,
        // autoport,
        // gateway,
        events: 'server, mode, error, fatal, process, tips, accept, reject, database',
        errors: 'all',
        tracebacks: 'all'
    }
})

app.useAfter(tokenvalidator)

app.listen()