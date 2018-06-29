const router = require('express').Router();
const EmployeeInfoController = require('../../controllers/EmployeeInfoController');
const multer = require('multer');
const mime = require('mime/lite');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/storage/public/profile-img');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}.${mime.getExtension(file.mimetype)}`);
  }
});

const upload = multer({ storage });

router.post('/upload-profile-img', upload.single('profileImage'), EmployeeInfoController.updateProfileImg);

router.get('/', EmployeeInfoController.findById);

router.post('/', EmployeeInfoController.create);

router.put('/', EmployeeInfoController.update);

module.exports = router;
