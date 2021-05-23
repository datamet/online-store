const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.getUsers = async db => {
	return await db.collection('users').find({}, { projection: { username: 1 } }).toArray()
}

gateway.getUser = async (db, { _id }) => {
	return await db.collection('users').findOne({ _id: ObjectId(_id) })
}

gateway.getUserByEmail = async (db, { email }) => {
    return await db.collection('users').findOne({ email })
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

gateway.isEmpty = async db => {
    const timeout = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let res
    let count = 0
    while(count < 1) {
        res = await db.collection('users').find()
        count = await res.count()
        if (count === 1) {
            const arr = await res.toArray()
            const admin = arr[0]
            if (admin.initial) return false
            await db.collection('users').updateOne({ _id: ObjectId(admin._id) }, { $set: { initial: true } })
            return admin
        }
        if (count === 0) {
            await timeout(3000)
        } 
    }
    return false
}

module.exports = gateway