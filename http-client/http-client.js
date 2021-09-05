const axios = require('axios')

/**
 * @type {import('axios').default}
 */
const _instance = axios

/**
 * @namespace
 * @property {string} GET - HTTP get method
 * @property {string} POST - HTTP post method
 */
const _HttpMethod = {
    GET: 'GET',
    POST: 'POST',
}

/**
 * @class HttpResponse
 */
class HttpResponse {
    constructor () {
        /**
         * HTTP status code
         * @type {number}
         */
        this.status = 0
        /**
         * Status
         * @type {string}
         */
        this.text = ''
        /**
         * Json data
         * @type {object}
         */
        this.data = {}
    }
}

/**
 * @class HttpClient
 */
class HttpClient {
    constructor() {
        /**
         * Url
         * @type {string}
         */
        this.url = ''
        /**
         * HTTP method
         * @type {string}
         */
        this.method = ''
        /**
         * Query string
         * @type {string}
         */
        this.query = ''
        /**
         * Json data
         * @type {object}
         */
        this.data = {}
    }

    /**
     * Set url
     * @param {string} url 
     * @returns {this}
     */
    setUrl(url = '') {
        this.url = url
        return this
    }

    /**
     * Set method
     * @param {string} method 
     * @returns {this}
     */
    setMethod(method = '') {
        this.method = method
        return this
    }

    /**
     * Set queryMap
     * @param {Map} queryMap 
     * @returns {this}
     */
    setQuery(queryMap = new Map()) {
        const keyValPairs = []

        queryMap.forEach((val, key) => {
            keyValPairs.push(`${key}=${val}`)
        })

        this.query = keyValPairs.join('&')
        return this
    }

    /**
     * Set data
     * @param {object} data 
     * @returns {this}
     */
    setData(data = {}) {
        this.data = data
        return this
    }

    /**
     * Send request
     * @async
     * @returns {Promise<HttpResponse>}
     */
    async sendRequest() {
        let response

        switch (this.method) {
            case _HttpMethod.GET:
                response = await _instance.get(
                    this.url
                )
                break
            case _HttpMethod.POST:
                response = await _instance.post(
                    this.url,
                    this.data
                )
                break
            default:
                return
        }

        const httpResponse = new HttpResponse()
        httpResponse.status = response.status
        
        switch (typeof response.data) {
            case 'string':
                httpResponse.text = response.data
                break
            case 'object':
                httpResponse.data = response.data
                break
            default:
        }

        return httpResponse
    }
}

exports.HttpClient = HttpClient
exports.HttpMethod = _HttpMethod
