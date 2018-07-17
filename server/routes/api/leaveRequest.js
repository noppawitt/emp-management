const router = require('express').Router();
const LeaveRequestController = require('../../controllers/LeaveRequestController');
const { can } = require('../../middlewares');

router.post('/', can(['leaveRequestAddAll', 'leaveRequestAddOwn']), LeaveRequestController.create);

router.put('/', can(['leaveRequestApprove', 'leaveRequestCancelOwn']), LeaveRequestController.update);

router.get('/', can(['leaveRequestViewAll', 'leaveRequestViewOwn']), LeaveRequestController.findLeaveRequest);

module.exports = router;
