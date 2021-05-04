const gateway = {}

gateway.createUser = async (db, { email, email_verified, username, hash, groups }) => {
    const res = await db.collection('users').insertOne({ email, email_verified, username, groups })
    await db.collection('hashes').insertOne({ user_id: res.insertedId, email, hash })
    return await db.collection('users').findOne({ _id: res.insertedId })
}

gateway.getUserByEmail = async (db, { email }) => {
    return await db.collection('users').findOne({ email })
}

gateway.getUserByGoogleId = async (db, { google_id }) => {
    return await db.collection('users').findOne({ google_id })
}

gateway.getUserGroups = async (db, { _id }) => {
    const user = await db.collection('users').findOne({ _id })
    return user.groups
}

gateway.userIsOwner = async (db, { user_id, _id }) => {
    const res = await db.collection('users').find({
        _id: user_id,
        owns: { $in: [_id] },
    }).count()
    return res === 1
}

module.exports = gateway