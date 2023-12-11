const port = process.env.PORT || 8083;
const cors = require('cors');
const express = require('express');
const app = express();
const sequelize = require('./Persistence/context')
const imageRoutes = require('./Routes/imageRoutes')
app.use(cors());


app.use('/journal', imageRoutes);

sequelize.sync()
    .then(() => {
        console.log("Database synchronized!")
        app.listen(port, () => {
            console.log(`Listening on port ${port}...`);
        });
    })
    .catch((error) => {
        console.error('Error syncing datatbase', error);
    })
