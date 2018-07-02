const router = require('express').Router();
const ProjectController = require('../../controllers/ProjectController');

router.post('/', ProjectController.create);

router.put('/', ProjectController.update);

router.get('/:id', ProjectController.findById);

router.get('/project-timesheet', ProjectController.findProjectByTimesheet);

module.exports = router;
