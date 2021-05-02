const path = require('path')
const { db } = require('../lib/db')

const Users = {}

Users.createOne = async (req, res, next) => {
    res.json({ message: 'User created' })
    next()
}

Users.getMultiple = async (req, res, next) => {
    const users = await db.getUsers()
    res.json(users)
    next()
}

Users.login = () => {
    res.sendFile(path.resolve(__dirname, '../../auth/temp/index.html'))
    next()
}

module.exports = Users