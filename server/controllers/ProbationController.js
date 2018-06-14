const Probation = require('../models/Probation');

exports.findById = (req, res, next) => {
    Probation.findById(id)
        .then((users) => {
            res.json(users);
        })
        .catch(next);
};