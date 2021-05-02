const gateway = {}

gateway.createUser = async (db, { username }) => {
    console.log("user created from memory")
}

gateway.getUsers = async (db) => {
    return db
}

module.exports = gateway