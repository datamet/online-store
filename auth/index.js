const express = require('express')
const path = require('path')
const { decode, verify } = require('./jwt')

const app = express()

app.post('/api/v1/auth/local', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'))
})

app.delete('/api/v1/auth/local', (req, res) => {
    
})

app.post('api/v1/auth/google', (req, res) => {
    const id_token = req.query.id_token
    const verifyToken = async () => {
        try {
            console.log(id_token)
            const token = await verify(id_token)
            console.log(token)
            res.json(token)
        }
        catch(error) {
            res.send('not ok')
        }
    }
    verifyToken()
})

app.delete('/api/v1/auth/google', (req, res) => {
    
})

app.use((req, res) => {
    res.status(200).send('ok bro')
})

app.listen(4000)