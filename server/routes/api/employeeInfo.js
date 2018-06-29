const router = require('express').Router();
const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'server/storage/public/profile-img');
  },
  filename: (req, res, cb) => {
    cb(null, String(req.user.id));
  }
});

const upload = multer({ storage });

router.post('/upload-profile-img', upload.single('profileImage'), EmployeeInfoController.updateProfileImg);

router.get('/', EmployeeInfoController.findById);

router.post('/', EmployeeInfoController.create);

router.put('/', EmployeeInfoController.update);

module.exports = router;
