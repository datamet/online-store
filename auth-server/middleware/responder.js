const { error } = require("server-framework")

const responder = (req, res, next) => {
    setTimeout(async () => {
        try {
            if (!res.headersSent) {
                if (req.user._id) res.sendStatus(200)
                else throw error.authentication()
            }
            next()
        }
        catch (error) {
            next(error)
        }
    }, 50)
}

module.exports = responder