const fs = require('fs');
const File = require('../models/File');

exports.create = (req, res, next) => {
  File.create(req.file.filename, req.file.size, req.file.path, req.body.projectId, req.user.id)
    .then(() => File.findByProjectId(req.body.projectId))
    .then(files => res.json(files))
    .catch(next);
};

exports.findByProjectId = (req, res, next) => {
  File.findByProjectId(req.query.projectId)
    .then(files => res.json(files))
    .catch(next);
};

exports.download = (req, res, next) => {
  File.findById(req.query.fileId)
    .then(file => res.download(file.path))
    .catch(next);
};

exports.delete = (req, res, next) => {
  File.findById(req.body.fileId)
    .then(file => fs.unlinkSync(file.path))
    .then(() => File.delete(req.body.fileId))
    .then(() => res.json({
      message: 'success'
    }))
    .catch(next);
};
