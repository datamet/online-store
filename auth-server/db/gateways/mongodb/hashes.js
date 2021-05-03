const gateway = {}

gateway.getHashByEmail = async (db, { email }) => {
    return await db.collection('hashes').findOne({ email })
}

module.exports = gateway