const uuid = require('../../../lib/uuid')
const gateway = {}

gateway.createUser = async (db, user) => {
    const exists = await gateway.getUserByEmail(db, { email: user.email })
    if (exists) throw new Error('User allready exists')
    const user_id = uuid()
    const newUser = {
        _id: user_id,
        ...user
    }
    await db.users.set(user_id, newUser)
    await db.emails.set(user.email, user_id)
    if (user.google_id) await db.google_ids.set(user.google_id, user_id)
    return newUser
}

gateway.getUserByEmail = async (db, { email }) => {
    const user_id = await db.emails.get(email)
    if (user_id) return await db.users.get(user_id)
}

gateway.getUserByGoogleId = async (db, { google_id }) => {
    const user_id = await db.google_ids.get(google_id)
    if (user_id) return await db.users.get(user_id)
}


module.exports = gateway