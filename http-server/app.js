const express = require('express')

const hostname = '127.0.0.1'
const port = 8080

const server = express()

server.get('/api/v1/sample', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'plain/text')
    res.end('hello world!\n')
})

server.listen(port, hostname, () => {
    console.log(`web server is running at http://${hostname}:${port}`)
})