const db = require('../db');
const moment = require('moment');

const HasAsset = {};

HasAsset.create = (hasAsset, id) => (
  db.one(
    'INSERT INTO has_assets (user_id, asset_id, asset_date, created_user, updated_user) VALUES ($1, $2, $3, $4, $5) RETURNING 1',
    [
      hasAsset.userId,
      hasAsset.assetId,
      hasAsset.assetDate,
      id,
      id
    ]
  )
);

HasAsset.update = (hasAsset, id) => (
  db.one(
    'UPDATE has_assets SET asset_id = $1, asset_date = $2, updated_user = $3, updated_date = $4 WHERE id = $5',
    [
      hasAsset.assetId,
      hasAsset.assetDate,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      hasAsset.id
    ]
  )
);

HasAsset.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM has_assets WHERE user_id = $1', [userId])
);

module.exports = HasAsset;