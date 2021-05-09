const { error, db, log } = require('server-framework')

const setup = ({ user_id, entity }) => async (req, res, next) => {
	const userIsOwner = await isOwner(user_id, { entity })
	if (!userIsOwner) {
		throw error.unauthorized()
	}
	next()
}

const isOwner = async (user_id, { params, query, entity }) => {
	if (!(params || query || entity)) return true
	let _id
	if (params) {
		const index = Object.keys(params).length - 1
		const key = Object.keys(params)[index]
		_id = params[key]
	}
	if (query) {
		Object.keys(query).map(key => {
			if (key.includes('_id')) _id = query[key]
		})
	}
	if (entity) _id = entity
	const owner = await db.userIsOwner({ user_id, _id })
	if (owner) log(log.DEBUG, `User is owner of: ${_id}`)
	else log(log.DEBUG, `User does not own: ${_id}`)
	return owner
}

module.exports = { setup, isOwner }
module.exports = { setup, isOwner }