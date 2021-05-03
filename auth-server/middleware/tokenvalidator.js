const { verifyLocalToken } = require('../lib/jwt')

const tokenvalidator = (req, res, next) => {
    setTimeout(async () => {
        try {
            if (!res.headersSent) {
                const auth_token = req.getCookie('auth_token')
                await verifyLocalToken(auth_token)
                res.sendStatus(200)
            }
            next()
        }
        catch (error) {
            next(error)
        }
    }, 50)
}

module.exports = tokenvalidator