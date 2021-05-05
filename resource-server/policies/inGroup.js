const { isOwner } = require('./isOwner')
const { db, error } = require('server-framework')

const setup = groups => async (req, res, next) => {
    const userInGroup = await inGroup(req.user._id, groups, { params: req.params, query: req.query })
    if (!userInGroup) {
        throw error.unauthorized()
    }
    next()
}

const inGroup = async (user_id, groups, options) => {
    const params = options && options.params ? options.params : null
    const query = options && options.query ? options.query : null
    const entity = options && options.entity ? options.entity : null

    const user_groups = await db.getUserGroups({ _id: user_id })
    let result = user_groups.some(group => groups.includes(group))
    if (!result && groups.includes('owner')) {
        result = await isOwner(user_id, { params, query, entity })
    }
    return result
}

module.exports = { setup, inGroup }