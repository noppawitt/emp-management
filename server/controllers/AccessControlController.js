const AccessControl = require('../models/AccessControl');
<<<<<<< HEAD
=======
const User = require('../models/User');
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6

exports.create = (req, res, next) => {
  const newAccessControl = req.body.accessControl;
  AccessControl.create(newAccessControl, req.user.id)
    .then((createdAccessControl) => {
      res.json(createdAccessControl);
    })
    .catch(next);
};

<<<<<<< HEAD
exports.findAll = (req, res, next) => {
  AccessControl.findAll()
    .then((accessControls) => {
      res.json(accessControls);
    })
    .catch(next);
=======
exports.find = (req, res, next) => {
  if (req.query.all === 'true') {
    AccessControl.findAll()
      .then((accessControls) => {
        res.json(accessControls);
      })
      .catch(next);
  }
  else {
    User.findById(req.user.id)
      .then((user) => {
        AccessControl.findById(user.type)
          .then((accessControl) => {
            res.json(accessControl);
          })
          .catch(next);
      })
      .catch(next);
  }
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6
};
