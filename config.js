'use strict'

exports.linebertyUrl = process.env['LINEBERTY_SERVICE'] || 'https://api-booking.lineberty.net'
exports.linebertyVersion = process.env['LINEBERTY_VERSION'] || '/v1'

exports.jwt = {
    algorithm: 'RS256'
}
