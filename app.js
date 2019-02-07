'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const log = require('debug')('lineberty:app:serversdktest:app')

const api = require('./lib/api/api')

const app = express()
const server = require('http').Server(app)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', cors())

app.use('/api/v1/', api.middleware)

const port = process.env.PORT || 80
server.listen(port)

process.on('uncaughtException', function (err) {
    log((new Date).toUTCString() + ' uncaughtException : %s', err.message)
    log(err.stack)
    process.exit(1)
})
