const router = require('express').Router();
const ReportController = require('../../controllers/ReportController');

router.get('/', ReportController.createReport);

module.exports = router;
