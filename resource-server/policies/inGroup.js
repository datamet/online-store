const { isOwner } = require('./isOwner')
const { db, error, log } = require('server-framework')

const setup = groups => async (req, res, next) => {
    const userInGroup = await inGroup(req.user._id, groups, { params: req.params, query: req.query })
    if (!userInGroup) {
        log(log.DEBUG, `User is not in any of the specified groups`)
        log(log.DEBUG, `user_id: ${req.user._id}`)
        log(log.DEBUG, `groups: ${groups}`)
        throw error.unauthorized()
    }
    next()
}

const inGroup = async (user_id, groups, options) => {
    const params = options && options.params ? options.params : null
    const query = options && options.query ? options.query : null
    const entity = options && options.entity ? options.entity : null

    let user_groups 
    if (user_id) user_groups = await db.getUserGroups({ _id: user_id })
    log(log.DEBUG, `User is in the following groups: ${user_groups}`)
    if (!user_groups) user_groups = []
    let result = user_groups.some(group => groups.includes(group))
    if (!result && groups.includes('owner')) {
        if (!(params || query || entity)) return true
        result = await isOwner(user_id, { params, query, entity })
    }
    return result
}

module.exports = { setup, inGroup }