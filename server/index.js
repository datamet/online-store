/**
 * Purpose: Requires server and listens on port
 */

const { server, dbconnect } = require('./server')
const log = require('./lib/logger')
const getAvailablePort = require('./lib/port')
const { port: startingPort, mode, autoport } = require('./serverconfig')

const listen = async () => {
	try {
		await dbconnect()
		log(log.DB, `Connected to db`)
	}
	catch (error) {
		log(log.ERROR, `Cannot connect to db`, { error })
		return
	}

	log(log.MODE, `Server starting in ${mode} mode`)

	// Getting available port if autoport is enabled
	const port = autoport ? await getAvailablePort(startingPort) : startingPort

	// Logging if original port is not available
	if (startingPort !== port)
		log(
			log.SERVER,
			`Port ${startingPort} not available, using ${port} instead`
		)

	// Listening on port
	server.listen(port, () => {
		log(log.LISTENING, `Server listening on port ${port}`)
	})

	// Handeling port error
	server.on('error', () => {
		log(log.FATAL, `Port ${port} allready in use.`)
		log(
			log.TIPS,
			`Enable autoport for ${mode} mode if you want server to automatically pick available port`
		)
	})
}

const close = () => {
	server.close(() => {
		log(log.SERVER, `Server closed`)
		process.exit()
	})
}

// Handeling Ctrl + c interrupt
process.on('SIGINT', function () {
	log(log.PROCESS, `Recieved CTRL + C. Shuttind down server`, {
		newline: true,
	})
	close()
})

// Handeling process interrupt
process.on('SIGTERM', function () {
	log(log.PROCESS, `Recieved SIGTERM. Shutting down server`)
	close()
})

// Starting server
try {
	listen()
} catch (error) {
	log(log.FATAL, `Uncaught error`, { error })
}
