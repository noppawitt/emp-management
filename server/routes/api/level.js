const router = require('express').Router();
const LevelController = require('../../controllers/LevelController');

router.post('/', LevelController.create);

router.put('/', LevelController.update);

router.get('/', LevelController.findAll);

router.delete('/', LevelController.delete);

module.exports = router;
