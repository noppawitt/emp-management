const router = require('express').Router();
const PromoteHistoryController = require('../../controllers/PromoteHistoryController');
const { can } = require('../../middlewares');

router.post('/', can(['promoteHistoryAdd']), PromoteHistoryController.create);

router.get('/', can(['promoteHistoryView']), PromoteHistoryController.findByUserId);

router.delete('/', can(['promoteHistoryDelete']), PromoteHistoryController.delete);

module.exports = router;
