const Local = {}

Local.authenticate = async (req, res, next) => {
    res.json({ message: 'Logged in' })
    next()
}

Local.unauthenticate = async (req, res, next) => {
    res.json({ message: 'Logged out' })
    next()
}

module.exports = Local
