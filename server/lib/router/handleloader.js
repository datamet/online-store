/**
 * Purpose: Reads handle directory and imports all handlers
 * 
 * Exports: Functions that takes direcory as parameter
 * to look for handlers
 */
 const fs = require('fs')
 const log = require('../logger')
 
 loadHandlers = dir => {
     const handlers = {}
     try {
         let files = fs.readdirSync(dir)
     
         for (const filename of files) {
             const [ name ] = filename.split('.')
             try {
                 handlers[name] = require(`${dir}/${filename}`)
             }
             catch (error) {
                 log(debug.ERROR, `Could not load ${filename}`, { error })
             }
         }
     }
     catch (error) {
         log(debug.ERROR, `Could not load handlers`, { error })
     }
     return handlers
 }
 
 module.exports = loadHandlers
 