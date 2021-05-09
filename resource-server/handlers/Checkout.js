const { db, error } = require('server-framework')
const { cart_timeout } = require('../config')

const Checkout = {}

Checkout.createSession = async (req, res, next) => {
    const session = {
        products: req.body.products,
        exp: Date.now() + cart_timeout
    }

    if (req.user._id) session.user = req.user._id

    const checkout_id = await db.createCheckoutSession({ session })
    if (!checkout_id) throw error.internal()

    res.json({ message: "Checkout session started", exp: session.exp, checkout_id })
    next()
}

module.exports = Checkout