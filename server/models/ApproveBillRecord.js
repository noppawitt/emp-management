const db = require('../db');
const moment = require('moment');

const approvebillrecord = {};

approvebillrecord.findUserBill = userId => (
  db.manyOrNone('SELECT b.id, b.bill_record_id, b.approvement_1, b.approvement_2, b.created_date, b.updated_date, c.user_id, d.first_name_th,d.last_name_th, e.type_id, f.name, c.boss_id ' +
    'FROM billapprovement as b, employee_work as c,employee_info as d,billrecord as e, typebill as f WHERE e.type_id=f.id AND e.id=b.bill_record_id AND d.user_id=c.user_id AND b.created_user=c.user_id AND c.boss_id= $1', [userId])
);

approvebillrecord.findAll = userId => (
  db.manyOrNone('SELECT b.id, b.bill_record_id, b.approvement_1, b.approvement_2,d.user_id, b.created_date, b.updated_date, d.first_name_th,d.last_name_th, e.type_id, f.name, c.boss_id ' +
  'FROM billapprovement as b,employee_work as c, employee_info as d,billrecord as e, typebill as f WHERE e.type_id=f.id AND e.id=b.bill_record_id AND b.created_user=d.user_id AND c.user_id=d.user_id')
);

approvebillrecord.findDetail = data => (
  db.tx((t) => {
    const queries = data.map(l => t.manyOrNone('SELECT * FROM billdata WHERE bill_record_id=$1', [l.billRecordId]));
    return t.batch(queries);
  })
);

approvebillrecord.updateApproveData = (statusValue, approveRecId, userid) => (
  db.manyOrNone('SELECT * FROM approvedata WHERE approve_status=0 AND approve_record_id=$1 AND approver=$2 ORDER BY id ASC', [approveRecId, userid])
    .then(approveData => (
      db.one('UPDATE approvedata SET approve_status=$1,updated_date=$2 ,updated_user=$3 WHERE approve_record_id=$4 AND approver=$5 AND id=$6 RETURNING approve_record_id,created_user', [statusValue, moment().format('YYYY-MM-DD HH:mm:ss'), userid, approveRecId, userid, approveData[0].id])
    ))
);

approvebillrecord.updateBillApprovementBoss = (statusValue, approveRecId, userid) => (
  db.one('UPDATE billapprovement SET approvement_1=$1, updated_date=$2, updated_user=$3 WHERE id=$4 RETURNING id', [statusValue, moment().format('YYYY-MM-DD HH:mm:ss'), userid, approveRecId])
);

approvebillrecord.updateBillApprovementMD = (statusValue, approveRecId, userid) => (
  db.one('UPDATE billapprovement SET approvement_2=$1, updated_date=$2, updated_user=$3 WHERE id=$4 RETURNING id', [statusValue, moment().format('YYYY-MM-DD HH:mm:ss'), userid, approveRecId])
);

approvebillrecord.findApproveDataRecord = (recId, creator) => (
  db.manyOrNone('SELECT * FROM approvedata WHERE approve_record_id=$1 AND created_user=$2', [recId, creator])
);

approvebillrecord.updateBillRecordByStatus = (statusValue, appRecId, userid, comment) => (
  db.manyOrNone(
    'UPDATE billrecord SET statusapproveid = $1,updated_date=$2, updated_user=$3, ' +
    'comment=CONCAT((SELECT comment FROM billrecord WHERE id=(SELECT bill_record_id FROM billapprovement WHERE id=$4)),$5) ' +
    'WHERE id=( SELECT bill_record_id FROM billapprovement WHERE id=$6) RETURNING id',
    [statusValue, moment().format('YYYY-MM-DD HH:mm:ss'), userid, appRecId, comment, appRecId]
  )
);

module.exports = approvebillrecord;
