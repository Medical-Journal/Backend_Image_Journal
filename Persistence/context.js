
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('journal_image', 'root', 'reine1234', {
    //host: '127.0.0.1',
    host: 'vm.cloud.cbh.kth.se',
    port: 2770,
    dialect: 'mysql',
    charset: 'utf8mb4',

});

sequelize.authenticate().then(()=>{
    console.log('Connection established!')
}).catch(err => {
    console.error('Unable to connect to database: ', err);
})

module.exports = sequelize