const router = require('express').Router();
const ToeicController = require('../../controllers/ToeicController');
const { can } = require('../../middlewares');

router.post('/', can(['toeicAdd']), ToeicController.create);

router.get('/', can(['toeicView']), ToeicController.findByUserId);

router.delete('/', can(['toeicDelete']), ToeicController.delete);

module.exports = router;
