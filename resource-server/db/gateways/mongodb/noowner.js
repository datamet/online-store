const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.isOwned = async (db, { entity }) => {
    const count = await db.collection('noowner').find({ entity: ObjectId(entity) }).count()
    return count === 0
}

module.exports = gateway