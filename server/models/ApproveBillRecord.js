const db = require('../db');
const moment = require('moment');

const approvebillrecord = {};

approvebillrecord.findAll = user_id => (
  db.manyOrNone('SELECT b.id, b.bill_record_id, b.approvement_1, b.approvement_2, b.created_date, b.updated_date, c.child, d.first_name_th ,d.last_name_th, e.type_id, f.name ' +
    'FROM billapprovement as b, parentusersbill as c,employee_info as d,billrecord as e,typebill as f WHERE e.type_id=f.id AND e.id=b.bill_record_id AND d.user_id=c.child AND b.created_user=c.child AND c.parent_id=$1', [user_id])
);
approvebillrecord.findDetail = data => (
  db.tx((t) => {
    const queries = data.map(l => t.manyOrNone('SELECT * FROM billdata WHERE bill_record_id=$1', [l.billRecordId]));
    return t.batch(queries);
  })
);

approvebillrecord.updateApproveData = (status_value, approve_rec_id, userid) => (
  db.one('UPDATE approvedata SET approve_status=$1,updated_date=$2 ,updated_user=$3 WHERE approve_record_id=$4 AND approver=$5 RETURNING approve_record_id,created_user', [status_value, moment().format('YYYY-MM-DD HH:mm:ss'), userid, approve_rec_id, userid])
);

approvebillrecord.updateBillApprovement = (status_value, approve_rec_id, userid) => (
  db.one('UPDATE billapprovement SET approvement_1=$1 , approvement_2=$2, updated_date=$3, updated_user=$4 WHERE id=$5 RETURNING id', [status_value, 1, moment().format('YYYY-MM-DD HH:mm:ss'), userid, approve_rec_id])
);

approvebillrecord.findApproveDataRecord = (rec_id, creator) => (
  db.manyOrNone('SELECT * FROM approvedata WHERE approve_record_id=$1 AND created_user=$2', [rec_id, creator])
);

approvebillrecord.updateBillRecordByStatus = (status_value, app_rec_id, userid, comment) => (
  db.manyOrNone(
    'UPDATE billrecord SET statusapproveid = $1,updated_date=$2, updated_user=$3, ' +
    'comment=CONCAT((SELECT comment FROM billrecord WHERE id=(SELECT bill_record_id FROM billapprovement WHERE id=$4)),$5) ' +
    'WHERE id=( SELECT bill_record_id FROM billapprovement WHERE id=$6) RETURNING id',
    [status_value, moment().format('YYYY-MM-DD HH:mm:ss'), userid, app_rec_id, comment, app_rec_id])
);
// approvebillrecord.
// approvebillrecord.updateApproveData = (rec_id,data,user_id) => (
//     // db.oneOrNone('UPDATE ')
// );

module.exports = approvebillrecord;
