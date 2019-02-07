'use strict'
/* global describe, it */

const should = require('should')
//const sinon = require('sinon')
//const testSdk = require('test-sdk')

const apiLinebertyHandler = require('../lib/core/apiLinebertyHandler')

const log = require('debug')('lineberty:app:serverSdkTest:test:apiLineberty')

//const localUrl = 'http://localhost:3059'
//const testUrl = localUrl + '/api/v1/lineberty/'

describe('Api Lineberty:', function () {

    describe('Service Core:', function () {

        describe('getApiKey:', function() {

            it('Should get company from bdd', async () => {
                try {
                    log('start getting API')
                    const resApi = await apiLinebertyHandler.getApiKey()
                    log( 'res API_KEY : %o', resApi )
                    should.exist( resApi )
                } catch (err) {
                    log( 'Error API_KEY : %o', err )
                    should.not.exist( err )
                }
            })
        })
    })

})
