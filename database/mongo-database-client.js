const { MongoClient, Collection } = require('mongodb')

/**
 * @class DatabaseClient
 */
class DatabaseClient {
    constructor() {
        this._connection
        this._instance
        this.host = ''
        this.port = 27017
        this.username = ''
        this.password = ''
        this.authDatabaseName = ''
        this.databaseName = ''
    }

    /**
     * Set host
     * @param {string} host Host
     * @returns {this}
     */
    setHost(host = '') {
        this.host = host
        return this
    }

    /**
     * Set port
     * @param {number} port Port
     * @returns {this}
     */
    setPort(port = '') {
        this.port = port
        return this
    }

    /**
     * Set username
     * @param {string} username Username
     * @returns {this}
     */
    setUsername(username = '') {
        this.username = username
        return this
    }

    /**
     * Set password
     * @param {string} password Password 
     * @returns {this}
     */
    setPassword(password = '') {
        this.password = password
        return this
    }

    /**
     * Set authDatabaseName
     * @param {string} authDatabaseName Auth database name
     * @returns {this}
     */
    setAuthDatabaseName(authDatabaseName = '') {
        this.authDatabaseName = authDatabaseName
        return this
    }

    /**
     * Set databaseName
     * @param {string} databaseName Database name     
     * @returns {this}
     */
    setDatabaseName(databaseName = '') {
        this.databaseName = databaseName
        return this
    }

    /**
     * Connect
     * @async
     * @returns {Promise<void>}
     */
    async connect() {
        const url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}?authSource=${this.authDatabaseName}`
        console.log(`connect to database`)

        try {
            this._connection = await new MongoClient(url).connect()
            this._instance = this._connection.db(this.databaseName)
        } catch (error) {
            console.log(error.stack)
        }

        console.log('database created')
    }

    /**
     * Close connection
     * @async
     * @returns {Promise<void>}
     */
    async close() {
        await this._connection.close()
        console.log('database closed')
    }

    /**
     * Get collection
     * @async
     * @param {string} collectionName Collection name
     * @returns {Promise<Collection>}
     */
    async createCollection(collectionName = '') {
        return this._instance.createCollection(collectionName)
    }

    /**
     * Get collection
     * @async
     * @param {string} collectionName Collection name
     * @returns {Promise<Collection>}
     */
    async getCollection(collectionName = '') {
        return this._instance.collection(collectionName)
    }
} 


module.exports = DatabaseClient
