const config = require('../serverconfig')
const error = require('../lib/error')
const { log } = require('../lib/logger')

let gateway
const db = {
    db: {}
}

db.setup = (connectors_path, gateways_path) => {
    let connector = require(`${connectors_path}/${config.gateway}`)
        db.connect = connector.connect
        db.get = connector.get
        gateway = require(`${gateways_path}/${config.gateway}`)

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