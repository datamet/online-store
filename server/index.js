/**
 * Purpose: Requires server and listens on port
 */

const { server } = require('./server')

server.listen(5000, () => {
	console.log('listening on port')
})
