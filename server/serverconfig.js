/**
 * Purpose: Defining server constants that should not change
 * while the server is running.
 *
 * Exports: Instance of config object which differs
 * based on what environment node is running in.
 */
const path = require('path')

const ENV = process.env.NODE_ENV || 'production'
require('dotenv').config({ path: path.resolve(__dirname, `../.env.${ENV}`) })

const mode = ENV
const port = process.env.PORT || 3000
const autoport = process.env.AUTO_PORT || false
const gateway = process.env.DB_GATEWAY || 'memory'
const db_uri = process.env.DB_URI
const db_protocol = process.env.DB_PROTOCOL
const db_name = process.env.DB_NAME
const db_username = process.env.DB_USERNAME
const db_password = process.env.DB_PASSWORD
const db_port = process.env.DB_PORT
const db_host = process.env.DB_HOST
const log = process.env.ACTIONS_TO_LOG ? process.env.ACTIONS_TO_LOG.split(', ') : [
	'server',
	'mode',
	'fatal',
	'tips',
]
const error = process.env.ERRORS_TO_LOG || 'critical'
const traceback = process.env.TRACEBACKS_TO_LOG

if (gateway !== 'memory') {
    if (!db_uri) throw Error('Missing database uri')
    if (!db_protocol) throw Error('Missing database protocol')
    if (!db_name) throw Error('Missing database name')
    if (!db_username) throw Error('Missing database username')
    if (!db_password) throw Error('Missing database password')
    if (!db_host) throw Error('Missing database host')
    if (!db_port) throw Error('Missing database port')
}

const config = {
    mode,
	port,
	autoport,
	gateway,
	log,
	error,
	traceback,
    db_uri,
    db_protocol,
    db_host,
    db_port,
    db_username,
    db_password,
    db_name
}

module.exports = config
