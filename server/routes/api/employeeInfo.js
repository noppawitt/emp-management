const router = require('express').Router();
const EmployeeInfoController = require('../../controllers/EmployeeInfoController');

router.post('/', EmployeeInfoController.create);

router.get('/', EmployeeInfoController.find);

router.put('/', EmployeeInfoController.update);

// router.delete('/:id', EmployeeInfoController.update);

module.exports = router;
