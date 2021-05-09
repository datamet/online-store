const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.getUsers = async db => {
	return await db.collection('users').find({}, { projection: { username: 1 } }).toArray()
}

gateway.getUser = async (db, { _id }) => {
	return await db.collection('users').findOne({ _id: ObjectId(_id) })
}

gateway.updateUser = async (db, { _id, updatedInfo }) => {
	const res = await db.collection('users').updateOne({ _id: ObjectId(_id) }, { $set: updatedInfo })
	return res.modifiedCount > 0
}

gateway.deleteUser = async (db, { _id }) => {
	const res = await db.collection('users').deleteOne({ _id: ObjectId(_id) })
	if (res.deletedCount === 0) return false
	await db.collection('hashes').deleteOne({ user_id: ObjectId(_id) })
	await db.collection('tokens').deleteMany({ user_id: ObjectId(_id) })
	return true
}

gateway.getUserGroups = async (db, { _id }) => {
    const user = await db.collection('users').findOne({ _id: ObjectId(_id) })
    if (!user) return false
    return user.groups
}

gateway.userIsOwner = async (db, { user_id, _id }) => {
    const res = await db.collection('users').find({
        _id: ObjectId(user_id),
        owns: { $in: [ObjectId(_id)] },
    }).count()
    return res > 0
}

module.exports = gateway