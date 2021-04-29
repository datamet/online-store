const { db } = require('../../server-base')
const Local = {}

Local.authenticate = (req, res, next) => {
    res.send('ok')
}

Local.unauthenticate = (req, res, next) => {
    res.send('ok')
}

module.exports = Local
