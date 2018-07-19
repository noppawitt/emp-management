const db = require('../db');

const File = {};

File.create = (name, size, path, projectId, id) => (
  db.none(
    'INSERT INTO files (name, size, path, project_id, created_user, updated_user) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      name,
      size,
      path,
      projectId,
      id,
      id
    ]
  )
);

File.findById = fileId => (
  db.oneOrNone('SELECT * FROM files WHERE id = $1', [fileId])
);

File.findByProjectId = projectId => (
  db.manyOrNone(`SELECT files.id, files.name, files.size, files.created_date, employee_info.first_name, employee_info.last_name
  FROM files INNER JOIN employee_info ON files.created_user = employee_info.user_id
  WHERE project_id = $1`, [projectId])
);

module.exports = File;
