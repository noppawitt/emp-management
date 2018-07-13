const router = require('express').Router();
const LeaveHistoryController = require('../../controllers/LeaveHistoryController');
const { can } = require('../../middlewares');

router.get('/', can(['leaveHistoryViewAll', 'leaveHistoryViewOwn']), LeaveHistoryController.findByUserIdAndYear);

module.exports = router;
