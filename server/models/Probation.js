const db = require('../db/');

const Probation = {};

Probation.findById = (id) => (
    db.manyOrNone("SELECT CONCAT(i.first_name, ' ', i.last_name) as full_name, d.name as department, i.user_id, po.name as position, CONCAT(w.level_id, '. ', l.name) as level"
    + ", w.start_date, w.probation_date, bo.boss_name as supervisor" +
    " FROM public.employee_work w, public.employee_info i, public.departments d, public.positions po, public.levels l, " +
    "(SELECT i.user_id ,CONCAT(i.first_name, ' ', i.last_name) as boss_name FROM public.employee_info i, public.employee_work w WHERE i.user_id = w.boss_id) bo " +
    "WHERE i.user_id = $1 AND w.position_id = po.id AND w.department_id = d.id AND bo.user_id = w.boss_id AND w.level_id = l.id " +
    "ORDER BY i.user_id ASC", [id])
)

Probation.findProById = (id) => (
  db.oneOrNone("SELECT * FROM Probation WHERE user_id=$1",[id])
)

Probation.insertProbation = (probationInfo) =>(
  db.one("INSERT INTO Probation VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 , $15) RETURNING 1",
  [
    probationInfo.eid,
    probationInfo.pend,
    probationInfo.basedSalary,
    probationInfo.mobile,
    probationInfo.transporationAllowance,
    probationInfo.otherAllowance,
    probationInfo.passPro,
    probationInfo.option1,
    '',
    null,
    null,
    null,
    probationInfo.option2,
    probationInfo.score,
    probationInfo.score
  ])
)

Probation.updateProbation = (probationInfo) =>(
  db.none(
    "UPDATE Probation SET pass_pro_date=$1, based_salary=$2, mobile=$3, transporation_allowance=$4, other_allowance=$5, pass_pro=$6, confirmed_by_employment=$7, sup_comment=$8, em_sign_date=$9, sup_sign_date=$10, md_sign_date=$11, continued=$12, score=$13, expected_score=$14 WHERE user_id=$15",
    [
      probationInfo.pend,
      probationInfo.basedSalary,
      probationInfo.mobile,
      probationInfo.transporationAllowance,
      probationInfo.otherAllowance,
      probationInfo.passPro,
      probationInfo.option1,
      '',
      null,
      null,
      null,
      probationInfo.option2,
      probationInfo.score,
      probationInfo.score,
      probationInfo.eid
    ])
)
module.exports = Probation;
