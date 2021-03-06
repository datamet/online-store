const ObjectId = require("mongodb").ObjectID
const gateway = {}

gateway.createCheckoutSession = async (db, { session }) => {
    const res = await db.collection('checkout_sessions').insertOne(session)
    // decrease availability
    if (!res.insertedId) return false
    return res.insertedId
}

gateway.getCheckoutSession = async (db, { checkout_id }) => {
    return db.collection('checkout_sessions').findOne({ _id: ObjectId(checkout_id) })
}

gateway.getAndDeleteCheckoutSession = async (db, { checkout_id }) => {
    return await db.collection('checkout_sessions').findOneAndDelete({ _id: ObjectId(checkout_id) })
}

module.exports = gateway