const gateway = {}

gateway.createUser = async (db, { username }) => {
    db.users.set(username, 'password')
}

gateway.getUsers = async (db) => {
    return Array.from(db.users)
}

module.exports = gateway