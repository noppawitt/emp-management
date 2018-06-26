const HasAsset = require('../models/HasAsset');
const Asset = require('../models/Asset');

const createHasAsset = (newAsset, creatorId) => new Promise(async (resolve, reject) => {
  try {
    const newHasAsset = {};
    const asset = await Asset.create(newAsset, creatorId);
    newHasAsset.userId = newAsset.userId;
    newHasAsset.assetId = asset.id;
    newHasAsset.assetDate = newAsset.assetDate;
    const hasAsset = await HasAsset.create(newHasAsset, creatorId);
    resolve(hasAsset);
  }
  catch (error) {
    reject(error);
  }
});

exports.create = (req, res, next) => {
  if (req.body.ownFlag) {
    const newAsset = req.body;
    createHasAsset(newAsset, req.user.id)
      .then(() => {
        HasAsset.findByUserId(req.user.id)
          .then((hasAssets) => {
            res.json(hasAssets);
          })
          .catch(next);
      })
      .catch(next);
  }
  else {
    const newHasAsset = req.body;
    HasAsset.create(newHasAsset, req.user.id)
      .then(() => {
        HasAsset.findByUserId(req.user.id)
          .then((hasAssets) => {
            res.json(hasAssets);
          });
      });
  }
};

exports.update = (req, res, next) => {
  const editHasAsset = req.body.hasAsset;
  HasAsset.update(editHasAsset, req.user.id)
    .then(() => {
      HasAsset.findByUserId(req.user.id)
        .then((hasAssets) => {
          res.json(hasAssets);
        });
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  HasAsset.findByUserId(req.query.id)
    .then((hasAssets) => {
      res.json(hasAssets);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  HasAsset.delete(req.body.id, req.user.id)
    .then(() => {
      HasAsset.findByUserId(req.user.id)
        .then((hasAssets) => {
          res.json(hasAssets);
        })
        .catch(next);
    })
    .catch(next);
};
