const router = require('express').Router();
const HolidayController = require('../../controllers/HolidayController');
const { can } = require('../../middlewares');

router.post('/', can(['holidayAdd']), HolidayController.create);

router.put('/', HolidayController.update);

router.get('/', HolidayController.findHolidays);

router.delete('/', can(['holidayDelete']), HolidayController.delete);

module.exports = router;
