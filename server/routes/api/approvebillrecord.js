const router = require('express').Router();
const ApproveBillRecord = require('../../controllers/ApproveBillRecordController');

router.get('/', ApproveBillRecord.findAll);

router.post('/', ApproveBillRecord.updateStatus);

module.exports = router;
