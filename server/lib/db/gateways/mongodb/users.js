const gateway = {}

gateway.createUser = async (db, { username }) => {
	await db.collection('users').insertOne({ username })
}

gateway.getUsers = async db => {
	return await db.collection('users').find({}, { username: 1 }).toArray()
}

gateway.getUser = async (db, { _id }) => {
	return await db.collection('users').find({ _id })
}

gateway.updateUser = async (db, { _id, updatedInfo }) => {
	await db.collection('users').updateOne({ _id }, updatedInfo)
}

gateway.deleteUser = async (db, { _id }) => {
	await db.collection('hashes').deleteOne({ user_id: _id })
	await db.collection('tokens').deleteMany({ user_id: _id })
	await db.collection('users').deleteOne({ _id })
}

module.exports = gateway