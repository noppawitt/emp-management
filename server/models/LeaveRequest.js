const db = require('../db');
const moment = require('moment');

const LeaveRequest = {};

LeaveRequest.create = (leaveRequest, id) => (
  db.one(
    'INSERT INTO leave_requests (user_id, leave_from, leave_to, leave_date, leave_type, purpose, code, totalhours, start_time, end_time, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING 1',
    [
      leaveRequest.userId,
      leaveRequest.leaveFrom,
      leaveRequest.leaveTo,
      leaveRequest.leaveDate,
      leaveRequest.leaveType,
      leaveRequest.purpose,
      leaveRequest.code,
      leaveRequest.totalhours,
      leaveRequest.startTime,
      leaveRequest.endTime,
      id,
      id
    ]
  )
);

LeaveRequest.update = (leaveRequest, id) => (
  db.none(
    'UPDATE leave_requests SET status = $1, updated_user = $2, updated_date = $3 WHERE id = $4',
    [
      leaveRequest.status,
      id,
      moment().format('YYYY-MM-DD HH:mm:ss'),
      leaveRequest.id
    ]
  )
);

LeaveRequest.findByUserId = userId => (
  db.manyOrNone('SELECT * FROM leave_requests WHERE user_id = $1 AND status != $2', [userId, 'Cancel'])
);

module.exports = LeaveRequest;
