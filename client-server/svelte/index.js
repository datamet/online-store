const path = require('path')
const express = require('express')

const app = express()

const svelte = (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
}

app.use(express.static('./public'))
app.get('*', svelte)

app.listen(3000)