const { updateImage, getAllImages, addNewImage, getImagesByPatientId } = require('./imageController'); // Replace with the actual path to your controller file
const Image = require('../Model/image');
const { Sequelize, DataTypes } = require('sequelize');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

// Mock the Sequelize methods
// Mock the Sequelize methods
jest.mock('../Model/image', () => {
    const { Sequelize, DataTypes } = require('sequelize');
    const mockSequelize = new Sequelize('sqlite::memory:', { logging: false });
    const mockModel = mockSequelize.define('Image', {
        // Define your model attributes here
        image_data: {
            type: DataTypes.BLOB,
        },
    });

    return {
        define: jest.fn(() => mockModel),
        sync: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
    };
});

describe('Image Controller Tests', () => {
    afterEach(() => {
        // Clear mock data after each test
        jest.clearAllMocks();
    });

    test('updateImage - success', async () => {
        // Mock the Sequelize update and findByPk functions to simulate updating an image
        const updatedImage = { id: 1, patient_id: 1, image_data: Buffer.from('updated_image_data', 'binary') };
        Image.update.mockResolvedValue([1]); // Assuming one row was affected
        Image.findByPk.mockResolvedValue(updatedImage);

        const req = {
            body: { image_id: 1 }, // Provide a valid image_id for testing
            file: { buffer: Buffer.from('new_image_data', 'binary') }, // Provide test image data
        };

        // Mock the necessary methods for the res object
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

        await updateImage(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Image updated successfully', updatedImage });
        expect(res.send).not.toHaveBeenCalled(); // Ensure res.send is not called in case of success
    });




    test('updateImage - not found', async () => {
        // Mock the Sequelize update function to simulate zero rows affected (not found)
        Image.update.mockResolvedValue([0]);

        // Mock the Sequelize findByPk function to simulate not finding the image
        Image.findByPk.mockResolvedValue(null);

        const req = {
            body: { image_id: 1 }, // Provide a valid image_id for testing
            file: { buffer: Buffer.from('your_image_data', 'binary') }, // Provide test image data
        };

        // Mock the necessary methods for the res object
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await updateImage(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: 'Image not found for the specified image_id' }));
    });



    test('getAllImages - success', async () => {
        // Mock the Sequelize findAll function
        Image.findAll.mockResolvedValue([{ /* Your sample image object here */ }]);

        const req = {};
        const res = { json: jest.fn() };

        await getAllImages(req, res);

        // Assertions
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });


    // Example for addNewImage
    test('addNewImage - success', async () => {
        // Mock the Sequelize create function to simulate creating a new image
        const createdImage = { id: 1, patient_id: 1, image_data: Buffer.from('your_image_data', 'binary') };
        Image.create.mockResolvedValue(createdImage);

        const req = {
            body: { patient_id: 1 }, // Provide a valid patient_id for testing
            file: { buffer: Buffer.from('your_image_data', 'binary') }, // Provide test image data
        };

        // Mock the necessary methods for the res object
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };

        await addNewImage(req, res);

        // Assertions
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(createdImage);
        expect(res.send).not.toHaveBeenCalled(); // Ensure res.send is not called in case of success
    });


    // Example for getImagesByPatientId
    test('getImagesByPatientId - success', async () => {
        // Mock the Sequelize findAll function
        Image.findAll.mockResolvedValue([{ /* Your sample image object here */ }]);

        const req = { params: { patient_id: 1 } }; // Provide a valid patient_id for testing
        const res = { json: jest.fn() };

        await getImagesByPatientId(req, res);

        // Assertions
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
    });

});
