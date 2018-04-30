const router = require('express').Router();
const HasAssetController = require('../../controllers/HasAssetController');

router.post('/', HasAssetController.create);

router.put('/', HasAssetController.update);

router.get('/', HasAssetController.findByUserId);

module.exports = router;
