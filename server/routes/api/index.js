const router = require('express').Router();
const employeeInfo = require('./employeeInfo');

router.use('/employee-info', employeeInfo);

module.exports = router;
