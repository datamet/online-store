const { verify } = require('../lib/jwt')

const Google = {}

Google.authenticate = (req, res, next) => {
    const id_token = req.query.id_token
    const verifyToken = async () => {
        try {
            console.log(id_token)
            const token = await verify(id_token)
            console.log(token)
            res.json(token)
        }
        catch(error) {
            res.send('not ok')
        }
    }
    verifyToken()
}

Google.unauthenticate = (req, res, next) => {
    res.send('ok')
}

module.exports = Google