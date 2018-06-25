const ViewResult = require('../models/ViewResult');

exports.findByUserId = (req, res, next) => {
  ViewResult.findByUserId(req.user.id)
    .then((results) => {
      res.json(results);
    })
    .catch(next);
};
