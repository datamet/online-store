const gateway = {}

gateway.createUser = async (db, { username }) => {
    await db.collection('users').insertOne({ username })
}

gateway.getUsers = async (db) => {
    return await db.collection('users').find().toArray()
}

module.exports = gateway