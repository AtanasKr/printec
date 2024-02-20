const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationsSchema = new Schema({
    placeName: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    stateAbbreviation: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Locations', locationsSchema);