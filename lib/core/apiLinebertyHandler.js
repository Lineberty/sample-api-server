'use strict'

const axios = require('axios')
const log = require('debug')('lineberty:app:serverSdkTest:core:apiLineberty')
const jwt = require('jsonwebtoken')

const config = require('../../config')
const secretFile = require('../../file/secret.json')

const privateKey = secretFile.private_key

module.exports = class ApiLinebertyHandler {
    /**
     * Get an api KEY to use Lineberty
     */
    static async getApiKey () {
        log('Get an api key')

        const url = '/api_key'

        return ApiLinebertyHandler.runRequest(url)
    }

    /**
     * Create a Lineberty user
     */
    static async createUser () {
        log('Create a Lineberty User')

        const url = '/users'

        return ApiLinebertyHandler.runRequest(url, 'POST')
    }

    /**
     * Log in a specific user on Lineberty
     * @param {string} userId
     */
    static async loginUser (userId) {
        log('Log a user with userId = "%s"', userId)

        const url = '/users/' + userId + '/login'

        return ApiLinebertyHandler.runRequest(url)
    }

    /**
     * Refresh the token of a sessionId
     * @param {string} userId
     * @param {string} sessionId
     */
    static async refreshToken (userId, sessionId) {
        log('RefreshToken with userId "%s" and sessionId = %s', userId, sessionId)

        const url = '/users/' + userId + '/session/' + sessionId + '/refreshToken'

        return ApiLinebertyHandler.runRequest(url)
    }

    /**
     * @private
     * @return {object} The token
     */
    static generateToken () {
        const now = parseInt(Date.now() / 1000, 10) //in seconds

        const payload = {
            'iat': now,
            'exp': now + 3600,
            'aud': 'api.lineberty.net',
            'iss': secretFile.client_email,
            'sub': 'MyCompany', //company name
            'email': secretFile.client_email
        }

        return jwt.sign(payload, privateKey, {algorithm: config.jwt.algorithm})
    }

    /**
     * @private
     */
    static async runRequest (url, method = 'GET', data) {
        log('Run request : %o', {url})

        const token = ApiLinebertyHandler.generateToken()

        // create request to endpoint
        // add token to authorization bearer
        // => result should be a success
        const axiosConfig = {
            baseURL: config.linebertyUrl + config.linebertyVersion,
            timeout: 1000,
            headers: {'Authorization': 'Bearer ' + token}
        }

        try {
            let res
            switch (method) {
                case 'GET':
                    res = await axios.get(url, axiosConfig)
                    break
                case 'POST':
                    res = await axios.post(url, data, axiosConfig)
                    break
                default:
                    throw new Error('Bad request method')
            }
            return res.data
        } catch (err) {
            log(err)
            throw err
        }
    }
}
