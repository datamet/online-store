const discountPrice = (price, precent) => {
    const factor = (100 - percent) * 0.01
    return price * factor
}

module.exports = { discountPrice }