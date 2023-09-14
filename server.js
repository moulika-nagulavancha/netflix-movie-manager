// configure the environment variables
require("dotenv").config(); 

// Configure the Express server and listen to port 3000
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Express server started listening on port : 3000'));

// Configure the Mongoose to connect to the MongoDB
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGODB_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'database'
    }
);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('MongoDB connected successfully.'));

// Configure the server to accept JSON
app.use(express.json());

// Setup the routes for REST APIs tp perform CRUD operations
const performNetflixCRUDOperationsRouter = require('./routes/netflix-data-operations');
app.use('/netflix', performNetflixCRUDOperationsRouter);