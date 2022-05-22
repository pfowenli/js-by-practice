const jwt = require('jsonwebtoken')

class JsonWebTokenGenerator {
    /**
     * @constructor
     * @param {string} privateKey Private key
     * @param {string} publicKey Public key
     * @param {object} options Default options
     */
    constructor(privateKey = '', publicKey = '', options = {}) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.options = options
    }

    /**
     * Sign token
     * @param {object} payload Payload
     * @param {object} options
     * @returns {string}
     */
    signToken(payload = {}, options = {}) {
        const signOptions = Object.assign({}, options, this.options)
        return jwt.sign(payload, this.privateKey, signOptions)
    }

    /**
     * Refresh token
     * @param {string} token Token
     * @param {object} verifyOptions Verification options
     * @param {string} jwtid JWT id
     * @returns {string}
     */
    refreshToken(token = '', verifyOptions = {}, jwtid = '') {
        const payload = jwt.verify(token, this.publicKey, verifyOptions)
        delete payload.iat
        delete payload.exp
        delete payload.nbf
        delete payload.jti

        const signOptions = Object.assign({}, this.options, { jwtid })
        return jwt.sign(payload, this.privateKey, signOptions)
    }
}

module.exports = JsonWebTokenGenerator
