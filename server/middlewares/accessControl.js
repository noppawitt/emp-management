const AccessControl = require('../models/AccessControl');

module.exports = activities => (req, res, next) => {
  AccessControl.findById(req.user.type)
    .then((accessControl) => {
      if (activities.some(activity => accessControl[activity])) {
        req.accessControl = accessControl;
        next();
      }
      else {
        res.status(401).json({
          message: `You don't have permission to do this.`
        });
      }
    })
    .catch(next);
};
