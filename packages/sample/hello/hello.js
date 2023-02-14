const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = process.env['MONGODB'];
    let client = new MongoClient(uri);

    try {
        await client.connect();
        const data = await client.db("admin").collection("prices").find().limit(5);
        return { data };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the data to the database." },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}

module.exports.main = main;
