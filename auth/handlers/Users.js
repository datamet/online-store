const { db } = require('../../server-base')
const Users = {}

Users.createOne = (req, res, next) => {
    res.send('ok')
    next()
}

module.exports = Users