const router = require('express').Router();
const ReportController = require('../../controllers/ReportController');
<<<<<<< HEAD

router.post('/', ReportController.createReport);
=======
const { can } = require('../../middlewares');

router.get('/', can(['reportTimesheetNormalOwn', 'reportTimesheetNormalAll', 'reportTimesheetSpecialOwn',
  'reportTimesheetSpecialAll', 'reportSummaryTimesheetYear', 'reportSummaryLeave']), ReportController.createReport);
>>>>>>> 2ef84c28b7d073fae1de484c4f2e765e8e8276f6

module.exports = router;
