const router = require('express').Router();
const employeeInfo = require('./employeeInfo');
const employeeWork = require('./employeeWork');

router.use('/employee-info', employeeInfo);

router.use('/employee-work', employeeWork);

module.exports = router;
