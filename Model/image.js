const {Sequelize, DataTypes} = require('sequelize')
const sequelize = require('../Persistence/context')

const Image = sequelize.define('Image', {
    patient_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },

    image_data:{
        type: DataTypes.BLOB('long'),
    }
},
    {
        tableName: 'image',
        timestamps: false,
    });

module.exports = Image;