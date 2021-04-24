const log = require('../lib/logger')

const Users = {}

Users.createOne = (req, res, next) => {
    log(debug.ACCEPT, `(200) ${req.path}`)
    res.send('ok')
    next()
}

module.exports = Users