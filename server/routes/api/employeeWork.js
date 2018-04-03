const router = require('express').Router();
const EmployeeWorkController = require('../../controllers/EmployeeWorkController');

router.post('/', EmployeeWorkController.create);

router.get('/', EmployeeWorkController.find);

router.put('/', EmployeeWorkController.update);

// router.delete('/:id', EmployeeWorkController.update);

module.exports = router;
