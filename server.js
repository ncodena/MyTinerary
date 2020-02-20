const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');

//Declaring routes variables


// const itineraries = require('./routes/api/itineraries')
// const users = require('./routes/api/users')

// Bodyparser Middleware

const app = express();

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

// DB Config
const db = config.get('mongoURI');

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

    app.use('/api/cities', require('./routes/api/cities'));
    app.use('/api/itineraries', require('./routes/api/itineraries'));
    app.use('/api/users', require('./routes/api/users'));
    app.use('/api/auth', require('./routes/api/auth'));

    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server started on port ${port}`));