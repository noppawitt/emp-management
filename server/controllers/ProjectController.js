const Project = require('../models/Project');

exports.create = (req, res, next) => {
  const newProject = req.body.project;
  Project.create(newProject, req.user.id)
    .then((createdProject) => {
      res.json(createdProject);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editProject = req.body.project;
  Project.update(editProject, req.user.id)
    .then((updatedProject) => {
      req.json(updatedProject);
    })
    .catch(next);
};

exports.findAll = (req, res, next) => {
  Project.findAll()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
};

exports.findById = (req, res, next) => {
  Project.findById(req.query.id)
    .then((project) => {
      Project.findMemberProject(req.query.id)
        .then((members) => {
          project.members = members;
        })
        .then(() => {
          res.json(project);
        })
        .catch(next);
    })
    .catch(next);
};
