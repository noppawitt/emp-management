const router = require('express').Router();
const employeeInfo = require('./employeeInfo');
const employeeWork = require('./employeeWork');
const user = require('./user');
const position = require('./position');

router.use('/employee-info', employeeInfo);

router.use('/employee-work', employeeWork);

router.use('/users', user);

router.use('/positions', position);

module.exports = router;
