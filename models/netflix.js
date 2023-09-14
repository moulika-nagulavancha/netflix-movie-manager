const mongoose = require('mongoose');

// Create a Schema.
const NetflixSchema = new mongoose.Schema({}, { strict: false });

// Get the 'netflix' collection to be the default schema and later perform the operations.
const Netflix = mongoose.model("Netflix", NetflixSchema, "netflix");

module.exports = Netflix;