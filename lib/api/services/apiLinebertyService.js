'use strict'

const log = require('debug')('lineberty:app:serverSdkTest:service:apiLineberty')
const router = require('express').Router()

const schema = require('./schema')
const {createUser, getApiKey, loginUser, refreshToken} = require('../../core/apiLinebertyHandler')

const {validateBody} = require('../middleware/validatorMiddleware')

exports.middleware = router

router.get('/apiKey', async (req, res) => {
    try {
        const resApi = await getApiKey()
        return res.json(resApi)
    } catch (err) {
        log('Get : Error while getting apiKey : %o', {errName: err.name, error: log.coerce(err)})
        return res.status(500).json({})
    }
})

router.post('/create', async (req, res) => {
    try {
        const resToken = await createUser()
        return res.json(resToken)
    } catch (err) {
        log('Get : Error while creating User : %o', err)
        return res.status(500).json({})
    }
})

router.get('/login', validateBody(schema.logUser), async (req, res) => {

    const userId = req.query.userId

    try {
        const resToken = await loginUser(userId)
        return res.json(resToken)
    } catch (err) {
        log('Get : Error while login user : %o', err)
        return res.status(500).json({})
    }
})

router.get('/refreshToken', validateBody(schema.refreshToken), async (req, res) => {

    const userId = req.query.userId
    const sessionId = req.query.sessionId

    try {
        const resToken = await refreshToken(userId, sessionId)
        return res.json(resToken)
    } catch (err) {
        log.error('Get : Error while refreshing user token : %o', err)
        return res.status(500).json({})
    }
})
