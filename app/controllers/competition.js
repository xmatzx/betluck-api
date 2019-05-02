const Competition = require('../models/competition'),
    validator = require('../validators/competition'),
    competitionController = {};

competitionController.create = (req, res) => {
    validator.validate(req, 'create');

    const errors = req.validationErrors();
    if (errors) {
        return res.send(errors);
    }

    // normal processing here
    const {name, year} = req.body;
    Competition.create({
            name,
            year
        },
        function (err) {
            if (err) {
                return res.status(500).json({
                    success: false, message: err.toString()
                });
            }

            res.json({success: true, message: 'Successfully created.'});
        }
    );
};

competitionController.update = (req, res) => {
    validator.validate(req, 'update');
    const errors = req.validationErrors();
    if (errors) {
        return res.send(errors);
    }

    Competition.findOneAndUpdate({_id: req.params.id}, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
        fields: {'_id': 1, 'name': 1, 'year': 1}
    }, function (err, competition) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        }

        res.json({
            success: true,
            data: competition
        });
    });
};

competitionController.getAll = (req, res) => {
    Competition.find({}, {}).then((competitions) => {
        return res.status(200).json({
            success: true,
            data: competitions
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err.toString()
        });
    });
};

competitionController.getOne = (req, res) => {
    Competition.findById(req.params.id, '', function (err, competition) {
        if (err) {
            return res.status(500).json({
                message: err.toString()
            });
        }

        res.json({
            success: true,
            data: competition
        });
    });
};

module.exports = competitionController;