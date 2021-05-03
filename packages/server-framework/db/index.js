const { log } = require('../lib/logger')

let gateway
const db = {
    db: {}
}

db.setup = (gateway_name, connectors_path, gateways_path) => {
    let connector = require(`${connectors_path}/${gateway_name}`)
        db.connect = connector.connect
        db.get = connector.get
        gateway = require(`${gateways_path}/${gateway_name}`)

    for (const [name, funk] of Object.entries(gateway)) {
        db.db[name] = async (args) => {
            try {
                return await funk(db.get(), args)
            }
            catch (error) {
                log(log.DB, `Database operation failed`)
                throw error
            }
        }
    }
}

module.exports = db