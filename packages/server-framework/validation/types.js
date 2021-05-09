/**
 * Purpose: Load and parse all json types
 * 
 * Exports: An object with all types used by
 * the rest api to validate requests
 */

const fs = require("fs")
const path = require("path")
const error = require("../lib/error")
const { log } = require('../lib/logger')

let types = {}

const validateType = type => {
    if (!type.regex || !type.error) throw error.custom(500, 'Type is missing regex or error field')
}

const load = (types_path) => {
    try {
        const typeFiles = fs.readdirSync(types_path)
        for (const filename of typeFiles) {
            try {
                const typeFile = fs.readFileSync(`${types_path}/${filename}`)
                const newTypes = JSON.parse(typeFile)
                for (const [name, newType] of Object.entries(newTypes)) {
                    try {
                        if (Array.isArray(newType)) {
                            newType.map(subtype => validateType(subtype))
                            continue
                        }
                        validateType(newType)
                    }
                    catch (error) {
                        log(log.ERROR, `Could not parse type: ${name}`, { error })
                    }
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
    return types
}

load(path.resolve(__dirname, './types'))

module.exports = load