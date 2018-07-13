const PromoteHistory = require('../models/PromoteHistory');

exports.create = (req, res, next) => {
  const newPromoteHistory = req.body.promoteHistory;
  PromoteHistory.create(newPromoteHistory, req.user.id)
    .then((promoteHistory) => {
      res.json(promoteHistory);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  PromoteHistory.findByUserId(req.query.userId)
    .then((promoteHistories) => {
      res.json(promoteHistories);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  PromoteHistory.delete(req.body.id)
    .then(() => {
      PromoteHistory.findByUserId(req.body.id)
        .then((promoteHistories) => {
          res.json(promoteHistories);
        })
        .catch(next);
    })
    .catch(next);
};
