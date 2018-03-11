var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/main');

router.post('/signup', function (req, res) {
    if (!req.body.email || !req.body.password || !req.body.username) {
        res.json({success: false, message: 'Please enter an username, email and password.'});
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });

        // attempt to save
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, message: 'Invalid data.'});
            }

            res.json({success: true, message: 'Successfully created.'});
        });
    }
});

router.post('/login', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            throw err;
        }

        if (!user) {
            res.send({success: false, message: 'Login failed. User not found.'});
        } else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // create token
                    var token = jwt.sign(user.toObject(), config.secret, {
                        expiresIn: 10080 //in seconds
                    });
                    res.json({success: true, token: 'bearer ' + token});
                } else {
                    res.send({success: false, message: ' Login failed.'});
                }
            });
        }
    });
});

module.exports = router;