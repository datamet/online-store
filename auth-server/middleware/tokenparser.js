const { verifyLocalToken } = require('../lib/jwt')

const tokenparser = async (req, res, next) => {
    req.user = {}
    const auth_token = req.getCookie('auth_token')
    if (!auth_token) next()
    let token_info
    try {
        token_info = await verifyLocalToken(auth_token)
    }
    catch (error) {
        next()
        return
    }
    req.user._id = token_info.user_id
    res.header('user', token_info.user_id)
    next()
}

module.exports = tokenparser