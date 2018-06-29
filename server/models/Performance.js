const db = require('../db/');

const Performance = {};

Performance.findById = (id) => (
  db.manyOrNone("SELECT * FROM Performance WHERE user_id=$1 ORDER BY performance_id DESC",[id])
)

Performance.insertPerformance = (performanceInfo) =>(
  db.one("INSERT INTO Performance (user_id,score,expected_score,sup_comment,em_sign_date,sup_sign_date,md_sign_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING 1",
  [
    performanceInfo.employeeID,
    performanceInfo.score,
    performanceInfo.expectedScore,
    performanceInfo.supervisorComment,
    null,
    null,
    null
  ])
)

Performance.updatePerformance = (performanceInfo) =>(
  db.none(
    "UPDATE Performance SET score=$1, expected_score=$2, sup_comment=$3, em_sign_date=$4, sup_sign_date=$5, md_sign_date=$6 WHERE user_id=$7",
    [
      performanceInfo.score,
      performanceInfo.expectedScore,
      performanceInfo.supervisorComment,
      null,
      null,
      null,
      performanceInfo.employeeID
    ])
)
module.exports = Performance;
