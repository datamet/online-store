/**
 * Purpose: Load and parse all json types
 * 
 * Exports: An object with all types used by
 * the rest api to validate requests
 */

const fs = require("fs")
const path = require("path")
const error = require("../error")
const log = require('../logger')

let types = {}

const validateType = type => {
    if (!type.regex || !type.error) throw error.config()
}

try {
    const typeFiles = fs.readdirSync(path.resolve(__dirname, './types'))
    for (const filename of typeFiles) {
        try {
            const typeFile = fs.readFileSync(path.resolve(__dirname, `./types/${filename}`))
            const newTypes = JSON.parse(typeFile)
            for (const [name, newType] of Object.entries(newTypes)) {
                if (Array.isArray(newType)) {
                    newType.map(subtype => validateType(subType))
                    continue
                }
                validateType(newType)
            }
            types = { ...types, ...newTypes }
        }
        catch (error) {
            log(log.ERROR, `Could not load ${filename} type file`, { error })
        }
    }
}
catch (error) {
    log(log.ERROR, `Could not load types`, { error })
}

module.exports = types