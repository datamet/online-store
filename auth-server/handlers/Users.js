const path = require('path')
const { db, error, validate } = require('server-framework')
const hasher = require('../lib/hash')
const { basic } = require('../lib/jwt')

const Users = {}

Users.createOne = async (req, res, next) => {
    const auth_header = req.header('Authorization')
    const [ email, password ] = basic(auth_header)
    validate('[email]', email)
    validate('[password]', password)
    const hash = hasher.create(password)
    const username = req.body.username
    const groups = req.body.groups

    const user = await db.getUserByEmail({ email })
    if (user) throw error.custom(409, "A user with that email allready exists")

    const user_id = await db.createUser({
        email,
        email_verified: false,
        username,
        groups,
        hash
    })
    if (!user_id) throw error.internal()
    
    res.json({ message: 'User created', user_id })
    next()
}

Users.authenticated = async (req, res, next) => {
    if (!req.user._id) throw error.unauthorized()
    const user = await db.getUserById({ _id: req.user._id })
    if (!user) throw error.internal()
    res.json({ message: 'Logged in', user_id: req.user._id, username: user.username, email: user.email, groups: user.groups })
    next()
}

module.exports = Users