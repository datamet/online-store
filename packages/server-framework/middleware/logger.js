const { log } = require('../lib/logger')

const logger = (req, res, next) => {
    const auth = req.user._id ? `(user: ${req.user._id})` : `(unauthenticated)`
    setTimeout(() => {
        if (res.headersSent) log(log.ACCEPT, `(${res.statusCode}) ${req.method} ${req.path} ${auth}`)
        else {
            res.status(404).json({ error: {
                message: `Cannot ${req.method} ${req.path}`
            } })
            log(log.REJECT, `(${res.statusCode}) ${req.method} ${req.path} ${auth}`)
        }
        res.end()
    }, 50)
}

module.exports = logger