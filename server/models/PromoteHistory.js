const db = require('../db');

const PromoteHistory = {};

PromoteHistory.create = (promoteHistory, id) => (
  db.none(
    'INSERT INTO promote_history (user_id, level_id, position_id, department_id, promote_date, description, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      promoteHistory.userId,
      promoteHistory.levelId,
      promoteHistory.positionId,
      promoteHistory.departmentId,
      promoteHistory.promoteDate,
      promoteHistory.description,
      id,
      id
    ]
  )
);

PromoteHistory.delete = id => (
  db.none('DELETE FROM promote_history WHERE id = $1', [id])
);

PromoteHistory.findByUserId = userId => (
  db.oneOrNone(`SELECT promote_history.level_id, levels.name AS level_name, promote_history.positions_id, 
  positions.name AS position_name, promote_history.department_id, departments.name AS department_name, 
  promote_history.promote_date, promote_history.description, promote_history.id 
  FROM promote_history LEFT OUTER JOIN JOIN levels ON promote_history.level_id = levels.id
  LEFT OUTER JOIN positions ON promote_history.position_id = positions.id
  LEFT OUTER JOIN departments ON promote_history.department_id = departments.id
  WHERE user_id = $1 ORDER BY promote_date ASC`, [userId])
);

module.exports = PromoteHistory;
