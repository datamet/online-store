/**
 * Purpose: Load all json endpoints into one single 
 * endpoint array
 * 
 * Exports: Function that takes directory to look for
 * json endpoints to load
 */
 const fs = require('fs')
 const path = require('path')
 const log = require('../logger')
 
 const loadFile = (filename, filePath) => {
     let endpoints = []
     try {
         const rawData = fs.readFileSync(filePath)
         endpoints = JSON.parse(rawData)
     }
     catch (error) {
         log(debug.ERROR, `Could not load ${filename}`, { error })
     }
     return endpoints
 }
 
 // get all routes
 const loadDir = dir => {
     let endpoints = []
     try {
         files = fs.readdirSync(dir)
 
         for (const filename of files) {
             const fileEndpoints = loadFile(filename, path.resolve(dir, filename))
             endpoints = [...endpoints, ...fileEndpoints]
         }
     }
     catch (error) {
         log(debug.ERROR, `Could not load api`, { error })
     }
     return endpoints
 }
 
 module.exports = loadDir