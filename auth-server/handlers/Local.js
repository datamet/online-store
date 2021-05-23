const { db, error, log } = require('server-framework')
const { verifyLocalToken, authenticate, unauthenticate, basic, clearAuthCookies } = require('../lib/jwt')
const hash = require('../lib/hash')
const Local = {}

Local.authenticate = async (req, res, next) => {
    const auth_header = req.header('Authorization')
    const [ email, password ] = basic(auth_header)
    if (!email || !password) throw error.authentication()
    const hash_info = await db.getHashByEmail({ email })
    if (!hash_info || !hash_info.hash) throw error.credentials()
    hash.compare(hash_info.hash, password)
    await authenticate(hash_info.user_id, req, res)
    res.json({ message: 'Logged in', user_id: hash_info.user_id })
    next()
}

Local.unauthenticate = async (req, res, next) => {
    const auth_token = req.getCookie('auth_token')
    try {
        const token_info = await verifyLocalToken(auth_token)
        await unauthenticate(token_info, req, res)
        res.json({ message: 'Logged out' })
        next()
    }
    catch (error) {
        await clearAuthCookies(req, res)
        throw error
    }
}

module.exports = Local
