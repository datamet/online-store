const https = require('https')

const atob = (b64Str) => Buffer.from(b64Str, `base64`).toString(`binary`)

const decode = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const verify = (id_token) => {
    console.log("here")

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'www.googleapis.com',
            path: `/oauth2/v3/tokeninfo?id_token=${id_token}`,
            method: 'get'
        }
        
        const request = https.request(options, respons => {
            let data = ''
            respons.on('data', d => {
                data += d
            })

            respons.on('end', () => {
                try {
                    const res = JSON.parse(data)
                    resolve(res)
                }
                catch (error) { 
                    reject(error)
                }
            })
        })
        
        request.on('error', error => {
            reject(error)
        })

        request.end()
    })
}

module.exports = {
    decode,
    verify
}