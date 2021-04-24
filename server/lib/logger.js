/**
 * Exports: Log function which formats and chooses
 * if it should display a log message
 */

const { log : logsToPrint, error, traceback } = require('./serverconfig')
const format = require('./format')

const printAction = action => {
    return logsToPrint.indexOf(action) !== -1
}

const printTraceback = error => {
    console.log(`\n${format.Red}${error.stack}${format.Reset}\n`)
}

const printErrorMessage = error => {
    console.log(`❌ ${format.Red}[error] ${error.message}${format.Reset}`)
}

const log = (action, message, options) => {
    if (action instanceof Object) {
        const { name, icon, color } = action
        const newline = options && options.newline ? '\n' : ''
        const error = options && options.error ? options.error : null
        const status = options && options.status ? options.status : 500

        if (name && printAction(name)) {
            const str = `${newline}${icon} [${name}] ${message}`
            console.log(`${action.color}${str}${format.Reset}`)
        }

        if (error && traceback) {
            if (traceback === 'all') printTraceback(error)
            else if (traceback === 'critical' && status === 500) printTraceback(error)
        }
        else if (error && error) {
            if (error === 'all') printErrorMessage(error)
            else if (error === 'critical' && status === 500) printErrorMessage(error)
        }
    }
}

// Actions
log.ACCEPT = { name: 'accept', icon: '✳️', color: format.Green }
log.REJECT = { name: 'reject', icon: '⛔', color: format.Red}
log.SERVER = { name: 'server', icon: '💻', color: format.Yellow }
log.PROCESS = { name: 'process', icon: '🚩', color: format.Red }
log.LISTENING = { name: 'listening', icon: '🌍', color: format.Green }
log.FATAL = { name: 'fatal', icon: '💀', color: format.Red }
log.ERROR = { name: 'error', icon: '❌', color: format.Red }
log.MODE = { name: 'mode', icon: '🔧', color: format.Cyan }
log.TIPS = { name: 'tips', icon: '📚', color: format.Magenta }

module.exports = log