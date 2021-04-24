const http = require('http')

const availablePort = (startingAt) => {

    const getNextAvailablePort = (currentPort, callback) => {
        const server = http.createServer()
        server.listen(currentPort, () => {
            server.once('close', () => {
                callback(currentPort)
            })
            server.close()
        })
        server.on('error', () => {
            getNextAvailablePort(++currentPort, callback)
        })
    }

    return new Promise(resolve => {
        getNextAvailablePort(startingAt, resolve)
    })
}

module.exports = availablePort