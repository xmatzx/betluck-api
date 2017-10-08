'use strict';

var express = require('express'),
    mongo = require('mongodb'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    morgan = require('morgan'),
    configDB = require('./config/database.js'),
    app = express();

const API_PORT = process.env.PORT || 3000;


mongoose.connect(configDB.url);
var db = mongoose.connection;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./config/passport')(passport); // pass passport for configuration
require('./app/routes/index')(app, passport);

app.listen(API_PORT, function () {
    console.log('App listening on port:', API_PORT);
});