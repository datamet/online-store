const gateway = {}

gateway.createUser = async (db, { username }) => {
	await db.collection('users').insertOne({ username })
}

gateway.getUsers = async db => {
	return await db.collection('users').find().toArray()
}

gateway.getUser = async (db, { _id }) => {
	await db.collection('users').find({ _id })
}

gateway.updateUser = async (db, params) => {
	await db.collection('users').updateOne({ _id: params.id }, params.updatedInfo)
}

gateway.deleteUser = async (db, { _id }) => {
	await db.collection('users').deleteOne({ _id })
}

module.exports = gateway