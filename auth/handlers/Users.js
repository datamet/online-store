const path = require('path')
const { db, error, validate } = require('../../server-base')
const hasher = require('../lib/hash')
const { basic } = require('../lib/jwt')

const Users = {}

Users.createOne = async (req, res, next) => {
    const auth_header = req.header('Authorization')
    const [ email, password ] = basic(auth_header)
    validate('[email]', email)
    validate('[password]', password)
    const hash = hasher.create(password)
    const first_name = req.body.first_name
    const last_name = req.body.last_name

    let user = await db.getUserByEmail({ email })
    if (user) throw error.custom(409, "A user with that email allready exists")

    user = await db.createUser({
        email,
        email_verified: false,
        first_name,
        last_name,
        hash
    })
    
    res.json({ message: 'User created', user_id: user._id })
    next()
}

Users.login = (req, res, next) => {
    res.sendFile(path.resolve(__dirname, '../temp/index.html'))
    next()
}

module.exports = Users