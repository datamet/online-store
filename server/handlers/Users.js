const { db } = require('../lib/db')

const Users = {}

Users.createOne = async (req, res, next) => {
    await db.createUser({ username: req.body.username })
    res.send('ok')
    next()
}

Users.getMultiple = async (req, res, next) => {
    const users = await db.getUsers()
    res.json(users)
    next()
}

module.exports = Users