const config = require('../../serverconfig')
const log = require('../logger')
const { dbconnect, getDB } = require(`./connection/${config.gateway}`)
const gateway = require(`./gateways/${config.gateway}`)

const gatewayProxy = {}

for (const [name, funk] of Object.entries(gateway)) {
    gatewayProxy[name] = async (args) => {
        try {
            return await funk(getDB(), args)
        }
        catch (error) {
            log(log.DB, `Database operation failed`)
            throw error
        }
    }
}

module.exports = { dbconnect, getDB, db: gatewayProxy }