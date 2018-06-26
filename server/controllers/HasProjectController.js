const HasProject = require('../models/HasProject');
const Project = require('../models/Project');

exports.create = (req, res, next) => {
  const newHasProject = req.body.hasProject;
  HasProject.create(newHasProject, req.user.id)
    .then(() => {
      Project.findMemberProject(newHasProject.projectId)
        .then((hasProjects) => {
          res.json(hasProjects);
        })
        .catch(next);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editHasProject = req.body.hasProject;
  HasProject.update(editHasProject, req.user.id)
    .then((updatedHasProject) => {
      req.json(updatedHasProject);
    })
    .catch(next);
};

exports.findByUserId = (req, res, next) => {
  HasProject.findByUserId(req.query.id)
    .then((hasProjects) => {
      res.json(hasProjects);
    })
    .catch(next);
};
