const log = require('../logger')

const logger = (req, res, next) => {
    if (res.headersSent) log(log.ACCEPT, `(${res.statusCode}) ${req.method} ${req.path}`)
    else {
        res.status(404).json({ error: `Cannot ${req.method} ${req.path}` })
        log(log.REJECT, `(${res.statusCode}) ${req.method} ${req.path}`)
    }
    next()
}

module.exports = logger