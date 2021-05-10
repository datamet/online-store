const { log } = require('server-framework')
const { verifyLocalToken } = require('../lib/jwt')

const tokenparser = async (req, res, next) => {
    req.user = {}
    const auth_token = req.getCookie('auth_token')
    if (!auth_token) {
        log(log.DEBUG, `No auth token provided`)
        next()
        return
    }
    let token_info
    try {
        token_info = await verifyLocalToken(auth_token)
        log(log.DEBUG, `Valid auth token provided: ${auth_token}`)
        req.user._id = token_info.user_id
        res.header('user', token_info.user_id)
        next()
    }
    catch (error) {
        log(log.DEBUG, `Non valid auth token provided: ${auth_token}`)
        next()
    }
}

module.exports = tokenparser