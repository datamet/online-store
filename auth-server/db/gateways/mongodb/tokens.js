const gateway = {}

gateway.storeAuthToken = async (db, { user_id, auth_token, expires }) => {
    await db.collection('tokens').insertOne({ user_id, auth_token, expires })
    await db.collection('users').updateOne({ _id: user_id }, { $push: { auth_tokens: auth_token } })
}

gateway.getAuthToken = async (db, { auth_token }) => {
    return await db.collection('tokens').findOne({ auth_token }) 
}

gateway.removeAuthToken = async (db, { user_id, auth_token }) => {
    await db.collection('tokens').removeOne({ auth_token: auth_token })
    await db.collection('users').updateOne({ _id: user_id }, { $pull: { auth_tokens: auth_token } })
}

module.exports = gateway