const router = require('express').Router();
const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');

router.post('/', EmployeeInfoController.create);

router.get('/', EmployeeInfoController.findById);

router.put('/', EmployeeInfoController.update);

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'server/storage/public/profile-img');
  },
  filename: (req, res, cb) => {
    cb(null, String(req.user.id));
  }
});

const upload = multer({ storage });

router.post('/upload-profile-img', upload.single('profile'), EmployeeInfoController.updateProfileImg);

module.exports = router;
