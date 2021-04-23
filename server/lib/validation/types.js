/**
 * Purpose: Load and parse all json types
 * 
 * Exports: An array of all types used by
 * the rest api to validate requests
 */

const fs = require("fs")
const path = require("path")
const log = require('../log')

let types = []

try {
    const typesFile = fs.readFileSync(path.resolve(__dirname, './types.json'))
    types = JSON.parse(typesFile)
}
catch (error) {
    log(log.ERROR, `Could not load types`, { error })
}

module.exports = types