const gateway = {}

gateway.createUser = async (db, user) => {
    const res = await db.collection('users').insertOne(user)
    return await db.collection('users').findOne({ _id: res.insertedId })
}

gateway.getUserByEmail = async (db, { email }) => {
    return await db.collection('users').findOne({ email })
}

gateway.getUserByGoogleId = async (db, { google_id }) => {
    return await db.collection('users').findOne({ google_id })
}

module.exports = gateway