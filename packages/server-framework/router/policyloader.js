/**
 * Purpose: Reads policy directory and imports all policies
 *
 * Exports: Function that takes a directory to look for
 * policies in and loades those policies
 */
const fs = require('fs')
const { log } = require('../lib/logger')

loadPolicies = dir => {
	const policies = {}
	try {
		files = fs.readdirSync(dir)

		for (const filename of files) {
			const [name] = filename.split('.')
			try {
				const { setup } = require(`${dir}/${filename}`)
				policies[name] = setup
			} catch (error) {
				log(log.ERROR, `Could not load ${filename}`, { error })
			}
		}
	} catch (error) {
		log(log.ERROR, `Could not load policies`, { error })
	}
	return policies
}

module.exports = loadPolicies
