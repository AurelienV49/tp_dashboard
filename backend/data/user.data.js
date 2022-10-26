var ObjectId = require('mongodb').ObjectId;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://panplune49:KmMYYK85.@cluster0.jchsuyy.mongodb.net/?retryWrites=true&w=majority";

const dbName = 'tp_dashboard';
const dbCollection = 'users';

exports.getUsers = async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(dbCollection);

        const docs = await coll.find({}).toArray();
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await client.close();
    }
}

exports.getUser = async(req, res) => {
    const client = new MongoClient(uri);
    //const id = parseInt(req.params.id);
    const id = req.params.id;
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(dbCollection);

        let o_id = new ObjectId(id)

        const docs = await coll.findOne({ "_id": o_id });
        res.status(200).json(docs);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await client.close();
    }
};

exports.postUser = async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(dbCollection);

        const parkingData = req.body;
        const parking = await coll.insertOne(userData);
        res.status(200).json(parking);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await client.close();
    }

};

exports.updateUser = async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(dbCollection);

        const id = parseInt(req.params.id);
        const replacementUser = req.body;
        const user = await coll.replaceOne({ id }, replacementUser);
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        await client.close();
    }
};

exports.deleteUser = async(req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db(dbName);
        const coll = db.collection(dbCollection);

        const id = parseInt(req.params.id);
        const user = await coll.deleteOne({ id });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        await client.close();
    }
};