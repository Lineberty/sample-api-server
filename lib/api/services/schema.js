'use strict'

exports.logUser = {
    title: 'loginUser',
    type: 'object',
    additionalProperties: true,
    properties: {
        userId: {
            type: 'string'
        }
    },
    required: ['userId']
}

exports.refreshToken = {
    title: 'loginUser',
    type: 'object',
    additionalProperties: true,
    properties: {
        userId: {
            type: 'string'
        },
        sessionId: {
            type: 'string'
        }
    },
    required: ['userId', 'sessionId']
}
