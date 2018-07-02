const router = require('express').Router();
const MasterTableController = require('../../controllers/MasterTableController');

router.get('/', MasterTableController.fetchMastertable);

module.exports = router;
