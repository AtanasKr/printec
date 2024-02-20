const axios = require('axios');
const { getAllData, getZipData } = require('./controllers/zipcodesController.js');
const Locations = require('./model/Locations');

jest.mock('./model/Locations', () => ({
    find: jest.fn(),
    insertMany: jest.fn()
}));

jest.mock('axios', () => ({
    get: jest.fn(),
}));

describe('getAllData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all data', async () => {
        const mockData = [{ place: 'Location 1' }, { place: 'Location 2' }];
        Locations.find.mockResolvedValue(mockData);

        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await getAllData(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should handle case when no data found', async () => {
        Locations.find.mockResolvedValue(null);

        const req = {};
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await getAllData(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ message: 'No data found!' });
    });
});

describe('getZipData', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return location data', async () => {
        const mockResponse = {
            data: {
                places: [
                    {
                        'place name': 'Beverly Hills',
                        longitude: '-118.4065',
                        state: 'California',
                        'state abbreviation': 'CA',
                        latitude: '34.0901'
                    }
                ]
            }
        };
        const mockLocationsToInsert = [{ placeName: 'Beverly Hills', longitude: '-118.4065', state: 'California', stateAbbreviation: 'CA', latitude: '34.0901', postalCode: '90210' }];

        axios.get.mockResolvedValue(mockResponse);
        Locations.insertMany.mockResolvedValue(mockLocationsToInsert);

        const req = { params: { country: 'US', code: '90210' } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await getZipData(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Data inserted successfully!', locations: mockLocationsToInsert });
    });

    it('should handle errors gracefully', async () => {
        axios.get.mockRejectedValue(new Error('API Error'));

        const req = { params: { country: 'US', code: '90210' } };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await getZipData(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error.' });
    });

    it('should handle missing country or postal code', async () => {
        const req = { params: {} };
        const res = {
            status: jest.fn(() => res),
            json: jest.fn()
        };

        await getZipData(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Country code and postal code are required!' });
    });
});
