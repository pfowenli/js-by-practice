const jwt = require('jsonwebtoken')

class JsonWebTokenGenerator {
    constructor(privateKey = '', publicKey = '', options = {}) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.options = options
    }

    signToken(payload = {}, options = {}) {
        const signOptions = Object.assign({}, options, this.options)
        return jwt.sign(payload, this.privateKey, signOptions)
    }

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
