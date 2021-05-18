const discountPrice = (price, percent) => {
    const factor = (100 - percent) * 0.01
    return price * factor
}

module.exports = { discountPrice }