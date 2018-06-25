const db = require('../db');

const ViewResult = {};

ViewResult.findByUserId = userId => (
  db.oneOrNone('SELECT * FROM examResults WHERE user_id = $1', [userId])
);

module.exports = ViewResult;
