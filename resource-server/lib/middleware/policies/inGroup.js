const error = require('../../error')

const inGroup = groups => (req, res, next) => {
    if (groups.indexOf("admin") !== -1) next(error.unauthorized())
    else next()
}

module.exports = inGroup