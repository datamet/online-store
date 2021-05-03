let store = {}

const db = new Proxy(store, {
	get: function(obj, prop) {
        const map = new Map()
        let toReturn = prop in obj ? obj[prop] : map
		if (prop in obj) {
			toReturn = obj[prop]
		}
		else {
			obj[prop] = map
			toReturn = map
		}
        return toReturn
    }
})

const connect = () => {}

const get = () => {
	return db
}

module.exports = { connect, get }