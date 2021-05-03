const { log } = require('../lib/logger')

const logger = (req, res, next) => {
    setTimeout(() => {
        if (res.headersSent) log(log.ACCEPT, `(${res.statusCode}) ${req.method} ${req.path}`)
        else {
            res.status(404).json({ error: `Cannot ${req.method} ${req.path}` })
            log(log.REJECT, `(${res.statusCode}) ${req.method} ${req.path}`)
        }
        res.end()
    }, 50)
}

module.exports = logger