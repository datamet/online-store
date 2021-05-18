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

Checkout.getOne = async (req, res, next) => {
    const session = await db.getCheckoutSession({ checkout_id: req.params.checkout_id })
    if (!session) throw error.custom(404, 'Could not find checkout session')
    const products = []
    let totalPrice = 0
    for (const { product_id, amount } of session.products) {
        const product = await db.getProduct({ _id: product_id })
        if (!product) throw error.internal()
        product.amount = amount
        totalPrice += product.price * amount
        products.push(product)
    }
    res.json({ products, total: totalPrice, exp: session.exp })
    next()
}

module.exports = Checkout