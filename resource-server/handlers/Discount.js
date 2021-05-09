const { db } = require('server-framework')
const error = require('server-framework/lib/error')

const Discount = {}

Discount.createOne = async (req, res, next) => {
    const discount = {
        code: req.body.code,
        percent: parseInt(req.body.percent)
    }

    if (req.body.user) discount.user = req.body.user
    if (req.body.products) discount.products = req.body.products

    await db.createDiscount({ discount })

    res.json({ message: "Discount created" })
    next()
}

Discount.getMultiple = async (req, res, next) => {
    const discounts = await db.getDiscounts()
    if (!discounts) throw error.internal()
    res.json({ discounts })
    next()
}

Discount.verify = async (req, res, next) => {
    const code = req.params.discount_code
    const discount = await db.verifyDiscount({ code })

    if (!discount.valid) res.json({ valid: false, message: "Cupon does not exist" })
    else res.json({ valid: true, percent: discount.percent, message: "Cupon is valid" })
    next()
}

module.exports = Discount