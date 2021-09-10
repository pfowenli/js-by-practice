const { MongoClient, Collection, Db } = require('mongodb')

/**
 * @class DatabaseClient
 */
class DatabaseClient {
    constructor() {
        /**
         * Connection
         * @type {MongoClient}
         * @private
         */
        this._connection
        /**
         * Database instance
         * @type {Db}
         * @private
         */
        this._instance
        /**
         * Host
         * @type {string}
         * @public
         */
        this.host = ''
        /**
         * Port
         * @type {number}
         * @public
         */
        this.port = 27017
        /**
         * Username
         * @type {string}
         * @public
         * */
        this.username = ''
        /**
         * Password
         * @type {string}
         * @public
         */
        this.password = ''
        /**
         * Auth database name
         * @type {string}
         * @public
         */
        this.authDatabaseName = ''
        /**
         * Database name
         * @type {string}
         * @public
         */
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
     * @param {string} name Collection name
     * @returns {Promise<Collection>}
     */
    async createCollection(name = '') {
        return this._instance.createCollection(name)
    }

    /**
     * Exists collection
     * @async
     * @param {string} name Collection name
     * @returns {Promise<boolean>}
     */
    async existsCollection(name = '') {
        const collections = await this._instance.collections({
            nameOnly: true,
        })        
        return collections.some(collection => collection.namespace === name)
    }

    /**
     * Get collection
     * @param {string} collectionName Collection name
     * @returns {Collection}
     */
    getCollection(name = '') {
        return this._instance.collection(name)
    }
} 


module.exports = DatabaseClient
