'use strict'

const router = require('express').Router()

exports.middleware = router
router.use('/lineberty', require('./services/apiLinebertyService').middleware)
