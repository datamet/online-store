const gateway = {}

gateway.createUser = async (db, { email, email_verified, username, hash }) => {
    const res = await db.collection('users').insertOne({ email, email_verified, username })
    await db.collection('hashes').insertOne({ user_id: res.insertedId, email, hash })
    return await db.collection('users').findOne({ _id: res.insertedId })
}

gateway.getUserByEmail = async (db, { email }) => {
    return await db.collection('users').findOne({ email })
}

gateway.getUserByGoogleId = async (db, { google_id }) => {
    return await db.collection('users').findOne({ google_id })
}

module.exports = gateway