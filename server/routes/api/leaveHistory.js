const router = require('express').Router();
const LeaveHistoryController = require('../../controllers/LeaveHistoryController');
const { can } = require('../../middlewares');

router.get('/', can(['leaveHistoryView']), LeaveHistoryController.findByUserIdAndYear);

module.exports = router;
