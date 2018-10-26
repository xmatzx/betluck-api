'use strict';

const express = require('express'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan'),
    helmet = require('helmet'),
    expressValidator = require('express-validator'),
    cors = require('./middlewares/cors'),
    config = require('./config/main'),
    app = express();

const API_PORT = config.port;

mongoose.connect(config.database);
let db = mongoose.connection;

// loading middlewares
app.use(cors);

// log requests to console
app.use(morgan('dev'));

app.use(cookieParser());

// use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(expressValidator());

app.use(compression());

app.use(helmet());

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport); // pass passport for configuration
require('./app/routes/index')(app, passport);

app.listen(API_PORT, function () {
    console.log('App listening on port:', API_PORT);
});