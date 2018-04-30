const db = require('../db');
const moment = require('moment');

const Asset = {};

Asset.create = (asset, id) => (
  db.one(
    'INSERT INTO assets (asset_type_id, name, description, own_flag, serial_number, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING 1',
    [
      asset.assetTypeId,
      asset.name,
      asset.description,
      asset.ownFlag,
      asset.serialNumber,
      id,
      id
    ]
  )
);

Asset.update = (asset, id) => (
  db.one(
    'UPDATE assets SET asset_type_id = $1, name = $2, description = $3, own_flag = $4, serial_number = $5, updated_user = $6, updated_date = $7 WHERE id = $8',
    [
      asset.assetTypeId,
      asset.name,
      asset.description,
      asset.ownFlag,
      asset.serialNumber,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      asset.id
    ]
  )
);

Asset.findAll = () => (
  db.manyOrNone('SELECT * FROM assets')
);

module.exports = Asset;
