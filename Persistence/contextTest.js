const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', // Use an in-memory database for testing
    logging: false,
});

const Image = sequelize.define('Image', {
    // Define your model attributes here
    image_data: {
        type: DataTypes.BLOB,
    },
});

module.exports = { sequelize, Image };