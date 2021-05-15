const ObjectId = require('mongodb').ObjectId
const gateway = {}

gateway.createUser = async (db, { email, email_verified, username, hash, groups, google_id }) => {
    const user = {
        email, 
        email_verified, 
        username, 
        groups
    }
    if (google_id) user.google_id = google_id

    const res = await db.collection('users').insertOne(user)
    await db.collection('users').updateOne({ _id: res.insertedId }, { $push: { owns: res.insertedId } })
    await db.collection('hashes').insertOne({ user_id: res.insertedId, email, hash })
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
        _id: user_id,
        owns: { $in: [_id] },
    }).count()
    return res > 0
}

module.exports = gateway