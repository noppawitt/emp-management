const router = require('express').Router();
const LeaveRequestController = require('../../controllers/LeaveRequestController');

router.post('/', LeaveRequestController.create);

router.put('/', LeaveRequestController.update);

module.exports = router;
