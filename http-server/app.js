const express = require('express')
const sampleRouter = require('./routers/sampleRouter')

const hostname = '127.0.0.1'
const port = 8080

const server = express()

server.use(express.json())

server.use('/api/v1/samples', sampleRouter)

server.listen(port, hostname, () => {
    console.log(`web server is running at http://${hostname}:${port}`)
})