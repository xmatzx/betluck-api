'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var morgan = require('morgan');
var configDB = require('./config/database.js');

var app = express();

const API_PORT = process.env.PORT || 3000;


mongoose.connect(configDB.url);
var db = mongoose.connection;

app.use(morgan('dev'));

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

require('./app/routes/index')(app, passport);

app.listen(API_PORT, function () {
    console.log('App listening on port:', API_PORT);
});