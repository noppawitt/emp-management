const router = require('express').Router();
const LeaveHistoryController = require('../../controllers/LeaveHistoryController');

router.get('/', LeaveHistoryController.findByUserIdAndYear);

module.exports = router;
