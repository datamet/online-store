const error = require("server-framework")

const setup = user_id => async (req, res, next) => {
    const userIsOwner = await isOwner(user_id, { params: req.params, query: req.query })
    if (!userIsOwner) {
        throw error.unauthorized()
    }
    next()
}

const isOwner = async (user_id, { params, query, entity }) => {
    let _id
    if (params) {
        const index = Object.keys(params).length-1
        const key = Object.keys(params)[index]
        _id = params[key]
    }
    if (query) {
        Object.keys(query).map(key => {
            if (key.includes('_id')) _id = query[key]
        })
    }
    if (entity) _id = entity
    return await db.userIsOwner({ user_id, _id })
}

module.exports = { setup, isOwner }