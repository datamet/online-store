const { db, error } = require('server-framework')
const { verifyLocalToken, authenticate, unauthenticate, basic } = require('../lib/jwt')
const hash = require('../lib/hash')
const Local = {}

Local.authenticate = async (req, res, next) => {
    const auth_header = req.header('Authorization')
    const [ email, password ] = basic(auth_header)
    if (!email || !password) throw error.authentication()
    const hash_info = await db.getHashByEmail({ email })
    if (!hash_info || !hash_info.hash) throw error.credentials()
    hash.compare(hash_info.hash, password)
    await authenticate(user._id, res)
    res.json({ message: 'Logged in' })
    next()
}

Local.unauthenticate = async (req, res, next) => {
    const auth_token = req.getCookie('auth_token')
    const token_info = await verifyLocalToken(auth_token)
    await unauthenticate(token_info, res)
    res.json({ message: 'Logged out' })
    next()
}

module.exports = Local
