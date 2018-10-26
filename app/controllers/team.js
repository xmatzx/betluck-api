const Team = require('../models/team'),
    validator = require('../validators/team'),
    teamController = {};

teamController.create = (req, res) => {
    validator.validate(req, 'create');

    const errors = req.validationErrors();
    if (errors) {
        return res.send(errors);
    }

    // normal processing here
    const {name} = req.body;
    Team.create({
            name
        },
        function (err, team) {
            if (err) {
                return res.status(500).json({
                    success: false, message: err.toString()
                });
            }

            res.json({success: true, message: 'Successfully created.'});
        }
    );
};

teamController.update = (req, res) => {
    validator.validate(req, 'update');
    const errors = req.validationErrors();
    if (errors) {
        return res.send(errors);
    }

    Team.findOneAndUpdate({_id: req.params.id}, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
        fields: {'_id': 1, 'name': 1, 'isActive': 1}
    }, function (err, team) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        }

        res.json({
            success: true,
            data: team
        });
    });
};

teamController.getAll = (req, res) => {
    Team.find({}, {}).then((teams) => {
        return res.status(200).json({
            success: true,
            data: teams
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.toString()
        });
    });
};

teamController.getOne = (req, res) => {
    Team.findById(req.params.id, '', function (err, team) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        }

        res.json({
            success: true,
            data: team
        });
    });
};

module.exports = teamController;