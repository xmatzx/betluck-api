var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    router.post('/signup', passport.authenticate('local-signup', {}), function (req, res) {
        // if this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.json({id: req.user.id});
    });

    return router;
};