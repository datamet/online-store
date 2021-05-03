/**
 * Purpose: Defining server constants that should not change
 * while the server is running.
 *
 * Exports: Instance of config object which differs
 * based on what environment node is running in.
 */

// Environment
const ENV = process.env.NODE_ENV || 'development'

// General
const mode = ENV
const port = process.env.PORT || 3000
const autoport = process.env.AUTO_PORT || false

// What events to log to the console
const events = process.env.EVENTS_TO_LOG
	? process.env.ACTIONS_TO_LOG.split(', ')
	: ['server', 'mode', 'fatal', 'tips', 'accept', 'reject']
const errors = process.env.ERRORS_TO_LOG || 'critical'
const tracebacks = process.env.TRACEBACKS_TO_LOG

// What database to use
const gateway = process.env.DB_GATEWAY || 'memory'

// Database connection info
const db_protocol = process.env.DB_PROTOCOL
const db_name = process.env.DB_NAME
const db_user = process.env.DB_USER
const db_pwd = process.env.DB_PWD
const db_host = process.env.DB_HOST
const db_port = process.env.DB_PORT

// Throw error if database info is missing 
if (gateway !== 'memory') {
	if (!db_protocol) throw Error('Missing database protocol')
	if (!db_name) throw Error('Missing database name')
	if (!db_user) throw Error('Missing database username')
	if (!db_pwd) throw Error('Missing database password')
	if (!db_host) throw Error('Missing database host')
	if (!db_port) throw Error('Missing database port')
}

const config = {
	mode,
	port,
	autoport,
	gateway,
	events,
	errors,
	tracebacks,
	db_protocol,
	db_host,
	db_port,
	db_user,
	db_pwd,
	db_name,
}

module.exports = config
