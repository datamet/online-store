const setup = groups => (req, res, next) => {
    next()
}

const inGroup = (user_id, groups) => {

}

module.exports = { setup, inGroup }