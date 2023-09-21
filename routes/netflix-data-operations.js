// Configure express server
const express = require('express');
const router = express.Router();

// Configure the Model Schema
const NetflixSchema = require('../models/netflix');

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
router.patch('/:title', async (request, response) => {
    try {
        const title = request.params.title;
        const updatedNetflixRecord = request.body;

        const netflixRecord = await NetflixSchema.findOneAndUpdate(
            {title: title}, 
            updatedNetflixRecord, 
            {new: true, upsert: true});

        response.status(200).send(netflixRecord);
    } catch (error) {
        response.status(400).json({message: error.message});
    }
});

// Delete movie and show using title
router.delete('/:title', async (request, response) => {
    let title = request.params.title;
    try {
        let removedNetflixRecord = await NetflixSchema.findOneAndRemove({title: title});
        if (removedNetflixRecord == null) {
            response.status(200).send({message: 'No record present to delete'});
        } else {
            response.status(200).send(removedNetflixRecord);
        }
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