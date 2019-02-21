'use strict'

const tv4 = require('tv4')

exports.validateQuery = function (schema) {
    return function (req, res, next) {
        const error = checkError(req.query, schema)

        if (error) return res.status(400).json({error: 'INVALID_BODY', schemaError: error.schemaError})

        return next()
    }
}

function checkError (object, schema) {
    const validateResult = tv4.validateResult(object, schema)
    if (validateResult.valid) return

    const schemaError = {
        value: validateResult.error.dataPath,
        message: validateResult.error.message,
        code: validateResult.error.code,
        params: validateResult.error.params
    }

    return new ValidatorError('SCHEMA_ERROR', 'Invalid schema', schemaError, validateResult.error)
}

class ValidatorError extends Error {
    constructor (name, description, schemaError, ...params) {
        super(...params)

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ValidatorError)
        }

        this.name = name
        this.message = description
        this.schemaError = schemaError
    }
}
