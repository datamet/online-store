const { db, error } = require('server-framework')

const validateCheckoutSession = async (checkout_id, user_id) => {
    let session = await db.getAndDeleteCheckoutSession({ checkout_id })
    session = session.value
    if (session.user && session.user !== user_id) throw error.unauthorized()
    if (Date.now() > session.exp) throw error.expired()
    if (!(session.user || session.exp || session.products)) throw error.unauthorized()
    return session
}

const validatePaymentToken = async (payment_token) => {
    // If we were using a third party payment processer we would check
    // the validity of the payment token here
    return true
}

module.exports = { validateCheckoutSession, validatePaymentToken }