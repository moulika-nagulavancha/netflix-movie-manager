// Configure express server
const express = require('express');
const router = express.Router();

// Configure the Model Schema
const NetflixSchema = require('../models/netflix');
const ObjectId = require('mongoose').ObjectId;

// Inserting new movie and show
router.post('/', async (request, response) => {
    try {
        let netflixRecord = new NetflixSchema(request.body);
        netflixRecord = await netflixRecord.save();
        response.status(200).send(netflixRecord);
    } catch (error) {
        response.status(400).json({message: error.message});
    }
});

// Update movie and show using title
router.patch('/:title', (request, response) => {
    let title = request.params.title;
});

// Delete movie and show using title
router.delete('/:title', (request, response) => {
    let title = request.params.title;
    try {
        NetflixSchema.findOneAndRemove({title: title}).then((record, error) => {
            if (record != null) {
                response.status(200).send(record);
            } else {
                response.status(404).json({message: 'Record not found to delete!'});
            }
        });
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

// retrieve all movies and shows
router.get('/',async (request, response) => {
    try {
        const netflixRecords = await NetflixSchema.find({}, {_id:0});
        response.status(200).send(netflixRecords);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

// retrieve movie and show using title
router.get('/:title',async (request, response) => {
    try {
        let title = request.params.title;
        const netflixRecords = await NetflixSchema.find({title: title}, {_id:0});
        response.status(200).send(netflixRecords);
    } catch (error) {
        response.status(500).json({message: error.message});
    }
});

module.exports = router;