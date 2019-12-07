const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const constants = require('./constants/common');



if (constants.NODE_ENV !== 'production') {
    //require('dotenv').load();
    require('dotenv').config();
}

// Connect DB
const mongooseConnectionStr =`mongodb+srv://${constants.DB_USERNAME}:${constants.DB_PASSWORD}@${constants.DB_HOST}/${constants.DB_NAME}?retryWrites=true&w=majority`;
//const mongooseConnectionStr = `mongodb://${constants.DB_USERNAME}:${constants.DB_PASSWORD}@${constants.DB_HOST}:${constants.DB_PORT}/${constants.DB_NAME}`
mongoose.connect(mongooseConnectionStr, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true  });

// Some untilities
app.use(morgan('dev'));
app.use(express.static(path.resolve('./public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(fileUpload());

// Add headers to avoid CORS problem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 
               'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({}); 
    }
    next();
});

// Routes
const testRoutes = require('./api/routes/events');
const authenticationRoutes = require('./api/routes/authentication');
const registerRoute = require('./api/routes/register');
const itemRoute = require('./api/routes/item');
const eventRoute = require('./api/routes/events')

// const infoRoutes = require('./api/routes/info');

// All routes here
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/register', registerRoute);
app.use('/api/v1/authentication', authenticationRoutes);
app.use('/api/v1/item', itemRoute);
app.use('/api/v1/events', eventRoute);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
