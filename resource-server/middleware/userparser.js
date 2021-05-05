const userparser = (req, res, next) => {
    req.user = {}
    const user_id = req.header('user')
    if (user_id) req.user._id = user_id
    next()
}

module.exports = userparser