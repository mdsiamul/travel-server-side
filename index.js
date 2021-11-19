const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const { response } = require('express');
const port = process.env.PORT || 5000

app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uv1vp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const packdatabase = client.db('fagun_tour');
        const packgeCollection = packdatabase.collection('packges');

        app.get('/packges', async (req, res) => {
            const cursor = packgeCollection.find({});
            const packges = await cursor.toArray();
            res.send(packges);
            
        })
    }
    finally {
        //await client.close();
    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World tour')
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})