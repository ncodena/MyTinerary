const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Declaring routes variables

const cities = require('./routes/api/cities')
const itineraries = require('./routes/api/itineraries')


// Bodyparser Middleware

const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// DB Config
const db = require ('./config/keys').mongoURI;

//Connect to Mongo

mongoose.connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "mernproject"
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    // Use Routes

    app.use('/api/cities', cities);
    app.use('/api/itineraries', itineraries);

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));