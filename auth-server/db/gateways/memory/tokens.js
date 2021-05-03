const gateway = {}

gateway.storeAuthToken = async (db, { user_id, auth_token, expires }) => {
    await db.tokens.set(auth_token, { user_id, expires })
    const user = await db.users.get(user_id)
    if (user.auth_tokens) user.auth_tokens.push(auth_token)
    else user.auth_tokens = [auth_token]
    await db.users.set(user_id, user)
}

gateway.getAuthToken = async (db, { auth_token }) => {
    return db.tokens.get(auth_token)
}

gateway.removeAuthToken = async (db, { user_id, auth_token }) => {
    await db.tokens.remove(auth_token)
    const user = await db.users.get(user_id)
    const i = user.auth_tokens.indexOf(auth_token)
    if (i !== -1) user.auth_tokens.splice(i, 1)
    db.users.set(user_id, user)
}

module.exports = gateway