const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const TokenWebTokenGenerator = require('./json-web-token-generator')

const setTimeoutPromise = (value = 3000) => new Promise((resolve) => { setTimeout(() => { resolve() }, value) })
const SECRET = crypto.randomBytes(64).toString('hex')

const main = async () => {
    const privateKey = SECRET
    const publicKey = SECRET
    const options = { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '1500s', notBefore: '2s' }
    const jwtGenerator = new TokenWebTokenGenerator(privateKey, publicKey, options)

    const payload = { foo: 'bar' }
    const signOptions = { audience: 'audience', issuer: 'issuer', jwtid: '1', subject: 'subject' }
    const verifyOptions = { audience: 'audience', issuer: 'issuer' }

    const token = jwtGenerator.signToken(payload, signOptions)
    console.log(jwt.decode(token, { complete: true }))

    await setTimeoutPromise()

    const jwtid = '2'
    const refreshedToken = jwtGenerator.refreshToken(token, verifyOptions, jwtid)
    console.log(jwt.decode(refreshedToken, { complete: true }))
}

main()
