const log = require('../lib/logger')

const Users = {}

Users.createOne = (req, res, next) => {
    log(log.ACCEPT, `(200) ${req.path}`)
    res.send('ok')
    next()
}

Users.getMultiple = (req, res, next) => {
    log(log.ACCEPT, `(200) ${req.path}`)
    res.send('here are some users for you :)')
    next()
}

module.exports = Users