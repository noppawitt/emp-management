const HasAsset = require('../models/HasAsset');

exports.create = (req, res, next) => {
  const newHasAsset = req.body.hasAsset;
  HasAsset.create(newHasAsset, req.user.id)
    .then((createdHasAsset) => {
      res.json(createdHasAsset);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editHasAsset = req.body.hasAsset;
  HasAsset.update(editHasAsset, req.user.id)
    .then((updatedHasAsset) => {
      res.json(updatedHasAsset);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  HasAsset.findByUserId(req.user.id)
    .then((hasAssets) => {
      res.json(hasAssets);
    })
    .catch(next);
};
