const router = require('express').Router();
const LeaveRequestController = require('../../controllers/LeaveRequestController');

router.post('/', LeaveRequestController.create);

router.put('/', LeaveRequestController.update);

router.get('/', LeaveRequestController.findLeaveRequest);

module.exports = router;
