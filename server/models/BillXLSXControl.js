const db = require('../db');

const xlsx = {};

xlsx.findAll = userId => (
  db.oneOrNone('SELECT * FROM billrecord WHERE id=$1', [userId])
);
xlsx.findBillData = recId => (
  db.manyOrNone('SELECT * FROM billdata WHERE bill_record_id=$1', [recId])
);
xlsx.findUser = userId => (
  db.oneOrNone('SELECT i.*,p.* FROM employee_info as i, employee_work as w, positions as p WHERE p.id=w.position_id AND w.user_id=i.user_id AND i.user_id=$1 ', [userId])
);

module.exports = xlsx;
