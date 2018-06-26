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
    .then(() => {
      Project.findById(editProject.id)
        .then((project) => {
          Project.findMemberProject(editProject.id)
            .then((members) => {
              project.members = members;
              res.json(project);
            })
            .catch(next);
        })
        .catch(next);
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
  Project.findById(req.params.id)
    .then((project) => {
      Project.findMemberProject(req.params.id)
        .then((members) => {
          project.members = members;
          res.json(project);
        })
        .catch(next);
    })
    .catch(next);
};
