let User = require('../models/user');

const userController = {};

userController.getAll = (req, res) => {
    User.find({}, {password: 0, isDeleted: 0}).then((users) => {
        return res.status(200).json({
            success: true,
            data: users
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.toString()
        });
    });
};

userController.getOne = (req, res) => {
    User.findById(req.params.id, '-password -isDeleted', function (err, user) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        }

        res.json({
            success: true,
            data: user
        });
    });
};

module.exports = userController;