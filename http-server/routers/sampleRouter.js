const express = require('express')

const router = express.Router()

router.get('/hello', (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'plain/text')
    res.end('hello world!\n')
})

router.post('/json', (req, res) => {
    res.json(req.body)
})

module.exports = router
