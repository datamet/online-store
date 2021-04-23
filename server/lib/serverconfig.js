/**
 * Purpose: Defining server constants that should not change
 * while the server is running. 
 * 
 * Exports: Instance of config object which differs 
 * based on what environment node is running in.
 */

const PORT = process.env.PORT
const ENV = process.env.NODE_ENV

class Config {
    port = PORT || '5000'

    constructor(name) {
        this.mode = name
    }

}

const modes = {}

// Creatign different modes for different environments
const dev = modes.development = new Config('development')
const prod = modes.production = new Config('production')
const debug = modes.debug = new Config('debug')

// Port to listen to
dev.port = PORT || 5000
debug.port = PORT || 5000
prod.port = PORT || 3000

// Find unused port if origional is already taken
dev.autoport = true
debug.autoport = true
prod.autoport = false

// Debug messages printet to the console
debug.debug = ['server', 'mode', 'error', 'fatal', 'listening', 'process', 'tips', 'accept', 'reject']
dev.debug = ['server', 'mode', 'error', 'fatal', 'listening', 'process', 'tips', 'accept', 'reject']
prod.debug = ['server', 'mode', 'listening', 'fatal', 'tips']

// Error messages printet to the console
debug.errorMessages = 'all'
dev.errorMessages = 'all'
prod.errorMessages = 'critical'

// Error traceback printed to the console
debug.traceback = 'all'
dev.traceback = 'critical'

// Export mode based on NODE_ENV variable, 
// otherwise start in development mode
module.exports = ENV ? modes[ENV] ? modes[ENV] : modes.development : modes.development