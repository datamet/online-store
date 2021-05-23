const ObjectId = require('mongodb').ObjectId
const gateway = {}

gateway.createUser = async (db, { email, email_verified, username, hash, groups, google_id }) => {
    const numberOfUsers = await db.collection('users').count({})
    if(numberOfUsers === 0 && groups.indexOf('admin') === -1) groups.push('admin')
    const user = {
        email, 
        email_verified, 
        username, 
        groups
    }
    if (google_id) user.google_id = google_id

    const res = await db.collection('users').insertOne(user)
    await db.collection('users').updateOne({ _id: ObjectId(res.insertedId) }, { $push: { owns: ObjectId(res.insertedId) } })
    if (!google_id) await db.collection('hashes').insertOne({ user_id: ObjectId(res.insertedId), email, hash })
    return res.insertedId
}

gateway.getUserById = async (db, { _id }) => {
    return await db.collection('users').findOne({ _id: ObjectId(_id) })
}

gateway.getUserByEmail = async (db, { email }) => {
    return await db.collection('users').findOne({ email })
}

gateway.getUserByGoogleId = async (db, { google_id }) => {
    return await db.collection('users').findOne({ google_id })
}

gateway.addGoogleIdToUser = async (db, { user_id, google_id }) => {
    await db.collection('users').updateOne({ _id: ObjectId(user_id) }, { $set: { google_id } })
}

gateway.getUserGroups = async (db, { _id }) => {
    const user = await db.collection('users').findOne({ _id })
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
    const res = await db.collection('users').find().count()
    return res === 1
}

module.exports = gateway