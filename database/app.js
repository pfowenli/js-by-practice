const MongoDatabaseClient = require('./mongo-database-client')

async function main () {
    const databaseClient = new MongoDatabaseClient()
        .setHost('localhost')
        .setPort(27017)
        .setUsername('mongoadmin')
        .setPassword('secret')
        .setAuthDatabaseName('admin')
        .setDatabaseName('test')

    await databaseClient.connect()

    // await databaseClient.createCollection('test')
    const collection = await databaseClient.getCollection('test')

    const data = {
        name: 'node X mongo',
        code: '2021',
        timestamp: new Date()
    }

    const { insertedId } = await collection.insertOne(data)
    console.log(`_id of inserted document: ${insertedId}`)

    const document = await collection.findOne({ _id: insertedId })
    console.log(`document: ${JSON.stringify(document)}`)

    const count = await collection.countDocuments()
    console.log(`count of documents in collection ${collection.namespace}: ${count}`)

    await databaseClient.close()
}

main()