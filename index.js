const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yt0e1fj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('tourist');
        const service = serviceCollection.collection('services');
        const review = serviceCollection.collection('reviews');

        app.get('/home-services', async (req, res) => {
            const query = {};
            const cursor = service.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services)
        })

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = service.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const services = await service.findOne(query);
            res.send(services)
        })

        //reviews api

        app.post('/reviews', async (req, res) => {
            const reviewId = req.body;
            console.log(reviewId)
            const result = await review.insertOne(reviewId);
            res.send(result)
        })
    }

    finally {

    }
}
run().catch(err => console.error(err))




app.get('/', (req, res) => {
    res.send('tourist server running..');
})

app.listen(port, (req, res) => {
    console.log('tourist server is running on port:', port)
})