const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://panplune49:KmMYYK85.@cluster0.jchsuyy.mongodb.net/?retryWrites=true&w=majority";


const client = new MongoClient(uri);
async function run() {
    try {
        await client.connect();
        const db = client.db("tp_dashboard");
        const coll = db.collection("users");

        const cursor = coll.find();
        await cursor.forEach(console.log);

    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run(); //.catch(console.dir);