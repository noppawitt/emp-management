const db = require('../db');

const LeaveHistory = {};

LeaveHistory.create = (leave, id) => (
  db.none(
    'INSERT INTO leave_history (user_id, year, created_user, updated_user, annual_leave_remain, sick_leave_remain, personal_leave_remain, ordination_leave_remain) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      leave.userId,
      leave.year,
      id,
      id,
      leave.annualLeaveRemain,
      leave.sickLeaveRemain,
      leave.personalLeaveRemain,
      leave.OrdinationLeave
    ]
  )
);

module.exports = LeaveHistory;
