const router = require('express').Router();
const FacultyController = require('../../controllers/FacultyController');

router.post('/', FacultyController.create);

router.put('/', FacultyController.update);

router.get('/', FacultyController.findAll);

router.delete('/', FacultyController.delete);

module.exports = router;
