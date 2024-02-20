const axios = require('axios');
const Locations = require('../model/Locations');

const getAllData = async (req, res) => {
    const data = await Locations.find();
    if (!data) return res.status(204).json({ 'message': 'No data found!' });
    res.status(201).json(data);
}

const getZipData = async (req, res) => {
    const countryCode = req.params.country;
    const postalCode = req.params.code;

    // Validate request parameters
    if (!countryCode || !postalCode) {
        return res.status(400).json({ message: 'Country code and postal code are required!' });
    }
    const apiUrl = 'http://api.zippopotam.us';

    try {
        const apiUrl = `http://api.zippopotam.us/${countryCode}/${postalCode}`;
        const response = await axios.get(apiUrl);
        const locationsData = response.data.places;

        //prepare data for database
        const locationsToInsert = locationsData.map(element => ({
            placeName: element['place name'],
            longitude: element.longitude,
            state: element.state,
            stateAbbreviation: element['state abbreviation'],
            latitude: element.latitude,
            postalCode: postalCode
        }));

        const insertedLocations = await Locations.insertMany(locationsToInsert);

        res.status(201).json({ message: 'Data inserted successfully!', locations: insertedLocations });
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = { getAllData, getZipData };