const path = require('path')
const { server } = require('server-framework')

const tokenvalidator = require('./middleware/tokenvalidator')

const app = server({
    api:        path.resolve(__dirname, './api'),
    connectors: path.resolve(__dirname, './db/connectors'),
    gateways:   path.resolve(__dirname, './db/gateways'),
    handlers:   path.resolve(__dirname, './handlers'),
    policies:   path.resolve(__dirname, './policies'),
    types:      path.resolve(__dirname,'./types')
})

app.useAfter(tokenvalidator)

app.listen()