const router = require('express').Router();
const HasAssetController = require('../../controllers/HasAssetController');
const { can } = require('../../middlewares');

router.post('/', can(['hasAssetAdd']), HasAssetController.create);

router.get('/', HasAssetController.findByUserId);

router.delete('/', can(['hasAssetDelete']), HasAssetController.delete);

module.exports = router;
